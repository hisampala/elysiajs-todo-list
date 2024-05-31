export class valid_username_error extends Error {
  private _tag = "valid_username_error";
  constructor(message: string) {
    super();
    this.message = message;
  }
}
