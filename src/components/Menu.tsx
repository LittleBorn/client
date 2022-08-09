import { IonContent, IonFooter, IonHeader, IonItem, IonList, IonMenu, IonText, IonToolbar } from '@ionic/react';
import { useEffect, useState } from 'react';

import littleborn_icon from "../assets/images/littleborn_icon.svg"
import { accessToken$ } from '../stores/userStore';
import { sendStorefrontQuery } from '../utils/shopifyStorefrontHelper';

interface ContainerProps {

}

interface IUserName{
    data: {
        customer: {
            firstName: string;
            lastName: string;
        }
    }
}

const Menu: React.FC<ContainerProps> = ({}) => {

    const [name, setName] = useState<string|undefined>();
    const [date, setDate] = useState<string|undefined>();

    useEffect(() => {
        // fetch current date
        setDate(new Date().toLocaleDateString('de-DE', {weekday: 'long', month: 'long', day: 'numeric'}))

        // fetch current customer name
        const CURRENT_ACCESS_TOKEN = accessToken$.getValue()?.accessToken;
        var data = JSON.stringify({
            query: `query {
            customer(customerAccessToken: "${CURRENT_ACCESS_TOKEN}") {
              firstName
              lastName
            }
          }`,
            variables: {}
          });
        sendStorefrontQuery<IUserName>(data)
        .then(result => setName(result.data.customer.firstName))
    }, [])

    return (
        <IonMenu side="start" menuId="first" contentId="main-content" swipeGesture={true}>
        <IonHeader collapse="condense">
          <IonToolbar color="tertiary">
            <div style={{display: "flex", height: "10rem", flexDirection: "column", padding: "2.5rem 1rem 1rem 2rem", justifyContent: "space-between"}}>
              <div><img src={littleborn_icon}></img></div>
              <div style={{display: "flex", flexDirection: "column", gap: "0.3rem"}}>
                { name ? <IonText color="dark"><b>Hallo {name}!</b></IonText> : <IonText color="dark"><b>Hallo</b></IonText> }
                { date ? <IonText color="dark">Heute ist {date}</IonText> : <IonText color="dark">Heute ist ein schöner Tag!</IonText>}
              </div>
            </div>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList>
            <IonItem routerLink='/BabyProfile'>Babyprofil</IonItem>
            <IonItem>Abonnement</IonItem>
            <IonItem>Erinnerungen</IonItem>
            <IonItem>Einstellungen</IonItem>
          </IonList>
          <IonList>
            <IonItem>Feedback</IonItem>
            <IonItem>An einer App-Umfrage teilnehmen</IonItem>
          </IonList>
        </IonContent>
        <IonFooter style={{backgroundColor: "#44c1ac70", height: "10%"}}/>
      </IonMenu>
    );
};

export default Menu;
