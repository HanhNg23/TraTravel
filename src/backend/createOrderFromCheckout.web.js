import { Permissions, webMethod } from "wix-web-module";
import { checkout } from "wix-ecom-backend";
import { orders } from "wix-ecom-backend";

// export const myGetOrderFunction = webMethod(
//   Permissions.Anyone,
//   async (orderId) => {
//     try {
//       const retrievedOrder = await orders.getOrder(orderId);
//       console.log("Success! Retrieved order:", retrievedOrder);
//       return retrievedOrder;
//     } catch (error) {
//       console.error(error);
//       // Handle the error
//     }
//   },
// );

export const myCreateOrderFromCheckoutFunction = webMethod(
  Permissions.Anyone,
  async (checkoutId) => {
    try {
      const createOrderResponse = await checkout.createOrder(checkoutId);
      console.log("Success! Created an order from the checkout");
      const retrievedOrder = await orders.getOrder(createOrderResponse.orderId);
      console.log("Success! Retrieved order:", retrievedOrder);
      return createOrderResponse;
    } catch (error) {
      console.error(error);
    }
  },
);


/* Promise resolves to:
 *
 * {
 *   "orderId": "02843248-495f-45c0-a5d6-e913f647c9f2",
 *   "paymentGatewayOrderId": "f30440f4-413a-4382-bc38-7280b155a5ed"
 * }
 *
 */
