import { IonImg, IonText } from '@ionic/react';
import { useEffect } from 'react';
import Button from '../../components/Button';
import MainTemplate from '../../components/MainTemplate';
import { IPagePros } from '../../interfaces/IPageProps';
import SetupProgressBar from '../../components/SetupProgressBar';
import accept_terms from "../../assets/images/accept_terms.svg";

const BoxSuccess: React.FC<IPagePros> = ({ props }: IPagePros) => {


  useEffect(() => {

  }, [])


  return (
    <MainTemplate title='Deine Box 🎁'>
      <div style={{ display: "flex", flexDirection: "column", height: "100%", padding: "1rem", gap: "1.5rem", alignItems: "center", justifyContent: "center" }}>
        
        <SetupProgressBar customWidth='3rem' style={{marginBottom: "2rem"}} progress={["#EA407D", "#EA407D", "#EA407D", "#EA407D", "#EA407D"]}/>

        <IonText style={{ fontWeight: "bold", fontSize: "1.3em" }}>Toll! Deine Box ist fertig!</IonText>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <IonImg src={accept_terms} style={{ height: 200 }} />
        </div>

        <IonText style={{ fontSize: "1em", textAlign: "center", width: "80%" }}>Deine Angaben werden im Hintergrund gerade verechnet, um ganz auf deine Anforderungen abgestimmt zu sein!</IonText>

        <div style={{ justifySelf: "flex-end" }}>
          <Button onClick={() => props.history.push('/BoxOverview')} title="Zur Box" style={{ backgroundColor: "#EA407D", width: 350, height: 55 }} />
        </div>

      </div>
    </MainTemplate>
  );
};

export default BoxSuccess;
