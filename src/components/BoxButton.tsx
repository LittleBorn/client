import { AnimationBuilder, IonButton, IonText, RouterOptions } from '@ionic/react';
import { ButtonStyle } from './Button';

interface ContainerProps {
    title: string;
    text?: string;
    style?: {
        [key: string]: any;
    } | undefined,
    onClick?: React.MouseEventHandler<HTMLIonButtonElement> | undefined,
}

const BoxButtonStyle = {
    ...ButtonStyle,
    height: "5%"
}

const BoxButton: React.FC<ContainerProps> = ({ title, style, onClick, text }) => {

    return (
        <IonButton
            onClick={onClick}
            color={style?.backgroundColor ? style?.backgroundColor : "primary"}
            fill="solid"
            style={{ ...BoxButtonStyle, ...style }}>
            <div style={{display: "flex", flexDirection: "column", gap: "0.5rem", padding: "1rem"}}>
                <IonText>{title}</IonText>
                { text !== `` &&
                    <IonText style={{fontSize: "0.8em", textDecoration: "underline"}}>{text}</IonText> 
                }
            </div>
        </IonButton>
    );
};

export default BoxButton;
