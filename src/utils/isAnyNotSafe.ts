export function isAnyNotSafe(
  check: (target: any, index: number) => boolean,
  targets: any[]
): boolean {
  for (let i = 0; i < targets.length; i += 1) {
    const target = targets[i];
    if (check(target, i)) return true;
  }
  return false;
}
