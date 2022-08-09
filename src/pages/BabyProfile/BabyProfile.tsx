import { useEffect, useState } from 'react';
import MainTemplate from '../../components/MainTemplate';
import { ICustomer } from '../../interfaces/ICustomer';
import { IPagePros } from '../../interfaces/IPageProps';
import { customer$, user$ } from '../../stores/userStore';
import { sendApiGetQuery } from '../../utils/apiHelper';

const BabyProfile: React.FC<IPagePros> = ({props}: IPagePros) => {

  const [child, setChild] = useState<any>();

  useEffect(() => {
    // fetch information about children
    const customer: ICustomer | undefined = customer$.getValue();
    if(typeof customer !== "undefined"){
      if(customer?.children.length > 0){
        sendApiGetQuery(`/api/children/${customer.children[0]}`).then(child => {
          console.log("Child"+ child)
          setChild(child);
        })
      }
    }
  }, [])
  

  return (
    <MainTemplate>
      <div style={{display: "flex", flexDirection: "column", height: "100vh", padding: "1rem", gap: "0.5rem"}}>
        Baby Profile
        <h3>{ child && JSON.stringify(child)+ "TEST" }</h3>
      </div>
    </MainTemplate>
  );
};

export default BabyProfile;
