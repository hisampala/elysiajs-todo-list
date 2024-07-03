import { Users } from "@prisma/client";

export default (item: Users) => {
  delete item.password;
  // delete item.refresh_token;
  return item as Users;
};
