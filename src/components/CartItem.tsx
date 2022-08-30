import { useEffect } from 'react';
import { IShopifyCardLineInput } from '../interfaces/Shopify/IShopifyCardLineInput';

interface ContainerProps {
    cardLine: IShopifyCardLineInput,
    style?: {
        [key: string]: any;
    } | undefined,
    onClick?: () => void | undefined,
}


const CartItem: React.FC<ContainerProps> = ({ cardLine, style, onClick }) => {

    useEffect(() => {

        // fetch product variant

    }, [])

    const incrementCount = () => {
        console.log("Increment Count")
    }

    const decrementCount = () => {
        console.log("Decrement Count")
    }

    return (
        <div
            onClick={onClick}
            style={{ ...style, ...{display: "flex", alignItems: "center", gap: "1rem", border: "1px solid lightgrey"} }}>
            {cardLine.merchandiseId}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem"}}>
                <div onClick={incrementCount} style={{ cursor: "pointer", padding: "1rem", border: "1px solid lightgrey", borderRadius: "5rem", width: "2rem", height: "2rem", display: "flex", alignItems: "center", justifyContent: "center" }}>-</div>
                <div>{cardLine.quantity}</div>
                <div onClick={decrementCount} style={{ cursor: "pointer", padding: "1rem", border: "1px solid lightgrey", borderRadius: "5rem", width: "2rem", height: "2rem", display: "flex", alignItems: "center", justifyContent: "center" }}>+</div>
            </div>
        </div>
    );
};

export default CartItem;
