export function array<T>(arr: any): T[] {
    return Array.isArray(arr) ? arr : [];
}
