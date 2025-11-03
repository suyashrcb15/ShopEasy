import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    SignedIn,
    SignedOut,
    SignInButton,
    SignUpButton,
    UserButton,
} from "@clerk/clerk-react";

const Navbar = ({ onSelectCategory }) => {
    const getInitialTheme = () => {
        const storedTheme = localStorage.getItem("theme");
        return storedTheme ? storedTheme : "light-theme";
    };

    const [selectedCategory, setSelectedCategory] = useState("");
    const [theme, setTheme] = useState(getInitialTheme());
    const [input, setInput] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [noResults, setNoResults] = useState(false);
    const [showSearchResults, setShowSearchResults] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/products");
            setSearchResults(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handleChange = async (value) => {
        setInput(value);
        if (value.length >= 1) {
            setShowSearchResults(true);
            try {
                const response = await axios.get(
                    `http://localhost:8080/api/products/search?keyword=${value}`
                );
                setSearchResults(response.data);
                setNoResults(response.data.length === 0);
            } catch (error) {
                console.error("Error searching:", error);
            }
        } else {
            setShowSearchResults(false);
            setSearchResults([]);
            setNoResults(false);
        }
    };

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        onSelectCategory(category);
    };

    const toggleTheme = () => {
        const newTheme = theme === "dark-theme" ? "light-theme" : "dark-theme";
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
    };

    useEffect(() => {
        document.body.className = theme;
    }, [theme]);

    const categories = [
        "Laptop",
        "Headphone",
        "Mobile",
        "Electronics",
        "Toys",
        "Fashion",
    ];

    // Theme styles
    const isDark = theme === "dark-theme";
    const navbarThemeClass = isDark ? "navbar-dark bg-dark" : "navbar-light bg-light";

    return (
        <header>
            <nav className={`navbar navbar-expand-lg fixed-top shadow-sm ${navbarThemeClass}`}>
                <div className="container-fluid">
                    {/* Brand */}
                    <a
                        className="navbar-brand fw-bold"
                        href="/"
                        style={{ color: isDark ? "#4dabf7" : "#007bff" }}
                    >
                        ShopEasy
                    </a>

                    {/* Toggler */}
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    {/* Navbar Content */}
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link" href="/">Home</a>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link" href="/add_product">Add Product</a>
                            </li>

                            <li className="nav-item dropdown">
                                <a
                                    className="nav-link dropdown-toggle"
                                    href="/"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    Categories
                                </a>
                                <ul className="dropdown-menu">
                                    {categories.map((category) => (
                                        <li key={category}>
                                            <button
                                                className="dropdown-item"
                                                onClick={() => handleCategorySelect(category)}
                                            >
                                                {category}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link" href="/about">About</a>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link" href="/contact">Contact</a>
                            </li>
                        </ul>

                        {/* 🌙 Theme Toggle */}
                        <button
                            className="btn btn-outline-secondary me-3"
                            onClick={toggleTheme}
                            style={{
                                borderColor: isDark ? "#f5f5f5" : "rgba(0,0,0,0.3)",
                                color: isDark ? "#f5f5f5" : "#000000",
                            }}
                        >
                            {isDark ? (
                                <i className="bi bi-moon-fill"></i>
                            ) : (
                                <i className="bi bi-sun-fill"></i>
                            )}
                        </button>

                        {/* Clerk Auth Buttons */}
                        <div className="d-flex align-items-center me-3">
                            <SignedOut>
                                <SignInButton mode="modal">
                                    <button className="btn btn-outline-primary me-2">
                                        Login
                                    </button>
                                </SignInButton>
                                <SignUpButton mode="modal">
                                    <button className="btn btn-primary">Sign Up</button>
                                </SignUpButton>
                            </SignedOut>

                            <SignedIn>
                                <UserButton afterSignOutUrl="/" />
                            </SignedIn>
                        </div>

                        {/* 🛒 Cart + Search */}
                        <div className="d-flex align-items-center position-relative">
                            <a href="/cart" className="nav-link">
                                <i className="bi bi-cart me-2"></i>Cart
                            </a>

                            <input
                                className="form-control ms-2"
                                type="search"
                                placeholder="Search"
                                aria-label="Search"
                                value={input}
                                onChange={(e) => handleChange(e.target.value)}
                                style={{
                                    backgroundColor: isDark ? "#1f1f1f" : "#ffffff",
                                    color: isDark ? "#ffffff" : "#000000",
                                    border: isDark ? "1px solid #444" : "1px solid #ccc",
                                }}
                            />

                            {showSearchResults && (
                                <ul
                                    className="list-group position-absolute mt-5"
                                    style={{
                                        zIndex: "1000",
                                        width: "250px",
                                        backgroundColor: isDark ? "#1f1f1f" : "#ffffff",
                                        color: isDark ? "#ffffff" : "#000000",
                                    }}
                                >
                                    {searchResults.length > 0 ? (
                                        searchResults.map((result) => (
                                            <li
                                                key={result.id}
                                                className="list-group-item"
                                                style={{
                                                    backgroundColor: isDark
                                                        ? "#1f1f1f"
                                                        : "#ffffff",
                                                    color: isDark ? "#ffffff" : "#000000",
                                                }}
                                            >
                                                <a
                                                    href={`/product/${result.id}`}
                                                    className="text-decoration-none"
                                                    style={{
                                                        color: isDark
                                                            ? "#a3c9f1"
                                                            : "#007bff",
                                                    }}
                                                >
                                                    {result.name}
                                                </a>
                                            </li>
                                        ))
                                    ) : (
                                        noResults && (
                                            <p className="no-results-message px-3">
                                                No product found
                                            </p>
                                        )
                                    )}
                                </ul>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
