import * as vscode from 'vscode';
import { FishViewProvider } from './Core/FishViewProvider';

export function activate(context: vscode.ExtensionContext) {
	vscode.window.registerTreeDataProvider('FishView', new FishViewProvider())

	context.subscriptions.push(vscode.commands.registerCommand('FishViewItemClick', (label) => {
		vscode.window.showInformationMessage(label);
	}));
}

export function deactivate() { }
