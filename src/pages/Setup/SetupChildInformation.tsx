import {IonSelect, IonSelectOption, IonText } from '@ionic/react';
import Button from '../../components/Button';
import SetupTemplate from '../../components/SetupTemplate';

import { useEffect, useState } from 'react';
import SetupProgressBar from '../../components/SetupProgressBar';
import { Link } from 'react-router-dom';
import { IPagePros } from '../../interfaces/IPageProps';
import Input from '../../components/Input';

const SetupChildInformation: React.FC<IPagePros> = ({ props }: IPagePros) => {

  // Child Information 1
  const [childName, setChildName] = useState('')
  const [gender, setGender] = useState('')
  const [height, setHeight] = useState(1500)
  const [weight, setWeight] = useState(1500)

  // Child Information 2
  const [birthDate, setBirthDate] = useState(new Date());

  useEffect(() => {
    const childInfo1: any = props.location.state;
    if(typeof childInfo1 !== 'undefined'){
      if(typeof childInfo1.childName !== 'undefined') setChildName(childInfo1.childName);
      if(typeof childInfo1.gender !== 'undefined') setGender(childInfo1.gender);
      if(typeof childInfo1.height !== 'undefined') setHeight(childInfo1.height);
      if(typeof childInfo1.weight !== 'undefined') setWeight(childInfo1.weight);
      if(typeof childInfo1.birthDate !== 'undefined') setBirthDate(childInfo1.birthDate); 
    }
  }, [props.location.state])
  

  const continueToSetupChildInformation2 = () => {
    props.history.push("/SetupChildInformation2", {
      childName,
      gender,
      height,
      weight,
      birthDate
    });
  }

  return (
    <SetupTemplate>
      <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center", height: "100vh", gap: "1.5rem", paddingBottom: "2rem" }}>

        <SetupProgressBar style={{ marginBottom: "2rem" }} progress={["#44C1AD", "white"]} />

        <IonText style={{ fontWeight: "bold", fontSize: "1.3em" }}>Nun zu deinem Engel 👶</IonText>

        <Input value={childName} onChange={(e) => setChildName(`${e.target.value}`)} type="text" placeholder="Name" />

        <IonSelect onIonChange={(e) => setGender(e.target.value)} placeholder="Welches Geschlecht hat dein Baby?" style={{ backgroundColor: "white", borderRadius: "5rem", padding: "1rem", width: "80%" }}>
          <IonSelectOption value="female">Weiblich</IonSelectOption>
          <IonSelectOption value="male">Männlich</IonSelectOption>
          <IonSelectOption value="other">Anderes</IonSelectOption>
        </IonSelect>

        <Input value={height} onChange={(e) => setHeight(Number.parseInt(`${e.target.value}`))} type="number" placeholder="Größe" />
        <Input value={weight} onChange={(e) => setWeight(Number.parseInt(`${e.target.value}`))} type="number" placeholder="Gewicht" />

        <Link to="/SetupInformation"><IonText style={{ color: "#44C1AD", textDecoration: "underline" }}>Warum benötigen wir diese Infos?</IonText></Link>

        <Button onClick={continueToSetupChildInformation2} title="Weiter" style={{ backgroundColor: "#44C1AD", width: 350, height: 55 }} />

        <Link to="/SetupStartPage"><IonText style={{ color: "#44C1AD" }}>zurück</IonText></Link>


      </div>

    </SetupTemplate>
  );
};

export default SetupChildInformation;
