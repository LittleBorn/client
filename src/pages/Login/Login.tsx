import { IonGrid, IonImg, IonInput, IonText, IonItem, IonLabel } from '@ionic/react';
import Button from '../../components/Button';
import SetupTemplate from '../../components/SetupTemplate';

import login_mother from "../../assets/images/login_mother.svg";
import { useState } from 'react';
import Input from '../../components/Input';

import { Link } from 'react-router-dom';
import { IPagePros } from '../../interfaces/IPageProps';

const Login: React.FC<IPagePros> = ({ props }: IPagePros) => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const login = () => {
    console.log(email, password)

  }

  return (
    <SetupTemplate>
      <div style={{ justifyContent: "flex-end", display: "flex", flexDirection: "column", alignItems: "center", height: "100vh", gap: "2rem", paddingBottom: "2rem" }}>


        <IonText style={{ fontWeight: "bold", fontSize: "1.3em" }}>Willkommen zurück!</IonText>
        <IonImg src={login_mother} style={{ height: 200 }} />

        <Input value={email} onChange={(e) => setEmail(`${e.target.value}`)} type="text" placeholder="Email" />
        <Input value={password} onChange={(e) => setPassword(`${e.target.value}`)} type="password" placeholder="Password" />

        <IonText>Passwort vergessen? <Link to="/LostPassword" style={{ color: "#44C1AD" }}>Hier entlang</Link>.</IonText>

        <Button onClick={login} title="Login" style={{ backgroundColor: "#44C1AD", width: 350, height: 55 }} />

        <IonText>Noch keinen Account? Dann registriere dich <Link to="/Register" style={{ color: "#44C1AD" }}>hier</Link>.</IonText>


      </div>

    </SetupTemplate>
  );
};

export default Login;
