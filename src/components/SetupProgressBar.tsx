import { useEffect, useState } from "react";

interface ContainerProps {
    progress: Array<string>;
    style?: {
        [key: string]: any;
    } | undefined,
}

const SetupProgressBar: React.FC<ContainerProps> = ({progress, style}) => {

    return (
        <div style={{...style, display: "flex", flexDirection: "row", gap: "1rem"}}>
            { 
                progress.map((color) => {
                    return (
                        <div style={{backgroundColor: color, height: "2px", width: "5rem"}}></div>
                    )
                })
            }
        </div>
    );
};

export default SetupProgressBar;
