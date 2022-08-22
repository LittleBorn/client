import { IonImg } from "@ionic/react";
import { useState } from "react";

interface ContainerProps {
    style?: any;
    product: any;
    addToBasket: () => void;
}

const DefaultBoxItem: React.FC<ContainerProps> = ({ style, product }) => {

    return (
        <div className="container-item" style={{ ...style}}>
            <IonImg src={product.node.featuredImage.url} alt={product.node.featuredImage.altText}></IonImg>
        </div>
    );
};

export default DefaultBoxItem;
