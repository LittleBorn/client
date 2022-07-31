import { IonImg, IonText } from '@ionic/react';
import Button from '../../components/Button';
import SetupTemplate from '../../components/SetupTemplate';

import mother_with_baby from "../../assets/images/mother_with_baby.svg";
import { useState } from 'react';
import SetupProgressBar from '../../components/SetupProgressBar';
import { IPagePros } from '../../interfaces/IPageProps';

const SetupStartPage: React.FC<IPagePros> = ({props}: IPagePros) => {

  const [username, setUsername] = useState('');

  return (
    <SetupTemplate>
      <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center", height: "100vh", gap: "1.5rem", paddingBottom: "2rem" }}>

        <SetupProgressBar style={{marginBottom: "2rem"}} progress={["white", "white"]}/>

        <IonText style={{ fontWeight: "bold", fontSize: "1.3em" }}>Willkommen, {username}</IonText>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <IonImg src={mother_with_baby} style={{ height: 200 }} />
        </div>

        <IonText style={{ fontWeight: "bold", fontSize: "1.1em" }}>Erstelle dein Profil in 2 Minuten</IonText>

        <IonText style={{ fontSize: "1em", textAlign: "center", width: "80%" }}>Text</IonText>

        <div style={{ justifySelf: "flex-end" }}>
          <Button routerLink='/SetupChildInformation' title="Los geht's" style={{ backgroundColor: "#44C1AD", width: 350, height: 55 }} />
        </div>

      </div>

    </SetupTemplate>
  );
};

export default SetupStartPage;
