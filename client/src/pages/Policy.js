import React from "react";
import Layout from "../components/layouts/Layout";

const Policy = () => {
    return (
        <Layout title={"Privacy Policy"}>
            <div className="row contactus ">
                <div className="col-md-6 ">
                    <img
                        src="/images/contactus.jpeg"
                        alt="contactus"
                        style={{ width: "100%" }}
                    />
                </div>
                <div className="col-md-4">
                    <p>We value your privacy and are committed to protecting your personal information.</p>
                    <p>We collect information like name, email, and address to process your orders.</p>
                    <p>Your data is used to improve our services and provide better customer support.</p>
                    <p>We never sell or share your personal information with third parties without consent.</p>
                    <p>Our website uses cookies to enhance your shopping experience.</p>

                    <p>For any privacy concerns, contact us at support@eccommerce.com.</p>
                </div>
            </div>
        </Layout>
    );
};

export default Policy;
