export class UncaughtInSafetyError extends Error {
  constructor(public original: any) {
    super('Uncaught Error in Safety function');
  }
}
