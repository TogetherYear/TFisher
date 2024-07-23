import * as vscode from 'vscode';

const workingTreeData = [
    {
        label: '添加Vue3类组件',
        icon: 'gist-new'
    },
    {
        label: '添加全局单例管理类',
        icon: 'ports-open-browser-icon'
    },
]

class WorkingTreeItemNode extends vscode.TreeItem {
    constructor(label: string, collapsibleState: vscode.TreeItemCollapsibleState, icon: string) {
        super(label, collapsibleState);
        this.iconPath = new vscode.ThemeIcon(icon)
    }

    public command = {
        title: this.label as string,
        command: 'WorkingItemClick',
        tooltip: this.label as string,
        arguments: [
            this.label,
        ]
    }
}

class WorkingTreeDataProvider implements vscode.TreeDataProvider<WorkingTreeItemNode> {
    public getTreeItem(element: WorkingTreeItemNode): vscode.TreeItem | Thenable<vscode.TreeItem> {
        return element;
    }

    public getChildren(element?: WorkingTreeItemNode | undefined): vscode.ProviderResult<WorkingTreeItemNode[]> {
        return workingTreeData.map(
            c => new WorkingTreeItemNode(
                c.label as string,
                vscode.TreeItemCollapsibleState.None as vscode.TreeItemCollapsibleState,
                c.icon,
            )
        )
    }
}

export { WorkingTreeDataProvider }