import { cart } from "ionicons/icons";
import { BehaviorSubject } from "rxjs";
import { IShopifyCard } from "../interfaces/Shopify/IShopifyCard";
import { IShopifyCardLineInput } from "../interfaces/Shopify/IShopifyCardLineInput";
import { IShopifyCardLineUpdateInput } from "../interfaces/Shopify/IShopifyCardLineUpdateInput";
import { sendStorefrontQuery } from "../utils/shopifyStorefrontHelper";
import { accessToken$ } from "./userStore";

// export const cart_id$ = new BehaviorSubject<string | undefined>(undefined);
export const cart$ = new BehaviorSubject<IShopifyCard | undefined>(undefined);

cart$.asObservable().subscribe(v => {
    console.log("New Value: ", v)
})

//////////////////////// SIMPLE FIRST TRY ///////////////////////

// export const cart_lines$ = new BehaviorSubject<Array<IShopifyCardLineInput>>([]);

// cart_lines$.asObservable().subscribe(v => console.log("New Value: ", v))

// export const addItemToCart = (line: IShopifyCardLineInput) => {
//     cart_lines$.next([...cart_lines$.getValue(), line]);
// }

// export const removeItemFromCart = (line: IShopifyCardLineInput) => {
//     cart_lines$.next(cart_lines$.getValue().filter(i => i !== line));
// }

///////////////////// END SIMPLE FIRST TRY /////////////////////

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
                },
                attributes: {
                    key: "channel",
                    value: "LittleBorn Application"
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
    if (result) {
        return result.data.cartCreate.cart.id
    } else {
        console.log("getCard fetch not successfull")
        return undefined
    }
}

/* Card Query */
const refreshCard = async (id: string) => {
    var data = JSON.stringify({
        query: `{
        cart(id: "${id}") {
            buyerIdentity{
                customer{
                    id
                }
            }
            lines(first: 10) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                  id
                  title
                  compareAtPriceV2 {
                      amount
                      currencyCode
                  }
                  barcode
                  availableForSale
                  currentlyNotInStock
                  image{
                      altText
                      height
                      id
                      url
                      width
                  }
                  priceV2{
                      amount
                      currencyCode
                  }
                  requiresShipping
                  weight
                  }
                }
                cost {
                  amountPerQuantity{
                      amount
                      currencyCode
                  }
                  compareAtAmountPerQuantity{
                      amount
                      currencyCode
                  }
                  subtotalAmount {
                      amount
                      currencyCode
                  }
                  totalAmount {
                      amount
                      currencyCode
                  }
                }
                attributes {
                  key
                  value
                }
              }
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

    const result = await sendStorefrontQuery<{ data: IShopifyCard }>(data);
    if (result) {
        cart$.next(result.data);
    } else {
        console.log("getCard fetch not successfull")
    }
}

/* Add Line to Cart */
export const cartLinesAdd = async (cartId: string, lines: IShopifyCardLineInput) => {
    console.log("Try to add: ", lines)
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
            "lines": {
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
    if (result) {
        refreshCard(result.data.cartLinesAdd.cart.id)
    } else {
        console.log("getCard fetch not successfull")
    }
}

export const cartLinesUpdate = async (cartId: string, lines: IShopifyCardLineUpdateInput) => {
    var data = JSON.stringify({
        query: `mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
        cartLinesUpdate(cartId: $cartId, lines: $lines) {
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
            "lines": {
                "id": lines.id,
                "merchandiseId": lines.merchandiseId,
                "quantity": lines.quantity,
                "sellingPlanId": lines.sellingPlanId
            }
        }
    });
    const result = await sendStorefrontQuery<{
        "data": {
            "cartLinesUpdate": {
                "cart": {
                    "id": string;
                },
                "userErrors": Array<string>;
            }
        }
    }>(data);
    if (result) {
        refreshCard(result.data.cartLinesUpdate.cart.id)
    } else {
        console.log("getCard fetch not successfull")
    }
}