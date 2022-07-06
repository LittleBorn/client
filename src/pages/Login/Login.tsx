import { IonGrid, IonRow, IonCol, IonImg, IonInput, IonText, IonItem, IonLabel } from '@ionic/react';
import Button from '../../components/Button';
import SetupTemplate from '../../components/SetupTemplate';

import login_mother from "../../assets/images/login_mother.svg";

const Login: React.FC = () => {
  return (
    <SetupTemplate>
      <IonGrid>
        <IonRow>
          <IonCol style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
            Willkommen zurück!
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
            <IonImg src={login_mother} style={{height: "40%"}}/>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
            <IonItem>
              <IonLabel>Username</IonLabel>
              <IonInput type="text" placeholder="Username" />
            </IonItem>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
            <IonItem>
              <IonLabel>Username</IonLabel>
              <IonInput type="password" placeholder="Password" />
            </IonItem>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
            <IonText>Passwort vergessen? <IonText style={{color: "#44C1AD"}}>Hier entlang</IonText>.</IonText>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
            <Button title="Login" style={{backgroundColor: "#44C1AD", width: 250}} />
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
            <IonText>Noch keinen Account? Dann registriere dich <IonText style={{color: "#44C1AD"}}>hier</IonText>.</IonText>
          </IonCol>
        </IonRow>
      </IonGrid>

    </SetupTemplate>
  );
};

export default Login;
