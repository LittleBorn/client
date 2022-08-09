import { useEffect, useState } from "react";

interface ContainerProps {
    progress: Array<string>;
    style?: {
        [key: string]: any;
    } | undefined,
    customWidth?: string | undefined,
}

const SetupProgressBar: React.FC<ContainerProps> = ({progress, style, customWidth}) => {

    return (
        <div style={{...style, display: "flex", flexDirection: "row", gap: "1rem"}}>
            { 
                progress.map((color, index) => {
                    return (
                        <div key={`${color}-${index}`} style={{backgroundColor: color, height: "2px", width: customWidth ? customWidth : "5rem"}}></div>
                    )
                })
            }
        </div>
    );
};

export default SetupProgressBar;
