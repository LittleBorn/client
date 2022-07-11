import { IonGrid, IonImg, IonInput, IonText, IonItem, IonLabel } from '@ionic/react';
import Button from '../../components/Button';
import SetupTemplate from '../../components/SetupTemplate';

import login_mother from "../../assets/images/login_mother.svg";
import { useState } from 'react';

const Register: React.FC = (props) => {

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [verifyPassword, setVerifyPassword] = useState('')

  const register = () => {
    console.log(email, password)
  }

  return (
    <SetupTemplate>
      <div style={{ display: "flex",justifyContent: "center" ,flexDirection: "column", alignItems: "center", height: "100vh", gap: "1.5rem", paddingBottom: "2rem" }}>

        <IonText style={{ fontWeight: "bold", fontSize: "1.3em" }}>Willkommen bei LittleBorn</IonText>

        <IonText style={{ fontSize: "1em" }}>Lass Dich beim Alltag unterstützen!</IonText>

        <IonItem>
          <IonLabel>Vorname</IonLabel>
          <IonInput value={firstName} onIonChange={(e) => setFirstName(`${e.target.value}`)} type="text" placeholder="Vorname" />
        </IonItem>

        <IonItem>
          <IonLabel>Nachname</IonLabel>
          <IonInput value={lastName} onIonChange={(e) => setLastName(`${e.target.value}`)} type="text" placeholder="Nachname" />
        </IonItem>

        <IonItem>
          <IonLabel>Email</IonLabel>
          <IonInput value={email} onIonChange={(e) => setEmail(`${e.target.value}`)} type="text" placeholder="Email" />
        </IonItem>

        <IonItem>
          <IonLabel>Passwort</IonLabel>
          <IonInput value={password} onIonChange={(e) => setPassword(`${e.target.value}`)} type="password" placeholder="Password" />
        </IonItem>

        <IonItem>
          <IonLabel>Passwort bestätigen</IonLabel>
          <IonInput value={verifyPassword} onIonChange={(e) => setVerifyPassword(`${e.target.value}`)} type="password" placeholder="Passwort bestätigen" />
        </IonItem>

        <IonText>Ich habe die <IonText style={{ color: "#44C1AD", textDecoration: "underline" }}>AGB</IonText> gelesen {`&`} aktzeptiert.</IonText>


        <div style={{ justifySelf: "flex-end" }}>

          <div>
            <Button onClick={register} title="Registrieren" style={{ backgroundColor: "#44C1AD", width: 350, height: 55 }} />
          </div>

          <div>
            <IonText>Noch keinen Account? Dann registriere dich <IonText style={{ color: "#44C1AD" }}>hier</IonText>.</IonText>
          </div>

        </div>

      </div>

    </SetupTemplate>
  );
};

export default Register;
