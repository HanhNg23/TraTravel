import { orders } from "wix-ecom-backend";
import { webMethod, Permissions } from "wix-web-module";
import { elevate } from "wix-auth";

const elevatedCancelOrder = elevate(orders.cancelOrder);

export const cancelOrder = webMethod(
  Permissions.Anyone,
  async (id, options) => {
    try {
      const result = await elevatedCancelOrder(id, options);
      return result;
    } catch (error) {
      console.error(error);
      // Handle the error
    }
  },
);
