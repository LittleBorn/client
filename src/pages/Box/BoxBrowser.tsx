import { useEffect } from 'react';
import MainTemplate from '../../components/MainTemplate';
import { IPagePros } from '../../interfaces/IPageProps';

const BoxBrowser: React.FC<IPagePros> = ({ props }: IPagePros) => {

    useEffect(() => {
        const state: any = props.location.state;
        const url: string = state.url;
        setTimeout(() => {
            window.location.replace(`${url}`)
        }, 200)
    }, [])

    return (
        <MainTemplate title='Bestellung abschließen 🎁'>
            <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center", height: "90%", gap: "2rem", paddingBottom: "2rem" }}>
                Lädt...
            </div>
        </MainTemplate>
    );
};

export default BoxBrowser;
