import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/layouts/AdminMenu";
import Layout from "../../components/layouts/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Products = () => {
    const [products, setProducts] = useState([]);

    // Get all products
    const getAllProducts = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-product`);
            setProducts(data.products);
        } catch (error) {
            console.log(error);
            toast.error("Something Went Wrong");
        }
    };

    // Lifecycle method
    useEffect(() => {
        getAllProducts();
    }, []);

    return (
        <Layout>
            <div className="row">
                <div className="col-md-3">
                    <AdminMenu />
                </div>
                <div className="col-md-9">
                    <h1 className="text-center">All Products List</h1>
                    <div className="row">
                        {products?.map((p) => (
                            <div key={p._id} className="col-md-4 mb-3">
                                <Link to={`/dashboard/admin/product/${p.slug}`} className="product-link">
                                    <div className="card m-2 h-100 d-flex flex-column">
                                        {/* Image */}
                                        <img
                                            src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                                            className="card-img-top"
                                            alt={p.name}
                                            style={{ height: "200px", objectFit: "cover" }}
                                        />
                                        {/* Card Body */}
                                        <div className="card-body d-flex flex-column">
                                            <h5 className="card-title">{p.name}</h5>
                                            <p className="card-text flex-grow-1" style={{ overflow: "hidden", textOverflow: "ellipsis", maxHeight: "60px" }}>
                                                {p.description}
                                            </p>
                                        </div>
                                        {/* Footer */}
                                        <div className="card-footer bg-transparent border-top-0">
                                            <Link to={`/dashboard/admin/product/${p.slug}`} className="btn btn-primary btn-sm">
                                                View Details
                                            </Link>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Products;
