import { IonGrid, IonImg, IonInput, IonText, IonItem, IonLabel } from '@ionic/react';
import Button from '../../components/Button';
import SetupTemplate from '../../components/SetupTemplate';

import login_mother from "../../assets/images/login_mother.svg";
import { useState } from 'react';

const Login: React.FC = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const login = () => {
    console.log(email, password)
  }

  return (
    <SetupTemplate>
      <div style={{justifyContent: "flex-end", display: "flex", flexDirection: "column", alignItems: "center", height: "100vh", gap: "2rem", paddingBottom: "2rem"}}>
        <div>
          <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
            <IonText style={{fontWeight: "bold", fontSize: "1.3em"}}>Willkommen zurück!</IonText>
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
            <IonItem>
              <IonLabel>Passwort</IonLabel>
              <IonInput value={password} onIonChange={(e) => setPassword(`${e.target.value}`)} type="password" placeholder="Password" />
            </IonItem>
          </div>
        </div>
        <div>
          <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
            <IonText>Passwort vergessen? <IonText style={{color: "#44C1AD"}}>Hier entlang</IonText>.</IonText>
          </div>
        </div>
        <div>
          <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
            <Button onClick={login} title="Login" style={{backgroundColor: "#44C1AD", width: 350, height: 55}} />
          </div>
        </div>
        <div>
          <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
            <IonText>Noch keinen Account? Dann registriere dich <IonText style={{color: "#44C1AD"}}>hier</IonText>.</IonText>
          </div>
        </div>
      </div>

    </SetupTemplate>
  );
};

export default Login;
