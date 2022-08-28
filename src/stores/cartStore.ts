import { BehaviorSubject } from "rxjs";
import { IShopifyCard } from "../interfaces/Shopify/IShopifyCard";
import { IShopifyCardLineInput } from "../interfaces/Shopify/IShopifyCardLineInput";
import { sendStorefrontQuery } from "../utils/shopifyStorefrontHelper";
import { accessToken$ } from "./userStore";

export const cart$ = new BehaviorSubject<IShopifyCard | undefined>(undefined);

cart$.asObservable().subscribe(v => console.log("New Value: ", v))

/* Card Query */
const refreshCard = async (id: string) => {
    var data = JSON.stringify({
        query: `{
        cart(id: "gid://shopify/Cart/35e1137732d161a3b603e7c29053e12a") {
            buyerIdentity{
                customer{
                    id
                }
            }
            checkoutUrl
            cost {
                  checkoutChargeAmount{
                      amount
                      currencyCode
                  }
                  subtotalAmount{
                      amount
                      currencyCode
                  }
                  subtotalAmountEstimated
                  totalAmount{
                      amount
                      currencyCode
                  }
                  totalAmountEstimated
                  totalDutyAmount{
                      amount
                      currencyCode
                  }
                  totalDutyAmountEstimated
                  totalTaxAmount{
                      amount
                      currencyCode
                  }
                  totalTaxAmountEstimated
            }
            createdAt
            discountAllocations{
                discountedAmount{
                    amount
                    currencyCode
                }
            }
            discountCodes{
                applicable
                code
            }
            id,
            note,
            totalQuantity
            updatedAt
          
        }
      }`,
        variables: {}
      });
    const result = await sendStorefrontQuery<{data: IShopifyCard}>(data);
    if(result){
        cart$.next(result.data);
    }else{
        console.log("getCard fetch not successfull")
    }
} 

/* Card Mutations */
const cartCreate = async () => {
    var data = JSON.stringify({
        query: `mutation cartCreate {
        cartCreate {
          cart {
            id
          }
          userErrors {
            field
            message
          }
        }
      }`,
        variables: {
            "input": {
                "buyerIdentity": { "customerAccessToken": accessToken$.getValue()?.accessToken }
            }
        }
    });
    const result = await sendStorefrontQuery<{
        "data": {
            "cartCreate": {
                "cart": {
                    "id": string;
                },
                "userErrors": Array<string>;
            }
        }
    }>(data);
    if(result){
        refreshCard(result.data.cartCreate.cart.id)
    }else{
        console.log("getCard fetch not successfull")
    }
}

const cartLinesAdd = async (cardId: string, lines: IShopifyCardLineInput) => {
    var data = JSON.stringify({
        query: `mutation cartLinesAdd($cartId: , $lines: ) {
        cartLinesAdd(cartId: $cartId, lines: $lines) {
          cart {
            id
          }
          userErrors {
            field
            message
          }
        }
      }`,
        variables: {"cartId":"","lines":{"attributes":[{"key":"","value":""}],"merchandiseId":"","quantity":1,"sellingPlanId":""}}
      });
      const result = await sendStorefrontQuery<{
        "data": {
            "cartLinesAdd": {
                "cart": {
                    "id": string;
                },
                "userErrors": Array<string>;
            }
        }
    }>(data);
    if(result){
        refreshCard(result.data.cartLinesAdd.cart.id)
    }else{
        console.log("getCard fetch not successfull")
    }
}