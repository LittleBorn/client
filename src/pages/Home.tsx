import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { IPagePros } from '../interfaces/IPageProps';
import './Home.css';

const Home: React.FC<IPagePros> = ({props}: IPagePros) => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Home</IonTitle>
          </IonToolbar>
        </IonHeader>
        <h1>Home Component</h1>
      </IonContent>
    </IonPage>
  );
};

export default Home;
