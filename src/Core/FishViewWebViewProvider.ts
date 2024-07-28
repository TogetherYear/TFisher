import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import A from 'axios';

let webViewPanel: vscode.WebviewPanel | null = null;

class FishViewWebViewProvider {
    private constructor(context: vscode.ExtensionContext, viewColumn: vscode.ViewColumn) {
        this.context = context;
        this.viewColumn = viewColumn;
        this.CreateView();
    }

    private context: vscode.ExtensionContext;

    private viewColumn: vscode.ViewColumn;

    private CreateView() {
        if (webViewPanel) {
            webViewPanel.title = 'WebView';
            webViewPanel.reveal();
        } else {
            webViewPanel = vscode.window.createWebviewPanel(
                'FishViewWebViewProvider',
                'WebView',
                this.viewColumn,
                {
                    retainContextWhenHidden: true,
                    enableScripts: true
                }
            );
            webViewPanel.webview.html = fs
                .readFileSync(
                    path.join(this.context.extensionPath, `/resources/FishViewWebView.html`),
                    'utf-8'
                )
                .toString();
        }
        webViewPanel.iconPath = vscode.Uri.file(
            path.join(this.context.extensionPath, `/resources/Acquiescent.png`)
        );

        webViewPanel.webview.onDidReceiveMessage((e) => {
            this.OnMessage(e);
        });
        webViewPanel.onDidDispose(() => {
            webViewPanel = null;
        });
    }

    private OnMessage(e: Record<string, unknown>) {
        if (e.type == 'WebView:Refresh') {
            this.RefreshNew()
                .then((res) => {
                    this.SendMessage({
                        type: 'Plugin:Refresh',
                        status: true,
                        target: res
                    });
                })
                .catch((err) => {
                    this.SendMessage({
                        type: 'Plugin:Refresh',
                        status: false,
                        target: []
                    });
                });
        } else if (e.type == 'WebView:Loading') {
            vscode.window.showInformationMessage('请稍等......');
        } else if (e.type == 'WebView:Error') {
            vscode.window.showInformationMessage('出错啦，请重试......');
        }
    }

    private SendMessage(e: Record<string, unknown>) {
        if (webViewPanel) {
            webViewPanel?.webview.postMessage(e);
        }
    }

    private RefreshNew() {
        return new Promise((resolve, reject) => {
            A.get(
                'https://www.zhihu.com/api/v3/feed/topstory/recommend?action=down&ad_interval=-10&desktop=true'
            )
                .then((res) => {
                    const target = res.data.data;
                    const result = [];
                    for (let i of target) {
                        result.push({
                            question: i.target.question.title,
                            answer: i.target.content.replace(/<\/?.+?\/?>/g, '')
                        });
                    }
                    resolve(result);
                })
                .catch((err) => {
                    reject('Error');
                });
        });
    }

    public static Generate(context: vscode.ExtensionContext, viewColumn: vscode.ViewColumn) {
        const current = new FishViewWebViewProvider(context, viewColumn);
        return webViewPanel as vscode.WebviewPanel;
    }
}

export { FishViewWebViewProvider };
