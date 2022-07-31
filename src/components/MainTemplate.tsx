import { IonButton, IonContent, IonFooter, IonHeader, IonIcon, IonItem, IonList, IonMenu, IonMenuButton, IonMenuToggle, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { menuOutline, trendingUpOutline } from "ionicons/icons"
import { menuController } from '@ionic/core';

interface ContainerProps { children: React.ReactNode, title?: string | undefined }

const MainTemplate: React.FC<ContainerProps> = ({ children, title }) => {

  const openMenu = async () => {
    await menuController.open();
  }

  return (
    <>
      <IonMenu side="start" menuId="first" contentId="main-content" swipeGesture={true}>
        <IonHeader>
          <IonToolbar color="tertiary">
            <IonTitle>Start Menu</IonTitle>
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
        <IonFooter style={{backgroundColor: "#44C1ADAA", height: "10%"}}/>
      </IonMenu>

      <IonPage id="main-content">
        <IonContent fullscreen>
          <IonHeader collapse="condense" translucent={true}>
            <IonToolbar>
              <IonMenuButton slot='start'/>
              {title && <IonTitle>{title}</IonTitle>}
              {/* <IonIcon icon={trendingUpOutline} slot="end"/> */}
            </IonToolbar>
          </IonHeader>
          {children}
        </IonContent>
      </IonPage>
    </>

  );
};

export default MainTemplate;
