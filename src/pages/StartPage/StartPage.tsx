import { IonImg,IonText } from '@ionic/react';
import Button from '../../components/Button';
import SetupTemplate from '../../components/SetupTemplate';

import mother_with_baby from "../../assets/images/mother_with_baby.svg";

const StartPage: React.FC = () => {

  const navigateToRegister = () => {

  }

  return (
    <SetupTemplate>
      <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center", height: "100vh", gap: "1.5rem", paddingBottom: "2rem" }}>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <IonImg src={mother_with_baby} style={{ height: 200 }} />
        </div>

        <IonText style={{ fontWeight: "bold", fontSize: "1.3em" }}>Lass dich im Alltag unterstützen!</IonText>

        <IonText style={{ fontSize: "1em", textAlign: "center", width: "80%" }}>LittleBorn bietet über 700 verschiedene Babyprodukte für eure Liebsten, von Windeln, über Babypflege, über Babycremes {`&`} Öle bis Babynahrung und vieles mehr. Und das alles ist auch im Abo möglich.</IonText>

        <div style={{ justifySelf: "flex-end" }}>
          <Button onClick={navigateToRegister} title="Los geht's" style={{ backgroundColor: "#44C1AD", width: 350, height: 55 }} />
        </div>

      </div>

    </SetupTemplate>
  );
};

export default StartPage;
