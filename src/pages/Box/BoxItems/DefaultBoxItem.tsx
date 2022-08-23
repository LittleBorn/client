import { IonImg } from "@ionic/react";
import { useEffect, useState } from "react";

interface ContainerProps {
    style?: any;
    product: any;
    addToBasket: () => void;
    inBasket: boolean;
}



const DefaultBoxItem: React.FC<ContainerProps> = ({ style, product, inBasket, addToBasket }) => {

    return (
        <div className="container-item" style={inBasket ? {...style, border: "2px solid #44C1AD55"} : { ...style}} onClick={() => addToBasket()}>
            <IonImg src={product.node.featuredImage.url} alt={product.node.featuredImage.altText}></IonImg>
        </div>
    );
};

export default DefaultBoxItem;
