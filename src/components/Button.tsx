import { IonButton } from '@ionic/react';

interface ContainerProps {
    title: string,
    style?: {
        [key: string]: any;
    } | undefined
}

const Button: React.FC<ContainerProps> = ({ title, style }) => {

    return (
        <IonButton color="primary" fill="solid" style={style}>{title}</IonButton>
    );
};

export default Button;
