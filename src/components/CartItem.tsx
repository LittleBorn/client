import { IonImg } from '@ionic/react';
import { useEffect, useState } from 'react';
import { IShopifyCardLineInput } from '../interfaces/Shopify/IShopifyCardLineInput';
import { IShopifyProductVariant } from '../interfaces/Shopify/IShopifyProductVariant';
import { sendStorefrontQuery } from '../utils/shopifyStorefrontHelper';

interface ContainerProps {
    cardLine: IShopifyCardLineInput,
    style?: {
        [key: string]: any;
    } | undefined,
    onClick?: () => void | undefined,
}


const CartItem: React.FC<ContainerProps> = ({ cardLine, style, onClick }) => {

    const [productVariant, setProductVariant] = useState<IShopifyProductVariant | undefined>(undefined);

    const fetchProductVariant = async () => {
        var data = JSON.stringify({
            query: `query {
            node(id: "${cardLine.merchandiseId}") {
              ... on ProductVariant {
                  id
                  title
                  compareAtPriceV2{
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
          }`,
            variables: {}
        });
        const productVariant = await sendStorefrontQuery<{ data: IShopifyProductVariant }>(data);
        setProductVariant(productVariant.data);
    }

    useEffect(() => {
        fetchProductVariant();
    }, [])

    const incrementCount = () => {
        console.log("Increment Count")
    }

    const decrementCount = () => {
        console.log("Decrement Count")
    }

    return (
        <div onClick={onClick} style={{ ...style, ...{ display: "flex", alignItems: "center", gap: "1rem", border: "1px solid lightgrey", width: "100%"}}}>
            {cardLine.merchandiseId}
            {productVariant ? productVariant.node.title : "Loading..."}
            <div>
                <IonImg src={productVariant?.node.image.url} alt={productVariant?.node.image.altText}></IonImg>
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem" }}>
                <div onClick={incrementCount} style={{ cursor: "pointer", padding: "1rem", border: "1px solid lightgrey", borderRadius: "5rem", width: "2rem", height: "2rem", display: "flex", alignItems: "center", justifyContent: "center" }}>-</div>
                <div>{cardLine.quantity}</div>
                <div onClick={decrementCount} style={{ cursor: "pointer", padding: "1rem", border: "1px solid lightgrey", borderRadius: "5rem", width: "2rem", height: "2rem", display: "flex", alignItems: "center", justifyContent: "center" }}>+</div>
            </div>
        </div>
    );
};

export default CartItem;
