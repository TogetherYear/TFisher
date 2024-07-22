import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	const disposable = vscode.commands.registerCommand('Fish.First', () => {
		vscode.window.showInformationMessage('Hello World from Fish!');
	});

	context.subscriptions.push(disposable);
}

export function deactivate() { }
