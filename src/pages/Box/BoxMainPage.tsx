import { useEffect } from 'react';
import MainTemplate from '../../components/MainTemplate';
import { IPagePros } from '../../interfaces/IPageProps';

const BoxMainPage: React.FC<IPagePros> = ({props}: IPagePros) => {


  useEffect(() => {
    // fetch products
  }, [])
  

  return (
    <MainTemplate title='Deine Box 🎁'>
      <div style={{display: "flex", flexDirection: "column", height: "100vh", padding: "1rem", gap: "0.5rem"}}>
        
      </div>
    </MainTemplate>
  );
};

export default BoxMainPage;
