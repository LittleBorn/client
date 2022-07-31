import { IonText } from '@ionic/react';
import { useEffect, useState } from 'react';
import MainTemplate from '../../components/MainTemplate';
import { IPagePros } from '../../interfaces/IPageProps';
import { IUser } from '../../interfaces/IUser';
import { user$ } from '../../stores/userStore';
import BoxPreview from './BoxPreview';

const Home: React.FC<IPagePros> = ({props}: IPagePros) => {

  const [user, setUser] = useState<IUser | undefined>(user$.getValue())
  const [date, setDate] = useState<string|undefined>();

  useEffect(() => {
    
    user$.asObservable().subscribe(v => setUser(v))
    setDate(new Date().toLocaleDateString('de-DE', {weekday: 'long', month: 'long', day: 'numeric'}))
  
    return () => {
      user$.unsubscribe();
    }
  }, [])
  

  return (
    <MainTemplate>
      <div style={{display: "flex", flexDirection: "column", height: "100vh", padding: "1rem", gap: "0.5rem"}}>
        <IonText style={{fontSize: "1.3em"}}>{ user ? <b>Hallo {user.firstName}!</b> : <b>Hallo!</b> }</IonText>
        { date ? <IonText color="dark">Heute ist {date}</IonText> : <IonText color="dark">Heute ist ein schöner Tag!</IonText>}
        <BoxPreview/>
      </div>
    </MainTemplate>
  );
};

export default Home;
