export interface IShopifyCardLineInput{
    attributes?: Array<{key: string; value: string;}>
    merchandiseId: string;
    quantity: number;
    sellingPlanId?: string;
}