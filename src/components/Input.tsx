import { IonButton, IonInput } from '@ionic/react';

interface ContainerProps {
    placeholder?: string;
}

const Input: React.FC<ContainerProps> = ({ placeholder }) => {

    return (
        <IonInput style={{}} placeholder={placeholder}/>
    );
};

export default Input;
