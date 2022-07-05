import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import Button from '../../components/Button';
import SetupTemplate from '../../components/SetupTemplate';

const Login: React.FC = () => {
  return (
    <SetupTemplate>
      <h1>Login</h1>
      <Button title="Login"/>
    </SetupTemplate>
  );
};

export default Login;
