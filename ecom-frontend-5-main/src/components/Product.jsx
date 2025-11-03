// src/pages/Product.jsx
import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../axios";
import AppContext from "../Context/Context";
import "./Product.css";

const Product = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart, removeFromCart } = useContext(AppContext);

    const [product, setProduct] = useState(null);
    const [imageUrl, setImageUrl] = useState("");
    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState({ name: "", rating: 0, comment: "" });
    const [showReviews, setShowReviews] = useState(false);

    // 🧭 Fetch product details
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await API.get(`/product/${id}`);
                setProduct(response.data);
                if (response.data.imageName) fetchImage(response.data.imageName);
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };

        const fetchImage = async (imageName) => {
            try {
                const res = await API.get(`/product/${id}/image`, { responseType: "blob" });
                setImageUrl(URL.createObjectURL(res.data));
            } catch (err) {
                console.error("Error loading product image:", err);
            }
        };

        fetchProduct();
    }, [id]);

    // 🗑 Delete product
    const deleteProduct = async () => {
        try {
            await API.delete(`/product/${id}`);
            removeFromCart(id);
            alert("✅ Product deleted successfully");
            navigate("/products");
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    // ✏️ Update product
    const handleEditClick = () => navigate(`/product/update/${id}`);

    // 🛒 Add to cart
    const handleAddToCart = () => {
        addToCart(product);
        alert("🛒 Product added to cart");
    };

    // ⭐ Handle new review submission
    const handleReviewSubmit = (e) => {
        e.preventDefault();
        if (!newReview.name || !newReview.rating || !newReview.comment) {
            alert("⚠️ Please fill all review fields");
            return;
        }
        const date = new Date().toLocaleDateString();
        setReviews([...reviews, { ...newReview, date }]);
        setNewReview({ name: "", rating: 0, comment: "" });
    };

    const averageRating =
        reviews.length > 0
            ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
            : 0;

    if (!product) {
        return (
            <h2 className="text-center" style={{ padding: "10rem" }}>
                Loading...
            </h2>
        );
    }

    return (
        <div className="product-page container mt-5">
            <div className="row">
                {/* 🖼️ Product Image */}
                <div className="col-md-6 text-center">
                    <img
                        src={imageUrl}
                        alt={product.name}
                        className="img-fluid rounded shadow-sm main-product-image"
                    />
                </div>

                {/* 🧾 Product Details */}
                <div className="col-md-6">
                    <h2 className="fw-bold mb-2">{product.name}</h2>
                    <p className="text-muted mb-1">{product.brand}</p>
                    <div className="mb-3">
            <span className="text-warning fs-5">
              {"★".repeat(Math.round(averageRating)) +
                  "☆".repeat(5 - Math.round(averageRating))}
            </span>
                        <span className="ms-2 text-secondary">
              ({averageRating}/5 from {reviews.length} reviews)
            </span>
                    </div>

                    <p>
                        <strong>Category:</strong> {product.category}
                    </p>
                    <p>{product.description}</p>

                    <h3 className="text-danger fw-bold mb-3">₹{product.price}</h3>

                    <button
                        className="btn btn-warning me-2 px-4 py-2"
                        onClick={handleAddToCart}
                        disabled={!product.productAvailable}
                    >
                        {product.productAvailable ? "Add to Cart" : "Out of Stock"}
                    </button>

                    <button className="btn btn-outline-primary me-2" onClick={handleEditClick}>
                        Update
                    </button>

                    <button className="btn btn-outline-danger" onClick={deleteProduct}>
                        Delete
                    </button>

                    <p className="mt-3 text-success fw-bold">
                        In Stock: {product.stockQuantity}
                    </p>
                </div>
            </div>

            {/* ⭐ Review Section */}
            <div className="reviews-section mt-5">
                <h3
                    className="fw-bold mb-3 border-bottom pb-2 toggle-header"
                    onClick={() => setShowReviews(!showReviews)}
                    style={{ cursor: "pointer" }}
                >
                    Customer Reviews{" "}
                    <span className="text-primary fs-5">{showReviews ? "▲" : "▼"}</span>
                </h3>

                {showReviews && (
                    <>
                        {/* ⭐ Rating Summary */}
                        <div className="rating-summary mb-4 text-center">
                            <h4 className="fw-semibold mb-1">
                                Average Rating:
                                <span className="text-warning ms-2">
                  {"★".repeat(Math.round(averageRating)) +
                      "☆".repeat(5 - Math.round(averageRating))}
                </span>
                                <span className="text-secondary ms-2">({averageRating})</span>
                            </h4>
                            <p className="text-muted mb-0">
                                {reviews.length} verified customer reviews
                            </p>
                        </div>

                        {/* 💬 Reviews List */}
                        <div className="review-list mt-4">
                            {reviews.map((review, index) => (
                                <div
                                    key={index}
                                    className="review-card p-4 mb-4 rounded-4 shadow-sm bg-white border border-light"
                                >
                                    <div className="d-flex justify-content-between align-items-center mb-2">
                                        <h6 className="fw-bold text-capitalize mb-0">{review.name}</h6>
                                        <small className="text-muted">{review.date}</small>
                                    </div>
                                    <div className="text-warning fs-6 mb-2">
                                        {"★".repeat(review.rating) + "☆".repeat(5 - review.rating)}
                                    </div>
                                    <p className="text-secondary mb-3">{review.comment}</p>
                                    <span
                                        className="badge"
                                        style={{
                                            background: "linear-gradient(90deg, #28a745 0%, #45d46b 100%)",
                                            color: "white",
                                            padding: "6px 12px",
                                            borderRadius: "20px",
                                            fontSize: "0.75rem",
                                        }}
                                    >
                    ✅ Verified Purchase
                  </span>
                                </div>
                            ))}
                        </div>

                        {/* ✍️ Review Form */}
                        <div className="review-form mt-5 p-4 rounded-4 shadow-sm bg-light border border-1">
                            <h5 className="fw-bold mb-4 text-primary">Write a Review</h5>
                            <form onSubmit={handleReviewSubmit}>
                                <div className="mb-3">
                                    <label className="form-label fw-semibold">Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={newReview.name}
                                        onChange={(e) =>
                                            setNewReview({ ...newReview, name: e.target.value })
                                        }
                                        placeholder="Enter your name"
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-semibold">Rating</label>
                                    <select
                                        className="form-select"
                                        value={newReview.rating}
                                        onChange={(e) =>
                                            setNewReview({
                                                ...newReview,
                                                rating: parseInt(e.target.value),
                                            })
                                        }
                                    >
                                        <option value="">Select rating</option>
                                        {[1, 2, 3, 4, 5].map((num) => (
                                            <option key={num} value={num}>
                                                {num} Star{num > 1 ? "s" : ""}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-semibold">Your Review</label>
                                    <textarea
                                        className="form-control"
                                        rows="4"
                                        placeholder="Share your experience..."
                                        value={newReview.comment}
                                        onChange={(e) =>
                                            setNewReview({ ...newReview, comment: e.target.value })
                                        }
                                    />
                                </div>

                                <button type="submit" className="btn btn-success px-5 py-2 fw-semibold">
                                    Submit Review
                                </button>
                            </form>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Product;
