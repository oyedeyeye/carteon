import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Footer from "../../components/Footer/Footer";
import mark1 from "../../assets/mark1.png";
import tickk from "../../assets/tickk.png";
import card2 from "../../assets/card2.png";

const CardDetails = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const product = location.state?.product;
    const [cardVariants, setCardVariants] = useState([]);
    const [selectedVariant, setSelectedVariant] = useState(null);
    const [mainImage, setMainImage] = useState("");
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const fetchCards = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/products/cards`);

                console.log("API RESPONSE:", res.data);

                if (!res.data || !res.data.data || res.data.data.length === 0) {
                    console.error("No products returned from API");
                    return;
                }

                let mappedVariants = [];

                if (product.finishes && product.finishes.length > 0) {
                    mappedVariants = product.finishes.map((finish, index) => {
                        let hex = "#1A1A1A";
                        let image = "/images/black-card.png";

                        if (finish.toLowerCase().includes("gold")) {
                            hex = "#D4AF37";
                            image = "/images/gold-card.png";
                        } else if (finish.toLowerCase().includes("silver")) {
                            hex = "#C0C0C0";
                            image = "/images/silver-card.png";
                        }

                        return {
                            id: index + 1,
                            color: finish,
                            variantName: finish,
                            hex,
                            price: product.basePrice,
                            image,
                            thumbnails: [image, image, image],
                        };
                    });
                } else {

                    mappedVariants = [
                        {
                            id: 1,
                            color: "Default",
                            variantName: product.name,
                            hex: "#1A1A1A",
                            price: product.basePrice,
                            image: card2,
                            thumbnails: [card2, card2, card2],
                        }
                    ];
                }

                setCardVariants(mappedVariants);
                setSelectedVariant(mappedVariants[0]);
                setMainImage(mappedVariants[0].image);

            } catch (error) {
                console.error("Error fetching cards:", error);
            }
        };

        fetchCards();
    }, []);

    useEffect(() => {
        if (!product) {
            // fetch by slug from URL
        }
    }, []);

    const handleVariantChange = (variant) => {
        setSelectedVariant(variant);
        setMainImage(variant.image);
        setQuantity(1);
    };

    const handleBuyNow = () => {
        navigate("/checkout", {
            state: {
                variant: selectedVariant,
                quantity,
                price: selectedVariant?.price || selectedProduct?.basePrice,
                cardType: product?.cardType
            }
        });
        window.scrollTo({ top: 0, behavior: "auto" });
    };

    const handleBackToHome = () => {
        navigate("/");
    };

    const totalPrice = selectedVariant?.price * quantity || 0;

    if (!selectedVariant) return <div className="p-10">Loading...</div>;

    return (
        <section className="w-full bg-[#FFFFFF]">
            <div className="max-w-6xl mx-auto mt-10 px-4 sm:px-6 lg:px-8">
                <button
                    onClick={handleBackToHome}
                    className="mt-[70px] cursor-pointer font-Inter font-semibold text-[16px] leading-[24px] text-[#111111]"
                >
                    ← Back to Top
                </button>
            </div>

            <div className="mt-[10px] max-w-6xl py-10 mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-13 px-4 sm:px-6 lg:px-8">
                <div>
                    <img src={mainImage} alt="Card" className="w-full rounded-xl shadow" />

                    <div className="flex flex-wrap gap-3 mt-4 justify-start md:justify-start">
                        {selectedVariant.thumbnails.map((thumb, index) => (
                            <img
                                key={index}
                                src={thumb}
                                alt=""
                                onClick={() => setMainImage(thumb)}
                                className={`w-[140px] sm:w-[160px] md:w-[164px] h-[130px] sm:h-[150px] md:h-[160px] rounded-[16px] bg-[#D5DDFB73] object-cover p-4 cursor-pointer ${mainImage === thumb ? "" : "border border-gray-300"
                                    }`}
                            />
                        ))}
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    <h2 className="font-Inter font-bold text-[32px] sm:text-[40px] md:text-[56px] leading-[38px] sm:leading-[48px] md:leading-[61.6px] tracking-[-0.5px] sm:tracking-[-0.8px] md:tracking-[-1.12px]">
                        Metal Smart Card
                    </h2>

                    <p className="font-Inter font-normal text-[16px] sm:text-[18px] md:text-[20px] leading-[24px] sm:leading-[26px] md:leading-[28px] text-[#666666]">
                        Crafted from premium stainless steel with advanced NFC technology. Make a lasting impression with instant tap-to-share functionality.
                    </p>

                    <p className="font-Inter font-semibold text-[16px] leading-[24px] text-[#525252]">
                        What's Included
                    </p>

                    <ul className="flex flex-col gap-3 font-Inter font-normal text-[14px] sm:text-[15px] md:text-[16px] leading-[20px] sm:leading-[22px] md:leading-[24px] text-[#111111]">
                        <li className="flex items-center gap-2">
                            <img src={mark1} alt="" /> Premium stainless steel construction
                        </li>
                        <li className="flex items-center gap-2">
                            <img src={mark1} alt="" /> Advanced NFC technology
                        </li>
                        <li className="flex items-center gap-2">
                            <img src={mark1} alt="" /> Instant tap-to-share
                        </li>
                        <li className="flex items-center gap-2">
                            <img src={mark1} alt="" /> Waterproof & durable
                        </li>
                    </ul>

                    <div className="mt-4">
                        <div className="flex flex-wrap gap-4 sm:gap-5">
                            {cardVariants.length > 1 && (
                                <>
                                    <p className="font-Inter font-semibold text-[16px] leading-[24px] text-[#111111] mb-6">
                                        Select Finish
                                    </p>

                                    <div className="flex flex-wrap gap-4 sm:gap-5">
                                        {cardVariants.map((variant) => {
                                            const isSelected = selectedVariant.id === variant.id;

                                            return (
                                                <div key={variant.id} className="flex flex-col items-center gap-2">
                                                    <div
                                                        className={`p-[6px] rounded-full ${isSelected ? "border border-[#C8A960]" : ""
                                                            }`}
                                                    >
                                                        <button
                                                            onClick={() => handleVariantChange(variant)}
                                                            className="w-[50px] h-[50px] rounded-full"
                                                            style={{ backgroundColor: variant.hex }}
                                                        >
                                                            {isSelected && "✓"}
                                                        </button>
                                                    </div>

                                                    <span>{variant.variantName}</span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    <div className="mt-6">
                        <p className="font-Inter font-semibold text-[16px] leading-[24px] text-[#111111]">Quantity</p>

                        <div className="flex items-center gap-3 mt-2">
                            <button
                                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                                className="px-3 py-1 border rounded cursor-pointer"
                            >
                                -
                            </button>

                            <span>{quantity}</span>

                            <button
                                onClick={() => setQuantity((prev) => prev + 1)}
                                className="px-3 py-1 border rounded cursor-pointer"
                            >
                                +
                            </button>
                        </div>
                    </div>

                    <div className="w-full md:w-[600px] h-auto mt-5 py-5 flex flex-col gap-6 rounded-[20px] bg-white shadow-[0px_4px_16px_0px_#0000000D] pt-6 px-6">
                        <p className="font-Inter font-bold text-[28px] sm:text-[32px] md:text-[36px] leading-[32px] sm:leading-[36px] md:leading-[40px] text-[#111111]">
                            ₦{totalPrice.toLocaleString()}
                        </p>

                        <button
                            onClick={handleBuyNow}
                            className="mt-4 w-full h-[50px] sm:h-[55px] md:h-[58px] rounded-[20px] bg-white border border-[#0000001A] shadow-[0px_4px_16px_0px_#0000000D] font-Inter font-semibold text-[14px] sm:text-[15px] md:text-[16px] leading-[20px] sm:leading-[22px] md:leading-[24px] text-[#111111] text-center cursor-pointer"
                        >
                            Buy Now
                        </button>
                    </div>

                    <div className="w-full md:w-[600px] h-auto flex flex-col gap-2 rounded-[20px] bg-[#E5E5E580] py-5 px-6 mt-4">
                        <div className="flex items-center gap-2">
                            <img src={tickk} alt="" />
                            <p className="text-[14px] sm:text-[15px] md:text-[16px]">Free shipping on all orders</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <img src={tickk} alt="" />
                            <p className="text-[14px] sm:text-[15px] md:text-[16px]">30-day money back guarantee</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <img src={tickk} alt="" />
                            <p className="text-[14px] sm:text-[15px] md:text-[16px]">Lifetime profile updates</p>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </section>
    );
};

export default CardDetails;