import { IonButton, IonButtons, IonContent, IonHeader, IonModal, IonTitle, IonToolbar } from "@ionic/react";
import { useState } from "react";
import { IShopifyProduct } from "../../interfaces/Shopify/IShopifyProduct";

interface ContainerProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    confirm: () => void;
    product: IShopifyProduct;
}


const NonVariantSelectionModal: React.FC<ContainerProps> = ({isOpen, setIsOpen, confirm, product }) => {

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
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni illum quidem recusandae ducimus quos
                    reprehenderit. Veniam, molestias quos, dolorum consequuntur nisi deserunt omnis id illo sit cum qui.
                    Eaque, dicta.
                </p>
            </IonContent>
        </IonModal>
    );
};

export default NonVariantSelectionModal;
