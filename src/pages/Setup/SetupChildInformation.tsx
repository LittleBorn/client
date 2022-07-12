import { IonDatetime, IonImg, IonInput, IonItem, IonLabel, IonPopover, IonSelect, IonSelectOption, IonText } from '@ionic/react';
import Button from '../../components/Button';
import SetupTemplate from '../../components/SetupTemplate';

import mother_with_baby from "../../assets/images/mother_with_baby.svg";
import { useState } from 'react';
import SetupProgressBar from '../../components/SetupProgressBar';

const SetupChildInformation: React.FC = () => {

  const [childName, setChildName] = useState('')
  const [childGender, setChildGender] = useState('')

  const navigateToSetup2 = () => {

  }

  return (
    <SetupTemplate>
      <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center", height: "100vh", gap: "1.5rem", paddingBottom: "2rem" }}>

        <SetupProgressBar style={{ marginBottom: "2rem" }} progress={["#44C1AD", "white"]} />

        <IonText style={{ fontWeight: "bold", fontSize: "1.3em" }}>Nun zu deinem Engel 👶</IonText>

        <IonItem>
          <IonInput value={childName} onIonChange={(e) => setChildName(`${e.target.value}`)} type="text" placeholder="Email" />
        </IonItem>

        <IonItem>
          <IonSelect placeholder="Welches Geschlecht hat dein Baby?">
            <IonSelectOption value="female">Weiblich</IonSelectOption>
            <IonSelectOption value="male">Männlich</IonSelectOption>
            <IonSelectOption value="other">Anderes</IonSelectOption>
          </IonSelect>
        </IonItem>

        <IonItem>
          <IonDatetime presentation="month-year"></IonDatetime>
        </IonItem>

        {/* Weitere Input Felder */}

        <IonText style={{ color: "#44C1AD", textDecoration: "underline" }}>Warum benötigen wir diese Infos?</IonText>

        <Button onClick={navigateToSetup2} title="Weiter" style={{ backgroundColor: "#44C1AD", width: 350, height: 55 }} />

        <IonText style={{ color: "#44C1AD" }}>zurück</IonText>


      </div>

    </SetupTemplate>
  );
};

export default SetupChildInformation;
