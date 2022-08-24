import { IonImg, IonText } from "@ionic/react";
import { useEffect, useState } from "react";
import { IShopifyProduct } from "../../interfaces/Shopify/IShopifyProduct";
import { IShopifyProductVariant } from "../../interfaces/Shopify/IShopifyProductVariant";
import NonVariantSelectionModal from "./NonVariantSelectionModal";
import SizeSelectionModal from "./NonVariantSelectionModal";
import VariantSelectionModal from "./VariantSelectionModal";

interface ContainerProps {
    style?: any;
    product: IShopifyProduct;
    addToBasket: () => void;
    inBasket: boolean;
}

const CustomStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    gap: "0.1rem"
}

const CustomStyleInBasket = {
    ...CustomStyle,
    border: "2px solid #44C1AD55"
}

const amountSortFunction = (a: IShopifyProductVariant, b: IShopifyProductVariant) => {
    if (a.node.priceV2.amount < b.node.priceV2.amount) {
        return 1;
    } else if (a.node.priceV2.amount > b.node.priceV2.amount) {
        return -1;
    } else {
        return 0;
    }
}

const DefaultBoxItem: React.FC<ContainerProps> = ({ style, product, inBasket, addToBasket }) => {

    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <div className="container-item" style={inBasket ? { ...style, ...CustomStyleInBasket } : { ...style, ...CustomStyle }} onClick={() => setIsOpen(true)}>
                <IonImg style={{ marginBottom: "-1.5rem" }} src={product.node.featuredImage.url} alt={product.node.featuredImage.altText}></IonImg>
                <IonText style={{ fontSize: "0.8em", textTransform: "uppercase" }}>{product.node.vendor}</IonText>
                <IonText style={{ fontWeight: "bold", fontSize: "0.9em" }}>{product.node.title}</IonText>
                <IonText style={{ fontSize: "0.9rem", marginTop: "0.1rem" }}>Von {product.node.variants.edges.length > 0 && product.node.variants.edges.sort(amountSortFunction)[0].node.priceV2.amount} €</IonText>
                <IonText style={{ fontSize: "0.7rem", marginTop: "0.2rem" }}>{product.node.variants.edges.length > 0 && product.node.variants.edges.length} {product.node.variants.edges.length === 1 ? "Variante" : "Varianten"} verfügbar</IonText>
            </div>
            {product.node.variants.edges.length > 1 ?
                <VariantSelectionModal product={product} confirm={() => {
                    addToBasket();
                    setIsOpen(false);
                }} isOpen={isOpen} setIsOpen={setIsOpen} />
                :
                <NonVariantSelectionModal product={product} confirm={() => {
                    addToBasket();
                    setIsOpen(false);
                }} isOpen={isOpen} setIsOpen={setIsOpen} />
            }
        </>
    );
};

export default DefaultBoxItem;
