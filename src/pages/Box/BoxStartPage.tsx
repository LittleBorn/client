import { useEffect } from 'react';
import MainTemplate from '../../components/MainTemplate';
import { IPagePros } from '../../interfaces/IPageProps';

const BoxStartPage: React.FC<IPagePros> = ({props}: IPagePros) => {


  useEffect(() => {

  }, [])
  

  return (
    <MainTemplate>
      <div style={{display: "flex", flexDirection: "column", height: "100vh", padding: "1rem", gap: "0.5rem"}}>
        BoxStartPage
      </div>
    </MainTemplate>
  );
};

export default BoxStartPage;
