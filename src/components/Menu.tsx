import { IonContent, IonFooter, IonHeader, IonItem, IonList, IonMenu, IonText, IonToolbar } from '@ionic/react';

import littleborn_icon from "../assets/images/littleborn_icon.svg"

interface ContainerProps {

}

const Menu: React.FC<ContainerProps> = ({}) => {

    return (
        <IonMenu side="start" menuId="first" contentId="main-content" swipeGesture={true}>
        <IonHeader collapse="condense">
          <IonToolbar color="tertiary">
            <div style={{display: "flex", height: "10rem", flexDirection: "column", padding: "2.5rem 1rem 1rem 2rem", justifyContent: "space-between"}}>
              <div><img src={littleborn_icon}></img></div>
              <div style={{display: "flex", flexDirection: "column", gap: "0.3rem"}}>
                <IonText color="dark"><b>Hallo /NAME/!</b></IonText>
                <IonText color="dark">Heut ist /DATE/</IonText>
              </div>
            </div>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList>
            <IonItem>Babyprofil</IonItem>
            <IonItem>Abonnement</IonItem>
            <IonItem>Erinnerungen</IonItem>
            <IonItem>Einstellungen</IonItem>
          </IonList>
          <IonList>
            <IonItem>Test</IonItem>
          </IonList>
        </IonContent>
        <IonFooter style={{backgroundColor: "#44c1ac70", height: "10%"}}/>
      </IonMenu>
    );
};

export default Menu;
