import { IonToggleCustomEvent } from '@ionic/core';
import { IonImg, IonText, IonToggle, ToggleChangeEventDetail, useIonLoading, useIonToast } from '@ionic/react';
import { useEffect, useState } from 'react';
import { IShopifyCardLine } from '../interfaces/Shopify/IShopifyCardLine';
import { IShopifyCardLineInput } from '../interfaces/Shopify/IShopifyCardLineInput';
import { IShopifyProductVariant } from '../interfaces/Shopify/IShopifyProductVariant';
import { sendStorefrontQuery } from '../utils/shopifyStorefrontHelper';

interface ContainerProps {
    cartLine: IShopifyCardLine,
    style?: {
        [key: string]: any;
    } | undefined,
}


const CartItem: React.FC<ContainerProps> = ({ cartLine, style }) => {

    const [presentToast, dismissToast] = useIonToast();
    const [presentLoading, dismissLoading] = useIonLoading();

    const [productVariant, setProductVariant] = useState<IShopifyProductVariant | undefined>(undefined);
    const [subscribtionToggle, setSubscribtionToggle] = useState(false)

    const fetchProductVariant = async () => {
        setProductVariant(cartLine.merchandise)
    }

    useEffect(() => {
        fetchProductVariant();
        console.log(cartLine)
    }, [])

    const incrementCount = () => {
        console.log("Increment Count")
    }

    const decrementCount = () => {
        console.log("Decrement Count")
    }

    const subscribtionModeChanged = (checked: boolean) => {
        if (checked) {
            presentLoading("Aktiviere Abo", 2000)

        } else {
            presentLoading("Entferne Produkt aus Abo", 2000)

        }
    }

    return (
        <div style={{ ...style, ...{ display: "flex", alignItems: "center", gap: "1rem", width: "100%", justifyContent: "space-between" } }}>

            <div style={{ position: "relative" }}>
                <div style={{ backgroundColor: "#44C1AD", fontSize: "0.9em", borderRadius: "1rem", position: "absolute", top: "-8px", right: "-8px", width: "30%", display: "flex", alignItems: "center", justifyContent: "center", padding: "3px 1px 3px 1px", color: "white" }}>{cartLine.quantity}</div>
                <img style={{ width: "7rem", borderRadius: "1rem" }} src={productVariant?.image.url} alt={productVariant?.image.altText}></img>
            </div>

            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "0.4rem", textAlign: "center" }}>
                <IonText>Anzahl</IonText>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem" }}>
                    <div onClick={decrementCount} style={{ cursor: "pointer", padding: "1rem", border: "1px solid lightgrey", borderRadius: "5rem", width: "2rem", height: "2rem", display: "flex", alignItems: "center", justifyContent: "center" }}>-</div>
                    <div>{cartLine.quantity}</div>
                    <div onClick={incrementCount} style={{ cursor: "pointer", padding: "1rem", border: "1px solid lightgrey", borderRadius: "5rem", width: "2rem", height: "2rem", display: "flex", alignItems: "center", justifyContent: "center" }}>+</div>
                </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center"  }}>
                <IonText>{subscribtionToggle ? "In 30 Tagen wieder": "Nur einmal"}</IonText>
                <IonToggle checked={subscribtionToggle} onIonChange={(e) => {
                    setSubscribtionToggle(e.target.checked)
                    subscribtionModeChanged(e.target.checked)
                }} />
            </div>
        </div>
    );
};

export default CartItem;
