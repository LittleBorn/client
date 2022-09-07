export interface IShopifyCardLineUpdateInput{
    id: string;
    attributes?: Array<{key: string; value: string;}>
    merchandiseId: string;
    quantity: number;
    sellingPlanId?: string;
}