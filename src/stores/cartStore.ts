import { cart } from "ionicons/icons";
import { BehaviorSubject } from "rxjs";
import { IShopifyCardLineInput } from "../interfaces/Shopify/IShopifyCardLineInput";
import { sendStorefrontQuery } from "../utils/shopifyStorefrontHelper";
import { accessToken$ } from "./userStore";

export const cart_lines$ = new BehaviorSubject<Array<IShopifyCardLineInput>>([]);

cart_lines$.asObservable().subscribe(v => console.log("New Value: ", v))

export const addItemToCart = (line: IShopifyCardLineInput) => {
    cart_lines$.next([...cart_lines$.getValue(), line]);
}

export const removeItemFromCart = (line: IShopifyCardLineInput) => {
    cart_lines$.next(cart_lines$.getValue().filter(i => i !== line));
}

/* Card Mutations */
export const cartCreate = async () => {
    var data = JSON.stringify({
        query: `mutation cartCreate {
        cartCreate {
          cart {
            id
            checkoutUrl
          }
          userErrors {
            field
            message
          }
        }
      }`,
        variables: {
            "input": {
                "buyerIdentity": { 
                    "customerAccessToken": accessToken$.getValue()?.accessToken 
                }
            }
        }
    });
    const result = await sendStorefrontQuery<{
        "data": {
            "cartCreate": {
                "cart": {
                    "id": string;
                    "checkoutUrl": string;
                },
                "userErrors": Array<string>;
            }
        }
    }>(data);
    if(result){
        return [result.data.cartCreate.cart.id, result.data.cartCreate.cart.checkoutUrl]
    }else{
        console.log("getCard fetch not successfull")
        return []
    }
}

// /* Card Query */
// const refreshCard = async (id: string) => {
//     var data = JSON.stringify({
//         query: `{
//         cart(id: "${id}) {
//             buyerIdentity{
//                 customer{
//                     id
//                 }
//             }
//             checkoutUrl
//             cost {
//                   checkoutChargeAmount{
//                       amount
//                       currencyCode
//                   }
//                   subtotalAmount{
//                       amount
//                       currencyCode
//                   }
//                   subtotalAmountEstimated
//                   totalAmount{
//                       amount
//                       currencyCode
//                   }
//                   totalAmountEstimated
//                   totalDutyAmount{
//                       amount
//                       currencyCode
//                   }
//                   totalDutyAmountEstimated
//                   totalTaxAmount{
//                       amount
//                       currencyCode
//                   }
//                   totalTaxAmountEstimated
//             }
//             createdAt
//             discountAllocations{
//                 discountedAmount{
//                     amount
//                     currencyCode
//                 }
//             }
//             discountCodes{
//                 applicable
//                 code
//             }
//             id,
//             note,
//             totalQuantity
//             updatedAt
          
//         }
//       }`,
//         variables: {}
//       });
//     const result = await sendStorefrontQuery<{data: IShopifyCard}>(data);
//     if(result){
//         cart$.next(result.data);
//     }else{
//         console.log("getCard fetch not successfull")
//     }
// } 


export const cartLinesAdd = async (cartId: string, lines: IShopifyCardLineInput) => {
    var data = JSON.stringify({
        query: `mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
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
        variables: {
            "cartId": cartId,
            "lines":{
                "merchandiseId": lines.merchandiseId,
                "quantity": lines.quantity,
            }
        }
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
        console.log("Add Line Result: ", result.data)
    }else{
        console.log("getCard fetch not successfull")
    }
}