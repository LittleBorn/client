import { IonCol, IonContent, IonGrid, IonHeader, IonImg, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { url } from 'inspector';

interface ContainerProps { children: React.ReactNode }

const MainTemplate: React.FC<ContainerProps> = ({ children }) => {
  return (
    <IonPage>
      <IonContent className='background-image' fullscreen>
        { children }
      </IonContent>
    </IonPage>
  );
};

export default MainTemplate;
