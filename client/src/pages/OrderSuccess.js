import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import { BsCheckCircle } from "react-icons/bs";

const OrderSuccess = () => {
    const [cart, setCart] = useCart();
    const navigate = useNavigate();

    // Clear cart and redirect after 5 seconds
    useEffect(() => {
        localStorage.removeItem("cart");
        setCart([]);
        const timer = setTimeout(() => {
            navigate("/");
        }, 500);

        return () => clearTimeout(timer);
    }, [setCart, navigate]);

    // Inline CSS styles
    const containerStyle = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#f9fafb",
        textAlign: "center",
    };

    const checkmarkWrapperStyle = {
        width: "120px",
        height: "120px",
        borderRadius: "50%",
        backgroundColor: "#4caf50",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: "20px",
    };

    const iconStyle = {
        color: "white",
        fontSize: "60px",
    };

    const headingStyle = {
        fontSize: "32px",
        color: "#333",
        marginBottom: "10px",
    };

    const paragraphStyle = {
        fontSize: "18px",
        color: "#555",
    };

    return (
        <div style={containerStyle}>
            <div style={checkmarkWrapperStyle}>
                <BsCheckCircle style={iconStyle} />
            </div>
            <h1 style={headingStyle}>Order Placed Successfully!</h1>
            <p style={paragraphStyle}>You will be redirected to the home page shortly...</p>
        </div>
    );
};

export default OrderSuccess;
