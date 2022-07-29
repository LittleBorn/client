import { IonGrid, IonImg, IonInput, IonText, IonItem, IonLabel } from '@ionic/react';
import Button from '../../components/Button';
import SetupTemplate from '../../components/SetupTemplate';

import forgot_password from "../../assets/images/forgot_password.svg";
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { IPagePros } from '../../interfaces/IPageProps';
import Input from '../../components/Input';

const LostPassword: React.FC<IPagePros> = ({ props }: IPagePros) => {

  const [email, setEmail] = useState('')

  const resetPassword = () => {
    console.log(email)
  }

  return (
    <SetupTemplate>
      <div style={{ justifyContent: "center", display: "flex", flexDirection: "column", alignItems: "center", height: "100vh", gap: "2rem", paddingBottom: "2rem" }}>

        <IonText style={{ fontWeight: "bold", fontSize: "1.3em" }}>Passwort vergessen?</IonText>

        <IonImg src={forgot_password} style={{ height: 150 }} />

        <div style={{width: "70%", display: "flex", justifyContent: "center"}}>
          <Input value={email} onChange={(e) => setEmail(`${e.target.value}`)} type="text" placeholder="Email" />
        </div>
        
        <Button onClick={resetPassword} title="Password zurücksetzen" style={{ backgroundColor: "#44C1AD", width: 350, height: 55 }} />
        <IonText>Zurück geht's <Link to="/Login" style={{ color: "#44C1AD" }}>hier</Link>.</IonText>
      </div>
    </SetupTemplate>
  );
};

export default LostPassword;
