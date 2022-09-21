import { AnimationBuilder, IonButton, RouterOptions } from '@ionic/react';

interface ContainerProps {
    title: string;
    onClick?: React.MouseEventHandler<HTMLDivElement> | undefined
    routerLink?: string | undefined,
    routerDirection?: "none" | "forward" | "back" | "root" | undefined,
    routerAnimation?: AnimationBuilder | undefined,
    routerOptions?: RouterOptions | undefined
}

export const ButtonStyle = {
    borderRadius: "50%",
    backgroundColor: "#44C1AD",
    color: "white",
    width: "3rem",
    height: "3rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: "4px",
    fontSize: "1.3em"
}

const PaginationButton: React.FC<ContainerProps> = ({ title, onClick, routerLink, routerDirection, routerAnimation, routerOptions }) => {

    return (
        <div 
            onClick={onClick} 
            style={ButtonStyle}>
                {title}
        </div>
    );
};

export default PaginationButton;
