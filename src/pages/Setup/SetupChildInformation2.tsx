import { IonDatetime, IonText, useIonLoading, useIonToast } from '@ionic/react';
import Button from '../../components/Button';
import SetupTemplate from '../../components/SetupTemplate';
import { useEffect, useState } from 'react';
import SetupProgressBar from '../../components/SetupProgressBar';
import { Link } from 'react-router-dom';
import { IPagePros } from '../../interfaces/IPageProps';
import axios from "axios"
import { accessToken$ } from '../../stores/userStore';

const SetupChildInformation2: React.FC<IPagePros> = ({ props }: IPagePros) => {

  const [presentToast, dismissToast] = useIonToast();
  const [presentLoading, dismissLoading] = useIonLoading();

  // Child Information 1
  const [childName, setChildName] = useState('')
  const [gender, setGender] = useState('')
  const [height, setHeight] = useState(1500)
  const [weight, setWeight] = useState(1500)

  // Child Information 2
  const [birthDate, setBirthDate] = useState(new Date());

  useEffect(() => {
    const childInfo1: any = props.location.state;
    if (typeof childInfo1 !== 'undefined') {
      if (typeof childInfo1.childName !== 'undefined') setChildName(childInfo1.childName);
      if (typeof childInfo1.gender !== 'undefined') setGender(childInfo1.gender);
      if (typeof childInfo1.height !== 'undefined') setHeight(childInfo1.height);
      if (typeof childInfo1.weight !== 'undefined') setWeight(childInfo1.weight);
      if (typeof childInfo1.birthDate !== 'undefined') setBirthDate(childInfo1.birthDate);
    }
  }, [props.location.state])


  const createChild = () => {
    //{birthDate: '2022-08-11T22:36:00+02:00', childName: 'David', gender: 'male', height: 1993, weight: 2993}
    console.log({
      birthDate,
      childName,
      gender,
      height,
      weight
    })
    var data = JSON.stringify({
      "childName": childName,
      "height": height,
      "weight": weight,
      "gender": gender,
      "birthDate": birthDate
    });

    var config = {
      method: 'post',
      url: `${process.env.REACT_APP_SERVER_URL}/api/children`,
      headers: {
        'Authorization': `Bearer ${accessToken$.getValue()?.accessToken}`,
        'Content-Type': 'application/json'
      },
      data: data
    };

    axios(config)
      .then(function (response) {
        if (response.data) {

          // ADD CHILD ASSOCIATION
          var config = {
            method: 'get',
            url: `${process.env.REACT_APP_SERVER_URL}/api/customer/addChildAssociation/${response.data?._id}`,
            headers: {
              'Authorization': `Bearer ${accessToken$.getValue()?.accessToken}`
            }
          };

          axios(config)
            .then(function (response) {
              if (response.data) {
                props.history.push("/SetupSuccess");
              } else {
                // fehler beim anlegen
                presentToast("Problem beim anlegen! Bitte versuchen Sie es zu einem späteren Zeitpunkt erneut!", 2000)
              }
            })
            .catch(function (error) {
              console.log(error);
            });
        } else {
          // fehler beim anlegen
          presentToast("Problem beim anlegen! Bitte versuchen Sie es zu einem späteren Zeitpunkt erneut!", 2000)
        }
      })
      .catch(function (error) {
        presentToast("Schnittstelle kann nicht erreicht werden. Bitte versuchen Sie es zu einem späteren Zeitpunkt erneut!", 2000)
      });

  }

  return (
    <SetupTemplate>
      <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center", height: "100vh", gap: "1.5rem", paddingBottom: "2rem" }}>

        <SetupProgressBar style={{ marginBottom: "2rem" }} progress={["#44C1AD", "#44C1AD"]} />

        <IonText style={{ fontWeight: "bold", fontSize: "1.3em" }}>Nun zu deinem Engel 👶</IonText>

        <IonDatetime onIonChange={(e: any) => setBirthDate(e.target.value)} style={{ borderRadius: "1rem" }} presentation="date"></IonDatetime>

        <Link to="/SetupInformation"><IonText style={{ color: "#44C1AD", textDecoration: "underline" }}>Warum benötigen wir diese Infos?</IonText></Link>

        <Button onClick={createChild} title="Anlegen" style={{ backgroundColor: "#44C1AD", width: 350, height: 55 }} />

        <Link to={{
          pathname: "/SetupChildInformation", state: {
            birthDate,
            childName,
            gender,
            height,
            weight
          }
        }}><IonText style={{ color: "#44C1AD" }}>zurück</IonText></Link>


      </div>

    </SetupTemplate>
  );
};

export default SetupChildInformation2;
