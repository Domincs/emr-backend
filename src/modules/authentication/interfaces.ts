export interface PermissionGroup {
    id: number,
    name: string,
    description: string,
    permissions: Permission[],
}

export interface Permission {
    id: number,
    name: string,
    description: string,
}