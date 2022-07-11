import { IonImg, IonText } from '@ionic/react';
import Button from '../../components/Button';
import SetupTemplate from '../../components/SetupTemplate';

import mother_with_baby from "../../assets/images/mother_with_baby.svg";
import SetupProgressBar from '../../components/SetupProgressBar';

const SetupStartPage: React.FC = () => {

  const navigateToSetup1 = () => {

  }

  return (
    <SetupTemplate>
      <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center", height: "100vh", gap: "1.5rem", paddingBottom: "2rem" }}>

        <SetupProgressBar customWidth='2.5rem' style={{marginBottom: "2rem"}} progress={["#44C1AD", "#44C1AD", "#44C1AD", "#44C1AD"]}/>

        <IonText style={{ fontWeight: "bold", fontSize: "1.1em" }}>Warum wir diese Infos benötigen?</IonText>

        <IonText style={{ fontSize: "1em", textAlign: "center", width: "80%", backgroundColor: "white", padding: "1rem" }}>Wir benötigen diese Informationen um...</IonText>

        <div style={{ justifySelf: "flex-end" }}>
          <Button onClick={navigateToSetup1} title="Weiter" style={{ backgroundColor: "#44C1AD", width: 350, height: 55 }} />
        </div>

        <IonText style={{ color: "#44C1AD" }}>zurück</IonText>

      </div>

    </SetupTemplate>
  );
};

export default SetupStartPage;
