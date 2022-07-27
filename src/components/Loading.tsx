import { IonLoading } from '@ionic/react';
import { useEffect, useState } from 'react';
import { loading$ } from '../utils/globalStore';

interface ContainerProps {

}

const Loading: React.FC<ContainerProps> = () => {

    const [loading, setLoading] = useState(loading$.getValue())

    useEffect(() => {

      const subscription = loading$.asObservable().subscribe((s) => {
        setLoading(s)
      });
    
      return () => {
        subscription.unsubscribe();
      }
    }, [])
    

    return (
        <IonLoading isOpen={loading}/>
    );
};

export default Loading;
