interface Progress{
    color: string;
    title: string;
    onClick?: () => void;
}

interface ContainerProps {
    progress: Array<Progress>;
    style?: {
        [key: string]: any;
    } | undefined,
    customWidth?: string | undefined,
}

const BoxProgressBar: React.FC<ContainerProps> = ({progress, style, customWidth}) => {

    return (
        <div style={{...style, display: "flex", flexDirection: "row", gap: "1rem", justifyContent: "space-between"}}>
            { 
                progress.map((progress, index) => {
                    return (
                        <div key={`${progress.color}-${index}`} onClick={progress.onClick} style={{cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", width: customWidth ? customWidth : "100%", gap: "0.3rem"}}>
                            <div>{progress.title}</div>
                            <div style={{backgroundColor: progress.color, height: "2px", width: "100%"}}></div>
                        </div>
                    )
                })
            }
        </div>
    );
};

export default BoxProgressBar;
