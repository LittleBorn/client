import { IonText } from '@ionic/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import MainTemplate from '../../components/MainTemplate';
import { IPagePros } from '../../interfaces/IPageProps';
import { IUser } from '../../interfaces/IUser';
import { accessToken$, user$ } from '../../stores/userStore';
import BoxPreview from './BoxPreview';

import Settings from '../Settings/Settings';

const Home: React.FC<IPagePros> = ({ props }: IPagePros) => {

  const [user, setUser] = useState<IUser | undefined>(user$.getValue())
  const [date, setDate] = useState<string | undefined>();

  const check = async () => {
    // 1) Customer ID holen
    var config = {
      method: 'get',
      url: `${process.env.REACT_APP_SERVER_URL}/api/auth/getCustomerIdFromAccessToken`,
      headers: {
        'Authorization': `Bearer ${accessToken$.getValue()?.accessToken}`
      }
    };
    const customerId: string = (await axios(config))?.data?.id;
    // 2) Customer Object über API erstellen - falls Ergebnis undefined
    if (!customerId) {
      var config2 = {
        method: 'post',
        url: `${process.env.REACT_APP_SERVER_URL}/api/customer`,
        headers: {
          'Authorization': `Bearer ${accessToken$.getValue()?.accessToken}`,
          'Content-Type': 'application/json'
        },
        data: JSON.stringify({
          "shopifyId": `${accessToken$.getValue()?.accessToken}`
        })
      };
      const newCustomer = (await axios(config2))?.data;
      // TTTTTTTTOOOOOOOOOOODDDDDDDDOOOOOOOO fehler ausgeben
    }
    // 3) Customer Object mit CustomerId holen
    var config1 = { ...config, url: `${process.env.REACT_APP_SERVER_URL}/api/customer/${customerId}` };
    const customer = (await axios(config1))?.data;
    console.log(customer)
    // 4) Kinder zählen
    if (customer?.children?.length < 1) {
      // keine Kinder -> navigieren
      console.log("Keine Kinder")
      props.history.push("/SetupStartPage");
    } else {
      console.log("User hat " + customer?.children?.length + " Kinde(r)!")
    }

  }

  useEffect(() => {

    user$.asObservable().subscribe(v => setUser(v))
    setDate(new Date().toLocaleDateString('de-DE', { weekday: 'long', month: 'long', day: 'numeric' }))

    // check for customer + child object
    check();

  }, [])


  return (
    <MainTemplate>
      <div style={{ display: "flex", flexDirection: "column", height: "100vh", padding: "1rem", gap: "0.5rem" }}>
        <IonText style={{ fontSize: "1.3em" }}>{user ? <b>Hallo {user.firstName}!</b> : <b>Hallo!</b>}</IonText>
        {date ? <IonText color="dark">Heute ist {date}</IonText> : <IonText color="dark">Heute ist ein schöner Tag!</IonText>}
        <BoxPreview />
        <button onClick={() => {
          accessToken$.next(undefined);
        }}>Logout</button>
      </div>
    </MainTemplate>
  );
};

export default Home;
