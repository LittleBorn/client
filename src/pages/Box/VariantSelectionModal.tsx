import { IonButton, IonButtons, IonContent, IonHeader, IonModal, IonText, IonTitle, IonToolbar } from "@ionic/react";
import { useState } from "react";
import { IShopifyProduct } from "../../interfaces/Shopify/IShopifyProduct";
import { IShopifyProductVariant } from "../../interfaces/Shopify/IShopifyProductVariant";

interface ContainerProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    confirm: () => void;
    product: IShopifyProduct;
}


const VariantSelectionModal: React.FC<ContainerProps> = ({ isOpen, setIsOpen, confirm, product }) => {

    return (
        <IonModal isOpen={isOpen}>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonButton onClick={() => setIsOpen(false)}>Cancel</IonButton>
                    </IonButtons>
                    <IonTitle>Welcome</IonTitle>
                    <IonButtons slot="end">
                        <IonButton strong={true} onClick={() => confirm()}>
                            Confirm
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                {
                    product.node.variants.edges.map((variant: IShopifyProductVariant) => {
                        return <IonText key={variant.node.id}>{variant.node.title}</IonText>
                    })
                }
            </IonContent>
        </IonModal>
    );
};

export default VariantSelectionModal;
