import { IonButton, IonButtons, IonContent, IonHeader, IonModal, IonText, IonTitle, IonToolbar } from "@ionic/react";
import { useState } from "react";
import Button from "../../components/Button";
import { IShopifyProduct } from "../../interfaces/Shopify/IShopifyProduct";
import { IShopifyProductVariant } from "../../interfaces/Shopify/IShopifyProductVariant";
import { addItemToBasket } from "../../stores/basketStore";

interface ContainerProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    product: IShopifyProduct;
}

const VariantStyle = {
    backgroundColor: "#44C1AD",
    padding: "1rem",
    borderRadius: "1rem",
}

const SelectedVariantStyle = {
    ...VariantStyle,
    backgroundColor: "#2d8576"
}

const VariantSelectionModal: React.FC<ContainerProps> = ({ isOpen, setIsOpen, product }) => {

    const [selectedVariant, setSelectedVariant] = useState<string | undefined>(product.node.variants.edges[0].node.id);
    const [selectedAmount, setSelectedAmount] = useState(1)

    return (
        <IonModal isOpen={isOpen}>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonButton onClick={() => setIsOpen(false)}>Cancel</IonButton>
                    </IonButtons>
                    <IonTitle>Varianten</IonTitle>
                    <IonButtons slot="end">
                        <IonButton strong={true} onClick={() => {
                            for (var i = 0; i < selectedAmount; i++) {
                                addItemToBasket(product.node.id);
                            }
                            setIsOpen(false)
                        }}>
                            Confirm
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">

                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100%", alignItems: "center", gap: "1rem" }}>

                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
                        {
                            product.node.variants.edges.map((variant: IShopifyProductVariant) => {
                                return <div
                                    key={variant.node.id}
                                    style={variant.node.id === selectedVariant ? { ...SelectedVariantStyle } : { ...VariantStyle }}
                                    onClick={() => setSelectedVariant(variant.node.id)}
                                >
                                    <IonText key={variant.node.id}>{variant.node.title}</IonText>
                                </div>
                            })
                        }
                    </div>

                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", gap: "1rem" }}>
                        <Button title="-" onClick={() => selectedAmount > 1 ? setSelectedAmount(selectedAmount - 1) : setSelectedAmount(selectedAmount)} />
                        <IonText>{selectedAmount}</IonText>
                        <Button title="+" onClick={() => setSelectedAmount(selectedAmount + 1)} />
                    </div>
                </div>


            </IonContent>
        </IonModal>
    );
};

export default VariantSelectionModal;
