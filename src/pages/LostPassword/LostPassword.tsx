import { IonGrid, IonImg, IonInput, IonText, IonItem, IonLabel } from '@ionic/react';
import Button from '../../components/Button';
import SetupTemplate from '../../components/SetupTemplate';

import forgot_password from "../../assets/images/forgot_password.svg";
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { IPagePros } from '../../interfaces/IPageProps';

const LostPassword: React.FC<IPagePros> = ({props}: IPagePros) => {

  const [email, setEmail] = useState('')

  const resetPassword = () => {
    console.log(email)
  }

  return (
    <SetupTemplate>
      <div style={{justifyContent: "center", display: "flex", flexDirection: "column", alignItems: "center", height: "100vh", gap: "2rem", paddingBottom: "2rem"}}>
          <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
            <IonText style={{fontWeight: "bold", fontSize: "1.3em"}}>Passwort vergessen?</IonText>
          </div>

          <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
            <IonImg src={forgot_password} style={{height: 150}}/>
          </div>

          <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
            <IonItem>
              <IonLabel>Email</IonLabel>
              <IonInput value={email} onIonChange={(e) => setEmail(`${e.target.value}`)} type="text" placeholder="Email" />
            </IonItem>
          </div>

          <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
            <Button onClick={resetPassword} title="Password zurücksetzen" style={{backgroundColor: "#44C1AD", width: 350, height: 55}} />
          </div>

          <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
            <IonText>Zurück geht's <Link to="/Login" style={{color: "#44C1AD"}}>hier</Link>.</IonText>
          </div>

      </div>
    </SetupTemplate>
  );
};

export default LostPassword;
