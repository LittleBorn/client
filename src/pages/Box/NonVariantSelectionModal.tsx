import { IonButton, IonButtons, IonContent, IonHeader, IonModal, IonText, IonTitle, IonToolbar } from "@ionic/react";
import { useState } from "react";
import Button from "../../components/Button";
import { IShopifyProduct } from "../../interfaces/Shopify/IShopifyProduct";
import { addItemToBasket } from "../../stores/basketStore";
import { addItemToCart } from "../../stores/cartStore";

interface ContainerProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  product: IShopifyProduct;
}


const NonVariantSelectionModal: React.FC<ContainerProps> = ({ isOpen, setIsOpen, product }) => {

  const [selectedAmount, setSelectedAmount] = useState(1)

  return (
    <IonModal isOpen={isOpen}>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={() => setIsOpen(false)}>Cancel</IonButton>
          </IonButtons>
          <IonTitle>Anzahl</IonTitle>
          <IonButtons slot="end">
            <IonButton strong={true} onClick={() => {
              addItemToCart({
                merchandiseId: product.node.variants.edges[0].node.id,
                quantity: selectedAmount
              });
              setIsOpen(false)
            }}>
              Confirm
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100%", alignItems: "center", gap: "1rem" }}>
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

export default NonVariantSelectionModal;
