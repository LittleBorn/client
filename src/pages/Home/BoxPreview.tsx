import { IonIcon, IonText } from '@ionic/react';
import { useEffect } from 'react';
import { cubeOutline } from 'ionicons/icons';

const BoxPreview: React.FC = () => {

    useEffect(() => {

        return () => {

        }
    }, [])


    return (
        <div style={{ backgroundColor: "#44C1AD", width: "90%", height: "10%", alignSelf: "center", borderRadius: "0.5rem", display: "flex", alignItems: "center", justifyContent: "center", margin: "0.5rem 0rem 0.5rem 0rem", gap: "2rem"}}>

            <IonIcon icon={cubeOutline} style={{height: "3rem", width: "3rem"}}/>

            <div style={{display: "flex", flexDirection: "column", justifyContent: "space-around", gap: "0.5rem", alignItems: "center"}}>
                <IonText style={{fontSize: "0.9em"}}>Deine nächste Box kommt in <b>X Tagen!</b></IonText>
                <IonText style={{fontSize: "0.9em", textDecoration: "underline"}}>Es gibt <b>2</b> Änderungsvorschläge</IonText>
            </div>
        </div>
    );
};

export default BoxPreview;
