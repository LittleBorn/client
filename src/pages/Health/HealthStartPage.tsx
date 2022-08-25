import { IonImg, IonText } from '@ionic/react';
import { useEffect} from 'react';
import Button from '../../components/Button';
import MainTemplate from '../../components/MainTemplate';
import { IPagePros } from '../../interfaces/IPageProps';
import mother_with_baby from "../../assets/images/mother_with_baby.svg";

const HealthStartPage: React.FC<IPagePros> = ({ props }: IPagePros) => {


  useEffect(() => {

  }, [])


  return (
    <MainTemplate title='MyLittle Health 💓'>
<div style={{ display: "flex", flexDirection: "column", height: "100%", padding: "1rem", gap: "1.5rem", alignItems: "center", justifyContent: "center" }}>
        
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <IonImg src={mother_with_baby} style={{ height: 200 }} />
        </div>

        <IonText style={{ fontWeight: "bold", fontSize: "1.3em", textAlign: "center", width: "85%"}}>Behalte die Entwicklung deines Babys im Auge</IonText>

        <IonText style={{ fontSize: "1em", textAlign: "center", width: "80%" }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer tristique adipiscing vestibulum mi nibh integer enim eu vulputate. Ut nunc arcu phasellus odio viverra nec neque eget.</IonText>

        <div style={{ justifySelf: "flex-end" }}>
          <Button routerLink='/Health' title="Los geht's" style={{ backgroundColor: "#44C1AD", width: 350, height: 55 }} />
        </div>
      </div>
    </MainTemplate >
  );
};

export default HealthStartPage;
