import React from "react";

const About = () => {
    return (
        <div className="container mt-5 pt-5 mb-5">
            {/* Header Section */}
            <h2 className="text-center fw-bold mb-4 text-primary">
                About ShopEasy
            </h2>
            <p className="lead text-center mb-5 text-secondary">
                Welcome to <strong className="text-light">ShopEasy</strong> — your trusted shopping companion!
                We combine technology, convenience, and care to make online shopping
                faster, safer, and more enjoyable. Whether it’s daily essentials or
                the latest gadgets, ShopEasy ensures every purchase brings you delight.
            </p>

            {/* Features Section */}
            <div className="row text-center gy-5">
                <div className="col-md-4">
                    <i className="bi bi-speedometer2 fs-1 text-warning"></i>
                    <h5 className="mt-3 fw-semibold text-light">Fast Delivery</h5>
                    <p className="text-secondary">
                        Experience lightning-fast deliveries straight to your doorstep.
                        Our efficient logistics network ensures that your favorite products
                        reach you in record time without compromising on safety.
                    </p>
                </div>

                <div className="col-md-4">
                    <i className="bi bi-heart fs-1 text-danger"></i>
                    <h5 className="mt-3 fw-semibold text-light">Customer Focused</h5>
                    <p className="text-secondary">
                        You are at the heart of everything we do. From personalized
                        recommendations to hassle-free returns, every feature is designed
                        with your comfort and satisfaction in mind.
                    </p>
                </div>

                <div className="col-md-4">
                    <i className="bi bi-shield-lock fs-1 text-success"></i>
                    <h5 className="mt-3 fw-semibold text-light">Secure Payment</h5>
                    <p className="text-secondary">
                        Your privacy and security are our top priorities. ShopEasy uses
                        end-to-end encryption and trusted payment gateways to keep your
                        transactions safe and worry-free.
                    </p>
                </div>

                <div className="col-md-4">
                    <i className="bi bi-phone fs-1 text-info"></i>
                    <h5 className="mt-3 fw-semibold text-light">24/7 Support</h5>
                    <p className="text-secondary">
                        Got a question or concern? Our friendly support team is available
                        around the clock to assist you with anything — from order tracking
                        to product inquiries.
                    </p>
                </div>

                <div className="col-md-4">
                    <i className="bi bi-cash-stack fs-1 text-success"></i>
                    <h5 className="mt-3 fw-semibold text-light">Affordable Prices</h5>
                    <p className="text-secondary">
                        We believe quality shouldn’t come with a hefty price tag.
                        ShopEasy brings you premium products at prices that suit your budget,
                        along with exciting discounts and seasonal offers.
                    </p>
                </div>

                <div className="col-md-4">
                    <i className="bi bi-recycle fs-1 text-primary"></i>
                    <h5 className="mt-3 fw-semibold text-light">Sustainable Shopping</h5>
                    <p className="text-secondary">
                        We’re doing our part for a greener planet. From recyclable packaging
                        to sustainable partnerships, we aim to make every purchase kinder
                        to the environment.
                    </p>
                </div>
            </div>

            </div>
    );
};

export default About;
