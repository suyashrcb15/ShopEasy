import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import AppContext from "../Context/Context";
import axios from "../axios";
import "./Product.css";

const Product = () => {
    const { id } = useParams();
    const { addToCart, removeFromCart, refreshData } = useContext(AppContext);
    const [product, setProduct] = useState(null);
    const [imageUrl, setImageUrl] = useState("");
    const [reviews, setReviews] = useState([
        {
            name: "Riya Sharma",
            rating: 5,
            comment: "Amazing quality and super fast delivery! Highly recommend.",
            date: "10/20/2025",
        },
        {
            name: "Amit Verma",
            rating: 4,
            comment: "Product works as expected. Packaging was also good.",
            date: "09/15/2025",
        },
    ]);
    const [newReview, setNewReview] = useState({ name: "", rating: 0, comment: "" });
    const [showReviews, setShowReviews] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/product/${id}`);
                setProduct(response.data);
                if (response.data.imageName) fetchImage();
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };

        const fetchImage = async () => {
            const response = await axios.get(`http://localhost:8080/api/product/${id}/image`, {
                responseType: "blob",
            });
            setImageUrl(URL.createObjectURL(response.data));
        };

        fetchProduct();
    }, [id]);

    const deleteProduct = async () => {
        try {
            await axios.delete(`http://localhost:8080/api/product/${id}`);
            removeFromCart(id);
            alert("Product deleted successfully");
            refreshData();
            navigate("/");
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    const handleEditClick = () => navigate(`/product/update/${id}`);

    const handlAddToCart = () => {
        addToCart(product);
        alert("Product added to cart");
    };

    const handleReviewSubmit = (e) => {
        e.preventDefault();
        if (!newReview.name || !newReview.rating || !newReview.comment) {
            alert("Please fill in all fields");
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
                        alt={product.imageName}
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

                    <h3 className="text-danger fw-bold mb-3">${product.price}</h3>

                    <button
                        className="btn btn-warning me-2 px-4 py-2"
                        onClick={handlAddToCart}
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

                    <p className="mt-3 text-success fw-bold">In Stock: {product.stockQuantity}</p>
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
                        {/* ⭐ Average Rating Display */}
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

                        {/* 💬 List of Reviews */}
                        <div className="review-list mt-4">
                            {reviews.map((review, index) => (
                                <div
                                    key={index}
                                    className="review-card p-4 mb-4 rounded-4 shadow-sm bg-white border border-light transition"
                                    style={{
                                        transition: "transform 0.2s ease, box-shadow 0.2s ease",
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = "scale(1.01)";
                                        e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = "scale(1)";
                                        e.currentTarget.style.boxShadow = "0 2px 6px rgba(0,0,0,0.05)";
                                    }}
                                >
                                    <div className="d-flex justify-content-between align-items-center mb-2">
                                        <h6 className="fw-bold text-capitalize mb-0">{review.name}</h6>
                                        <small className="text-muted">{review.date}</small>
                                    </div>
                                    <div className="text-warning fs-6 mb-2">
                                        {"★".repeat(review.rating) + "☆".repeat(5 - review.rating)}
                                    </div>
                                    <p className="text-secondary mb-3" style={{ fontSize: "0.95rem" }}>
                                        {review.comment}
                                    </p>
                                    <span
                                        className="badge"
                                        style={{
                                            background:
                                                "linear-gradient(90deg, #28a745 0%, #45d46b 100%)",
                                            color: "white",
                                            padding: "6px 12px",
                                            borderRadius: "20px",
                                            fontSize: "0.75rem",
                                            fontWeight: "500",
                                            letterSpacing: "0.3px",
                                        }}
                                    >
                    ✅ Verified Purchase
                  </span>
                                </div>
                            ))}
                        </div>

                        {/* ✍️ Add Review Form */}
                        <div className="review-form mt-5 p-4 rounded-4 shadow-sm bg-light border border-1">
                            <h5 className="fw-bold mb-4 text-primary">Write a Review</h5>
                            <form onSubmit={handleReviewSubmit}>
                                <div className="mb-3">
                                    <label className="form-label fw-semibold">Name</label>
                                    <input
                                        type="text"
                                        className="form-control form-control-lg rounded-3"
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
                                        className="form-select form-select-lg rounded-3"
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
                                        className="form-control rounded-3"
                                        rows="4"
                                        placeholder="Share your experience with this product..."
                                        value={newReview.comment}
                                        onChange={(e) =>
                                            setNewReview({ ...newReview, comment: e.target.value })
                                        }
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-success px-5 py-2 rounded-3 fw-semibold"
                                    style={{
                                        background: "linear-gradient(90deg, #1e9b50 0%, #28d76c 100%)",
                                        border: "none",
                                    }}
                                >
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
