import wixLocation from 'wix-location';
import { myGetOrderFunction } from "backend/createOrderFromCheckout.web";
import { cancelOrder } from "backend/cancelOrder.web";
import { PaymentQRCode } from "backend/paymentqrcode.web";
import wixWindowFrontend from "wix-window-frontend";
import { triggeredEmails } from "wix-crm-frontend";
import { currentMember } from "wix-members-frontend";

$w.onReady(async function () {
    let orderId = wixLocation.path;
    console.log("PATH: ", orderId);
    //let orderId = "9da0ef23-a1c4-4a5f-b4e0-de3c108c56c8";

    try {
        //$w("#imgQRCode").hide();
        const currentOrderObject = await getMyOrder(orderId);
        if (!currentOrderObject) throw new Error("Failed to retrieve order.");
        console.log("CURRENT ORDER: ", currentOrderObject);

        if(currentOrderObject.status === "CANCELED"){
            wixWindowFrontend.openLightbox("Message Cancel Order");
            wixLocation.to("/");
            return;
        }
        const qrCodeDataURL = await generateQRCode(currentOrderObject);
        if (!qrCodeDataURL) throw new Error("Generate QR Code Failed.");
        console.log("QR CODE IMAGE: ", qrCodeDataURL);
        $w("#imgQRCode").src = qrCodeDataURL.qrCodeDataURL;
        //$w("#imgQRCode").show();

        $w("#btnPaymentCancel").onClick(async () => {
            await cancelOrderNow(orderId);
            wixWindowFrontend.openLightbox("Message Cancel Order");
        });

        $w("#btnAcceptPayment").onClick(async () => {
            wixWindowFrontend.openLightbox("Message After Confirm");
            await triggerEmailSendToStaff(currentOrderObject);
        });

    } catch (error) {
        console.error("Error: ", error.message);
    }
});

async function triggerEmailSendToStaff(order) {
    try {
        console.log("ORDER: ", order);
        console.log("TRIGGER EMAIL");
        await triggeredEmails.emailMember("USLQOMY", "6a99560a-57a8-4a8d-959b-ff3823c82baf", {
            variables: {
                customer: "HOANG ANH",
                orderNumber: "12345",
            },
        });
        // await triggeredEmails.emailMember("USLQOMY", "68063784-e063-4664-ab3e-11959ebb777c", {
        //     variables: {
        //         customer: order.buyerInfo.email,
        //         orderNumber: order.number,
        //     },
        // });
        return "Emails sent successfully";
    } catch (error) {
        throw new Error("Error triggering email: " + error.message);
    }
}

async function cancelOrderNow(orderId) {
    if (!orderId) {
        throw new Error("Invalid order info. Cannot cancel order.");
    }

    const options = {
        customMessage: "Customer canceled the transaction",
        restockAllItems: false,
        sendOrderCanceledEmail: true
    };

    try {
        const result = await cancelOrder(orderId, options);
        console.log("Order cancellation result:", result);
        return result;
    } catch (error) {
        console.error("Error canceling order:", error);
        throw new Error("Order cancellation failed.");
    }
}

async function getMyOrder(orderId) {
    try {
        console.log("CHECK INTERNAL ORDER ID", orderId);
        const currentOrder = await myGetOrderFunction(orderId);
        console.log("Current Order: ", currentOrder);
        return currentOrder;
    } catch (error) {
        throw new Error("Error getting order: " + error.message);
    }
}

async function generateQRCode(order) {
    if (!order || !order.number) {
        throw new Error("Invalid order info. Cannot create payment QR.");
    }
    const params = {
        amount: order.priceSummary.total.amount,
        ordernumber: order.number
    };

    try {
        const QRCodeImageData = await PaymentQRCode(params);
        console.log("QR Code generated successfully:", QRCodeImageData);
        return QRCodeImageData;
    } catch (error) {
        throw new Error("Error generating QR code: " + error.message);
    }
}
