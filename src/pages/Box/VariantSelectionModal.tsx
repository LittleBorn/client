import { IonButton, IonButtons, IonContent, IonHeader, IonImg, IonModal, IonText, IonTitle, IonToolbar } from "@ionic/react";
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
    backgroundColor: "#d8d8d8",
    padding: "1rem",
    borderRadius: "1rem"
}

const SelectedVariantStyle = {
    ...VariantStyle,
    backgroundColor: "#44C1AD"
}

const VariantSelectionModal: React.FC<ContainerProps> = ({ isOpen, setIsOpen, product }) => {

    const [selectedVariant, setSelectedVariant] = useState<IShopifyProductVariant | undefined>(product.node.variants.edges[0]);
    const [selectedAmount, setSelectedAmount] = useState(1)

    return (
        <IonModal isOpen={isOpen}>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonButton onClick={() => setIsOpen(false)}>Zurück</IonButton>
                    </IonButtons>
                    <IonTitle>{product.node.title}</IonTitle>
                    <IonButtons slot="end">
                        <IonButton strong={true} onClick={() => {
                            for (var i = 0; i < selectedAmount; i++) {
                                addItemToBasket(selectedVariant?.node.id);
                            }
                            setIsOpen(false)
                        }}>
                            Bestätigen
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">

                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100%", alignItems: "center", gap: "1rem" }}>

                    <IonText style={{ fontSize: "1.1em", fontWeight: "bold" }}>{product.node.title}</IonText>
                    <IonText style={{ fontSize: "1em" }}>Marke: {product.node.vendor}</IonText>

                    <IonImg style={{ height: "30%" }} src={product.node.variants.edges.find(variant => variant.node.id === selectedVariant?.node.id)?.node.image.url}></IonImg>

                    <div style={{display: "flex", gap: "1rem", width: "100%", justifyContent: "center", flexDirection: "column", alignItems: "center"}}>
                        <IonText style={{fontSize: "1.4em", fontWeight: "bold"}}>{selectedVariant?.node.priceV2.amount && Number(Number.parseFloat(selectedVariant?.node.priceV2.amount) * selectedAmount).toFixed(2)} €</IonText>
                        <IonText>Enthält: {selectedVariant?.node.weight}</IonText>
                        {/* <IonText>{ selectedVariant?.node.currentlyNotInStock ? `🟡 Zurzeit nicht verfügbar` : `🟢 Produkt auf Lager` }</IonText> */}
                        <IonText>{ !selectedVariant?.node.availableForSale ? `🟡 Zurzeit nicht verfügbar` : `🟢 Produkt auf Lager` }</IonText>
                    </div>

                    <IonText>Wählen Sie eine <b>Größe</b> aus</IonText>

                    <div style={{ display: "flex", gap: "1rem", width: "100%", flexWrap: "wrap", justifyContent: "center" }}>
                        {
                            product.node.variants.edges.map((variant: IShopifyProductVariant) => {
                                return <div
                                    key={variant.node.id}
                                    style={variant.node.id === selectedVariant?.node.id ? { ...SelectedVariantStyle } : { ...VariantStyle }}
                                    onClick={() => setSelectedVariant(variant)}
                                >
                                    <IonText key={variant.node.id}>{variant.node.title}</IonText>
                                </div>
                            })
                        }
                    </div>

                    <IonText>Wählen Sie die <b>Anzahl</b></IonText>

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
