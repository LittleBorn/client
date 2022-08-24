import { IShopifyProduct } from "../Shopify/IShopifyProduct";

export interface IShopifyCollection{
    "node": {
      "id": string;
      "title": string;
      "products": {
        "edges": Array<IShopifyProduct>
      }
    }
  }