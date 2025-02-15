import React from 'react';
import Layout from '../components/layouts/Layout';

const About = () => {
    return (
        <Layout title={"About us - Ecommerce app"}>
            <div className="row contactus ">
                <div className="col-md-6 ">
                    <img
                        src="/images/about.jpeg"
                        alt="contactus"
                        style={{ width: "100%" }}
                    />
                </div>
                <div className="col-md-4">
                    <p className="text-justify mt-2">
                        Welcome to our Ecommerce platform! We are dedicated to providing our customers with high-quality products at the best prices.
                        Our mission is to make online shopping simple, secure, and enjoyable for everyone.
                    </p>
                    <p className="text-justify mt-2">
                        Our team works tirelessly to curate a wide range of products to meet your needs. From everyday essentials to unique finds,
                        we aim to be your go-to online store.
                    </p>
                    <p className="text-justify mt-2">
                        Customer satisfaction is at the heart of everything we do. We are committed to providing exceptional service,
                        fast shipping, and a seamless shopping experience.
                    </p>
                </div>
            </div>
        </Layout>
    );
};

export default About;
