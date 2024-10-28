import { myCreateCheckoutFunction } from "backend/createCheckout.web";
import { currentMember } from "wix-members-frontend";
import { myCreateOrderFromCheckoutFunction } from "backend/createOrderFromCheckout.web";
import { PerformVPNPayment } from "backend/payment.web";
import { cancelOrder } from "backend/cancelOrder.web";
import wixLocation from 'wix-location';

var templateId, currentItem;

$w.onReady(async function () {
    console.log("Initializing payment process...");
    currentItem = $w("#productItemDataset").getCurrentItem();
    templateId = currentItem ? currentItem._id : null;

    console.log("Current item id:", templateId);
    console.log("Current item:", currentItem);

    const member = await getCurrentMember();
    if (!member) {
        console.log("No member found or not logged in.");
        return;
    }

    const checkoutInfo = await initializeCheckoutData(member);
    if (!checkoutInfo) {
        console.log("Failed to initialize checkout data.");
        return;
    }

    const newCheckout = await createCheckout(checkoutInfo);
    if (!newCheckout) {
        console.log("Failed to create checkout.");
        return;
    }

    const newOrder = await createOrderFromCheckout(newCheckout);
    if (!newOrder) {
        console.log("Failed to create order.");
        return;
    }

    setUpPaymentUrl(newOrder, newCheckout);

    $w("#btnCancel").onClick(() => {
        cancelOrderNow(newOrder);
        wixLocation.to("/");
    });
});

async function getCurrentMember() {
    try {
        const member = await currentMember.getMember();
        console.log("Fetched member:", member);
        return member || null;
    } catch (error) {
        console.log("Error fetching member:", error);
        return null;
    }
}

async function initializeCheckoutData(member) {
    if (!member || !member.loginEmail || !member.contactDetails) {
        console.log("Invalid member data provided.");
        return null;
    }

    const email = member.loginEmail;
    const fullName = `${member.contactDetails.firstName || ''} ${member.contactDetails.lastName || ''}`;
    const checkoutInfo = {
        lineItems: [
            {
                quantity: 1,
                catalogReference: {
                    appId: "215238eb-22a5-4c36-9e7b-e7c08025e04e",
                    catalogItemId: templateId,
                },
            }
        ],
        channelType: "WEB",
        checkoutInfo: {
            billingInfo: { contactDetails: { firstName: fullName } },
            buyerInfo: { email: email },
        },
    };
    console.log("Checkout Info:", checkoutInfo);
    return checkoutInfo;
}

async function createCheckout(checkoutInfo) {
    if (!checkoutInfo || !checkoutInfo.lineItems || !checkoutInfo.checkoutInfo) {
        console.log("Invalid checkout info.");
        return null;
    }

    console.log("Creating checkout with:", checkoutInfo);
    try {
        const newCheckout = await myCreateCheckoutFunction(checkoutInfo);
        console.log("Checkout created successfully:", newCheckout);
        return newCheckout;
    } catch (error) {
        console.log("Error creating checkout:", error);
        return null;
    }
}

async function createOrderFromCheckout(checkout) {
    if (!checkout || !checkout._id) {
        console.log("Invalid checkout data. Cannot create order.");
        return null;
    }

    console.log("Creating order from checkout:", checkout);
    try {
        const createOrderResponse = await myCreateOrderFromCheckoutFunction(checkout._id);
        console.log("Order created successfully:", createOrderResponse);
        return createOrderResponse;
    } catch (error) {
        console.log("Error creating order:", error);
        return null;
    }
}

function setUpPaymentUrl(order, checkoutInfo) {
    if (!order || !checkoutInfo || !checkoutInfo.priceSummary || !checkoutInfo.priceSummary.total) {
        console.log("Invalid checkout or order info. Cannot create payment.");
        return;
    }

    const params = {
        vnp_OrderInfo: `Payment for order #${order.orderId}`,
        ordertype: "billpayment",
        amount: `${(checkoutInfo.priceSummary.total.amount + 10000) * 100}`,
        return_url: `https://nguyenhoanganhgoah.wixstudio.io/tratravel/thankyou-payment/${currentItem.slug}`,
        order_id: `${order.orderId}`
    };

    console.log("Payment Params:", params);
    PerformVPNPayment(params)
        .then((resultUrlReturn) => {
            console.log("Payment URL:", resultUrlReturn);
            $w('#btnPayment').link = resultUrlReturn;
        })
        .catch((error) => {
            console.log("Error in retrieving payment URL:", error);
        });
}

function cancelOrderNow(order) {
    if (!order || !order.orderId) {
        console.log("Invalid order info. Cannot cancel order.");
        return;
    }

    const options = {
        customMessage: "Customer canceled the transaction",
        restockAllItems: false,
        sendOrderCanceledEmail: true
    };

    cancelOrder(order.orderId, options)
        .then((result) => {
            console.log("Order cancellation result:", result);
        })
        .catch((error) => {
            console.log("Error canceling order:", error);
        });
}
