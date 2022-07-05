import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';

interface ContainerProps { children: React.ReactNode }

const SetupTemplate: React.FC<ContainerProps> = ({children}) => {
  return (
    <IonPage>
      <IonContent fullscreen style={{display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "white"}}>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Login</IonTitle>
          </IonToolbar>
        </IonHeader>
        { children }
      </IonContent>
    </IonPage>
  );
};

export default SetupTemplate;
