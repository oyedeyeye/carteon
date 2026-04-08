import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "../../components/Footer/Footer";

const Checkout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const PAYSTACK_PUBLIC_KEY = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;

    // Get selected card & quantity from CardDetails
    const selectedCard = location.state?.variant;
    const quantity = location.state?.quantity || 1;
    const cardType = location.state?.cardType || "DefaultType";
    const price = location.state?.price || selectedCard?.price || 50000;

    // Redirect if no card data
    useEffect(() => {
        if (!selectedCard) {
            navigate("/");
        }
    }, [selectedCard, navigate]);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        zip: "",
    });

    const [loading, setLoading] = useState(false);

    // Build product summary
    const product = {
        name: selectedCard?.variantName || "Metal Smart Card",
        variant: selectedCard?.variantName || "Default",
        quantity: quantity,
        price: price,
        cardType: cardType,
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async () => {
        if (!formData.name || !formData.email || !formData.phone || !formData.address) {
            alert("Please fill all required fields");
            return;
        }

        try {
            setLoading(true);

            // Map variant to enum
            const cardTypeMapping = {
                "Smart Card": "SMART_ONLY",
                "PVC QR Card": "PVC_QR_ONLY",
                "Complete Package": "COMPLETE_PACKAGE",
            };
            const cardType = cardTypeMapping[selectedCard?.variantName] || "SMART_ONLY";

            const payload = {
                customerData: {
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    address: `${formData.address}, ${formData.city}, ${formData.state}, ${formData.zip}`,
                },
                items: [
                    {
                        cardType: cardType,
                        quantity: Number(quantity),
                        colorVariant: selectedCard?.variantName,
                    },
                ],
                totalAmount: Number(price * quantity),
                paymentGateway: "PAYSTACK",
                transactionReference: `CRT_${Date.now()}_${Math.floor(Math.random() * 10000)}`,
            };

            console.log("PAYLOAD:", payload);

            const res = await axios.post("https://carteon-iota.vercel.app/api/v1/orders", payload);

            const paymentUrl = res.data?.data?.paymentUrl;

            if (!paymentUrl) {
                alert("Payment initialization failed");
                return;
            }

            // Redirect to payment gateway
            window.location.href = paymentUrl;

        } catch (error) {
            console.error("Payment error:", error?.response?.data || error.message);
            alert(error?.response?.data?.message || "Something went wrong!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="w-full h-auto bg-white">
            <div className="px-4 pt-26 sm:px-10 md:px-25 pt-10 sm:pt-20 md:pt-30">
                <h2 className="font-Inter font-semibold text-[24px] sm:text-[28px] md:text-[32px] leading-[120%] text-black mb-6 sm:mb-8 md:mb-10">
                    Checkout
                </h2>
            </div>

            <div className="max-w-6xl pb-10 sm:pb-16 md:pb-20 mx-4 md:mx-auto grid grid-cols-1 md:grid-cols-2 gap-7 sm:gap-8 md:gap-10">
                {/* Contact Form */}
                <div>
                    <h2 className="font-Inter font-medium text-[20px] sm:text-[22px] md:text-[24px] leading-[120%] text-[#1A1A1A] mb-4 sm:mb-5 md:mb-6">
                        Contact Information
                    </h2>

                    <div className="space-y-4 sm:space-y-5">
                        {["name", "email", "phone", "address", "city", "state", "zip"].map((field) => (
                            <div key={field} className="flex flex-col gap-2 sm:gap-3">
                                <label className="font-Inter font-normal text-[14px] sm:text-[15px] leading-[120%] text-[#1A1A1A]">
                                    {field.charAt(0).toUpperCase() + field.slice(1).replace("_", " ")}
                                </label>
                                <input
                                    type={field === "email" ? "email" : "text"}
                                    name={field}
                                    placeholder={field === "zip" ? "10001" : `Enter your ${field}`}
                                    value={formData[field]}
                                    onChange={handleChange}
                                    className="w-full h-[45px] sm:h-[50px] px-3 sm:px-4 rounded-lg bg-gray-100 outline-none"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Order Summary */}
                <div className="bg-white h-auto p-4 sm:p-6 md:p-6 rounded-xl shadow">
                    <h3 className="font-Inter font-semibold text-[14px] sm:text-[15.3px] leading-[28px] text-[#0A0A0A] mb-3 sm:mb-4">
                        Order Summary
                    </h3>

                    <div className="flex flex-col gap-3 sm:gap-4">
                        <div className="flex justify-between">
                            <span className="font-Inter text-[13px] sm:text-[14px] leading-[20px] text-[#737373]">Product</span>
                            <span className="font-Inter font-medium text-[13px] sm:text-[14px] leading-[20px] text-[#0A0A0A]">{product.name}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-Inter text-[13px] sm:text-[14px] leading-[20px] text-[#737373]">Variant</span>
                            <span className="font-Inter font-medium text-[13px] sm:text-[14px] leading-[20px] text-[#0A0A0A]">{product.variant}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-Inter text-[13px] sm:text-[14px] leading-[20px] text-[#737373]">Quantity</span>
                            <span className="font-Inter font-medium text-[13px] sm:text-[14px] leading-[20px] text-[#0A0A0A]">{product.quantity}</span>
                        </div>
                    </div>

                    <div className="w-full flex justify-between border-t border-[#99A1AF6E] pt-5 pb-5 mt-6">
                        <span className="font-Inter text-[13px] sm:text-[14px] leading-[20px] text-[#737373]">Subtotal</span>
                        <span className="font-Inter font-medium text-[13px] sm:text-[14px] leading-[20px] text-[#0A0A0A]">
                            ₦{product.price.toLocaleString()}
                        </span>
                    </div>

                    <div className="w-full flex justify-between border-t border-[#99A1AF6E] pt-5 pb-5 mt-2">
                        <span className="font-Inter text-[13px] sm:text-[14px] leading-[20px] text-[#737373]">Total</span>
                        <span className="font-Inter font-bold text-[18px] sm:text-[20px] leading-[32px] text-[#0A0A0A]">
                            ₦{(product.price * product.quantity).toLocaleString()}
                        </span>
                    </div>

                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="mt-6 sm:mt-8 md:mt-10 w-full h-[48px] sm:h-[52px] cursor-pointer bg-[#0A0A0A] rounded-[12px] font-Inter font-semibold text-[12px] sm:text-[11.9px] leading-[20px] text-white"
                    >
                        {loading ? "Processing..." : "Complete Secure Payment"}
                    </button>
                </div>
            </div>

            <Footer />
        </section>
    );
};

export default Checkout;