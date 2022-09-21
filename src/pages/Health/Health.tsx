import { IonIcon, IonText } from '@ionic/react';
import { scaleOutline, scaleSharp, speedometerSharp } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import HealthCard from '../../components/HealthCard';
import MainTemplate from '../../components/MainTemplate';
import { IChild } from '../../interfaces/IChild';
import { ICustomer } from '../../interfaces/ICustomer';
import { IPagePros } from '../../interfaces/IPageProps';
import { customer$ } from '../../stores/userStore';
import { sendApiGetQuery } from '../../utils/apiHelper';

const Health: React.FC<IPagePros> = ({ props }: IPagePros) => {

  const [child, setChild] = useState<IChild | undefined>();

  const getChild = (v: ICustomer | undefined) => {
    const customer: ICustomer | undefined = v;
    if (typeof customer !== "undefined") {
      if (customer?.children.length > 0) {
        sendApiGetQuery<IChild>(`/api/children/${customer.children[0]}`).then(child => {
          setChild(child);
        })
      }
    }
  }

  useEffect(() => {

    customer$.asObservable().subscribe(v => getChild(v))

  }, [])


  return (
    <MainTemplate title='MyLittle Health 💓'>
      <div style={{ display: "flex", flexDirection: "column", height: "100vh", padding: "1rem", gap: "0.5rem" }}>

        <IonText style={{ textAlign: "center", margin: "2rem 0rem 1rem 0rem" }}>Wir haben alle Produkte nach dem durschnittlichen Verbrauch auf eine Monatsbox hochgerechnet. Passe diese aber gerne auch an.</IonText>

        <IonText style={{alignSelf: "center", margin: "0rem 0rem 1rem 0rem", fontSize: "1.5em", fontWeight: "bold"}}>{child?.childName}</IonText>

        <HealthCard title={`Gewicht ${child?.weight[0]?.value}`} text={ child?.weight[0]?.updated_at !== undefined ? `im Alter von ${Math.floor((Number.parseInt(child?.weight[0]?.updated_at)) / 1000 / 60 / 60 / 24 / 365)} Jahren`: `Alter konnte nicht ermittelt werden!`} icon={scaleSharp} date='8:13' />
        <HealthCard title={`Körpergröße ${child?.height[0]?.value}`} text={ child?.weight[0]?.updated_at !== undefined ? `im Alter von ${Math.floor((Number.parseInt(child?.weight[0]?.updated_at)) / 1000 / 60 / 60 / 24 / 365)} Jahren`: `Alter konnte nicht ermittelt werden!`} icon={speedometerSharp} date='8:13' />
        {/* <HealthCard title='Körperumfang' text='im Alter von' icon={scaleSharp} date='8:13' /> */}

        {
          child && Object.entries(child).map((entry) => {
            return <h5 key={entry[0]}>{`${entry[0]}:${JSON.stringify(entry[1])}`}</h5>
          })
        }

      </div>
    </MainTemplate>
  );
};

export default Health;
