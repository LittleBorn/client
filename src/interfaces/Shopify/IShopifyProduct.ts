import { IShopifyOptions } from "./IShopifyOptions";
import { IShopifyPriceRange } from "./IShopifyPriceRange";
import { IShopifyProductVariant } from "./IShopifyProductVariant";
import { IShopifySeo } from "./IShopifySeo";

export interface IShopifyProduct {
    cursor: string;
    node: {
        title: string,
        id: string,
        options: Array<IShopifyOptions>;
        featuredImage: {
            id: string;
            url: string;
            altText: string;
            height: number;
        };
        availableForSale: boolean;
        description: string;
        descriptionHtml: string;
        handle: string;
        compareAtPriceRange: IShopifyPriceRange;
        variants: {
            edges: Array<{
                node: IShopifyProductVariant
            }>;
        }
        createdAt: string;
        onlineStoreUrl: string;
        requiresSellingPlan: boolean;
        seo: IShopifySeo;
        tags: Array<string>;
        totalInventory: Number;
        vendor: string;
    }
}