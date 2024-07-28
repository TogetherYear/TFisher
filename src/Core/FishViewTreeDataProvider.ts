import * as vscode from 'vscode';

const fishViewTreeData = [
    {
        label: 'FishView_Test',
        icon: 'gist-new'
    }
];

class FishViewTreeItemNode extends vscode.TreeItem {
    constructor(label: string, collapsibleState: vscode.TreeItemCollapsibleState, icon: string) {
        super(label, collapsibleState);
        this.iconPath = new vscode.ThemeIcon(icon);

        this.command = {
            title: this.label as string,
            command: 'TFisher.FishViewItemClick',
            tooltip: this.label as string,
            arguments: [label, icon]
        };
    }
}

class FishViewTreeDataProvider implements vscode.TreeDataProvider<FishViewTreeItemNode> {
    public getTreeItem(element: FishViewTreeItemNode): vscode.TreeItem | Thenable<vscode.TreeItem> {
        return element;
    }

    public getChildren(
        element?: FishViewTreeItemNode | undefined
    ): vscode.ProviderResult<FishViewTreeItemNode[]> {
        return fishViewTreeData.map(
            (c) =>
                new FishViewTreeItemNode(
                    c.label as string,
                    vscode.TreeItemCollapsibleState.None as vscode.TreeItemCollapsibleState,
                    c.icon
                )
        );
    }
}

export { FishViewTreeDataProvider };
