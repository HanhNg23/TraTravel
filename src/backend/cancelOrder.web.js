import { orders } from "wix-ecom-backend";
import { webMethod, Permissions } from "wix-web-module";
import { elevate } from "wix-auth";

const elevatedCancelOrder = elevate(orders.cancelOrder);

export const cancelOrder = webMethod(
  Permissions.Admin,
  async (id) => {
    try {
      let options = {
        suppressAuth: true
      };
      const result = await elevatedCancelOrder(id, options);
      return result;
    } catch (error) {
      console.error(error);
      throw new Error("Error occurred while cancelling the order");
    }
  }
);
