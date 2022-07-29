import { IonInput, IonText, IonItem, IonLabel, useIonToast, useIonLoading, IonContent } from '@ionic/react';
import Button from '../../components/Button';
import SetupTemplate from '../../components/SetupTemplate';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { IPagePros } from '../../interfaces/IPageProps';
import { sendStorefrontQuery } from '../../utils/shopifyStorefrontHelper';
import { IRegistrationReturn } from '../../interfaces/Authentication/IRegistrationReturn';
import Input from '../../components/Input';

const Register: React.FC<IPagePros> = ({ props }: IPagePros) => {

  const [presentToast, dismissToast] = useIonToast();
  const [presentLoading, dismissLoading] = useIonLoading();

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [verifyPassword, setVerifyPassword] = useState('')

  const register = async () => {

    if (firstName === "" || lastName === "" || email === "" || password === "" || verifyPassword === "") {
      presentToast("Bitte füllen Sie alle Felder aus", 2000)
      return
    }

    if (password !== verifyPassword) {
      presentToast("Engegebene Passwörter stimmen nicht überein", 2000)
      return
    }

    presentLoading()

    var data = JSON.stringify({
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
      variables: { "input": { "email": email, "password": password, "firstName": firstName, "lastName": lastName, "acceptsMarketing": false } }
    });

    const result = await sendStorefrontQuery<IRegistrationReturn>(data);

    console.log(result.data.customerCreate);

    if (!result?.data?.customerCreate?.customer) {
      presentToast(result?.data?.customerCreate?.customerUserErrors[0]?.message, 2000);
      dismissLoading();
      return
    }

    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setEmail("");
    dismissLoading()

  }

  return (
    <SetupTemplate>
      <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center", height: "100vh", gap: "1.5rem" }}>

        <IonText style={{ fontWeight: "bold", fontSize: "1.3em" }}>Willkommen bei LittleBorn</IonText>

        <IonText style={{ fontSize: "1em" }}>Lass Dich beim Alltag unterstützen!</IonText>
    
        <Input value={firstName} onChange={(e) => { setFirstName(`${e.target.value}`) }} type="text" placeholder="Vorname" />
        <Input value={lastName} onChange={(e) => setLastName(`${e.target.value}`)} type="text" placeholder="Nachname" />
        <Input value={email} onChange={(e) => setEmail(`${e.target.value}`)} type="email" placeholder="Email" />
        <Input value={password} onChange={(e) => setPassword(`${e.target.value}`)} type="password" placeholder="Password" />
        <Input value={verifyPassword} onChange={(e) => setVerifyPassword(`${e.target.value}`)} type="password" placeholder="Passwort bestätigen" />

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
