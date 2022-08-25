import { IonIcon, IonText } from '@ionic/react';

interface ContainerProps {
    title: string;
    text: string;
    icon: string;
    date: string;
    onClick?: React.MouseEventHandler<HTMLIonButtonElement> | undefined;
}

const HealthCard: React.FC<ContainerProps> = ({ title, text, icon, date, onClick }) => {

    return (
        <div style={{padding: "1.5rem 1rem 1.5rem 1rem", backgroundColor: "lightgrey", borderRadius: "1rem", display: "flex", flexDirection: "row", alignItems: "center", gap: "1rem", width: "100%", position: "relative"}}>
          <IonIcon color='primary' icon={icon}></IonIcon>
          <div style={{display: 'flex', flexDirection: "column", gap: "0.3rem"}}>
            <IonText style={{fontSize: "1.1em"}}>{title}</IonText>
            <IonText style={{fontSize: "0.9em"}}>{text}</IonText>
          </div>
          <IonText style={{fontSize: "0.7em", position: "absolute", right: "10px", top: "10px"}}>{date}</IonText>
        </div>
    );
};

export default HealthCard;
