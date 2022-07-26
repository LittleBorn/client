import { IonGrid, IonImg, IonInput, IonText, IonItem, IonLabel } from '@ionic/react';
import Button from '../../components/Button';
import SetupTemplate from '../../components/SetupTemplate';
import login_mother from "../../assets/images/login_mother.svg";
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { IPagePros } from '../../interfaces/IPageProps';
import axios from "axios";
import { sendEmailVerification, signInWithCustomToken, updateEmail } from "firebase/auth";
import { auth } from "../../utils/firebaseHelper"
import { sendStorefrontQuery } from '../../utils/shopifyStorefrontHelper';

const Register: React.FC<IPagePros> = ({ props }: IPagePros) => {

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [verifyPassword, setVerifyPassword] = useState('')

  const register = async () => {

    const data = JSON.stringify({
      query: `mutation customerCreate($input: CustomerCreateInput!) {
      customerCreate(input: $input) {
        customerUserErrors {
          code
          field
          message
        }
        customer {
          id
        }
      }
    }`,
      variables: {"input":{"email": email ,"password": password,"firstName": firstName,"lastName":lastName,"acceptsMarketing":true}}
    });
    
    const result = await sendStorefrontQuery(data)

    console.log(result)

  }

  return (
    <SetupTemplate>
      <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center", height: "100vh", gap: "1.5rem" }}>

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
            <IonText>Schon einen Account? Dann melde dich <Link to="/Login" style={{ color: "#44C1AD" }}>hier</Link> an.</IonText>
          </div>

        </div>

      </div>

    </SetupTemplate>
  );
};

export default Register;
