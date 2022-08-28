export interface IShopifyCard {
    "cart": {
        "buyerIdentity": {
            "customer": null | {
                id: string;
            }
        },
        "checkoutUrl": string;
        "cost": {
            "checkoutChargeAmount": {
                "amount": string;
                "currencyCode": string;
            },
            "subtotalAmount": {
                "amount": string;
                "currencyCode": string;
            },
            "subtotalAmountEstimated": boolean,
            "totalAmount": {
                "amount": string;
                "currencyCode": string;
            },
            "totalAmountEstimated": boolean,
            "totalDutyAmount": null | any,
            "totalDutyAmountEstimated": boolean,
            "totalTaxAmount": null | any,
            "totalTaxAmountEstimated": boolean
        },
        "createdAt": string,
        "discountAllocations": Array<any>;
        "discountCodes": Array<any>;
        "id": string;
        "note": string,
        "totalQuantity": number;
        "updatedAt": string;
    }
}