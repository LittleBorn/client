import { IonImg } from "@ionic/react";
import { useState } from "react";

interface ContainerProps {
    style?: any;
    product: any;
}

const DefaultBoxItem: React.FC<ContainerProps> = ({ style, product }) => {

    return (
        <div style={{ ...style, width: "45%" }}>
            <IonImg src={product.node.featuredImage.url} alt={product.node.featuredImage.altText}></IonImg>
        </div>
    );
};

export default DefaultBoxItem;
