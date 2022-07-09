import { IonGrid, IonImg, IonInput, IonText, IonItem, IonLabel } from '@ionic/react';
import Button from '../../components/Button';
import SetupTemplate from '../../components/SetupTemplate';

import login_mother from "../../assets/images/login_mother.svg";
import { useState } from 'react';

const LostPassword: React.FC = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const login = () => {
    console.log(email, password)
  }

  return (
    <SetupTemplate>
      <div style={{justifyContent: "center", display: "flex", flexDirection: "column", alignItems: "center", height: "100vh", gap: "2rem", paddingBottom: "2rem"}}>
        <div>
          <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
            <IonText style={{fontWeight: "bold", fontSize: "1.3em"}}>Passwort vergessen?</IonText>
          </div>
        </div>
        <div>
          <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
            <IonImg src={login_mother} style={{height: 200}}/>
          </div>
        </div>
        <div>
          <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
            <IonItem>
              <IonLabel>Email</IonLabel>
              <IonInput value={email} onIonChange={(e) => setEmail(`${e.target.value}`)} type="text" placeholder="Email" />
            </IonItem>
          </div>
        </div>
        <div>
          <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
            <Button onClick={login} title="Password zurücksetzen" style={{backgroundColor: "#44C1AD", width: 350, height: 55}} />
          </div>
        </div>
        <div>
          <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
            <IonText>Zurück geht's <IonText style={{color: "#44C1AD"}}>hier</IonText>.</IonText>
          </div>
        </div>
      </div>

    </SetupTemplate>
  );
};

export default LostPassword;
