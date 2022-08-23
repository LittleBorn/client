import { IonImg } from "@ionic/react";
import { useEffect, useState } from "react";
import SizeSelectionModal from "../SizeSelectionModal";

interface ContainerProps {
    style?: any;
    product: any;
    addToBasket: () => void;
    inBasket: boolean;
}

const DefaultBoxItem: React.FC<ContainerProps> = ({ style, product, inBasket, addToBasket }) => {

    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <div className="container-item" style={inBasket ? { ...style, border: "2px solid #44C1AD55" } : { ...style }} onClick={() => setIsOpen(true)}>
                <IonImg src={product.node.featuredImage.url} alt={product.node.featuredImage.altText}></IonImg>
            </div>
            {/* hier muss das selection modal hinzugefügt werden todo */}
        </>
    );
};

export default DefaultBoxItem;
