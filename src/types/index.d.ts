export { };

declare global {
  interface Window {
    openDatabase: (
      name: string,
      version: string,
      description: string,
      expiresIn: number,
    ) => {};

    ng: any;
    memos: any;

    Promise: any;
  }
}

declare global {
  interface Array<T> {
    repeat(count: number): Array<T>;
  }
  interface Array<T> {
    getRandomElement(): T;
  }
}
