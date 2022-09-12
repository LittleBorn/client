import { IonText, useIonLoading, useIonToast } from '@ionic/react';
import { useEffect, useState } from 'react';
import Button from '../../components/Button';
import CartItem from '../../components/CartItem';
import MainTemplate from '../../components/MainTemplate';
import { IPagePros } from '../../interfaces/IPageProps';
import { IShopifyCard } from '../../interfaces/Shopify/IShopifyCard';
import { cart$ } from '../../stores/cartStore';
import BrowserWindow from '../../components/BrowserWindow';

const BoxOverview: React.FC<IPagePros> = ({ props }: IPagePros) => {

  const [presentToast, dismissToast] = useIonToast();
  const [presentLoading, dismissLoading] = useIonLoading();
  // const [checkOutURL, setCheckOutURL] = useState<undefined | string>(undefined)

  useEffect(() => {
    // set basket state with observable
    cart$.asObservable().subscribe(v => {
      setCart(v)
    })
  }, [])

  const [cart, setCart] = useState<IShopifyCard | undefined>(undefined)

  return (
    <MainTemplate title='Deine Box 🎁'>
      <div style={{ display: "flex", flexDirection: "column", height: "100vh", padding: "1rem", gap: "1.5rem" }}>

        <IonText style={{ justifySelf: "center", alignSelf: "center", textAlign: "center" }}>
          Wir haben alle Produkte nach dem durchschnittlichen Verbrauch auf eine Monatsbox hochgerechnet. Passe diese aber gerne auch an.
        </IonText>

        <IonText style={{ fontSize: "1.2em", fontWeight: "bold" }}>
          Menge {`&`} unverbindliches Abo
        </IonText>

        <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: "1rem", justifyContent: "center" }}>

          {
            cart && cart.cart.lines.edges.length > 0 ? cart.cart.lines.edges.map((cartLine, index) => {
              return (
                <CartItem key={`${cartLine.node.id}-${index}`} cartLine={cartLine.node} />
              );
            }) :
              <div>
                Sie haben keine Artikel im Warenkorb
              </div>
          }

        </div>
      </div>

      {/* Weiter / Zurück Buttons */}
      <div style={{ position: "fixed", width: "100%", bottom: "1rem", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
        <Button onClick={() => {
          const checkoutUrl = cart$.getValue()?.cart.checkoutUrl;
          if (checkoutUrl) {
            props.history.push("/BoxCheckout", { url: checkoutUrl });
          } else {
            presentToast("Aktuell ist kein Warenkorb angelegt", 2000)
          }
        }} title={`Zur Kasse`} style={{ width: "80%", borderRadius: "5rem" }} />
        <IonText onClick={() => props.history.push("/BoxMainPage")} style={{ cursor: "pointer", padding: "0.5rem 1rem 1rem 1rem", width: "50%", textAlign: "center" }} color={"primary"}>
          zurück
        </IonText>
      </div>

      {/* <Button title='DEBUG' onClick={() => {
        setCheckOutURL("https://facebook.com")
      }}></Button>
      {
        checkOutURL && <BrowserWindow url={checkOutURL} close={() => setCheckOutURL(undefined)} />
      } */}

    </MainTemplate>
  );
};

export default BoxOverview;
