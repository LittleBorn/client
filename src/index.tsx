import React, { createContext, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import { accessToken$ } from './stores/userStore';

export const AccessTokenContext = createContext<any>(null);

export const AccessTokenProvider: React.FC = ({ children }) => {
  const [accessToken, setAccessToken] = useState<any>(null);

  useEffect(() => {
    accessToken$.asObservable().subscribe(value => {
      console.log("AccessToken$ Observable changed: ", value)
      if(typeof value?.accessToken !== "undefined" && typeof value?.expiresAt !== "undefined"){
        localStorage.setItem("accessToken", value.accessToken);
        localStorage.setItem("expiresAt", value.expiresAt)
      }else{
        localStorage.removeItem("accessToken")
        localStorage.removeItem("expiresAt")
      }
      setAccessToken(value)
    })
    return () => {
      accessToken$.unsubscribe();
    }
  }, []);

  return <AccessTokenContext.Provider value={accessToken}> {children} </AccessTokenContext.Provider>;
};

ReactDOM.render(
  <AccessTokenProvider>
    <App />
  </AccessTokenProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
