import * as vscode from 'vscode';
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
	context.subscriptions.push(vscode.commands.registerCommand('WorkingItemClick', (label) => {

	}));
}

export function deactivate() { }
