import { myCreateCheckoutFunction, myMarkCheckoutAsCompletedFunction, myGetCheckoutUrl} from "backend/createCheckout.web";
import { currentMember } from "wix-members-frontend";
import { myCreateOrderFromCheckoutFunction, myGetOrderFunction} from "backend/createOrderFromCheckout.web";
import { cancelOrder } from "backend/cancelOrder.web";
import wixLocation from 'wix-location';
import {PaymentQRCode} from "backend/paymentqrcode.web";
import { updateOrder } from "backend/updateOrder.web.js";

var templateId, currentItem;
//const returnUrl =  `https://nguyenhoanganhgoah.wixstudio.io/tratravel/thankyou-payment/${currentItem.slug}`


$w.onReady(async function () {
    console.log("Initializing payment process...");
    currentItem = $w("#productItemDataset").getCurrentItem();
    templateId = currentItem ? currentItem._id : null;

    console.log("Current item id:", templateId);
    console.log("Current item:", currentItem);

    try {

        // setUpPaymentUrl(newOrder, newCheckout);

        $w("#btnCancel").onClick(() => {
            wixLocation.to("/");
        });
        $w("#btnPayment").onClick(async () => {
            const member = await getCurrentMember();
            if (!member) throw new Error("No member found or not logged in.");

            const checkoutInfo = await initializeCheckoutData(member);
            if (!checkoutInfo) throw new Error("Failed to initialize checkout data.");

            const newCheckout = await createCheckout(checkoutInfo);
            if (!newCheckout) throw new Error("Failed to create checkout.");

            const checkoutUrl = await getCheckoutAbandonUrl(newCheckout);
            if (!checkoutUrl) throw new Error("Get Checkout URL is failed");
            console.log("CHECKOUT URL: ", checkoutUrl.checkoutUrl);

            const newOrder = await createOrderFromCheckout(newCheckout);
            if (!newOrder) throw new Error("Failed to create order.");
            console.log("NEW ORDER FROM CHECKOUT HAS IS ", newOrder.orderId);

            await markCheckOutComplete(newCheckout);
            console.log("CHECKOUT AFTER MARK AS COMPLETED ", newCheckout);

            const currentOrderObject = await getMyOrder(newOrder);
            if (!currentOrderObject) throw new Error("Failed to retrieve order.");
            console.log("CURRENT ORDER: ", currentOrderObject);

            // const qrCodeDataURL = await generateQRCode(currentOrderObject);
            // if (!qrCodeDataURL) throw new Error("Generate QR Code Failed.");
            // const updateOrderInfo = await updateOrderNow(currentOrderObject);
            // if(!updateOrderInfo) throw new Error("Failed to update order status.");

         

            wixLocation.to(checkoutUrl.checkoutUrl);
        });
        //$w('#btnPayment').link = resultUrlReturn;
    } catch (error) {
        console.error(error.message);
    }
});

async function getCurrentMember() {
    try {
        const member = await currentMember.getMember();
        console.log("Fetched member:", member);
        return member || null;
    } catch (error) {
        throw new Error("Error fetching member: " + error.message);
    }
}

async function initializeCheckoutData(member) {
    if (!member || !member.loginEmail || !member.contactDetails) {
        throw new Error("Invalid member data provided.");
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
            },
        ],
        channelType: "WEB",
        billingInfo: {
            address: {
                country: "VN",
                subdivision: "VN-HCM",
                city: "Ho Chi Minh",
                postalCode: "07000",
                addressLine1: "Deliver Online Via Email",
            },
            contactDetails: {
                firstName: member.contactDetails.firstName,
                lastName: member.contactDetails.lastName,
                phone: "+840355529820",
            },
        },
        checkoutInfo: {
            shippingInfo: {
                shippingDestination: {
                    address: {
                        country: "VN",
                        subdivision: "VN-HCM",
                        city: "Ho Chi Minh",
                        postalCode: "07000",
                        addressLine1: "Deliver Online Via Email",
                    },
                    contactDetails: {
                        firstName: member.contactDetails.firstName,
                        lastName: member.contactDetails.lastName,
                        phone: "+840355529820",
                    },
                }
            },
        },
        buyerInfo: {
            email: email,
        },
    };
    console.log("Checkout Info:", checkoutInfo);
    return checkoutInfo;
}


async function createCheckout(checkoutInfo) {
   if (!checkoutInfo || !checkoutInfo.lineItems || !checkoutInfo.checkoutInfo) {
        if (!checkoutInfo || !checkoutInfo.lineItems) {
        throw new Error("Invalid checkout info.");
    }
}

    console.log("Creating checkout with:", checkoutInfo);
    try {
        const newCheckout = await myCreateCheckoutFunction(checkoutInfo);
        console.log("Checkout created successfully:", newCheckout);
        return newCheckout;
    } catch (error) {
        throw new Error("Error creating checkout: " + error.message);
    }
};

async function createOrderFromCheckout(checkout) {
    if (!checkout || !checkout._id) {
        throw new Error("Invalid checkout data. Cannot create order.");
    }

    console.log("Creating order from checkout:", checkout);
    try {
        const createOrderResponse = await myCreateOrderFromCheckoutFunction(checkout._id);
        console.log("Order created successfully:", createOrderResponse);
        console.log("Order ID :", createOrderResponse.orderId);
       
        return createOrderResponse;
    } catch (error) {
        throw new Error("Error creating order: " + error.message);
    }
};


function cancelOrderNow(order) {
    if (!order || !order.orderId) {
        throw new Error("Invalid order info. Cannot cancel order.");
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
            console.error("Error canceling order:", error);
        });
};

async function updateOrderNow(order) {
    if (!order || !order._id) {
        throw new Error("Invalid order info. Cannot cancel order.");
    }
    console.log("Updating order prepare", order);

       const updateOrderInfo = {
        archived: false,

       }
    
        try {
            const updateOrderResponse = await updateOrder(order._id, updateOrderInfo);
            console.log("Update Order successfully:", updateOrderResponse);
            console.log("Order ID :", updateOrderResponse.orderId);
           
            return updateOrderResponse;
        } catch (error) {
            throw new Error("Error updating order: " + error.message);
        }
};

async function getMyOrder(order){
    try{
        console.log("CHECK INTERNAL ORDER ID", order.orderId);
        const currentOrder = await myGetOrderFunction(order.orderId);
        console.log("Current Order: ", currentOrder);
        return currentOrder;
    }catch(error){
        throw new Error("Error getting order: " + error.message);
    }
};

async function generateQRCode(order){
    if (!order || !order._id) {
        throw new Error("Invalid order info. Cannot create payment QR.");
    }
    const params = {
        amount: order.priceSummary.total.amount,
        ordernumber: order._id
    }

     try {
         const QRCodeImageData = await PaymentQRCode(params);
         console.log("QR Code Generate successfully:", QRCodeImageData);        
         return QRCodeImageData;
     } catch (error) {
         throw new Error("Error updating order: " + error.message);
     }
}

async function markCheckOutComplete(checkout){
    if (!checkout || !checkout._id) {
        throw new Error("Invalid checkout info. Cannot create mark checkout complate.");
    }
    try{
        await myMarkCheckoutAsCompletedFunction(checkout._id);
        return;
    }catch(error){
        throw new Error("error marck checkout complete");
    }
}

async function getCheckoutAbandonUrl(checkout){
    if (!checkout || !checkout._id) {
        throw new Error("Invalid checkout info. Cannot create checkout URL.");
    }
    try{
        const result = await myGetCheckoutUrl(checkout._id);
        return result;
    }catch(error){
        throw new Error(error);
    }
}