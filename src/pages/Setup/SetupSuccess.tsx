import { IonImg, IonText } from '@ionic/react';
import Button from '../../components/Button';
import SetupTemplate from '../../components/SetupTemplate';
import SetupProgressBar from '../../components/SetupProgressBar';
import accept_terms from "../../assets/images/accept_terms.svg";
import { IPagePros } from '../../interfaces/IPageProps';

const SetupSuccess: React.FC<IPagePros> = ({props}: IPagePros) => {

  const navigateToHome = () => {
    props.history.push("/Home")
  }

  return (
    <SetupTemplate>
      <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center", height: "100vh", gap: "2rem", paddingBottom: "2rem" }}>

        <SetupProgressBar style={{marginBottom: "2rem"}} progress={["#EA407D", "#EA407D"]}/>

        <IonText style={{ fontWeight: "bold", fontSize: "1.3em" }}>Toll! Dein Profil wurde angelegt!</IonText>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <IonImg src={accept_terms} style={{ height: 200 }} />
        </div>

        <IonText style={{ fontSize: "1em", textAlign: "center", width: "80%" }}>Deine Angaben werden im Hintergrund gerade verechnet, um ganz auf deine Anforderungen abgestimmt zu sein!</IonText>

        <div style={{ justifySelf: "flex-end" }}>
          <Button onClick={navigateToHome} title="Los geht's" style={{ backgroundColor: "#EA407D", width: 350, height: 55 }} />
        </div>

        {/* <IonText style={{ color: "#44C1AD" }}>zurück</IonText> */}

      </div>

    </SetupTemplate>
  );
};

export default SetupSuccess;
