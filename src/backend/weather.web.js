import { Permissions, webMethod } from "wix-web-module";

export const myFunction = webMethod(Permissions.Anyone, (someParam) => {
    // Some functionality for site members to call from the frontend
    return `You passed me ${someParam}`;
  });
  