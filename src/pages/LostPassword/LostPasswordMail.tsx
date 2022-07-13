import { IonGrid, IonImg, IonInput, IonText, IonItem, IonLabel } from '@ionic/react';
import Button from '../../components/Button';
import SetupTemplate from '../../components/SetupTemplate';

import received_mail from "../../assets/images/received_mail.svg";
import { useState } from 'react';
import { Link } from 'react-router-dom';

const LostPasswordMail: React.FC = () => {

  return (
    <SetupTemplate>
      <div style={{ justifyContent: "center", display: "flex", flexDirection: "column", alignItems: "center", height: "100vh", gap: "2rem", paddingBottom: "2rem" }}>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <IonText style={{ fontWeight: "bold", fontSize: "1.3em" }}>Du hast Mail bekommen!</IonText>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <IonImg src={received_mail} style={{ height: 200 }} />
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "75%", textAlign: "center" }}>
          <IonText>Sie haben eine Mail erhalten. Bitte bestätigen Sie diese. Anschließend können Sie sich bei anmelden.</IonText>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Button routerLink='/Login' title="Login" style={{ backgroundColor: "#44C1AD", width: 350, height: 55 }} />
        </div>

      </div>

    </SetupTemplate>
  );
};

export default LostPasswordMail;
