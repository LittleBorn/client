import { IonImg, IonInput, IonItem, IonLabel, IonText } from '@ionic/react';
import Button from '../../components/Button';
import SetupTemplate from '../../components/SetupTemplate';

import mother_with_baby from "../../assets/images/mother_with_baby.svg";
import { useState } from 'react';
import SetupProgressBar from '../../components/SetupProgressBar';
import { Link } from 'react-router-dom';

const SetupChildInformation: React.FC = () => {

  const [childName, setChildName] = useState('')

  const navigateToSetup2 = () => {

  }

  return (
    <SetupTemplate>
      <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center", height: "100vh", gap: "1.5rem", paddingBottom: "2rem" }}>

        <SetupProgressBar style={{ marginBottom: "2rem" }} progress={["#44C1AD", "white"]} />

        <IonText style={{ fontWeight: "bold", fontSize: "1.3em" }}>Nun zu deinem Engel 👶</IonText>

        <IonItem>
          <IonLabel>Name</IonLabel>
          <IonInput value={childName} onIonChange={(e) => setChildName(`${e.target.value}`)} type="text" placeholder="Email" />
        </IonItem>

        {/* Weitere Input Felder */}

        <Link to="/SetupInformation"><IonText style={{ color: "#44C1AD", textDecoration: "underline" }}>Warum benötigen wir diese Infos?</IonText></Link>

        <Button onClick={navigateToSetup2} title="Weiter" style={{ backgroundColor: "#44C1AD", width: 350, height: 55 }} />

        <Link to="/SetupStartPage"><IonText style={{ color: "#44C1AD" }}>zurück</IonText></Link>


      </div>

    </SetupTemplate>
  );
};

export default SetupChildInformation;
