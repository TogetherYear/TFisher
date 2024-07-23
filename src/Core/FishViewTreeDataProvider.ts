import * as vscode from 'vscode';
import * as path from 'path'

class TreeItemNode extends vscode.TreeItem {
    constructor(label: string, collapsibleState: vscode.TreeItemCollapsibleState, icon: string) {
        super(label, collapsibleState);
        this.iconPath = path.join(__dirname, `../../resources/${icon}.png`)
    }

    public command = {
        title: this.label as string,
        command: 'FishViewItemClick',
        tooltip: this.label as string,
        arguments: [
            this.label,
        ]
    }
}

class FishViewTreeDataProvider implements vscode.TreeDataProvider<TreeItemNode> {
    public getTreeItem(element: TreeItemNode): vscode.TreeItem | Thenable<vscode.TreeItem> {
        return element;
    }

    public getChildren(element?: TreeItemNode | undefined): vscode.ProviderResult<TreeItemNode[]> {
        return ['Default'].map(
            c => new TreeItemNode(
                c as string,
                vscode.TreeItemCollapsibleState.None as vscode.TreeItemCollapsibleState,
                c,
            )
        )
    }
}

export { FishViewTreeDataProvider }