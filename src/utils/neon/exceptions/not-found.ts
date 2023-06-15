export class NotFoundException extends Error {
  readonly status: number = 404;
  readonly name: string = 'NotFoundException';
  readonly message: string;
  readonly code?: string;

  constructor({
    code,
    message,
    path,
  }: {
    code?: string;
    message?: string;
    path: string;
  }) {
    super();
    this.code = code;
    this.message =
      message ?? `The requested path '${path}' could not be found.`;
  }
}
