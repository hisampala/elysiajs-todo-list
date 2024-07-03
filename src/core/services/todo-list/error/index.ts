export class create_item_todo_error extends Error {
  private _tag = "create_item_todo_error";
  constructor(message: string) {
    super();
    this.message = message;
  }
}
export class update_item_todo_error extends Error {
  private _tag = "create_item_todo_error";
  constructor(message: string) {
    super();
    this.message = message;
  }
}

export class delete_item_todo_error extends Error {
  private _tag = "create_item_todo_error";
  constructor(message: string) {
    super();
    this.message = message;
  }
}
export class get_all_item_todo_error extends Error {
  private _tag = "create_item_todo_error";
  constructor(message: string) {
    super();
    this.message = message;
  }
}
