import * as vscode from 'vscode';
import * as path from 'path'

class TreeItemNode extends vscode.TreeItem {
    constructor(label: string, collapsibleState: vscode.TreeItemCollapsibleState, icon: string) {
        super(label, collapsibleState);
        this.iconPath = path.join(__dirname, `../../resources/${icon}.png`)
    }

    command = {
        title: this.label as string,
        command: 'FishViewItemClick',
        tooltip: this.label as string,
        arguments: [
            this.label,
        ]
    }
}

class FishViewProvider implements vscode.TreeDataProvider<TreeItemNode> {
    getTreeItem(element: TreeItemNode): vscode.TreeItem | Thenable<vscode.TreeItem> {
        return element;
    }

    getChildren(element?: TreeItemNode | undefined): vscode.ProviderResult<TreeItemNode[]> {
        return ['Default'].map(
            c => new TreeItemNode(
                c as string,
                vscode.TreeItemCollapsibleState.None as vscode.TreeItemCollapsibleState,
                c,
            )
        )
    }
}

export { FishViewProvider }