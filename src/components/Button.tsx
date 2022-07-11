import { IonButton } from '@ionic/react';

interface ContainerProps {
    title: string,
    style?: {
        [key: string]: any;
    } | undefined,
    onClick?: React.MouseEventHandler<HTMLIonButtonElement> | undefined
}

const Button: React.FC<ContainerProps> = ({ title, style, onClick }) => {

    return (
        <IonButton 
            onClick={onClick} 
            color={style?.backgroundColor ? style?.backgroundColor : "primary"} 
            fill="solid" 
            style={style}>
                {title}
        </IonButton>
    );
};

export default Button;
