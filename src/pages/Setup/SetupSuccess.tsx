import { IonImg, IonText } from '@ionic/react';
import Button from '../../components/Button';
import SetupTemplate from '../../components/SetupTemplate';

import accept_terms from "../../assets/images/accept_terms.svg";
import { useState } from 'react';
import SetupProgressBar from '../../components/SetupProgressBar';

const SetupSuccess: React.FC = () => {

  const [username, setUsername] = useState('');

  const navigateToHome = () => {

  }

  return (
    <SetupTemplate>
      <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center", height: "100vh", gap: "2rem", paddingBottom: "2rem" }}>

        <SetupProgressBar style={{marginBottom: "2rem"}} progress={["#EA407D", "#EA407D"]}/>

        <IonText style={{ fontWeight: "bold", fontSize: "1.3em" }}>Toll! Dein Profil wurde angelegt!</IonText>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <IonImg src={accept_terms} style={{ height: 200 }} />
        </div>

        <IonText style={{ fontSize: "1em", textAlign: "center", width: "80%" }}>Deine Angaben werden im Hintergrund gerade verechnet, um ganz auf deine Anforderungen abgestimmt zu sein!</IonText>

        <div style={{ justifySelf: "flex-end" }}>
          <Button onClick={navigateToHome} title="Los geht's" style={{ backgroundColor: "#EA407D", width: 350, height: 55 }} />
        </div>

      </div>

    </SetupTemplate>
  );
};

export default SetupSuccess;
