export interface IShopifyPriceRange{
    maxVariantPrice: {
        amount: string;
        currencyCode: string;
    };
    minVariantPrice: {
        amount: string;
        currencyCode: string;
    };
}