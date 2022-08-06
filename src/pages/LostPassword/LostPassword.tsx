import { IonGrid, IonImg, IonInput, IonText, IonItem, IonLabel, useIonToast, useIonLoading } from '@ionic/react';
import Button from '../../components/Button';
import SetupTemplate from '../../components/SetupTemplate';

import forgot_password from "../../assets/images/forgot_password.svg";
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { IPagePros } from '../../interfaces/IPageProps';
import Input from '../../components/Input';
import { ICustomerUserError } from '../../interfaces/ICustomerUserError';
import { sendStorefrontQuery } from '../../utils/shopifyStorefrontHelper';

const LostPassword: React.FC<IPagePros> = ({ props }: IPagePros) => {

  const [presentToast, dismissToast] = useIonToast();
  const [presentLoading, dismissLoading] = useIonLoading();

  const [email, setEmail] = useState('')

  const resetPassword = async () => {
    
    var data = JSON.stringify({
      query: `mutation customerRecover($email: String!) {
      customerRecover(email: $email) {
        customerUserErrors {
          code
          field
          message
        }
      }
    }`,
      variables: {"email": email}
    });
    const result = await sendStorefrontQuery<{data: {customerRecover: {customerUserErrors: Array<ICustomerUserError>}}}>(data);

    if(result?.data?.customerRecover?.customerUserErrors?.length === 0){
      // redirect 
      props.history.push("/LostPasswordMail");
    }else{
      presentToast(result?.data?.customerRecover?.customerUserErrors[0]?.message, 2000);
      dismissLoading();
      return
    }
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
