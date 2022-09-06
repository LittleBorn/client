import { IonImg, IonText } from "@ionic/react";
import { useEffect, useState } from "react";
import { IShopifyProduct } from "../../interfaces/Shopify/IShopifyProduct";
import { IShopifyProductVariant } from "../../interfaces/Shopify/IShopifyProductVariant";
import VariantSelectionModal from "./VariantSelectionModal";

interface ContainerProps {
    style?: any;
    product: IShopifyProduct;
}

const CustomStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    textAlign: "center",
    paddingBottom: "1rem",
    gap: "0.2rem",
    borderRadius: "1rem"
}

const amountSortFunction = (a: {node: IShopifyProductVariant}, b: {node: IShopifyProductVariant}) => {
    if (a.node.priceV2.amount < b.node.priceV2.amount) {
        return 1;
    } else if (a.node.priceV2.amount > b.node.priceV2.amount) {
        return -1;
    } else {
        return 0;
    }
}

const DefaultBoxItem: React.FC<ContainerProps> = ({ style, product }) => {

    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <div className="container-item" style={{...style, ...CustomStyle}} onClick={() => setIsOpen(true)}>
                <img style={{ borderRadius: "1rem" }} src={product.node.featuredImage.url} alt={product.node.featuredImage.altText}></img>
                <IonText style={{ fontSize: "0.8em", textTransform: "uppercase", marginTop: "0.3rem" }}>{product.node.vendor}</IonText>
                <IonText style={{ fontWeight: "bold", fontSize: "0.9em" }}>{product.node.title}</IonText>
                <IonText style={{ fontSize: "0.9rem" }}>Von {product.node.variants.edges.length > 0 && product.node.variants.edges.sort(amountSortFunction)[0].node.priceV2.amount} €</IonText>
                <IonText style={{ fontSize: "0.7rem" }}>{product.node.variants.edges.length > 0 && product.node.variants.edges.length} {product.node.variants.edges.length === 1 ? "Variante" : "Varianten"} verfügbar</IonText>
            </div>
            <VariantSelectionModal product={product} isOpen={isOpen} setIsOpen={setIsOpen} />
        </>
    );
};

export default DefaultBoxItem;
