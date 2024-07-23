import * as vscode from 'vscode';
import * as path from 'path'
import * as fs from 'fs'
import { FishViewTreeDataProvider } from './Core/FishViewTreeDataProvider';
import { WorkingTreeDataProvider } from './Core/WorkingTreeDataProvider';
import { FishViewWebViewProvider } from './Core/FishViewWebViewProvider';

export function activate(context: vscode.ExtensionContext) {
	vscode.window.registerTreeDataProvider('FishView', new FishViewTreeDataProvider())
	context.subscriptions.push(vscode.commands.registerCommand('FishViewItemClick', (label, icon: string) => {
		const webview = FishViewWebViewProvider.Generate(context, vscode.ViewColumn.Active, label, icon)
		context.subscriptions.push(webview)
	}));

	vscode.window.registerTreeDataProvider('Working', new WorkingTreeDataProvider())
	context.subscriptions.push(vscode.commands.registerCommand('WorkingItemClick', async (label) => {
		if (label == '添加Vue3类组件') {
			CreateV3Component()
		}
		else if (label == '添加全局单例管理类') {

		}
	}));
}

const CreateV3Component = async () => {
	const folders = vscode.workspace.workspaceFolders
	if (!folders) {
		return
	}
	else {
		const folder = folders.length == 1 ? folders[0] : await vscode.window.showWorkspaceFolderPick()
		if (folder) {
			vscode.window.showInputBox({ placeHolder: '请输入组件路径:例如:src/Test' }).then(res => {
				if (res) {
					const newPath = path.join(folder.uri.fsPath, res).replaceAll('\\', '/')
					const componentName = newPath.split('/').slice(-1)[0]
					const dir = newPath.replace(`/${componentName}`, '')
					if (fs.existsSync(dir)) {
						if (!fs.existsSync(newPath)) {
							fs.mkdirSync(newPath)
						}
						const vue = fs.readFileSync(path.join(__dirname, '../resources/Template/Template.vue.t'), 'utf-8').replaceAll('$0', componentName)
						const ts = fs.readFileSync(path.join(__dirname, '../resources/Template/Template.ts.t'), 'utf-8').replaceAll('$0', componentName)
						const scss = fs.readFileSync(path.join(__dirname, '../resources/Template/Template.scss.t'), 'utf-8').replaceAll('$0', componentName)
						fs.writeFileSync(path.join(newPath, `${componentName}.vue`), vue)
						fs.writeFileSync(path.join(newPath, `${componentName}.ts`), ts)
						fs.writeFileSync(path.join(newPath, `${componentName}.scss`), scss)
						vscode.window.showInformationMessage("创建成功")
						vscode.workspace.openTextDocument(path.join(newPath, `${componentName}.vue`)).then(v => {
							vscode.window.showTextDocument(v)
						})
					}
					else {
						vscode.window.showErrorMessage("父目录不存在")
					}

				}
			})
		}
	}
}

export function deactivate() { }
