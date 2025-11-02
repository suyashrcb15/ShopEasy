import "./App.css";
import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Cart from "./components/Cart";
import AddProduct from "./components/AddProduct";
import Product from "./components/Product";
import UpdateProduct from "./components/UpdateProduct";
import Contact from "./components/Contact";
import About from "./components/About";
import { AppProvider } from "./Context/Context";

function App() {
    const [cart, setCart] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");

    // handle category selection
    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        console.log("Selected category:", category);
    };

    // handle add-to-cart logic
    const addToCart = (product) => {
        const existingProduct = cart.find((item) => item.id === product.id);
        if (existingProduct) {
            setCart(
                cart.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
            );
        } else {
            setCart([...cart, { ...product, quantity: 1 }]);
        }
    };

    return (
        <AppProvider>
            <BrowserRouter>
                {/* ✅ When user is logged in */}
                <SignedIn>
                    <Navbar onSelectCategory={handleCategorySelect} />

                    <Routes>
                        <Route
                            path="/"
                            element={
                                <Home
                                    addToCart={addToCart}
                                    selectedCategory={selectedCategory}
                                />
                            }
                        />
                        <Route path="/add_product" element={<AddProduct />} />
                        <Route path="/product" element={<Product />} />
                        <Route path="/product/:id" element={<Product />} />
                        <Route path="/product/update/:id" element={<UpdateProduct />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/contact" element={<Contact />} />
                    </Routes>
                </SignedIn>

                {/* 🚫 When user is NOT logged in */}
                <SignedOut>
                    <RedirectToSignIn />
                </SignedOut>
            </BrowserRouter>
        </AppProvider>
    );
}

export default App;

