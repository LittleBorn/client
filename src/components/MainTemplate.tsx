import { IonContent, IonPage} from '@ionic/react';

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
