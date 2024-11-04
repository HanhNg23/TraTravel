import { Permissions, webMethod } from "wix-web-module";
import { checkout } from "wix-ecom-backend";

export const myCreateCheckoutFunction = webMethod(
  Permissions.Admin,
  async (options) => {
    try {
      let options = {
        suppressAuth: true,
        suppressHooks: true
        };
      const newCheckout = await checkout.createCheckout(options);
      console.log("Success! Checkout created, checkout:", newCheckout);
      return newCheckout;
    } catch (error) {
      console.error(error);
      throw new Error(error);
      // Handle the error
    }
  },
);


export const myMarkCheckoutAsCompletedFunction = webMethod(
  Permissions.Admin,
  async (checkoutId) => {
    try {
      await checkout.markCheckoutAsCompleted(checkoutId);
      console.log("Success! Checkout marked as completed");
      return;
    } catch (error) {
      console.error(error);
      throw new Error(error);
      // Handle the error
    }
  },
);


export const myGetCheckoutUrl = webMethod(
  Permissions.Admin,
  async (id) => {
    try {
      const result = await checkout.getCheckoutUrl(id);
      return result;
    } catch (error) {
      console.error(error);
      // Handle the error
      throw new Error(error);
    }
  },
);


/*************
 * Page code *
 ************/




