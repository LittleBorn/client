import { IonText, useIonLoading, useIonToast } from '@ionic/react';
import { useEffect, useState } from 'react';
import Button from '../../components/Button';
import MainTemplate from '../../components/MainTemplate';
import { IPagePros } from '../../interfaces/IPageProps';
import { basket$ } from '../../stores/basketStore';
import { sendStorefrontQuery } from '../../utils/shopifyStorefrontHelper';


const BoxOverview: React.FC<IPagePros> = ({ props }: IPagePros) => {

  const [presentToast, dismissToast] = useIonToast();
  const [presentLoading, dismissLoading] = useIonLoading();

  useEffect(() => {
    // set basket state with observable
    basket$.asObservable().subscribe(v => setBasket(v))
  }, [])

  const [basket, setBasket] = useState<string[]>([])

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
          Wir haben alle Produkte nach dem durschnittlichen Verbrauch auf eine Monatsbox hochgerechnet. Passe diese aber gerne auch an. 
        </IonText>

        <IonText style={{fontSize: "1.2em", fontWeight: "bold"}}>
          Menge {`&`} unverbindliches Abo
        </IonText>

        <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: "0.5rem", justifyContent: "center" }}>

          {
            basket && basket.length > 0 && basket.map((basketItem, index) => {
              return (<div key={`${basketItem}-${index}`}>
                {basketItem}
              </div>);
            })
          }

        </div>
      </div>

      {/* Weiter / Zurück Buttons */}
      <div style={{ position: "fixed", width: "100%", bottom: "2rem", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
        <Button onClick={() => { }} title={`Zur Kasse`} style={{ width: "80%", borderRadius: "5rem" }} />
      </div>

    </MainTemplate>
  );
};

export default BoxOverview;
