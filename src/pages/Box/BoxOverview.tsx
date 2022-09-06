import { IonText, useIonLoading, useIonToast } from '@ionic/react';
import { useEffect, useState } from 'react';
import Button from '../../components/Button';
import CartItem from '../../components/CartItem';
import MainTemplate from '../../components/MainTemplate';
import { IPagePros } from '../../interfaces/IPageProps';
import { IShopifyCard } from '../../interfaces/Shopify/IShopifyCard';
import { IShopifyCardLine } from '../../interfaces/Shopify/IShopifyCardLine';
import { IShopifyCardLineInput } from '../../interfaces/Shopify/IShopifyCardLineInput';
import { basket$ } from '../../stores/basketStore';
import { cart$, cartCreate, cartLinesAdd } from '../../stores/cartStore';
import { sendStorefrontQuery } from '../../utils/shopifyStorefrontHelper';

const BoxOverview: React.FC<IPagePros> = ({ props }: IPagePros) => {

  const [presentToast, dismissToast] = useIonToast();
  const [presentLoading, dismissLoading] = useIonLoading();

  useEffect(() => {
    // set basket state with observable
    cart$.asObservable().subscribe(v => {
      setCart(v)
    })
  }, [])

  const [cart, setCart] = useState<IShopifyCard | undefined>(undefined)

  const fetchBasket = async () => {

    presentLoading(undefined, 1000)

    let data = ""

    const collectionResult = await sendStorefrontQuery<any>(data);
    if (typeof collectionResult?.data === "undefined") {
      // error fetching items
      dismissLoading()
      presentToast("Error occured while fetching Products", 2000)
    } else {
      if (true) {
        // set state
        dismissLoading();
      } else {
        // or the segment was not found
        dismissLoading();
        presentToast("Segment was not found", 2000)
      }
    }
  }


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
              presentLoading(undefined, 5000);
            setTimeout(() => {
              dismissLoading();
              window.location.replace(`${checkoutUrl}`)
            }, 3000)
          } else {
            presentToast("Aktuell ist kein Warenkorb angelegt", 2000)
          }
          // const cartId = await cartCreate();
          // if(cartId){
          //   cart?.cart.lines.edges.forEach(cartLine => {
          //     cartLinesAdd(cartId, cartLine);
          //   })
          // if(checkoutUrl){
          //   console.log(checkoutUrl)
          //   presentLoading(undefined, 5000);
          //   setTimeout(() => {
          //     dismissLoading();
          //     // console.log("Eigentlich wird hier umgeleitet")
          //     window.location.replace(`${checkoutUrl}`)
          //   }, 3000)

          // }else{
          //   presentToast("Es konnte keine Umleitung erfolgen!", 2000)
          // }
          // }else{
          //   presentToast("Ein Problem trat beim Anlegen auf!", 2000)
          // }
        }} title={`Zur Kasse`} style={{ width: "80%", borderRadius: "5rem" }} />
        <IonText onClick={() => props.history.push("/BoxMainPage")} style={{ cursor: "pointer", padding: "0.5rem 1rem 1rem 1rem", width: "50%", textAlign: "center" }} color={"primary"}>
          zurück
        </IonText>
      </div>
    </MainTemplate>
  );
};

export default BoxOverview;
