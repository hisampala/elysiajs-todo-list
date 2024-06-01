export class valid_username_error extends Error {
  private _tag = "valid_username_error";
  constructor(message: string) {
    super();
    this.message = message;
  }
}
export class update_refresh_token_error extends Error {
  private _tag = "update_refresh_token_error";
  constructor(message: string) {
    super();
    this.message = message;
  }
}
export class verify_jwt_token_error extends Error {
  private _tag = "verify_jwt_token_error";
  constructor(message: string) {
    super();
    this.message = message;
  }
}
export class verify_jwt_refresh_token_error extends Error {
  private _tag = "verify_jwt_refresh_token_error";
  constructor(message: string) {
    super();
    this.message = message;
  }
}
export class generate_token_and_refresh_token_and_update_error extends Error {
  private _tag = "generate_token_and_refresh_token_and_update_error";
  constructor(message: string) {
    super();
    this.message = message;
  }
}
