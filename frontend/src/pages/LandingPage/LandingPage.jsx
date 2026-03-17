import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import hero1 from "../../assets/hero1.png";
import hero2 from "../../assets/hero2.png";
import arrow from "../../assets/arrow.png";
import avatar from "../../assets/avatar.png";
import ratings from "../../assets/ratings.png";
import box1 from "../../assets/box1.png";
import box2 from "../../assets/box2.png";
import box3 from "../../assets/box3.png";
import box4 from "../../assets/box4.png";
import box5 from "../../assets/box5.png";
import box6 from "../../assets/box6.png";
import box7 from "../../assets/box7.png";
import box8 from "../../assets/box8.png";
import box9 from "../../assets/box9.png";
import pp from "../../assets/pp.png";
import profile from "../../assets/profile.png";
import profile1 from "../../assets/profile1.png";
import frame from "../../assets/frame.png";
import ceo from "../../assets/ceo.png";
import tick from "../../assets/tick.png";
import ttick from "../../assets/ttick.png";
import step1 from "../../assets/step1.png";
import step2 from "../../assets/step2.png";
import step3 from "../../assets/step3.png";
import step4 from "../../assets/step4.png";
import card1 from "../../assets/card1.png";
import card2 from "../../assets/card2.png";
import card3 from "../../assets/card3.png";
import star from "../../assets/star.png";
import mark from "../../assets/mark.png";
import mark1 from "../../assets/mark1.png";
import arrowright from "../../assets/arrow-right.png";
import Footer from "../../components/Footer/Footer";


const faqData = [
    {
        question: "What is Carteon Smartcard?",
        answer:
            "Carteon Smartcard is a premium NFC-enabled smart card that acts as your digital identity hub. It allows you to share your contact information, social profiles, and professional portfolio with a single tap on any NFC-enabled smartphone.",
    },
    {
        question: "How does profile switching work?",
        answer:
            "Profile switching allows you to change the information your smart card shares. You can easily switch between personal, business, or custom profiles directly from your dashboard.",
    },
    {
        question: "Can I customize my profile design?",
        answer:
            "Yes. You can customize colors, layout, images, and content on your profile page to reflect your personal or business brand.",
    },
    {
        question: "Is my data secure?",
        answer:
            "Yes. All user data is securely stored and protected using modern encryption standards. Only the information you choose to share will be visible to others.",
    },
    {
        question: "How long will it take for me to receive my card after payment?",
        answer:
            "Orders are typically processed within 24–48 hours and delivered within 3–7 business days depending on your location.",
    },
];

