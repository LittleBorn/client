import { IShopifyCost } from "./IShopifyCost";
import { IShopifyProductVariant } from "./IShopifyProductVariant";

export interface IShopifyCardLine {
    id: string;
    quantity: number;
    // sellingPlanAllocation
    merchandise: IShopifyProductVariant;
    discountAllocations: {
        discountedAmount: {
            amount: number;
            currencyCode: string;
        }
    }
    cost: IShopifyCost;
    attributes: Array<{
        key: string,
        value: string
    }>;
}