import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

import './App.css'

import Login from './pages/Login/Login';
import LostPassword from './pages/LostPassword/LostPassword';
import LostPasswordMail from './pages/LostPassword/LostPasswordMail';
import Register from './pages/Register/Register';
import StartPage from './pages/StartPage/StartPage';
import SetupStartPage from './pages/Setup/SetupStartPage';
import SetupChildInformation from './pages/Setup/SetupChildInformation';
import SetupSuccess from './pages/Setup/SetupSuccess';
import SetupInformation from './pages/Setup/SetupInformation';

setupIonicReact();

const isLoggedIn = false; 

const SecureRoutes = () => {
  return (
      <IonRouterOutlet>
        <Route path="/Home" render={() => <Home/>} exact={true} />
        <Route exact path="/" render={() => <Redirect to="/Home" />} />
      </IonRouterOutlet>
  );
}

const PublicRoutes = () => {
  return (
      <IonRouterOutlet>
        <Route path="/SetupInformation" render={() => <SetupInformation/>} exact={true} />
        <Route path="/SetupSuccess" render={() => <SetupSuccess/>} exact={true} />
        <Route path="/SetupChildInformation" render={() => <SetupChildInformation/>} exact={true} />
        <Route path="/SetupStartPage" render={() => <SetupStartPage/>} exact={true} />
        <Route path="/StartPage" render={() => <StartPage/>} exact={true} />
        <Route path="/Register" render={() => <Register/>} exact={true} />
        <Route path="/Login" render={() => <Login/>} exact={true} />
        <Route path="/LostPassword" render={() => <LostPassword/>} exact={true} />
        <Route path="/LostPasswordMail" render={() => <LostPasswordMail/>} exact={true} />
        <Route exact path="/" render={() => <Redirect to="/Login" />} />
      </IonRouterOutlet>
  );
}

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      {isLoggedIn ? <SecureRoutes /> : <PublicRoutes />}
    </IonReactRouter>
  </IonApp>
);

export default App;
