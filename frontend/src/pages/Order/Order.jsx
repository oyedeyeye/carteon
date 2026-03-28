import { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Footer from "../../components/Footer/Footer";

const Checkout = () => {
    const location = useLocation();
    const selectedProduct = location.state?.variant; 
    const quantity = location.state?.quantity || 1;

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
    });

    const [loading, setLoading] = useState(false);


    const product = {
        name: "Metal Smart Card",
        variant: selectedProduct?.variantName || "Matte Black Metal",
        price: selectedProduct?.price || 50000,
        quantity: quantity,
        cardType: "COMPLETE_PACKAGE",
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async () => {
        try {
            setLoading(true);

            const res = await axios.post("/api/v1/orders", {
                customerData: {
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    address: formData.address,
                },
                items: [
                    {
                        cardType: product.cardType,
                        quantity: product.quantity,
                    },
                ],
                totalAmount: product.price * product.quantity,
            });

            window.location.href = res.data.data.paymentUrl;

        } catch (error) {
            console.error(error);
            alert("Something went wrong!");
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

            <div className="max-w-6xl pb-10 sm:pb-16 md:pb-20 mx-4 md:mx-auto grid grid-cols-1 gap-7 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10">
                {/* Contact Information */}
                <div>
                    <h2 className="font-Inter font-medium text-[20px] sm:text-[22px] md:text-[24px] leading-[120%] text-[#1A1A1A] mb-4 sm:mb-5 md:mb-6">
                        Contact Information
                    </h2>

                    <div className="space-y-4 sm:space-y-5">
                        <div className="flex flex-col gap-2 sm:gap-3">
                            <label className="font-Inter font-normal text-[14px] sm:text-[15px] leading-[120%] text-[#1A1A1A]">
                                Full Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Your full name"
                                onChange={handleChange}
                                className="w-full h-[45px] sm:h-[50px] px-3 sm:px-4 rounded-lg bg-gray-100 outline-none"
                            />
                        </div>

                        <div className="flex flex-col gap-2 sm:gap-3">
                            <label className="font-Inter font-normal text-[14px] sm:text-[15px] leading-[120%] text-[#1A1A1A]">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                placeholder="youremail@gmail.com"
                                onChange={handleChange}
                                className="w-full h-[45px] sm:h-[50px] px-3 sm:px-4 rounded-lg bg-gray-100 outline-none"
                            />
                        </div>

                        <div className="flex flex-col gap-2 sm:gap-3">
                            <label className="font-Inter font-normal text-[14px] sm:text-[15px] leading-[120%] text-[#1A1A1A]">
                                Phone Number
                            </label>
                            <input
                                type="text"
                                name="phone"
                                placeholder="+2345059495904"
                                onChange={handleChange}
                                className="w-full h-[45px] sm:h-[50px] px-3 sm:px-4 rounded-lg bg-gray-100 outline-none"
                            />
                        </div>

                        <div className="flex flex-col gap-2 sm:gap-3">
                            <label className="font-Inter font-normal text-[14px] sm:text-[15px] leading-[120%] text-[#1A1A1A]">
                                Address
                            </label>
                            <input
                                type="text"
                                name="address"
                                placeholder="234 Main Str"
                                onChange={handleChange}
                                className="w-full h-[45px] sm:h-[50px] px-3 sm:px-4 rounded-lg bg-gray-100 outline-none"
                            />
                        </div>

                        {/* City, State, ZIP */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="flex-1 flex flex-col gap-2 sm:gap-3">
                                <label className="font-Inter font-normal text-[14px] sm:text-[15px] leading-[120%] text-[#1A1A1A]">City</label>
                                <input
                                    type="text"
                                    name="city"
                                    placeholder="New York"
                                    onChange={handleChange}
                                    className="w-full h-[45px] sm:h-[50px] px-3 sm:px-4 rounded-lg bg-gray-100 outline-none"
                                />
                            </div>

                            <div className="flex-1 flex flex-col gap-2 sm:gap-3">
                                <label className="font-Inter font-normal text-[14px] sm:text-[15px] leading-[120%] text-[#1A1A1A]">State</label>
                                <input
                                    type="text"
                                    name="state"
                                    placeholder="NY"
                                    onChange={handleChange}
                                    className="w-full h-[45px] sm:h-[50px] px-3 sm:px-4 rounded-lg bg-gray-100 outline-none"
                                />
                            </div>

                            <div className="flex-1 flex flex-col gap-2 sm:gap-3">
                                <label className="font-Inter font-normal text-[14px] sm:text-[15px] leading-[120%] text-[#1A1A1A]">ZIP Code</label>
                                <input
                                    type="text"
                                    name="zip"
                                    placeholder="10001"
                                    onChange={handleChange}
                                    className="w-full h-[45px] sm:h-[50px] px-3 sm:px-4 rounded-lg bg-gray-100 outline-none"
                                />
                            </div>
                        </div>
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

            <div>
                <Footer />
            </div>
        </section>
    );
}

export default Checkout;