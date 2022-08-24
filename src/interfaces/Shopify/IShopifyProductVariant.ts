import { IShopifyImage } from "./IShopifyImage";

export interface IShopifyProductVariant{
    node: {
        id: string;
        title: string;
        compareAtPriceV2: {
            amount: string;
            currencyCode: string;
        }
        barcode: string;
        availableForSale: string;
        currentlyNotInStock: string;
        image: IShopifyImage;
        priceV2: {
            amount: string;
            currencyCode: string;
        }
        requiresShipping: boolean;
        weight: number;
    }
}