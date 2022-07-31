import { IonText } from '@ionic/react';
import Button from '../../components/Button';
import SetupTemplate from '../../components/SetupTemplate';
import { IPagePros } from '../../interfaces/IPageProps';

const AGB: React.FC<IPagePros> = ({ props }: IPagePros) => {

    return (
        <SetupTemplate>
            <div style={{display: "flex", alignItems: "center", padding: "1rem", flexDirection: "column", justifyContent: "center", height: "100vh", gap: "1rem"}}>
                <IonText style={{fontSize: "2em"}}>Test</IonText>
                <IonText style={{fontSize: "1em"}}>AGB Test </IonText>
                <Button style={{width: "80%"}} title="Back" routerDirection="back" routerLink='/Register'/>
            </div>
        </SetupTemplate>
    );
};

export default AGB;
