import * as vscode from 'vscode';
import * as fs from 'fs'
import * as path from 'path'

let webViewPanel: vscode.WebviewPanel | null = null

class FishViewWebViewProvider {
    constructor(context: vscode.ExtensionContext, viewColumn: vscode.ViewColumn, label: string) {
        this.context = context
        this.viewColumn = viewColumn
        this.label = label
        this.CreateView()
    }

    private context: vscode.ExtensionContext;

    private viewColumn: vscode.ViewColumn;

    private label: string;

    private CreateView() {
        if (webViewPanel) {
            webViewPanel.title = this.label
            webViewPanel.reveal()
        }
        else {
            webViewPanel = vscode.window.createWebviewPanel('FishViewWebViewProvider', this.label, this.viewColumn, {
                retainContextWhenHidden: true,
                enableScripts: true,
            })
            webViewPanel.webview.html = fs.readFileSync(path.join(__dirname, `../../resources/FishViewWebView.html`)).toString('utf-8')
        }
        webViewPanel.onDidDispose(() => {
            webViewPanel = null
        })
    }
}

export { FishViewWebViewProvider, webViewPanel }