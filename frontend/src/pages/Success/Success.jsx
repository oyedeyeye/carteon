import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import confetti from "../../assets/confetti.png";
import Footer from "../../components/Footer/Footer.jsx";

const Success = () => {
    const query = new URLSearchParams(useLocation().search);
    const reference = query.get("reference");
    const navigate = useNavigate();
    const [order, setOrder] = useState(null);

    useEffect(() => {
        const verifyPayment = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:3000/api/v1/orders/verify?reference=${reference}`
                );
                setOrder(res.data.data);
            } catch (err) {
                console.error(err);
            }
        };

        if (reference) verifyPayment();
    }, [reference]);

    return (
        <section>
            <div className="flex flex-col items-center justify-center min-h-screen text-center px-4 mt-10">

                <div>
                    <img src={confetti} alt="Confetti" className="mx-auto w-24 md:w-auto" />

                    <h1 className="font-Inter font-semibold text-[28px] md:text-[40px] leading-[40px] md:leading-[61.6px] tracking-[-1.12px] text-[#0F1419] text-center">
                        Payment Confirmed.
                    </h1>
                </div>

                <p className="font-Inter font-normal w-full max-w-[556px] text-[16px] md:text-[20px] leading-[24px] md:leading-[29.25px] tracking-[-0.16px] text-[#64748B] text-center">
                    Your Carteon card is being crafted. Let's set up your digital identity while we prepare your shipment.
                </p>

                <div className="w-full max-w-[576px] h-auto mt-[20px] bg-[#F5F5F5] p-[15px] flex flex-col gap-3 rounded-md">

                    <div className="flex items-center justify-between">
                        <p className="font-Inter font-normal text-[12px] md:text-[14px] leading-[20px] tracking-[-0.16px] text-[#525252]">
                            Order Confirmation
                        </p>
                        <p className="font-Inter font-semibold text-[16px] md:text-[18px] leading-[28px] tracking-[-0.16px] text-[#1A1A1A]">
                            {reference}
                        </p>
                    </div>


                    <div className="flex items-center justify-between">
                        <p className="font-Inter font-normal text-[12px] md:text-[14px] leading-[20px] tracking-[-0.16px] text-[#525252]">
                            Cards Ordered
                        </p>
                        <p className="font-Inter font-semibold text-[16px] md:text-[18px] leading-[28px] tracking-[-0.16px] text-[#1A1A1A]">
                            {order?.items?.[0]?.quantity || 0}
                        </p>
                    </div>
                </div>

                <p className="font-Inter mt-4 font-normal text-[12px] md:text-[14px] leading-[100%] text-[#525252] text-center">
                    3-7 working days within Lagos, then 7-21 working days outside Nigeria
                </p>

                <button
                    onClick={() => navigate("/profiledetails")}
                    className="w-full max-w-[576px] h-[56px] md:h-[60px] cursor-pointer bg-[#0F1419] mt-8 rounded-[8px] py-[16px] px-[20px] md:px-[40px] font-Inter font-medium text-[16px] md:text-[18px] leading-[28px] tracking-[-0.45px] text-[#FAFBFC] text-center"
                >
                    Set Up My Profile
                </button>
            </div>

            <Footer />
        </section>
    );
};

export default Success;