import { IonButton, IonContent, IonFooter, IonHeader, IonIcon, IonItem, IonList, IonMenu, IonMenuButton, IonMenuToggle, IonPage, IonText, IonTitle, IonToolbar } from '@ionic/react';
import Menu from './Menu';

interface ContainerProps { children: React.ReactNode, title?: string | undefined }

const MainTemplate: React.FC<ContainerProps> = ({ children, title }) => {

  return (
    <>
      <Menu/>

      <IonPage id="main-content">
        <IonContent fullscreen>
          <IonHeader /*collapse="condense" translucent={true}*/>
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
