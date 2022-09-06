export interface IShopifyCost{
    amountPerQuantity: {
        amount: number;
        currencyCode: string;
    }
    compareAtAmountPerQuantity: {
        amount: number;
        currencyCode: string;
    }
    subtotalAmount: {
        amount: number;
        currencyCode: string;
    }
    totalAmount: {
        amount: number;
        currencyCode: string;
    }
}