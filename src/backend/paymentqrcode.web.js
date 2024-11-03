import { Permissions, webMethod } from "wix-web-module";
import { fetch } from "wix-fetch";

const config = {
    clientId: "c6830cb8-7fb5-4aa5-a5be-9cc3e58669b4",
    api_key: "cf5a6a1f-93b0-4be9-bf83-0db57d47daeb",
    accountNo: "19038057876016",
    accountName: "NGUYEN HOANG ANH",
    acqId: "970407",
    template: "print",
    format: "text"
};

export const PaymentQRCode = webMethod(Permissions.SiteMember, async (params) => {
    const amountPayment = parseInt(params.amount);
    const infoPaymentMessage = `Thanh toan don hang: ${params.ordernumber}`;

    const requestBody = {
        accountNo: config.accountNo,
        accountName: config.accountName,
        acqId: config.acqId,
        amount: String(amountPayment),
        addInfo: infoPaymentMessage,
        format: config.format,
        template: config.template
    };

    try {
        console.log("Generating QR code for payment with params:", params);

        const response = await fetch('https://api.vietqr.io/v2/generate', {
            method: 'POST',
            headers: {
                'x-client-id': config.clientId,
                'x-api-key': config.api_key,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            throw new Error(`API call failed with status ${response.status}`);
        }

        const responseData = await response.json();
        console.log("API response:", responseData);

        if (responseData.code === "00") {
            return {
                qrCodeDataURL: responseData.data.qrDataURL
            };
        } else {
            throw new Error(`Failed to generate QR code: ${responseData.desc}`);
        }

    } catch (error) {
        console.error("Error in generating QR code:", error);
        throw error;
    }
});
