import { Permissions, webMethod } from "wix-web-module";
import { orders } from "wix-ecom-backend";
import { elevate } from "wix-auth";

const elevatedUpdateOrder = elevate(orders.updateOrder);

export const updateOrder = webMethod(
  Permissions.Anyone,
  async (id, order) => {
    try {
      const result = await elevatedUpdateOrder(id, order);
      console.log("Success! Update Order: ", result);
      return result;
    } catch (error) {
        throw new Error("error");
      // Handle the error
    }
  },
);
