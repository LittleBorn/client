import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import MainTemplate from '../components/MainTemplate';
import { IPagePros } from '../interfaces/IPageProps';
import { accessToken$ } from '../stores/userStore';
import './Home.css';

const Home: React.FC<IPagePros> = ({props}: IPagePros) => {

  const logout = () => {
    accessToken$.next(undefined);
  }

  return (
    <MainTemplate>
        <h1>Home Component</h1>
        <button onClick={logout}>Logout</button>
    </MainTemplate>
  );
};

export default Home;
