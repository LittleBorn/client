import { IonImg, IonText, useIonLoading, useIonToast } from '@ionic/react';
import { useEffect, useState } from 'react';
import MainTemplate from '../../components/MainTemplate';
import { IPagePros } from '../../interfaces/IPageProps';
import shopping_app from "../../assets/images/shopping_app.svg"
import Button from '../../components/Button';

const BoxCheckout: React.FC<IPagePros> = ({ props }: IPagePros) => {

    // const [presentToast, dismissToast] = useIonToast();
    const [presentLoading, dismissLoading] = useIonLoading();

    const [url, setUrl] = useState("https://littleborn.de/");

    useEffect(() => {
        const state: any = props.location.state;
        const url: string = state.url;
        console.log("URL", url)
        setUrl(url)
        presentLoading("Deine Bestellung wird vorbereitet", 5000)
        setTimeout(() => {
            localStorage.removeItem("should-redirect")
            props.history.push("/BoxBrowser", { url: state.url})
        }, 1000)
        

    }, [])

    return (
        <MainTemplate title='Bestellung abschließen 🎁'>
            <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center", height: "90%", gap: "2rem", paddingBottom: "2rem" }}>

                <IonText style={{ fontWeight: "bold", fontSize: "1.3em" }}>Warenkorb wurde gesendet!</IonText>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <IonImg src={shopping_app} style={{ height: 200 }} />
                </div>

                <IonText style={{ fontSize: "1em", textAlign: "center", width: "80%" }}>Bitte schließen Sie den Kauf in Ihrem Browser ab. Sollten Sie nicht umgeleitet werden drücken Sie bitte <IonText onClick={() => window.location.replace(url)} color={"primary"}>hier</IonText>.</IonText>

                <div style={{ justifySelf: "flex-end" }}>
                    <Button onClick={() => props.history.push("/Home")} title="Zur Übersicht" style={{ backgroundColor: "#44c1ad", width: 350, height: 55 }} />
                </div>

            </div>
        </MainTemplate>
    );
};

export default BoxCheckout;
