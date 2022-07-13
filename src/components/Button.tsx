import { AnimationBuilder, IonButton, RouterOptions } from '@ionic/react';

interface ContainerProps {
    title: string,
    style?: {
        [key: string]: any;
    } | undefined,
    onClick?: React.MouseEventHandler<HTMLIonButtonElement> | undefined,
    routerLink?: string | undefined,
    routerDirection?: "none" | "forward" | "back" | "root" | undefined,
    routerAnimation?: AnimationBuilder | undefined,
    routerOptions?: RouterOptions | undefined
}

const Button: React.FC<ContainerProps> = ({ title, style, onClick, routerLink, routerDirection, routerAnimation, routerOptions }) => {

    return (
        <IonButton 
            routerLink={routerLink}
            routerDirection={routerDirection}
            routerAnimation={routerAnimation}
            routerOptions={routerOptions}
            onClick={onClick} 
            color={style?.backgroundColor ? style?.backgroundColor : "primary"} 
            fill="solid" 
            style={style}>
                {title}
        </IonButton>
    );
};

export default Button;
