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

const VariantSelectionModal: React.FC<ContainerProps> = ({ isOpen, setIsOpen, product }) => {

    const [selectedVariant, setSelectedVariant] = useState(undefined);
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
                        <IonButton strong={true} onClick={() => { addItemToBasket(product.node.id); setIsOpen(false) }}>
                            Confirm
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <div>
                    {
                        product.node.variants.edges.map((variant: IShopifyProductVariant) => {
                            return <IonText key={variant.node.id}>{variant.node.title}</IonText>
                        })
                    }
                </div>

                <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", gap: "1rem" }}>
                    <Button title="-" onClick={() => selectedAmount > 1 ? setSelectedAmount(selectedAmount - 1) : setSelectedAmount(selectedAmount)} />
                    <IonText>{selectedAmount}</IonText>
                    <Button title="+" onClick={() => setSelectedAmount(selectedAmount + 1)} />
                </div>

            </IonContent>
        </IonModal>
    );
};

export default VariantSelectionModal;
