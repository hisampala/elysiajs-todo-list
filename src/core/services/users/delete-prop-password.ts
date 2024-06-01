import { Users } from "@prisma/client";

export default (item: any) => {
  delete item.password;
  // delete item.refresh_token;
  return item as Users;
};
