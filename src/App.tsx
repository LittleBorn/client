import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonIcon, IonLabel, IonRouterOutlet, IonTab, IonTabBar, IonTabButton, IonTabs, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home/Home';

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
import { useContext } from 'react';
import { AccessTokenContext } from '.';
import { home, cube, medkit, notifications, settings } from 'ionicons/icons';
import AGB from './pages/AGB/AGB';
import SetupChildInformation2 from './pages/Setup/SetupChildInformation2';
import BabyProfile from './pages/BabyProfile/BabyProfile';

setupIonicReact();

const SecureRoutes = () => {
  return (
    <IonTabs>
      <IonTabBar slot="bottom">
        <IonTabButton tab="home" href="/Home">
          <IonIcon icon={home} />
          <IonLabel>Übersicht</IonLabel>
        </IonTabButton>
        <IonTabButton tab="box" href="/Box">
          <IonIcon icon={cube} />
          <IonLabel>Meine Box</IonLabel>
        </IonTabButton>
        <IonTabButton tab="health" href="/Health">
          <IonIcon icon={medkit} />
          <IonLabel>Health</IonLabel>
        </IonTabButton>
        <IonTabButton tab="notification" href="/Notification">
          <IonIcon icon={notifications} />
          <IonLabel>Nachrichten</IonLabel>
        </IonTabButton>
        <IonTabButton tab="settings" href="/Settings">
          <IonIcon icon={settings} />
          <IonLabel>Einstellungen</IonLabel>
        </IonTabButton>
      </IonTabBar>


      <IonRouterOutlet>
        {/* Setup */}
        <Route path="/SetupInformation" render={(props) => <SetupInformation props={{ ...props }} />} exact={true} />
        <Route path="/SetupSuccess" render={(props) => <SetupSuccess props={{ ...props }} />} exact={true} />
        <Route path="/SetupChildInformation" render={(props) => <SetupChildInformation props={{ ...props }} />} exact={true} />
        <Route path="/SetupChildInformation2" render={(props) => <SetupChildInformation2 props={{ ...props }} />} exact={true} />
        <Route path="/SetupStartPage" render={(props) => <SetupStartPage props={{ ...props }} />} exact={true} />
        {/* Side Bar */}
        <Route path="/BabyProfile" render={(props) => <BabyProfile props={{ ...props }} />} exact={true} />
        {/* Menu */}
        <Route path="/Home" render={(props) => <Home props={{ ...props }} />} exact={true} />
        <Route render={() => <Redirect to="/Home" />} />
      </IonRouterOutlet>
      
    </IonTabs>
  );
}

const PublicRoutes = () => {
  return (
    <IonRouterOutlet>
      <Route path="/StartPage" render={(props) => <StartPage props={{ ...props }} />} exact={true} />
      <Route path="/Register" render={(props) => <Register props={{ ...props }} />} exact={true} />
      <Route path="/Login" render={(props) => <Login props={{ ...props }} />} exact={true} />
      <Route path="/LostPassword" render={(props) => <LostPassword props={{ ...props }} />} exact={true} />
      <Route path="/LostPasswordMail" render={(props) => <LostPasswordMail props={{ ...props }} />} exact={true} />
      <Route path="/AGB" render={(props) => <AGB props={{ ...props }} />} exact={true} />
      <Route render={() => <Redirect to="/StartPage" />} />
    </IonRouterOutlet>
  );
}

const App: React.FC = () => {

  const accessToken = useContext(AccessTokenContext);

  return <IonApp>
    <IonReactRouter>
      {accessToken ? <SecureRoutes /> : <PublicRoutes />}
    </IonReactRouter>
  </IonApp>;
};

export default App;
