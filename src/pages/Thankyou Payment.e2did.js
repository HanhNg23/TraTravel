import wixLocationFrontend from 'wix-location-frontend';
import wixData from "wix-data";

const datasetOrder = 'Stores/Orders';
var templateId, currentItem;

$w.onReady(async function () {
    const query = wixLocationFrontend.query;
    console.log(query);
    // console.log("Initializing payment process...");
    // currentItem = $w("#productItemDataset").getCurrentItem();
    // templateId = currentItem ? currentItem._id : null;
    // console.log("Current item id:", templateId);
    // console.log("Current item:", currentItem);

    // const orderId = "40098fe6-c2e4-40e2-bb69-c4421ac57dff"; // Replace this with the dynamic query value if available
    // await wixData
    //     .get(datasetOrder, orderId)
    //     .then((order) => {
    //         console.log(order);

    //         // Prepare row data based on the retrieved order
    //         const orderNumberValue = `#${order.number}`;
    //         const templateImage = currentItem.mainMedia;
    //         const emailValue = order.buyerInfo.email;
    //         const totalPaymentValue = order.lineItems[0].totalPrice;
    //         const statusValue = order.paymentStatus;

    //         const row = {
    //             orderNumber: orderNumberValue,
    //             //imageTemplate: templateImage,
    //             email: emailValue,
    //             //totalPayment: totalPaymentValue,
    //             status: statusValue
    //         };

    //         console.log("ROW: ", row);

    //         // Ensure the rows array is initialized and push the new row data
    //         const rows = $w("#tablePaymentView").rows || [];
    //         rows.push(row);
    //         $w("#tablePaymentView").rows = rows; // Assign the updated rows array to the table
    //     })
    //     .catch((err) => {
    //         console.log("Error retrieving order data:", err);
    //     });
});
