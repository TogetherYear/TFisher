import * as vscode from 'vscode';
import * as path from 'path'

const fishViewTreeData = [
    {
        label: '默认显示',
        icon: 'Acquiescent'
    }
]

class FishViewTreeItemNode extends vscode.TreeItem {
    constructor(label: string, collapsibleState: vscode.TreeItemCollapsibleState, icon: string) {
        super(label, collapsibleState);
        this.iconPath = vscode.Uri.file(path.join(__dirname, `../../resources/${icon}.png`))

        this.command = {
            title: this.label as string,
            command: 'FishViewItemClick',
            tooltip: this.label as string,
            arguments: [
                label,
                icon
            ]
        }
    }
}

class FishViewTreeDataProvider implements vscode.TreeDataProvider<FishViewTreeItemNode> {
    public getTreeItem(element: FishViewTreeItemNode): vscode.TreeItem | Thenable<vscode.TreeItem> {
        return element;
    }

    public getChildren(element?: FishViewTreeItemNode | undefined): vscode.ProviderResult<FishViewTreeItemNode[]> {
        return fishViewTreeData.map(
            c => new FishViewTreeItemNode(
                c.label as string,
                vscode.TreeItemCollapsibleState.None as vscode.TreeItemCollapsibleState,
                c.icon,
            )
        )
    }
}

export { FishViewTreeDataProvider }