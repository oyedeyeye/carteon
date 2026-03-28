import { useLocation } from "react-router-dom";
import confetti from "../../assets/confetti.png";
import Footer from "../../components/Footer/Footer.jsx";

const Success = () => {
    const query = new URLSearchParams(useLocation().search);
    const ref = query.get("ref");

    return (
        <section>
            <div className="flex flex-col items-center justify-center h-screen text-center px-4 mt-10">
                <div>
                    <img src={confetti} alt="" className="mx-auto" />
                    <h1 className="text-3xl font-bold mb-3">Payment Confirmed.</h1>
                </div>

                <p className="mb-6 text-gray-600">
                    Your card is being crafted. Let's set up your digital identity.
                </p>

                <div className="bg-gray-100 p-6 rounded-lg w-[300px]">
                    <p className="font-semibold">Order Confirmation</p>
                    <p className="text-lg">{ref}</p>

                    <p className="mt-2">Cards Ordered: 1</p>
                </div>

                <p className="text-sm mt-4 text-gray-500">
                    3–7 working days within Lagos, 7–21 outside Nigeria
                </p>

                <button className="bg-black text-white px-6 py-3 mt-6 rounded-lg">
                    Set Up My Profile
                </button>
            </div>
            <Footer />
        </section>

    );
};

export default Success;