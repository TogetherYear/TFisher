import * as vscode from 'vscode';
import { FishViewTreeDataProvider } from './Core/FishViewTreeDataProvider';
import { FishViewWebViewProvider, webViewPanel } from './Core/FishViewWebViewProvider';

export function activate(context: vscode.ExtensionContext) {
	vscode.window.registerTreeDataProvider('FishView', new FishViewTreeDataProvider())

	context.subscriptions.push(vscode.commands.registerCommand('FishViewItemClick', (label) => {
		const webview = new FishViewWebViewProvider(context, vscode.ViewColumn.Active, label)
		context.subscriptions.push(webViewPanel!)
	}));
}

export function deactivate() { }
