import { IonImg, IonText } from '@ionic/react';
import { useEffect } from 'react';
import Button from '../../components/Button';
import MainTemplate from '../../components/MainTemplate';
import { IPagePros } from '../../interfaces/IPageProps';
import mother_with_baby from "../../assets/images/mother_with_baby.svg";

const BoxStartPage: React.FC<IPagePros> = ({ props }: IPagePros) => {


  useEffect(() => {

  }, [])


  return (
    <MainTemplate>
      <div style={{ display: "flex", flexDirection: "column", height: "100%", padding: "1rem", gap: "1.5rem", alignItems: "center", justifyContent: "center" }}>
        
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <IonImg src={mother_with_baby} style={{ height: 200 }} />
        </div>

        <IonText style={{ fontWeight: "bold", fontSize: "1.3em" }}>Erstelle deine erste Box mit LittleBorn</IonText>

        <IonText style={{ fontSize: "1em", textAlign: "center", width: "80%" }}>LittleBorn bietet über 700 verschiedene Babyprodukte für eure Liebsten, von Windeln, über Babypflege, über Babycremes {`&`} Öle bis Babynahrung und vieles mehr. Und das alles ist auch im Abo möglich.</IonText>

        <div style={{ justifySelf: "flex-end" }}>
          <Button routerLink='/BoxMainPage' title="Los geht's" style={{ backgroundColor: "#44C1AD", width: 350, height: 55 }} />
        </div>
      </div>
    </MainTemplate>
  );
};

export default BoxStartPage;
