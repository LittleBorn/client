import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { IPagePros } from '../interfaces/IPageProps';
import { accessToken$ } from '../stores/userStore';
import './Home.css';

const Home: React.FC<IPagePros> = ({props}: IPagePros) => {

  const logout = () => {
    accessToken$.next(undefined);
  }

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
        <button onClick={logout}>Logout</button>
      </IonContent>
    </IonPage>
  );
};

export default Home;
