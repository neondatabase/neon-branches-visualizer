export class UnauthorizedException extends Error {
  readonly status: number = 401;
  readonly name: string = 'UnauthorizedException';
  readonly message: string;

  constructor() {
    super();
    this.message = `Could not authorize the request. Maybe your API key is invalid?`;
  }
}
