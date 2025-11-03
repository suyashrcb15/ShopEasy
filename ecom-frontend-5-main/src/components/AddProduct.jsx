import React, { useState } from "react";
import axios from "axios";

const AddProduct = () => {
    const [product, setProduct] = useState({
        name: "",
        brand: "",
        description: "",
        price: "",
        category: "",
        stockQuantity: "",
        releaseDate: "",
        productAvailable: false,
    });
    const [image, setImage] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const submitHandler = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("imageFile", image);
        formData.append(
            "product",
            new Blob([JSON.stringify(product)], { type: "application/json" })
        );

        axios
            .post("http://localhost:8080/api/product", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            })
            .then((response) => {
                console.log("Product added successfully:", response.data);
                alert("✅ Product added successfully!");
            })
            .catch((error) => {
                console.error("Error adding product:", error);
                alert("❌ Error adding product");
            });
    };

    return (
        <>
            {/* Product Form Section */}
            <div className="container py-5 d-flex justify-content-center align-items-center flex-column">
                <div
                    className="card shadow-lg border-0 p-4 w-100"
                    style={{
                        maxWidth: "850px",
                        borderRadius: "15px",
                        backgroundColor: "#ffffff",
                        marginBottom: "50px",
                    }}
                >
                    <h3 className="text-center mb-4 fw-bold text-primary">
                        Add New Product
                    </h3>

                    <form className="row g-4" onSubmit={submitHandler}>
                        {/* Product Name */}
                        <div className="col-md-6">
                            <label className="form-label fw-semibold">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Product Name"
                                name="name"
                                value={product.name}
                                onChange={handleInputChange}
                            />
                        </div>

                        {/* Brand */}
                        <div className="col-md-6">
                            <label className="form-label fw-semibold">Brand</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Brand"
                                name="brand"
                                value={product.brand}
                                onChange={handleInputChange}
                            />
                        </div>

                        {/* Description */}
                        <div className="col-12">
                            <label className="form-label fw-semibold">Description</label>
                            <textarea
                                className="form-control"
                                rows="3"
                                placeholder="Add product description"
                                name="description"
                                value={product.description}
                                onChange={handleInputChange}
                            ></textarea>
                        </div>

                        {/* Price */}
                        <div className="col-md-4">
                            <label className="form-label fw-semibold">Price</label>
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Eg: ₹1000"
                                name="price"
                                value={product.price}
                                onChange={handleInputChange}
                            />
                        </div>

                        {/* Category */}
                        <div className="col-md-4">
                            <label className="form-label fw-semibold">Category</label>
                            <select
                                className="form-select"
                                name="category"
                                value={product.category}
                                onChange={handleInputChange}
                            >
                                <option value="">Select category</option>
                                <option value="Laptop">Laptop</option>
                                <option value="Headphone">Headphone</option>
                                <option value="Mobile">Mobile</option>
                                <option value="Electronics">Electronics</option>
                                <option value="Toys">Toys</option>
                                <option value="Fashion">Fashion</option>
                            </select>
                        </div>

                        {/* Stock Quantity */}
                        <div className="col-md-4">
                            <label className="form-label fw-semibold">Stock Quantity</label>
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Stock Remaining"
                                name="stockQuantity"
                                value={product.stockQuantity}
                                onChange={handleInputChange}
                            />
                        </div>

                        {/* Release Date */}
                        <div className="col-md-6">
                            <label className="form-label fw-semibold">Release Date</label>
                            <input
                                type="date"
                                className="form-control"
                                name="releaseDate"
                                value={product.releaseDate}
                                onChange={handleInputChange}
                            />
                        </div>

                        {/* Image */}
                        <div className="col-md-6">
                            <label className="form-label fw-semibold">Product Image</label>
                            <input
                                type="file"
                                className="form-control"
                                onChange={handleImageChange}
                            />
                        </div>

                        {/* Checkbox */}
                        <div className="col-12">
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="productAvailable"
                                    name="productAvailable"
                                    checked={product.productAvailable}
                                    onChange={(e) =>
                                        setProduct({
                                            ...product,
                                            productAvailable: e.target.checked,
                                        })
                                    }
                                />
                                <label className="form-check-label ms-2">
                                    Product Available
                                </label>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="col-12 text-center mt-3">
                            <button
                                type="submit"
                                className="btn btn-primary px-4 py-2 fw-semibold"
                                style={{ borderRadius: "8px" }}
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* ✅ Footer Section */}
            <footer
                style={{
                    background: "linear-gradient(to right, #6366F1, #8B5CF6)",
                    color: "#fff",
                    padding: "30px 20px",
                    textAlign: "center",
                    marginTop: "auto",
                    width: "100%",
                }}
            >
                <h3 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>ShopEasy</h3>
                <p style={{ margin: "10px 0" }}>
                    Making online shopping simple, fast, and delightful.
                </p>
                <div style={{ marginTop: "15px" }}>
                    <a
                        href="/about"
                        style={{
                            color: "#fff",
                            textDecoration: "none",
                            margin: "0 10px",
                            fontWeight: "500",
                        }}
                    >
                        About
                    </a>
                    <a
                        href="/contact"
                        style={{
                            color: "#fff",
                            textDecoration: "none",
                            margin: "0 10px",
                            fontWeight: "500",
                        }}
                    >
                        Contact
                    </a>
                    <a
                        href="https://www.instagram.com"
                        target="_blank"
                        rel="noreferrer"
                        style={{
                            color: "#fff",
                            textDecoration: "none",
                            margin: "0 10px",
                            fontWeight: "500",
                        }}
                    >
                        Instagram
                    </a>
                </div>
                <p style={{ marginTop: "15px", fontSize: "0.9rem", opacity: 0.8 }}>
                    © {new Date().getFullYear()} ShopEasy. All rights reserved.
                </p>
            </footer>
        </>
    );
};

export default AddProduct;
