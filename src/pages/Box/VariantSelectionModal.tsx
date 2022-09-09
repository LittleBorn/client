import { IonButton, IonButtons, IonContent, IonHeader, IonImg, IonModal, IonText, IonTitle, IonToolbar, useIonLoading, useIonToast } from "@ionic/react";
import { useEffect, useState } from "react";
import Button from "../../components/Button";
import { IShopifyProduct } from "../../interfaces/Shopify/IShopifyProduct";
import { IShopifyProductVariant } from "../../interfaces/Shopify/IShopifyProductVariant";
import { addItemToBasket } from "../../stores/basketStore";
import { cart$, cartCreate, cartLinesAdd } from "../../stores/cartStore";

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

    const [presentLoading, dismissLoading] = useIonLoading();
    const [presentToast, dismissToast] = useIonToast();

    const [selectedVariant, setSelectedVariant] = useState<IShopifyProductVariant | undefined>(product.node.variants.edges[0].node);
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
                        <IonButton strong={true} onClick={async () => {
                            if (selectedVariant && selectedAmount > selectedVariant?.quantityAvailable) {
                                presentToast("Die Ausgewählte Anzahl überschreitet die verfügbare Menge", 1500)
                                setSelectedAmount(selectedVariant?.quantityAvailable)
                                return
                            }
                            if (!selectedVariant?.availableForSale) {
                                presentToast("Der Artikel ist momentan leider nicht verfügbar!", 1500)
                                return
                            }
                            presentLoading("Hinzufügen zum Einkaufswagen", 1000)
                            if (selectedVariant) {

                                // if this is the first item in cart -> create cart first
                                let cart_id = cart$.getValue()?.cart.id;
                                if (typeof cart_id === "undefined") {
                                    dismissLoading()
                                    presentLoading("Einkaufswagen erstellen", 1000)
                                    cart_id = await cartCreate();
                                    if (typeof cart_id === "undefined") {
                                        presentToast("Problem trat auf beim anlegen des Warenkorbs");
                                        return
                                    }
                                }

                                dismissLoading()
                                presentLoading("Füge Artikel hinzu...", 1000)
                                await cartLinesAdd(cart_id, {
                                    merchandiseId: selectedVariant.id,
                                    quantity: selectedAmount
                                });
                                dismissLoading()
                                setSelectedAmount(1)
                            }
                            setIsOpen(false)

                        }}>
                            Bestätigen
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding" style={{ overflowY: "hidden" }}>

                <div style={{ display: "flex", flexDirection: "column", height: "100%", alignItems: "center", gap: "1rem", overflowY: "scroll", padding: "1rem" }}>

                    {/* Infos */}
                    <IonText style={{ fontSize: "1.1em", fontWeight: "bold" }}>{product.node.title}</IonText>
                    <IonText style={{ fontSize: "1em" }}>Marke: {product.node.vendor}</IonText>
                    <IonImg style={{ height: "30%" }} src={product.node.variants.edges.find(variant => variant.node.id === selectedVariant?.id)?.node.image.url}></IonImg>

                    {/* Preis */}
                    <div style={{ display: "flex", gap: "1rem", width: "100%", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
                        <IonText style={{ fontSize: "1.4em", fontWeight: "bold" }}>{selectedVariant?.priceV2.amount && Number(Number.parseFloat(selectedVariant?.priceV2.amount) * selectedAmount).toFixed(2)} €</IonText>
                        {/* <IonText style={{ color: "#838383" }}>Enthält: {selectedVariant?.weight}</IonText> */}
                        <IonText style={{ color: "#838383" }}>Aktuell Auf Lager: {selectedVariant?.quantityAvailable}</IonText>
                        {/* <IonText>{ selectedVariant?.currentlyNotInStock ? `🟡 Zurzeit nicht verfügbar` : `🟢 Produkt auf Lager` }</IonText> */}
                        <IonText style={{ color: "#838383" }}>{!selectedVariant?.availableForSale ? `🟡 Zurzeit nicht verfügbar` : `🟢 Produkt auf Lager`}</IonText>
                    </div>

                    {/* Variant */}
                    {product.node.variants.edges.length > 1 &&
                        <>
                            <IonText>Wählen Sie eine <b>Größe</b> aus</IonText>
                            <div style={{ display: "flex", gap: "1rem", width: "100%", flexWrap: "wrap", justifyContent: "center" }}>
                                {
                                    product.node.variants.edges.map((variant: { node: IShopifyProductVariant }) => {
                                        return <div
                                            key={variant.node.id}
                                            style={variant.node.id === selectedVariant?.id ? { ...SelectedVariantStyle } : { ...VariantStyle }}
                                            onClick={() => setSelectedVariant(variant.node)}
                                        >
                                            <IonText key={variant.node.id}>{variant.node.title}</IonText>
                                        </div>
                                    })
                                }
                            </div>
                        </>
                    }

                    {/* Anzahl */}
                    <IonText>Wählen Sie die <b>Anzahl</b></IonText>
                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", gap: "1rem" }}>
                        <Button title="-" onClick={() => selectedAmount > 1 ? setSelectedAmount(selectedAmount - 1) : setSelectedAmount(selectedAmount)} />
                        <IonText>{selectedAmount}</IonText>
                        <Button title="+" onClick={() => setSelectedAmount(selectedAmount + 1)} />
                    </div>

                    {/* Beschreibung */}
                    <div dangerouslySetInnerHTML={{ __html: product?.node.descriptionHtml }} style={{ display: "flex", gap: "1rem", width: "100%", flexDirection: "column", marginTop: "1rem", color: "#838383" }}></div>

                    {/* Details */}
                    {/* todo */}

                </div>


            </IonContent>
        </IonModal>
    );
};

export default VariantSelectionModal;