/* Promise resolves to:
 *
 * {
 *   "_id": "74cc6825-82a1-4f1f-9fbb-7d73f6be152a",
 *   "lineItems": [
 *     {
 *       "_id": "00000000-0000-0000-0000-000000000001",
 *       "quantity": 3,
 *       "catalogReference": {
 *         "catalogItemId": "c8539b66-7a44-fe18-affc-afec4be8562a",
 *         "appId": "215238eb-22a5-4c36-9e7b-e7c08025e04e"
 *       },
 *       "productName": {
 *         "original": "Shirt",
 *         "translated": "Shirt"
 *       },
 *       "url": "https://example.wixsite.com",
 *       "price": {
 *         "amount": "10",
 *         "convertedAmount": "10",
 *         "formattedAmount": "$10.00",
 *         "formattedConvertedAmount": "$10.00"
 *       },
 *       "lineItemPrice": {
 *         "amount": "30",
 *         "convertedAmount": "30",
 *         "formattedAmount": "$30.00",
 *         "formattedConvertedAmount": "$30.00"
 *       },
 *       "fullPrice": {
 *         "amount": "10",
 *         "convertedAmount": "10",
 *         "formattedAmount": "$10.00",
 *         "formattedConvertedAmount": "$10.00"
 *       },
 *       "priceBeforeDiscounts": {
 *         "amount": "10",
 *         "convertedAmount": "10",
 *         "formattedAmount": "$10.00",
 *         "formattedConvertedAmount": "$10.00"
 *       },
 *       "totalPriceAfterTax": {
 *         "amount": "20",
 *         "convertedAmount": "20",
 *         "formattedAmount": "$20.00",
 *         "formattedConvertedAmount": "$20.00"
 *       },
 *       "totalPriceBeforeTax": {
 *         "amount": "20",
 *         "convertedAmount": "20",
 *         "formattedAmount": "$20.00",
 *         "formattedConvertedAmount": "$20.00"
 *       },
 *       "taxDetails": {
 *         "taxableAmount": {
 *           "amount": "20",
 *           "convertedAmount": "20",
 *           "formattedAmount": "$20.00",
 *           "formattedConvertedAmount": "$20.00"
 *         },
 *         "taxRate": "0",
 *         "totalTax": {
 *           "amount": "0",
 *           "convertedAmount": "0",
 *           "formattedAmount": "$0.00",
 *           "formattedConvertedAmount": "$0.00"
 *         },
 *         "rateBreakdown": []
 *       },
 *       "discount": {
 *         "amount": "10",
 *         "convertedAmount": "10",
 *         "formattedAmount": "$10.00",
 *         "formattedConvertedAmount": "$10.00"
 *       },
 *       "descriptionLines": [],
 *       "media": "wix:image://v1/3c76e2_c5331f937348492a97df87b0a3b34ea4~mv2.jpg#originWidth=1000&originHeight=1000",
 *       "availability": {
 *         "status": "AVAILABLE"
 *       },
 *       "physicalProperties": {
 *         "sku": "364115376135191",
 *         "shippable": true
 *       },
 *       "couponScopes": [
 *         {
 *           "namespace": "stores",
 *           "group": {
 *             "name": "collection",
 *             "entityId": "00000000-000000-000000-000000000001"
 *           }
 *         },
 *         {
 *           "namespace": "stores",
 *           "group": {
 *             "name": "product",
 *             "entityId": "c8539b66-7a44-fe18-affc-afec4be8562a"
 *           }
 *         }
 *       ],
 *       "itemType": {
 *         "preset": "PHYSICAL"
 *       },
 *       "paymentOption": "FULL_PAYMENT_ONLINE",
 *       "rootCatalogItemId": "c8539b66-7a44-fe18-affc-afec4be8562a"
 *     },
 *     {
 *       "_id": "00000000-0000-0000-0000-000000000002",
 *       "quantity": 1,
 *       "catalogReference": {
 *         "catalogItemId": "df19c1f7-07d8-a265-42f8-e8dfa824cc6e",
 *         "appId": "215238eb-22a5-4c36-9e7b-e7c08025e04e",
 *         "options": {
 *           "variantId": "2f430d69-9b75-4874-bfbd-c5f6fa5aff3d",
 *           "customTextFields": {
 *             "birthday card": "Happy Birthday!"
 *           }
 *         }
 *       },
 *       "productName": {
 *         "original": "Shoe",
 *         "translated": "Shoe"
 *       },
 *       "url": "https://example.wixsite.com",
 *       "price": {
 *         "amount": "85",
 *         "convertedAmount": "85",
 *         "formattedAmount": "$85.00",
 *         "formattedConvertedAmount": "$85.00"
 *       },
 *       "lineItemPrice": {
 *         "amount": "85",
 *         "convertedAmount": "85",
 *         "formattedAmount": "$85.00",
 *         "formattedConvertedAmount": "$85.00"
 *       },
 *       "fullPrice": {
 *         "amount": "85",
 *         "convertedAmount": "85",
 *         "formattedAmount": "$85.00",
 *         "formattedConvertedAmount": "$85.00"
 *       },
 *       "priceBeforeDiscounts": {
 *         "amount": "85",
 *         "convertedAmount": "85",
 *         "formattedAmount": "$85.00",
 *         "formattedConvertedAmount": "$85.00"
 *       },
 *       "totalPriceAfterTax": {
 *         "amount": "85",
 *         "convertedAmount": "85",
 *         "formattedAmount": "$85.00",
 *         "formattedConvertedAmount": "$85.00"
 *       },
 *       "totalPriceBeforeTax": {
 *         "amount": "85",
 *         "convertedAmount": "85",
 *         "formattedAmount": "$85.00",
 *         "formattedConvertedAmount": "$85.00"
 *       },
 *       "taxDetails": {
 *         "taxableAmount": {
 *           "amount": "85",
 *           "convertedAmount": "85",
 *           "formattedAmount": "$85.00",
 *           "formattedConvertedAmount": "$85.00"
 *         },
 *         "taxRate": "0",
 *         "totalTax": {
 *           "amount": "0",
 *           "convertedAmount": "0",
 *           "formattedAmount": "$0.00",
 *           "formattedConvertedAmount": "$0.00"
 *         },
 *         "rateBreakdown": []
 *       },
 *       "discount": {
 *         "amount": "0",
 *         "convertedAmount": "0",
 *         "formattedAmount": "$0.00",
 *         "formattedConvertedAmount": "$0.00"
 *       },
 *       "descriptionLines": [
 *         {
 *           "name": {
 *             "original": "Color",
 *             "translated": "Color"
 *           },
 *           "colorInfo": {
 *             "original": "Brown",
 *             "translated": "Brown",
 *             "code": "#783f04"
 *           }
 *         },
 *         {
 *           "name": {
 *             "original": "birthday card",
 *             "translated": "birthday card"
 *           },
 *           "plainText": {
 *             "original": "Happy Birthday!",
 *             "translated": "Happy Birthday!"
 *           }
 *         }
 *       ],
 *       "media": "wix:image://v1/3c76e2_bf235c38610f4d2a905db71095b351cf~mv2.jpg#originWidth=1000&originHeight=1000",
 *       "availability": {
 *         "status": "AVAILABLE",
 *         "quantityAvailable": 30
 *       },
 *       "physicalProperties": {
 *         "sku": "364215376135191",
 *         "shippable": true
 *       },
 *       "couponScopes": [
 *         {
 *           "namespace": "stores",
 *           "group": {
 *             "name": "collection",
 *             "entityId": "00000000-000000-000000-000000000001"
 *           }
 *         },
 *         {
 *           "namespace": "stores",
 *           "group": {
 *             "name": "product",
 *             "entityId": "df19c1f7-07d8-a265-42f8-e8dfa824cc6e"
 *           }
 *         }
 *       ],
 *       "itemType": {
 *         "preset": "PHYSICAL"
 *       },
 *       "paymentOption": "FULL_PAYMENT_ONLINE",
 *       "rootCatalogItemId": "df19c1f7-07d8-a265-42f8-e8dfa824cc6e"
 *     },
 *     {
 *       "_id": "00000000-0000-0000-0000-000000000003",
 *       "quantity": 1,
 *       "catalogReference": {
 *         "catalogItemId": "9fe8c5b2-9c94-7153-ebb9-8533695e2b6f",
 *         "appId": "215238eb-22a5-4c36-9e7b-e7c08025e04e",
 *         "options": {
 *           "Size": "Large",
 *           "Color": "White"
 *         }
 *       },
 *       "price": {
 *         "amount": "0",
 *         "convertedAmount": "0",
 *         "formattedAmount": "",
 *         "formattedConvertedAmount": ""
 *       },
 *       "fullPrice": {
 *         "amount": "0",
 *         "convertedAmount": "0",
 *         "formattedAmount": "",
 *         "formattedConvertedAmount": ""
 *       },
 *       "priceBeforeDiscounts": {
 *         "amount": "0",
 *         "convertedAmount": "0",
 *         "formattedAmount": "",
 *         "formattedConvertedAmount": ""
 *       },
 *       "descriptionLines": [],
 *       "availability": {
 *         "status": "NOT_FOUND"
 *       },
 *       "couponScopes": [],
 *       "paymentOption": "FULL_PAYMENT_ONLINE"
 *     }
 *   ],
 *   "billingInfo": {
 *     "address": {
 *       "addressLine1": "235 West 23rd Street",
 *       "addressLine2": "3rd floor",
 *       "city": "New York",
 *       "subdivision": "US-NY",
 *       "country": "US",
 *       "postalCode": "10011"
 *     },
 *     "contactDetails": {
 *       "firstName": "Jane",
 *       "lastName": "Doe",
 *       "phone": "+1234567890"
 *     }
 *   },
 *   "shippingInfo": {
 *     "shippingDestination": {
 *       "address": {
 *         "addressLine1": "235 West 23rd Street",
 *         "addressLine2": "3rd floor",
 *         "city": "New York",
 *         "subdivision": "US-NY",
 *         "country": "US",
 *         "postalCode": "10011"
 *       },
 *       "contactDetails": {
 *         "firstName": "Jane",
 *         "lastName": "Doe",
 *         "phone": "+1234567890"
 *       }
 *     },
 *     "selectedCarrierServiceOption": {
 *       "code": "ed5bbce2-9533-dff4-7db0-13702fd139c5",
 *       "title": "Standard US Shipping",
 *       "logistics": {
 *         "deliveryTime": ""
 *       },
 *       "cost": {
 *         "totalPriceAfterTax": {
 *           "amount": "10",
 *           "convertedAmount": "10",
 *           "formattedAmount": "$10.00",
 *           "formattedConvertedAmount": "$10.00"
 *         },
 *         "totalPriceBeforeTax": {
 *           "amount": "10",
 *           "convertedAmount": "10",
 *           "formattedAmount": "$10.00",
 *           "formattedConvertedAmount": "$10.00"
 *         },
 *         "taxDetails": {
 *           "taxRate": "0",
 *           "totalTax": {
 *             "amount": "0",
 *             "convertedAmount": "0",
 *             "formattedAmount": "$0.00",
 *             "formattedConvertedAmount": "$0.00"
 *           },
 *           "rateBreakdown": []
 *         },
 *         "price": {
 *           "amount": "10",
 *           "convertedAmount": "10",
 *           "formattedAmount": "$10.00",
 *           "formattedConvertedAmount": "$10.00"
 *         }
 *       },
 *       "requestedShippingOption": true,
 *       "otherCharges": [],
 *       "carrierId": "c8a08776-c095-4dec-8553-8f9698d86adc"
 *     },
 *     "region": {
 *       "_id": "009fbe5d-89d3-7825-cbbf-1aab4d908b73",
 *       "name": "USA shipping"
 *     },
 *     "carrierServiceOptions": [
 *       {
 *         "carrierId": "c8a08776-c095-4dec-8553-8f9698d86adc",
 *         "shippingOptions": [
 *           {
 *             "code": "ed5bbce2-9533-dff4-7db0-13702fd139c5",
 *             "title": "Standard US Shipping",
 *             "logistics": {
 *               "deliveryTime": ""
 *             },
 *             "cost": {
 *               "price": {
 *                 "amount": "10",
 *                 "convertedAmount": "10",
 *                 "formattedAmount": "$10.00",
 *                 "formattedConvertedAmount": "$10.00"
 *               },
 *               "otherCharges": []
 *             }
 *           }
 *         ]
 *       }
 *     ]
 *   },
 *   "buyerNote": "Please wrap it up as a present",
 *   "buyerInfo": {
 *     "email": "Janedoe@example.com",
 *     "memberId": "c43190d2-eea3-493e-b6e8-f146850c6873"
 *   },
 *   "conversionCurrency": "USD",
 *   "priceSummary": {
 *     "subtotal": {
 *       "amount": "115",
 *       "convertedAmount": "115",
 *       "formattedAmount": "$115.00",
 *       "formattedConvertedAmount": "$115.00"
 *     },
 *     "shipping": {
 *       "amount": "10",
 *       "convertedAmount": "10",
 *       "formattedAmount": "$10.00",
 *       "formattedConvertedAmount": "$10.00"
 *     },
 *     "tax": {
 *       "amount": "0",
 *       "convertedAmount": "0",
 *       "formattedAmount": "$0.00",
 *       "formattedConvertedAmount": "$0.00"
 *     },
 *     "discount": {
 *       "amount": "10",
 *       "convertedAmount": "10",
 *       "formattedAmount": "$10.00",
 *       "formattedConvertedAmount": "$10.00"
 *     },
 *     "total": {
 *       "amount": "115",
 *       "convertedAmount": "115",
 *       "formattedAmount": "$115.00",
 *       "formattedConvertedAmount": "$115.00"
 *     }
 *   },
 *   "calculationErrors": {
 *     "orderValidationErrors": []
 *   },
 *   "appliedDiscounts": [
 *     {
 *       "discountType": "GLOBAL",
 *       "lineItemIds": [],
 *       "coupon": {
 *         "_id": "fbb94b06-7447-4161-9c48-59bfcdc39e77",
 *         "code": "SUMMERSALE10",
 *         "amount": {
 *           "amount": "10",
 *           "convertedAmount": "10",
 *           "formattedAmount": "$10.00",
 *           "formattedConvertedAmount": "$10.00"
 *         },
 *         "name": "SUMMERSALE10",
 *         "couponType": "MoneyOff"
 *       }
 *     }
 *   ],
 *   "customFields": [
 *     {
 *       "value": "12345",
 *       "title": "Tax ID",
 *       "translatedTitle": "Tax ID"
 *     }
 *   ],
 *   "weightUnit": "KG",
 *   "currency": "USD",
 *   "channelType": "WEB",
 *   "siteLanguage": "en",
 *   "buyerLanguage": "en",
 *   "completed": false,
 *   "taxIncludedInPrice": false,
 *   "createdBy": {
 *     "memberId": "c43190d2-eea3-493e-b6e8-f146850c6873"
 *   },
 *   "_createdDate": "2022-07-18T13:25:22.141Z",
 *   "_updatedDate": "2022-07-18T13:25:22.141Z",
 *   "payNow": {
 *     "subtotal": {
 *       "amount": "115",
 *       "convertedAmount": "115",
 *       "formattedAmount": "$115.00",
 *       "formattedConvertedAmount": "$115.00"
 *     },
 *     "shipping": {
 *       "amount": "10",
 *       "convertedAmount": "10",
 *       "formattedAmount": "$10.00",
 *       "formattedConvertedAmount": "$10.00"
 *     },
 *     "tax": {
 *       "amount": "0",
 *       "convertedAmount": "0",
 *       "formattedAmount": "$0.00",
 *       "formattedConvertedAmount": "$0.00"
 *     },
 *     "discount": {
 *       "amount": "10",
 *       "convertedAmount": "10",
 *       "formattedAmount": "$10.00",
 *       "formattedConvertedAmount": "$10.00"
 *     },
 *     "total": {
 *       "amount": "115",
 *       "convertedAmount": "115",
 *       "formattedAmount": "$115.00",
 *       "formattedConvertedAmount": "$115.00"
 *     }
 *   },
 *   "payLater": {
 *     "subtotal": {
 *       "amount": "0",
 *       "convertedAmount": "0",
 *       "formattedAmount": "$0.00",
 *       "formattedConvertedAmount": "$0.00"
 *     },
 *     "shipping": {
 *       "amount": "0",
 *       "convertedAmount": "0",
 *       "formattedAmount": "$0.00",
 *       "formattedConvertedAmount": "$0.00"
 *     },
 *     "tax": {
 *       "amount": "0",
 *       "convertedAmount": "0",
 *       "formattedAmount": "$0.00",
 *       "formattedConvertedAmount": "$0.00"
 *     },
 *     "discount": {
 *       "amount": "0",
 *       "convertedAmount": "0",
 *       "formattedAmount": "$0.00",
 *       "formattedConvertedAmount": "$0.00"
 *     },
 *     "total": {
 *       "amount": "0",
 *       "convertedAmount": "0",
 *       "formattedAmount": "$0.00",
 *       "formattedConvertedAmount": "$0.00"
 *     }
 *   },
 *   "membershipOptions": {
 *     "eligibleMemberships": [],
 *     "invalidMemberships": [],
 *     "selectedMemberships": {
 *       "memberships": []
 *     }
 *   }
 * }
 *
 */
