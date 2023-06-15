export class BadRequestException extends Error {
  readonly status: number = 400;
  readonly name: string = 'BadRequestException';
  readonly message: string = 'Bad request';
  readonly code?: string;
  readonly errors?: unknown[];

  constructor({
    code,
    errors,
    message,
  }: {
    code?: string;
    errors?: unknown[];
    message?: string;
  }) {
    super();

    if (message) {
      this.message = message;
    }

    if (code) {
      this.code = code;
    }

    if (errors) {
      this.errors = errors;
    }
  }
}
