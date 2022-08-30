import { IonText, useIonLoading, useIonToast } from '@ionic/react';
import { useEffect, useState } from 'react';
import Button from '../../components/Button';
import CartItem from '../../components/CartItem';
import MainTemplate from '../../components/MainTemplate';
import { IPagePros } from '../../interfaces/IPageProps';
import { IShopifyCardLineInput } from '../../interfaces/Shopify/IShopifyCardLineInput';
import { basket$ } from '../../stores/basketStore';
import { cartCreate, cartLinesAdd, cart_lines$ } from '../../stores/cartStore';
import { sendStorefrontQuery } from '../../utils/shopifyStorefrontHelper';

const BoxOverview: React.FC<IPagePros> = ({ props }: IPagePros) => {

  const [presentToast, dismissToast] = useIonToast();
  const [presentLoading, dismissLoading] = useIonLoading();

  useEffect(() => {
    // set basket state with observable
    cart_lines$.asObservable().subscribe(v => setCartLines(v))
  }, [])

  const [cartLines, setCartLines] = useState<IShopifyCardLineInput[]>([])

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
      <div style={{ display: "flex", flexDirection: "column", height: "100vh", padding: "1rem", gap: "0.5rem" }}>

        <IonText style={{justifySelf: "center", alignSelf: "center", textAlign: "center"}}>
          Wir haben alle Produkte nach dem durchschnittlichen Verbrauch auf eine Monatsbox hochgerechnet. Passe diese aber gerne auch an. 
        </IonText>

        <IonText style={{fontSize: "1.2em", fontWeight: "bold"}}>
          Menge {`&`} unverbindliches Abo
        </IonText>

        <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: "0.5rem", justifyContent: "center" }}>

          {
            cartLines && cartLines.length > 0 && cartLines.map((cartItem, index) => {
              return (
                <CartItem key={`${cartItem.merchandiseId}-${index}`} cardLine={cartItem}/>
              );
            })
          }

        </div>
      </div>

      {/* Weiter / Zurück Buttons */}
      <div style={{ position: "fixed", width: "100%", bottom: "2rem", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
        <Button onClick={async () => {
          const [cartId, checkoutUrl] = await cartCreate();
          if(cartId){
            cartLines.forEach(cartLine => {
              cartLinesAdd(cartId, cartLine);
            })
            if(checkoutUrl){
              console.log(checkoutUrl)
              setTimeout(() => window.location.replace(`${checkoutUrl}`), 3000)
              
            }else{
              presentToast("Es konnte keine Umleitung erfolgen!", 2000)
            }
          }else{
            presentToast("Ein Problem trat beim Anlegen auf!", 2000)
          }
         }} title={`Zur Kasse`} style={{ width: "80%", borderRadius: "5rem" }} />
      </div>

    </MainTemplate>
  );
};

export default BoxOverview;
