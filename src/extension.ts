import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import { FishViewTreeDataProvider } from './Core/FishViewTreeDataProvider';
import { WorkingTreeDataProvider } from './Core/WorkingTreeDataProvider';
import { FishViewWebViewProvider } from './Core/FishViewWebViewProvider';

export function activate(context: vscode.ExtensionContext) {
    vscode.window.registerTreeDataProvider('FishView', new FishViewTreeDataProvider());
    context.subscriptions.push(vscode.commands.registerCommand('TFisher.FishViewItemClick', (label, icon: string) => {}));

    vscode.window.registerTreeDataProvider('Working', new WorkingTreeDataProvider());
    context.subscriptions.push(vscode.commands.registerCommand('TFisher.WorkingItemClick', async (label) => {}));

    context.subscriptions.push(
        vscode.commands.registerCommand('TFisher.CreateV3Component', (uri: vscode.Uri) => {
            CreateV3Component(uri);
        })
    );

    context.subscriptions.push(
        vscode.commands.registerCommand('TFisher.CreateTFisherWebView', (uri: vscode.Uri) => {
            CreateTFisherWebView(context);
        })
    );
}

const CreateV3Component = (uri: vscode.Uri) => {
    const current = uri.fsPath;
    const stat = fs.statSync(current);
    const dir = stat.isFile() ? path.join(current, '..') : current;

    vscode.window.showInputBox({ placeHolder: '请输入组件名称' }).then((name) => {
        if (name) {
            const newPath = path.join(dir, name);
            if (!fs.existsSync(newPath)) {
                fs.mkdirSync(newPath);
            }
            const vue = fs.readFileSync(path.join(__dirname, '../resources/Template/Template.vue.t'), 'utf-8').replaceAll('$0', name);
            const ts = fs.readFileSync(path.join(__dirname, '../resources/Template/Template.ts.t'), 'utf-8').replaceAll('$0', name);
            const scss = fs.readFileSync(path.join(__dirname, '../resources/Template/Template.scss.t'), 'utf-8').replaceAll('$0', name);
            fs.writeFileSync(path.join(newPath, `${name}.vue`), vue);
            fs.writeFileSync(path.join(newPath, `${name}.ts`), ts);
            fs.writeFileSync(path.join(newPath, `${name}.scss`), scss);
            vscode.window.showInformationMessage('创建成功');
            vscode.workspace.openTextDocument(path.join(newPath, `${name}.vue`)).then((v) => {
                vscode.window.showTextDocument(v);
            });
        }
    });
};

const CreateTFisherWebView = (context: vscode.ExtensionContext) => {
    const webview = FishViewWebViewProvider.Generate(context, vscode.ViewColumn.Active);
    context.subscriptions.push(webview);
};

export function deactivate() {}
