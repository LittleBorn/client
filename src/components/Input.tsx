import { useState } from "react";

export type TextFieldTypes =
  | 'email'
  | 'number'
  | 'password'
  | 'search'
  | 'tel'
  | 'text'
;

interface ContainerProps {
    placeholder?: string;
    onChange?: (e: any) => void;
    value?: string | number | readonly string[] | undefined; 
    type?: TextFieldTypes | undefined;
    style?: any;
}

const Input: React.FC<ContainerProps> = ({ placeholder, onChange, value, type, style }) => {

    return (
        <input className="input-border" type={type} onChange={onChange} style={{...style, backgroundColor: "white", borderRadius: "5rem", border: "none", padding: "1rem", width: "80%"}} value={value} placeholder={placeholder}/>
    );
};

export default Input;
