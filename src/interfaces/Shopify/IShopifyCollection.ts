import { IShopifyProduct } from "../Shopify/IShopifyProduct";

export interface IShopifyCollection{
    "node": {
      "id": string;
      "title": string;
      "products": {
        "pageInfo": {
          "hasPreviousPage": string;
          "hasNextPage": string;
          "startCursor": string;
          "endCursor": string;
        }
        "edges": Array<IShopifyProduct>
      }
    }
  }