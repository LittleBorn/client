import { IonText } from '@ionic/react';
import { useEffect } from 'react';
import MainTemplate from '../components/MainTemplate';
import { IPagePros } from '../interfaces/IPageProps';
import './Home.css';

const Home: React.FC<IPagePros> = ({props}: IPagePros) => {

  useEffect(() => {
    
    // get user state
  
    return () => {
      
    }
  }, [])
  

  return (
    <MainTemplate>
      <div style={{display: "flex", flexDirection: "column", height: "100vh", padding: "1rem", gap: "1rem"}}>
        <IonText style={{fontSize: "1.5em"}}><b>Hallo</b></IonText>
      </div>
    </MainTemplate>
  );
};

export default Home;