const LandingPage = () => {

    const [active, setActive] = useState(null);

    const toggle = (index) => {
        setActive(active === index ? null : index);
    };

    return (
        <div className="w-full overflow-x-hidden">
            <section className="h-auto w-full lg:h-[820px] flex flex-col lg:flex-row justify-between bg-white relative py-[40px] px-[20px] lg:px-[80px]">

                <div className="flex flex-col gap-5 mt-[80px] lg:mt-[150px] items-center lg:items-start text-center lg:text-left">

                    <h2 className="font-outfit font-normal text-[40px] lg:text-[64px] text-[#1A1A1A] leading-[48px] lg:leading-[70px] tracking-[0%] w-full lg:w-[557px]">
                        One Card. <br /> Infinite Professional Presence.
                    </h2>

                    <p className="font-inter w-full lg:w-[565px] font-normal text-[18px] lg:text-[20px] text-[#525252] leading-[28px] lg:leading-[30px]">
                        Carteon SmartCard empowers professionals to present multiple identities, update in real time, and connect without limits, all from a single intelligent NFC card.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-5">

                        <a
                            className="w-full sm:w-[236px] h-[50px] flex items-center justify-center gap-2 bg-[#252C46] rounded-[8px] py-[14px] px-[30px] font-inter font-medium text-[13.6px] text-white leading-[24px] tracking-[0%] text-center"
                            href=""
                        >
                            Get Your Carteon Card <img src={arrow} alt="" />
                        </a>

                        <a
                            className="w-full sm:w-[179px] h-[50px] flex items-center justify-center rounded-[8px] border border-[#D9D9D9] py-[14px] px-[32px] font-inter font-medium text-[13px] text-[#0F172A] leading-[24px] tracking-[0%] text-center"
                            href="#how-it-works"
                        >
                            See How It Works
                        </a>

                    </div>

                    <div className="flex items-center sm:flex flex-col gap-4">
                        <img src={avatar} alt="" />

                        <div className="flex items-center sm:flex flex-col gap-2">
                            <div>
                                <img src={ratings} alt="" />
                            </div>

                            <p className="font-inter font-medium text-[12px] text-[#334155] leading-[20px] tracking-[0%]">
                                Trusted by 100+ executives
                            </p>
                        </div>
                    </div>

                </div>

                <div className="mt-[60px] lg:mt-[85px] flex justify-center relative">

                    <img src={hero1} alt="" className="w-full max-w-[350px] " />

                    <div className="hidden lg:block absolute top-[40%] left-[20%] lg:top-49 lg:left-[-112%]">
                        <img src={hero2} alt="" className="w-[120px] lg:w-auto" />
                    </div>
                </div>
            </section>
            <section className="min-h-[942px] w-full bg-white py-[60px] px-[20px] md:px-[40px] lg:px-[80px] overflow-x-hidden">

                <div className="flex flex-col gap-2 justify-center items-center">
                    <h2 className="font-inter font-semibold text-[22px] md:text-[36px] lg:text-[40px] text-[#1A1A1A] leading-[40px] md:leading-[50px] lg:leading-[60px] text-center">
                        The Old Way is <span className="line-through">Obsolete.</span>
                    </h2>

                    <p className="font-inter font-normal text-[16px] md:text-[18px] lg:text-[20px] text-[#525252] leading-[26px] md:leading-[28px] text-center w-full md:w-[600px] lg:w-[674px]">
                        Traditional business cards don't reflect the dynamic, multi-dimensional executive you are.
                    </p>
                </div>

                <div className="flex flex-col md:flex-row gap-5 mt-[63px] justify-center items-center">
                    <div className="w-full md:w-[407px] h-auto md:h-[199px] border border-[#E5E7EB] rounded-[12px] p-[20px] flex flex-col gap-3">
                        <div>
                            <img src={box1} alt="" />
                        </div>

                        <h4 className="font-inter font-bold text-[20px] text-[#1A1A1A] leading-[28px]">
                            Paper cards are disposable
                        </h4>

                        <p className="font-inter font-normal text-[14px] text-[#525252] leading-[22px]">
                            88% of paper business cards are thrown away within a week. Stop wasting money on trash.
                        </p>
                    </div>
                    <div className="w-full md:w-[407px] h-auto md:h-[199px] border border-[#E5E7EB] rounded-[12px] p-[20px] flex flex-col gap-3">
                        <div>
                            <img src={box2} alt="" />
                        </div>

                        <h4 className="font-inter font-bold text-[20px] text-[#1A1A1A] leading-[28px]">
                            Scattered Identity
                        </h4>

                        <p className="font-inter font-normal text-[14px] text-[#525252] leading-[22px]">
                            Your LinkedIn, portfolio, and contact info are all over the place. Consolidate your digital presence.
                        </p>
                    </div>
                    <div className="w-full md:w-[407px] h-auto md:h-[199px] border border-[#E5E7EB] rounded-[12px] p-[20px] flex flex-col gap-4">
                        <div>
                            <img src={box3} alt="" />
                        </div>

                        <h4 className="font-inter font-bold text-[20px] text-[#1A1A1A] leading-[28px]">
                            Missed Connections
                        </h4>

                        <p className="font-inter font-normal text-[14px] text-[#525252] leading-[22px]">
                            Manual data entry kills momentum. Networking moments are short—make them count instantly.
                        </p>
                    </div>
                </div>
                <div className="w-full lg:w-[1201px] mt-[60px] h-auto lg:h-[307px] rounded-[12px] p-[20px] bg-[#EAEEFD] flex flex-col lg:flex-row gap-8 mx-auto">
                    <div className="flex flex-col gap-4 mt-[20px]">
                        <h4 className="w-full lg:w-[498px] font-inter font-bold text-[26px] md:text-[30px] lg:text-[36px] text-[#1A1A1A] leading-[36px] lg:leading-[40px]">
                            Upgrade from static business cards to a dynamic, executive identity.
                        </h4>
                        <p className="w-full lg:w-[479px] font-inter font-normal text-[16px] md:text-[17px] lg:text-[18px] text-[#525252] leading-[26px] lg:leading-[28px]">
                            Carteon gives you the power to switch between professional personas instantly, all from one premium NFC card.
                        </p>
                    </div>
                    <div className="mt-[26px] ml-0 lg:ml-[20px] flex flex-col justify-center">
                        <img src={profile} alt="" />
                        <img src={profile1} alt="" />
                    </div>

                </div>
            </section>
            <section className="min-h-[700px] w-full bg-[#F5F5F5] py-[60px] px-[20px] md:px-[40px] lg:px-[80px] overflow-x-hidden">

                <div className="flex flex-col gap-2 justify-center items-center">
                    <h2 className="font-inter font-semibold text-[28px] md:text-[34px] lg:text-[40px] text-[#0A0F1A] leading-[34px] md:leading-[38px] lg:leading-[40px] text-center">
                        Professional Identity Infrastructure.
                    </h2>

                    <p className="w-full md:w-[700px] lg:w-[862px] font-inter font-normal text-[16px] md:text-[18px] lg:text-[20px] text-black leading-[28px] md:leading-[34px] lg:leading-[40px] text-center">
                        Carteon replaces the stack of paper cards with a dynamic, digital system that evolves with your career.
                    </p>
                </div>
                <div className="flex flex-col md:flex-row gap-5 mt-[70px] justify-center items-center">

                    <div className="w-full md:w-[416px] h-auto md:h-[208px] bg-white rounded-[12px] p-[20px] flex flex-col gap-4">
                        <div>
                            <img src={box4} alt="" />
                        </div>

                        <h4 className="font-inter font-bold text-[20px] text-[#1A1A1A] leading-[28px]">
                            Instant Profile Access
                        </h4>

                        <p className="font-inter font-normal text-[16px] text-[#525252] leading-[22px]">
                            One tap shares your complete professional identity. No delays. No friction.
                        </p>
                    </div>

                    <div className="w-full md:w-[416px] h-auto md:h-[208px] bg-white rounded-[12px] p-[20px] flex flex-col gap-4">
                        <div>
                            <img src={box5} alt="" />
                        </div>

                        <h4 className="font-inter font-bold text-[20px] text-[#1A1A1A] leading-[28px]">
                            No App Required
                        </h4>

                        <p className="font-inter font-normal text-[16px] text-[#525252] leading-[22px]">
                            Recipients don't need an app to view your profile. Works natively on iOS and Android.
                        </p>
                    </div>

                    <div className="w-full md:w-[416px] h-auto md:h-[208px] bg-white rounded-[12px] p-[20px] flex flex-col gap-4">
                        <div>
                            <img src={box6} alt="" />
                        </div>

                        <h4 className="font-inter font-bold text-[20px] text-[#1A1A1A] leading-[28px]">
                            Live Editable Identity
                        </h4>

                        <p className="font-inter font-normal text-[16px] text-[#525252] leading-[22px]">
                            Changed jobs? New phone number? Update your profile instantly, anytime.
                        </p>
                    </div>

                </div>
                <div className="flex justify-center items-center mt-[60px] md:mt-[80px]">
                    <a
                        className="w-[280px] md:w-[260px] lg:w-[278px] h-[50px] flex items-center justify-center gap-2 bg-[#252C46] rounded-[8px] py-[14px] px-[30px] font-inter font-medium text-[13px] text-white leading-[24px]"
                        href=""
                    >
                        Get Your Carteon SmartCard
                        <img src={arrow} alt="" />
                    </a>
                </div>
            </section>
            <section className="min-h-[700px] w-full bg-white py-[60px] px-[20px] md:px-[40px] lg:px-[80px] overflow-x-hidden">
                <div className="flex flex-col lg:flex-row gap-10 lg:gap-5 items-center">

                    <div className="flex flex-col gap-4">

                        <h2 className="w-full lg:w-[522px] font-inter font-semibold text-[28px] md:text-[34px] lg:text-[40px] text-[#0A0F1A] leading-[40px] md:leading-[50px] lg:leading-[60px]">
                            Built for Multi-Identity Professionals.
                        </h2>

                        <p className="w-full lg:w-[630px] font-inter font-normal text-[16px] md:text-[18px] lg:text-[20px] text-[#525252] leading-[26px] md:leading-[28px] lg:leading-[30px]">
                            Carteon Smartcard allows you to maintain distinct professional personas in one secure infrastructure. Seamlessly toggle between your role as a CEO, board member, or investor, depending on who you're meeting.
                        </p>

                        <ul className="mt-[30px] flex flex-col gap-6">

                            <li className="flex items-center gap-3 font-open-sans text-[16px] md:text-[18px] lg:text-[20px] text-[#525252] leading-[28px] lg:leading-[32.5px]">
                                <img src={tick} alt="tick-icon" />
                                Switch identities instantly with one click
                            </li>

                            <li className="flex items-center gap-3 font-open-sans text-[16px] md:text-[18px] lg:text-[20px] text-[#525252] leading-[28px] lg:leading-[32.5px]">
                                <img src={tick} alt="tick-icon" />
                                Custom branding for each professional profile
                            </li>

                            <li className="flex items-center gap-3 font-open-sans text-[16px] md:text-[18px] lg:text-[20px] text-[#525252] leading-[28px] lg:leading-[32.5px]">
                                <img src={tick} alt="tick-icon" />
                                Share specific contact details for each role
                            </li>

                            <li className="flex items-center gap-3 font-open-sans text-[16px] md:text-[18px] lg:text-[20px] text-[#525252] leading-[28px] lg:leading-[32.5px]">
                                <img src={tick} alt="tick-icon" />
                                Analytics to track engagement across profiles
                            </li>

                        </ul>
                    </div>

                    <div className="w-full max-w-[690px] h-[400px] md:h-[500px] lg:h-[547px] bg-[#F5F5F5] relative rounded-[20px] flex justify-center">

                        <img
                            src={frame}
                            className="w-[260px] md:w-[320px] lg:w-[364px] h-auto absolute top-[30px] md:top-[40px] lg:top-[45px] left-[20px] md:left-[30px] lg:left-[40px] rounded-[25.4px] border-[6.77px]"
                            alt=""
                        />

                        <img
                            src={ceo}
                            className="absolute z-10 bottom-[40px] w-[160px] right-[-20px] md:w-[230px] bottom-[-5px] md:right-[5px]"
                            alt=""
                        />

                    </div>

                </div>
            </section>
            <section id="how-it-works" className="w-full bg-[#F9FAFF] py-[60px] px-[20px] md:px-[40px] lg:px-[80px]">
                <div className="flex flex-col gap-2 justify-center items-center">
                    <h4 className="font-inter mt-[20px] font-semibold text-[28px] md:text-[32px] lg:text-[32px] text-[#1A1A1A] leading-[40px] md:leading-[50px] lg:leading-[74px] tracking-[0%]">How it works</h4>
                    <h2 className="font-inter font-semibold text-[32px] md:text-[40px] lg:text-[48px] text-[#1A1A1A] leading-[38px] md:leading-[60px] lg:leading-[74px] tracking-[0%] text-center">From Purchase to First Tap In Minutes.</h2>
                    <p className="font-inter w-full max-w-[718px] font-normal text-[16px] md:text-[18px] lg:text-[20px] text-[#525252] leading-[24px] md:leading-[28px] lg:leading-[30px] tracking-[0%] text-center">We have streamlined the process to get your executive card in your hands and your profile live without the hassle.</p>
                </div>
                <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-[1204px] h-auto md:h-[397px] mt-[40px] md:mt-[68px] bg-[#F9FAFF] rounded-[16px] border border-[#D9D9D9] p-[10px] px-[10px] md:px-[20px]">
                    <div className="flex flex-col gap-4 md:gap-7 w-full md:w-auto">
                        <h4 className="font-outfit font-semibold text-[32px] md:text-[40px] lg:text-[48px] text-[#252C46] leading-[100%] tracking-[0%]">01</h4>
                        <div className="flex flex-col gap-2">
                            <h6 className="font-inter font-semibold text-[16px] md:text-[18px] text-[#1A1A1A] leading-[100%] tracking-[0%]">Order Your Card</h6>
                            <p className="font-inter font-normal text-[14px] md:text-[16px] text-[#525252] leading-[18px] md:leading-[20px] tracking-[0%] w-full md:w-[463px]">Select your preferred Carteon variant and complete secure checkout. Each card is precision-crafted.</p>
                        </div>
                    </div>
                    <div className="w-full md:w-[383px] mt-4 md:mt-0 flex justify-center md:justify-end">
                        <img src={step1} alt="" className="w-full max-w-[250px] md:max-w-[300px] lg:max-w-[400px]" />
                    </div>
                </div>
                <div className="flex flex-col-reverse md:flex-row items-center justify-between w-full max-w-[1204px] h-auto md:h-[397px] mt-[20px] md:mt-[28px] bg-[#F9FAFF] rounded-[16px] border border-[#D9D9D9] p-[10px] px-[10px] md:px-[20px]">
                    <div className="w-full md:w-auto mt-4 md:mt-0">
                        <div className="w-full md:w-[383px] h-auto md:h-[373px] bg-[#EAEEFD] p-[10px] md:p-[20px] rounded-[8px] flex justify-center items-center">
                            <img src={step2} alt="" className="w-full h-auto max-w-[250px] md:max-w-full" />
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 md:gap-7 w-full md:w-auto">
                        <h4 className="font-outfit font-semibold text-[32px] md:text-[40px] lg:text-[48px] text-[#252C46] leading-[100%] tracking-[0%]">02</h4>
                        <div className="flex flex-col gap-2">
                            <h6 className="font-inter font-semibold text-[16px] md:text-[18px] text-[#1A1A1A] leading-[100%] tracking-[0%]">Secure Checkout</h6>
                            <p className="font-inter font-normal text-[14px] md:text-[16px] text-[#525252] leading-[18px] md:leading-[20px] tracking-[0%] w-full md:w-[459px]">Complete your purchase with our encrypted, payment options including Paystack and Flutterwave.</p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-[1204px] h-auto md:h-[397px] mt-[20px] md:mt-[28px] bg-[#F9FAFF] rounded-[16px] border border-[#D9D9D9] p-[10px] px-[10px] md:px-[20px]">
                    <div className="flex flex-col gap-4 md:gap-7 w-full md:w-auto">
                        <h4 className="font-outfit font-semibold text-[32px] md:text-[40px] lg:text-[48px] text-[#252C46] leading-[100%] tracking-[0%]">03</h4>
                        <div className="flex flex-col gap-2">
                            <h6 className="font-inter font-semibold text-[16px] md:text-[18px] text-[#1A1A1A] leading-[100%] tracking-[0%]">Set Up Your Profile</h6>
                            <p className="font-inter font-normal text-[14px] md:text-[16px] text-[#525252] leading-[18px] md:leading-[20px] tracking-[0%] w-full md:w-[459px]">While your card ships, build your professional digital profile. Add your bio, photo, and links in minutes.</p>
                        </div>
                    </div>
                    <div className="w-full md:w-auto mt-4 md:mt-0">
                        <div className="w-full md:w-[383px] h-[200px] md:h-[373px] bg-[#EAEEFD] p-[10px] rounded-[8px] relative flex justify-center items-center">
                            <img
                                src={step3}
                                alt=""
                                className="absolute top-[24px] left-[34px] md:top-13 md:left-13 
                       w-full max-w-[200px] sm:max-w-[220px] md:max-w-[300px] 
                       h-[175px] sm:h-[150px] md:h-[320px] object-contain"
                            />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col-reverse md:flex-row items-center justify-between w-full max-w-[1204px] h-auto md:h-[397px] mt-[20px] md:mt-[28px] bg-[#F9FAFF] rounded-[16px] border border-[#D9D9D9] p-[10px] px-[10px] md:px-[20px]">
                    <div className="w-full md:w-auto mt-4 md:mt-0 flex justify-center md:justify-start">
                        <img src={step4} alt="" className="w-full max-w-[250px] md:max-w-[300px] lg:max-w-full h-auto" />
                    </div>
                    <div className="flex flex-col gap-4 md:gap-7 w-full md:w-auto mt-4 md:mt-0">
                        <h4 className="font-outfit font-semibold text-[32px] md:text-[40px] lg:text-[48px] text-[#252C46] leading-[100%] tracking-[0%]">04</h4>
                        <div className="flex flex-col gap-2">
                            <h6 className="font-inter font-semibold text-[16px] md:text-[18px] text-[#1A1A1A] leading-[100%] tracking-[0%]">Tap & Share Instantly</h6>
                            <p className="font-inter font-normal text-[14px] md:text-[16px] text-[#525252] leading-[18px] md:leading-[20px] tracking-[0%] w-full md:w-[459px]">Simply tap your card on any NFC enabled phone to share your professional identity. No app required for the receiver.</p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="w-full bg-[#F5F5F5] py-[60px] px-[20px] md:px-[40px] lg:px-[80px]">
                <div className="flex flex-col gap-3 justify-center items-center">
                    <h2 className="font-inter font-bold text-[24px] md:text-[28px] lg:text-[30.6px] text-[#1A1A1A] leading-[32px] md:leading-[36px] lg:leading-[40px] text-center tracking-[0%] align-middle">Choose Your Carteon Smart Card</h2>
                    <p className="w-full max-w-[653px] font-inter font-normal text-[16px] md:text-[18px] lg:text-[20px] text-[#525252] leading-[24px] md:leading-[26px] lg:leading-[28px] text-center align-middle tracking-[0%]">Select the card that matches your style. All cards come with full NFC functionality.</p>
                </div>
                <div className="flex flex-col md:flex-row gap-[20px] md:gap-[30px] mt-[40px] md:mt-[70px] justify-center items-start">
                    <div className="w-full md:w-[403px] h-auto md:h-[773px] bg-white rounded-[20px] flex flex-col gap-3 p-[20px]">
                        <div>
                            <img src={card1} alt="Carteon Smart Card" className="w-full h-auto rounded-lg object-cover" />
                        </div>
                        <h5 className="font-inter font-bold text-[20.4px] text-[#1A1A1A] leading-[32px] tracking-[0%] align-middle">Carteon Smart Card</h5>
                        <p className="font-inter font-normal text-[14px] text-[#6B7280] leading-[20px] align-middle tracking-[0%]">Premium stainless steel NFC card with instant tap connectivity.</p>
                        <p className="font-inter font-bold text-[30.6px] text-[#1A1A1A] leading-[40px] align-middle tracking-[0%]">₦50,000 <span className="font-inter font-normal text-[20px] text-[#1A1A1A] leading-[40px] align-middle tracking-[0%]">/ one-time</span></p>
                        <ul className="mt-[20px] flex flex-col gap-5">
                            <li className="flex items-center gap-3 font-inter font-normal text-[14px] text-[#525252] leading-[20px] align-middle tracking-[0%]"><img src={ttick} alt="tick-icon" />NFC Tap Technology</li>
                            <li className="flex items-center gap-3 font-inter font-normal text-[14px] text-[#525252] leading-[20px] align-middle tracking-[0%]"><img src={ttick} alt="tick-icon" />QR Code Fallback</li>
                            <li className="flex items-center gap-3 font-inter font-normal text-[14px] text-[#525252] leading-[20px] align-middle tracking-[0%]"><img src={ttick} alt="tick-icon" />1 Default Profile</li>
                            <li className="flex items-center gap-3 font-inter font-normal text-[14px] text-[#525252] leading-[20px] align-middle tracking-[0%]"><img src={ttick} alt="tick-icon" />Contact Collection System</li>
                            <li className="flex items-center gap-3 font-inter font-normal text-[14px] text-[#525252] leading-[20px] align-middle tracking-[0%]"><img src={ttick} alt="tick-icon" />Email Notifications</li>
                            <li className="flex items-center gap-3 font-inter font-normal text-[14px] text-[#525252] leading-[20px] align-middle tracking-[0%]"><img src={ttick} alt="tick-icon" />Lifetime Profile Edits</li>
                        </ul>
                        <div className="mt-[50px] flex justify-center">
                            <a href="#" className="w-full max-w-[600px] h-[50px] rounded-[8px] border border-[#1A1A1A] bg-white py-[14px] px-[24px] font-inter font-medium text-[14px] text-[#1A1A1A] leading-[24px] text-center align-middle mx-auto block">Buy Now</a>
                        </div>
                    </div>
                    <div className="w-full md:w-[403px] h-auto md:h-[773px] bg-white rounded-[20px] flex flex-col gap-3 p-[20px]">
                        <div>
                            <img src={card2} alt="Carteon Smart Card" className="w-full h-auto rounded-lg object-cover" />
                        </div>
                        <h5 className="font-inter font-bold text-[20.4px] text-[#1A1A1A] leading-[32px] tracking-[0%] align-middle">PVC QR Card</h5>
                        <p className="font-inter font-normal text-[14px] text-[#6B7280] leading-[20px] align-middle tracking-[0%]">Premium stainless steel NFC card with instant tap connectivity.</p>
                        <p className="font-inter font-bold text-[30.6px] text-[#1A1A1A] leading-[40px] align-middle tracking-[0%]">₦30,000 <span className="font-inter font-normal text-[20px] text-[#1A1A1A] leading-[40px] align-middle tracking-[0%]">/ one-time</span></p>
                        <ul className="mt-[20px] flex flex-col gap-5">
                            <li className="flex items-center gap-3 font-inter font-normal text-[14px] text-[#525252] leading-[20px] align-middle tracking-[0%]"><img src={ttick} alt="tick-icon" />Printed QR Code</li>
                            <li className="flex items-center gap-3 font-inter font-normal text-[14px] text-[#525252] leading-[20px] align-middle tracking-[0%]"><img src={ttick} alt="tick-icon" />1 Default Profile</li>
                            <li className="flex items-center gap-3 font-inter font-normal text-[14px] text-[#525252] leading-[20px] align-middle tracking-[0%]"><img src={ttick} alt="tick-icon" />Contact Collection System</li>
                            <li className="flex items-center gap-3 font-inter font-normal text-[14px] text-[#525252] leading-[20px] align-middle tracking-[0%]"><img src={ttick} alt="tick-icon" />Email Notifications</li>
                            <li className="flex items-center gap-3 font-inter font-normal text-[14px] text-[#525252] leading-[20px] align-middle tracking-[0%]"><img src={ttick} alt="tick-icon" />Lifetime Profile Edits</li>
                        </ul>
                        <p className="mt-[7px] font-inter font-normal text-[14px] text-[#000000] leading-[20px] align-middle">QR Scan Only (No NFC Tap)</p>
                        <div className="mt-[50px] flex justify-center">
                            <a href="#" className="w-full max-w-[600px] h-[50px] rounded-[8px] border border-[#1A1A1A] bg-white py-[14px] px-[24px] font-inter font-medium text-[14px] text-[#1A1A1A] leading-[24px] text-center align-middle mx-auto block">Buy Now</a>
                        </div>
                    </div>

                    {/* Card 3 */}
                    <div className="w-full md:w-[403px] h-auto md:h-[773px] bg-white rounded-[20px] flex flex-col gap-3 p-[20px]">
                        <div>
                            <img src={card3} alt="Carteon Smart Card" className="w-full h-auto rounded-lg object-cover" />
                        </div>
                        <h5 className="font-inter font-bold text-[20.4px] text-[#1A1A1A] leading-[32px] tracking-[0%] align-middle">Complete Package</h5>
                        <p className="font-inter font-normal text-[14px] text-[#6B7280] leading-[20px] align-middle tracking-[0%]">Premium stainless steel NFC card with instant tap connectivity.</p>
                        <p className="font-inter font-bold text-[30.6px] text-[#1A1A1A] leading-[40px] align-middle tracking-[0%]">₦50,000 <span className="font-inter font-normal text-[20px] text-[#1A1A1A] leading-[40px] align-middle tracking-[0%]">/ one-time</span></p>
                        <ul className="mt-[20px] flex flex-col gap-5">
                            <li className="flex items-center gap-3 font-inter font-normal text-[14px] text-[#525252] leading-[20px] align-middle tracking-[0%]"><img src={ttick} alt="tick-icon" />1 NFC Smart Card (Selected Finish)</li>
                            <li className="flex items-center gap-3 font-inter font-normal text-[14px] text-[#525252] leading-[20px] align-middle tracking-[0%]"><img src={ttick} alt="tick-icon" />1 PVC QR Backup Card</li>
                            <li className="flex items-center gap-3 font-inter font-normal text-[14px] text-[#525252] leading-[20px] align-middle tracking-[0%]"><img src={ttick} alt="tick-icon" />QR + NFC Enabled</li>
                            <li className="flex items-center gap-3 font-inter font-normal text-[14px] text-[#525252] leading-[20px] align-middle tracking-[0%]"><img src={ttick} alt="tick-icon" />1 Digital Profile</li>
                            <li className="flex items-center gap-3 font-inter font-normal text-[14px] text-[#525252] leading-[20px] align-middle tracking-[0%]"><img src={ttick} alt="tick-icon" />Contact Collection System</li>
                            <li className="flex items-center gap-3 font-inter font-normal text-[14px] text-[#525252] leading-[20px] align-middle tracking-[0%]"><img src={ttick} alt="tick-icon" />Email Notifications</li>
                            <li className="flex items-center gap-3 font-inter font-normal text-[14px] text-[#525252] leading-[20px] align-middle tracking-[0%]"><img src={ttick} alt="tick-icon" />Lifetime Profile Edits</li>
                        </ul>
                        <div className="mt-[11px] flex justify-center">
                            <a href="#" className="w-full max-w-[600px] h-[50px] rounded-[8px] border border-[#1A1A1A] bg-white py-[14px] px-[24px] font-inter font-medium text-[14px] text-[#1A1A1A] leading-[24px] text-center align-middle mx-auto block">Buy Now</a>
                        </div>
                    </div>
                </div>
            </section>
            <section className="w-full bg-white py-[60px] px-[20px] md:px-[40px] lg:px-[80px] h-auto md:h-[690px]">
                <div className="flex flex-col-reverse md:flex-row gap-10 md:gap-5">
                    <div className="flex-shrink-0">
                        <img src={pp} alt="" className="w-full md:w-auto h-auto object-contain" />
                    </div>
                    <div className="flex flex-col gap-5">
                        <h2 className="font-inter font-bold text-[32px] md:text-[40px] lg:text-[48px] leading-[40px] md:leading-[48px] lg:leading-[55px] tracking-[0px] text-[#1A1A1A]">Corporate & Executive Branding</h2>
                        <p className="font-inter mt-[10px] w-full max-w-[631px] font-normal text-[16px] md:text-[18px] lg:text-[20px] leading-[24px] md:leading-[26px] lg:leading-[28px] tracking-[0px] text-[#525252]">
                            Elevate your professional presence with custom branded templates that reflect your corporate identity
                        </p>
                        <div className="flex flex-col gap-10 mt-[50px]">
                            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                                <div className="flex-shrink-0">
                                    <img src={box7} alt="" />
                                </div>
                                <div>
                                    <h4 className="font-inter font-semibold text-[18px] md:text-[20px] leading-[28px] md:leading-[32px] tracking-[0px] text-[#1A1A1A] align-middle">Custom Brand Colors</h4>
                                    <p className="font-inter font-normal text-[14px] md:text-[16px] leading-[20px] md:leading-[22px] tracking-[0px] text-[#525252] align-middle">
                                        Match your profile to your brand guidelines with custom color schemes and visual styling.
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                                <div className="flex-shrink-0">
                                    <img src={box8} alt="" />
                                </div>
                                <div>
                                    <h4 className="font-inter font-semibold text-[18px] md:text-[20px] leading-[28px] md:leading-[32px] tracking-[0px] text-[#1A1A1A] align-middle">Company Logo Integration</h4>
                                    <p className="font-inter font-normal text-[14px] md:text-[16px] leading-[20px] md:leading-[22px] tracking-[0px] text-[#525252] align-middle">
                                        Your corporate logo prominently displayed on your profile, maintaining brand consistency across all touchpoints.
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                                <div className="flex-shrink-0">
                                    <img src={box9} alt="" />
                                </div>
                                <div>
                                    <h4 className="font-inter font-semibold text-[18px] md:text-[20px] leading-[28px] md:leading-[32px] tracking-[0px] text-[#1A1A1A] align-middle">Structured Design System</h4>
                                    <p className="font-inter font-normal text-[14px] md:text-[16px] leading-[20px] md:leading-[22px] tracking-[0px] text-[#525252] align-middle">
                                        Maintain all Carteon functionality while expressing your unique brand identity
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section id="pricing" className="w-full bg-white py-[60px] px-[20px] md:px-[40px] lg:px-[80px] h-auto md:h-[941px]">
                <div className="mt-[30px] flex flex-col justify-center items-center gap-4">
                    <h2 className="font-inter font-semibold text-[32px] md:text-[36px] lg:text-[40px] leading-[48px] md:leading-[54px] lg:leading-[60px] tracking-[0px] text-black text-center align-middle">
                        Simple, Transparent Pricing
                    </h2>
                    <p className="font-inter font-medium text-[16px] md:text-[18px] lg:text-[20px] leading-[25px] md:leading-[50px] lg:leading-[60px] tracking-[0px] text-[#0A0F1A] text-center align-middle">
                        Start with one profile, upgrade when you need more professional identities
                    </p>
                </div>

                <div className="mt-[60px] flex flex-col md:flex-row gap-6 items-center justify-center">
                    <div className="w-full md:w-[363px] h-auto md:h-[539px] rounded-[20px] bg-white border-2 border-[#E5E7EB] p-5">
                        <h4 className="font-inter font-bold mt-[10px] text-[24px] leading-[32px] tracking-[0px] text-[#101828]">Standard</h4>
                        <p className="font-inter mt-[10px] font-normal text-[14px] leading-[20px] tracking-[0px] text-[#525252]">Perfect for getting started</p>
                        <div className="mt-[40px]">
                            <h4 className="font-arimo font-bold text-[36px] leading-[40px] tracking-[0px] text-[#101828]">Included</h4>
                            <p className="font-inter mt-[10px] font-normal text-[14px] leading-[20px] tracking-[0px] text-[#4A5565]">with card purchase</p>
                        </div>
                        <ul className="mt-[50px] flex flex-col gap-5">
                            <li className="flex items-center gap-4 font-inter font-normal text-[14px] leading-[20px] tracking-[0px] text-[#364153]">
                                <img src={mark1} alt="" />1 Default Profile
                            </li>
                            <li className="flex items-center gap-4 font-inter font-normal text-[14px] leading-[20px] tracking-[0px] text-[#364153]">
                                <img src={mark1} alt="" />Instant NFC tap sharing
                            </li>
                            <li className="flex items-center gap-4 font-inter font-normal text-[14px] leading-[20px] tracking-[0px] text-[#364153]">
                                <img src={mark1} alt="" />Contact information & links
                            </li>
                            <li className="flex items-center gap-4 font-inter font-normal text-[14px] leading-[20px] tracking-[0px] text-[#364153]">
                                <img src={mark1} alt="" />Profile photo/logo
                            </li>
                            <li className="flex items-center gap-4 font-inter font-normal text-[14px] leading-[20px] tracking-[0px] text-[#364153]">
                                <img src={mark1} alt="" />Mobile-optimized design
                            </li>
                        </ul>
                        <div className="w-full max-w-[323px] h-[48px] rounded-[8px] bg-[#F3F4F6] px-[24px] py-[12px] mt-[30px] mx-auto">
                            <a href="" className="font-inter font-semibold text-[16px] leading-[24px] tracking-[0px] text-[#6A7282] text-center block">
                                Included with Card
                            </a>
                        </div>
                    </div>

                    <div className="w-full md:w-[408px] h-auto md:h-[575px] relative rounded-[24px] bg-white border-2 border-t-[2px] border-t-[#252C46] p-5 shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)]">
                        <div className="w-[141px] h-[29px] flex items-center gap-1 px-[14px] py-[3px] absolute -top-2 left-1/2 transform -translate-x-1/2 rounded-full bg-[#252C46]">
                            <div><img src={star} alt="" /></div>
                            <p className="font-arimo font-normal text-[14px] leading-[20px] tracking-[0px] text-white">Most Popular</p>
                        </div>
                        <h4 className="font-inter mt-[20px] font-bold text-[24px] leading-[32px] tracking-[0px] text-[#101828]">Multi-Profile</h4>
                        <p className="font-inter mt-[10px] font-normal text-[14px] leading-[20px] tracking-[0px] text-[#525252]">For multi-faceted professionals</p>
                        <div className="mt-[40px]">
                            <h4 className="font-arimo font-bold text-[36px] leading-[40px] tracking-[0px] text-[#101828]">₦10,000</h4>
                            <p className="font-inter mt-[10px] font-normal text-[14px] leading-[20px] tracking-[0px] text-[#4A5565]">per year</p>
                        </div>
                        <ul className="mt-[30px] flex flex-col gap-5">
                            <li className="flex items-center gap-4 font-inter font-normal text-[14px] leading-[20px] tracking-[0px] text-[#1A1A1A]">
                                <img src={mark1} alt="" />Everything in Standard
                            </li>
                            <li className="flex items-center gap-4 font-inter font-normal text-[14px] leading-[20px] tracking-[0px] text-[#1A1A1A]">
                                <img src={mark1} alt="" />Unlock 4 additional profiles
                            </li>
                            <li className="flex items-center gap-4 font-inter font-normal text-[14px] leading-[20px] tracking-[0px] text-[#1A1A1A]">
                                <img src={mark1} alt="" />Switch identities instantly
                            </li>
                            <li className="flex items-center gap-4 font-inter font-normal text-[14px] leading-[20px] tracking-[0px] text-[#1A1A1A]">
                                <img src={mark1} alt="" />CEO, Consultant, Speaker, etc.
                            </li>
                            <li className="flex items-center gap-4 font-inter font-normal text-[14px] leading-[20px] tracking-[0px] text-[#1A1A1A]">
                                <img src={mark1} alt="" />Separate contact info per profile
                            </li>
                            <li className="flex items-center gap-4 font-inter font-normal text-[14px] leading-[20px] tracking-[0px] text-[#1A1A1A]">
                                <img src={mark1} alt="" />Priority support
                            </li>
                        </ul>
                        <div className="w-full max-w-[373px] h-[48px] rounded-[8px] bg-[#252C46] px-[24px] py-[12px] mt-[22px] mx-auto">
                            <a href="" className="font-inter font-semibold text-[16px] leading-[24px] tracking-[0px] text-[#FFFFFF] text-center block">Upgrade to Multi-Profile</a>
                        </div>
                    </div>

                    <div className="w-full md:w-[363px] h-auto md:h-[539px] rounded-[20px] bg-white border-2 border-[#E5E7EB] p-5">
                        <h4 className="font-inter font-bold mt-[10px] text-[24px] leading-[32px] tracking-[0px] text-[#101828]">Branded Template</h4>
                        <p className="font-inter mt-[10px] font-normal text-[14px] leading-[20px] tracking-[0px] text-[#525252]">Corporate & executive branding</p>
                        <div className="mt-[40px]">
                            <h4 className="font-arimo font-bold text-[36px] leading-[40px] tracking-[0px] text-[#101828]">₦18,000</h4>
                            <p className="font-inter mt-[10px] font-normal text-[14px] leading-[20px] tracking-[0px] text-[#4A5565]">per year</p>
                        </div>
                        <ul className="mt-[30px] flex flex-col gap-5">
                            <li className="flex items-center gap-4 font-inter font-normal text-[14px] leading-[20px] tracking-[0px] text-[#364153]">
                                <img src={mark} alt="" />Everything in Standard
                            </li>
                            <li className="flex items-center gap-4 font-inter font-normal text-[14px] leading-[20px] tracking-[0px] text-[#364153]">
                                <img src={mark} alt="" />Custom brand colors
                            </li>
                            <li className="flex items-center gap-4 font-inter font-normal text-[14px] leading-[20px] tracking-[0px] text-[#364153]">
                                <img src={mark} alt="" />Company logo integration
                            </li>
                            <li className="flex items-center gap-4 font-inter font-normal text-[14px] leading-[20px] tracking-[0px] text-[#364153]">
                                <img src={mark} alt="" />Custom typography
                            </li>
                            <li className="flex items-center gap-4 font-inter font-normal text-[14px] leading-[20px] tracking-[0px] text-[#364153]">
                                <img src={mark} alt="" />Branded design elements
                            </li>
                            <li className="flex items-center gap-4 font-inter font-normal text-[14px] leading-[20px] tracking-[0px] text-[#364153]">
                                <img src={mark} alt="" />Professional identity
                            </li>
                        </ul>
                        <div className="w-full max-w-[323px] h-[48px] rounded-[8px] bg-[#000000] px-[24px] py-[12px] mt-[20px] mx-auto">
                            <a href="" className="font-inter font-semibold text-[16px] leading-[24px] tracking-[0px] text-[#FFFFFF] text-center block">Included with Card</a>
                        </div>
                    </div>
                </div>
            </section>
            <section id="faq" className="h-auto w-full bg-[#F5F5F5] py-[60px] px-[4vw] sm:px-[6vw] md:px-[8vw] lg:px-[80px]">
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mt-[30px] gap-8 lg:gap-0">
                    <div className="flex flex-col gap-4 w-full lg:w-auto">
                        <div className="w-[68px] h-[35px] bg-white rounded-[100px] pt-[12px] pr-[16px] pb-[8px] pl-[16px] font-open-sans font-medium text-[14px] text-[#525252] leading-[100%] tracking-[0%]">
                            FAQs
                        </div>
                        <h2 className="font-[Inter] w-full lg:w-[574px] font-semibold text-[36px] sm:text-[42px] md:text-[48px] text-[#1A1A1A] leading-[1.2] sm:leading-[64px] md:leading-[74px] tracking-[0%]">
                            Frequently Asked Question
                        </h2>
                    </div>
                    <div className="w-full lg:w-[442px] flex flex-col gap-4">
                        <p className="font-[Inter] font-normal text-[16px] sm:text-[18px] text-[#5A5A59] leading-[1.2] sm:leading-[100%] tracking-[0%]">
                            Find quick answers to the most common questions about our services, process, and support
                        </p>
                        <a
                            href="#"
                            className="mt-[20px] w-[151px] h-[51px] bg-[#252C46] rounded-[80px] py-[16px] px-[32px] font-[Inter] font-semibold text-[16px] text-white leading-[100%] flex items-center gap-[10px]"
                        >
                            View all <img src={arrowright} alt="" />
                        </a>
                    </div>
                </div>
                <div className="mt-[60px] flex flex-col gap-[16px]">
                    {faqData.map((faq, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-[12px] px-4 sm:px-6 md:px-6 py-5 cursor-pointer transition-all"
                        >
                            <div
                                className="flex items-center justify-between"
                                onClick={() => toggle(index)}
                            >
                                <h3 className="font-[Inter] font-semibold text-[20px] sm:text-[22px] md:text-[24px] text-[#131313] leading-[28px] sm:leading-[30px] md:leading-[30px]">
                                    {faq.question}
                                </h3>

                                <div className="w-[36px] h-[36px] flex items-center justify-center rounded-full border border-[#E5E5E5] bg-white">
                                    {active === index ? <Minus size={18} /> : <Plus size={18} />}
                                </div>
                            </div>

                            {active === index && (
                                <div className="mt-4">
                                    <p className="w-full sm:w-[90%] md:w-[929px] font-[Inter] font-normal text-[16px] sm:text-[18px] text-[#525252] leading-relaxed">
                                        {faq.answer}
                                    </p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </section>
            <section className="h-auto w-full bg-[#1A1A1A] py-[60px] px-[4vw] sm:px-[6vw] md:px-[8vw] lg:px-[80px]">
                <div className="flex flex-col justify-center items-center gap-5 mt-[40px]">
                    <h2 className="font-inter w-full sm:w-[90%] md:w-[806px] font-bold text-[36px] sm:text-[42px] md:text-[51px] leading-[42px] sm:leading-[50px] md:leading-[60px] tracking-[0px] text-white text-center align-middle">
                        Present Your Executive Identity Today
                    </h2>
                    <p className="font-inter w-full sm:w-[85%] md:w-[690px] font-normal text-[16px] sm:text-[18px] md:text-[20px] leading-[22px] sm:leading-[26px] md:leading-[28px] tracking-[0px] text-[#A2B7DB] text-center align-middle">
                        One tap, multiple professional identities, zero downloads. Join the future of networking.
                    </p>
                    <div className="mt-[40px]">
                        <a
                            href="#"
                            className="w-full sm:w-[60%] md:w-[321px] h-[60px] rounded-[8px] bg-white shadow-[0px_10px_25px_-3px_rgba(255,255,255,0.3),0px_4px_6px_-2px_rgba(255,255,255,0.1)] pt-[16px] pr-[32px] pb-[16px] pl-[32px] font-inter font-medium text-[14px] sm:text-[15px] md:text-[15.3px] leading-[24px] sm:leading-[26px] md:leading-[28px] tracking-[0px] text-[#1A1A1A] text-center align-middle block mx-auto"
                        >
                            Order Your Card Now
                        </a>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default LandingPage;