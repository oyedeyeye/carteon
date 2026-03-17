import React, { useState } from "react";
import Logo from "../../assets/logo.png";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div className="w-full h-[80px] flex justify-between items-center bg-white px-[20px] sm:px-[80px] fixed top-0 left-0 right-0 z-[999999]">
            <div className="flex items-center gap-[10px]">
                <img src={Logo} alt="Carteon-logo" className="w-[31px] h-[34px]" />
                <span className="font-inter font-semibold text-[20px] sm:text-[24px] text-black leading-[100%] tracking-[0%]">
                    Carteon
                </span>
            </div>
            <ul className="hidden sm:flex items-center justify-center flex-1 gap-10">
                <li><a href="#features" className="font-outfit font-normal text-[18px] text-[#252C46]">Features</a></li>
                <li><a href="#how-it-works" className="font-outfit font-normal text-[18px] text-[#252C46]">How It Works</a></li>
                <li><a href="#pricing" className="font-outfit font-normal text-[18px] text-[#252C46]">Pricing</a></li>
                <li><a href="#faq" className="font-outfit font-normal text-[18px] text-[#252C46]">FAQ</a></li>
            </ul>

            <div className="hidden sm:flex items-center">
                <a href="" className="w-[190px] h-[48px] bg-[#252C46] rounded-[40px] py-[11px] px-[24px] font-outfit font-semibold text-[18px] text-white">
                    Get Your Carteon
                </a>
            </div>

            <div className="sm:hidden">
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="text-3xl text-[#000]"
                >
                    {menuOpen ? "✕" : "☰"}
                </button>
            </div>

            {menuOpen && (
                <div className="absolute top-[80px] left-30 w-full bg-white flex flex-col pl-[18px] gap-6 py-6 sm:hidden shadow-lg">
                    <a href="#features" className="text-[#252C46] text-[18px]">Features</a>
                    <a href="#how-it-works" className="text-[#252C46] text-[18px]">How It Works</a>
                    <a href="#pricing" className="text-[#252C46] text-[18px]">Pricing</a>
                    <a href="#faq" className="text-[#252C46] text-[18px]">FAQ</a>
                    <a
                        href=""
                        className="w-[190px] h-[48px] bg-[#252C46] rounded-[40px] py-[15px] px-[24px] font-outfit font-semibold text-[18px] text-white flex items-center justify-center"
                    >
                        Get Your Carteon
                    </a>
                </div>
            )}
        </div>
    );
};

export default Navbar;