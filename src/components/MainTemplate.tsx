import { IonButton, IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { menuOutline, trendingUpOutline } from "ionicons/icons"

interface ContainerProps { children: React.ReactNode, title?: string | undefined }

const MainTemplate: React.FC<ContainerProps> = ({ children, title }) => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <IonHeader collapse="condense" translucent={true}>
          <IonToolbar>
            <IonButton slot="start">
                  <IonIcon icon={menuOutline}/>
            </IonButton>
            {title && <IonTitle>{title}</IonTitle>}
            <IonButton slot="end">
                  <IonIcon icon={trendingUpOutline}/>
            </IonButton>
          </IonToolbar>
        </IonHeader>
        {children}
      </IonContent>
    </IonPage>
  );
};

export default MainTemplate;
