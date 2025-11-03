import React, { useState } from "react";

const Contact = () => {
    const [form, setForm] = useState({ name: "", email: "", message: "" });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Thank you ${form.name}, we’ll reach out to you soon!`);
        setForm({ name: "", email: "", message: "" });
    };

    return (
        <div
            className="d-flex flex-column align-items-center justify-content-center py-5"
            style={{
                minHeight: "100vh",
                background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
                color: "white",
                paddingTop: "100px",
            }}
        >
            <div className="text-center mb-4">
                <h2 className="fw-bold">Contact Us</h2>
                <p className="text-light fs-5">
                    We’d love to hear from you! Fill out the form below and we’ll get in
                    touch soon.
                </p>
            </div>

            <div
                className="shadow-lg bg-white text-dark rounded-4 p-4 p-md-5"
                style={{
                    width: "90%",
                    maxWidth: "600px",
                }}
            >
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label fw-semibold">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            className="form-control p-3 rounded-3"
                            placeholder="Enter your full name"
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label fw-semibold">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            className="form-control p-3 rounded-3"
                            placeholder="Enter your email address"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="form-label fw-semibold">Message</label>
                        <textarea
                            name="message"
                            value={form.message}
                            onChange={handleChange}
                            className="form-control p-3 rounded-3"
                            rows="4"
                            placeholder="Write your message here..."
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn w-100 fw-bold py-2 rounded-3"
                        style={{
                            backgroundColor: "#2575fc",
                            color: "white",
                            fontSize: "1.1rem",
                            transition: "all 0.3s ease",
                        }}
                        onMouseEnter={(e) =>
                            (e.target.style.backgroundColor = "#1b4edb")
                        }
                        onMouseLeave={(e) =>
                            (e.target.style.backgroundColor = "#2575fc")
                        }
                    >
                        Send Message
                    </button>
                </form>
            </div>

        </div>
    );
};

export default Contact;
