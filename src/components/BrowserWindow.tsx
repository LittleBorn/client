import { InAppBrowser } from "@awesome-cordova-plugins/in-app-browser"
import { useEffect } from 'react';

interface ContainerProps {
    close: () => void;
    url: string;
}

const BrowserWindow: React.FC<ContainerProps> = ({ url, close }) => {

    const test = () => console.log("Closed")

    useEffect(() => {
        var ref = InAppBrowser.create(url)
    }, [])


    return (
        <div style={{ position: "fixed", top: "2rem", bottom: "2rem", right: "2rem", left: "2rem", display: "flex", flexDirection: "column", backgroundColor: "green", zIndex: "999" }}>
            <h1>Browser</h1>
            <h5 onClick={close}>Close</h5>
            <h3>{url}</h3>
        </div>
    );
};

export default BrowserWindow;
