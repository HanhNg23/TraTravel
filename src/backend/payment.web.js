import { Permissions, webMethod } from "wix-web-module";
import wixData from "wix-data";
import { fetch } from "wix-fetch";
import CryptoJS from 'crypto-js';
import { redirect } from "wix-router";

// const params = {
//     vnp_OrderInfo: "Payment for order #123",
//     ordertype: "billpayment",
//     amount: "100000", // Amount in VND
//     txt_billing_mobile: "0123456789",
//     txt_billing_email: "customer@example.com",
//     txt_billing_fullname: "John Doe",
//     txt_inv_addr1: "123 Example Street",
//     txt_bill_city: "Hanoi",
//     txt_bill_country: "VN",
//     txt_inv_mobile: "0355529820",
//     txt_inv_email: "hoanganhnguyen3533@gmail.com",
//     txt_inv_customer: "John Doe",
//     txt_inv_company: "Example Company",
//     txt_inv_taxcode: "123456789",
//     cbo_inv_type: "I",
//     return_url: "https://nguyenhoanganhgoah.wixstudio.io/tratravel/thankyou-payment/tam-đảo-3-ngày-2-đêm",
//     bankcode: "VNBANK"
// };

const config = {
    vnp_TmnCode: "BW30X8AC",
    vnp_PayUrl: "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html",
    vnp_HashSecret: "J056K68RJV9N3LW9CE7HIJVY1KUD9RP8"
};


export const PerformVPNPayment = webMethod(Permissions.Anyone, async (params) => {
    try {
        console.log("PerformVPNPayment called with params:", params);
        
        const paymentUrl = await generateVnpayPaymentUrl(params, config);
        console.log("Generated payment URL:", paymentUrl);
        // redirect(paymentUrl, "301");

        return paymentUrl; 
    } catch (error) {
        console.error("Error in PerformVPNPayment:", error);
        throw error;
    }
});


async function generateVnpayPaymentUrl(params, config) {
    console.log("Generating payment URL with config:", config);

    const vnp_Version = "2.1.0";
    const vnp_Command = "pay";
    const vnp_OrderInfo = params.vnp_OrderInfo;
    const orderType = "other";
    const vnp_TxnRef = `${params.order_id}`; // Mã giao dịch, có thể thay đổi cho mỗi giao dịch
    const vnp_IpAddr = await getIpAddress();
    const vnp_TmnCode = config.vnp_TmnCode;
    const vnp_returnUrl = params.return_url;

    //const amount = parseInt(params.amount) * 100; 
    const amount = parseInt(params.amount); 
    const vnp_Params = {
        "vnp_Version": vnp_Version,
        "vnp_Command": vnp_Command,
        "vnp_TmnCode": vnp_TmnCode,
        "vnp_Amount": String(amount),
        "vnp_CurrCode": "VND",
        "vnp_TxnRef": vnp_TxnRef,
        "vnp_OrderInfo": vnp_OrderInfo,
        "vnp_OrderType": orderType,
        "vnp_ReturnUrl": vnp_returnUrl,
        "vnp_IpAddr": vnp_IpAddr
    };

    if (params.bankcode) vnp_Params["vnp_BankCode"] = params.bankcode;
    vnp_Params["vnp_Locale"] = params.language || "vn";

    // Định dạng ngày giờ theo múi giờ Việt Nam
    const currentDate = new Date();
    vnp_Params["vnp_CreateDate"] = formatDate(currentDate);
    
    // Cập nhật currentDate thêm 60 phút cho thời gian hết hạn
    currentDate.setMinutes(currentDate.getMinutes() + 60);
    vnp_Params["vnp_ExpireDate"] = formatDate(currentDate);

    console.log("VNP Parameters:", vnp_Params);

    const sortedKeys = Object.keys(vnp_Params).sort();
    let hashData = '';
    let query = '';
    sortedKeys.forEach((key, index) => {
        const value = vnp_Params[key];
        if (value) {
            // Sử dụng encodeURIComponent để mã hóa, sau đó thay thế %20 bằng +
            const encodedValue = encodeURIComponent(value).replace(/%20/g, '+');
            hashData += `${key}=${encodedValue}${index < sortedKeys.length - 1 ? '&' : ''}`;
            query += `${key}=${encodedValue}${index < sortedKeys.length - 1 ? '&' : ''}`;
        }
    });
    console.log("Hash data for secure hash generation:", hashData);


    const vnp_SecureHash = await generateHmacSHA512(config.vnp_HashSecret, hashData);
    query += `&vnp_SecureHash=${vnp_SecureHash}`;
    console.log("Final query string with secure hash:", query);

    return `${config.vnp_PayUrl}?${query}`;
}

async function getIpAddress() {
    const response = await fetch("https://api.ipify.org?format=json");
    const data = await response.json();
    console.log("Fetched IP address:", data.ip);
    return data.ip;
}

async function generateHmacSHA512(secret, data) {
    console.log("DATA: ", data);
    const hash = CryptoJS.HmacSHA512(data, secret);
    const hashInHex = CryptoJS.enc.Hex.stringify(hash); // Đổi sang định dạng hex
    console.log("Generated HMAC SHA512:", hashInHex);
    return hashInHex; // Trả về giá trị ở định dạng hex
}

// Hàm định dạng ngày theo kiểu yyyyMMddHHmmss với múi giờ Việt Nam
function formatDate(date) {
    const options = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZone: "Asia/Ho_Chi_Minh",
        hour12: false // Định dạng 24 giờ
    };

    const formatter = new Intl.DateTimeFormat("en-CA", options);
    const parts = formatter.formatToParts(date);
    
    const year = parts.find(part => part.type === 'year').value;
    const month = parts.find(part => part.type === 'month').value;
    const day = parts.find(part => part.type === 'day').value;
    const hour = parts.find(part => part.type === 'hour').value;
    const minute = parts.find(part => part.type === 'minute').value;
    const second = parts.find(part => part.type === 'second').value;

    return `${year}${month}${day}${hour}${minute}${second}`;
}

