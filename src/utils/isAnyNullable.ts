export function isAnyNullable(...args: any[]): boolean {
  for (let i = 0; i < args.length; i += 1) {
    const target = args[i];
    if (target === undefined || target === null) return true;
  }
  return false;
}
