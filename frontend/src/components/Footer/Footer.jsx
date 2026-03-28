import logo from "../../assets/logo.png";
import twitter from "../../assets/twitter.png";
import linkedin from "../../assets/linkedin.png";
import instagram from "../../assets/instagram.png";
import mail from "../../assets/mail.png";


const Footer = () => {
    return (
        <section className="w-full bg-[#252C46] py-[60px] px-[7vw] sm:px-[6vw] md:px-[8vw] lg:px-[80px]">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-10 lg:gap-0">
                <div className="flex flex-col gap-4 flex-1 lg:flex-[2]">
                    <div className="flex items-center gap-[10px]">
                        <img src={logo} alt="Carteon logo" className="w-[31px] h-[34px]" />
                        <h4 className="font-inter font-semibold text-[24px] leading-[100%] tracking-[0px] text-white">Carteon</h4>
                    </div>
                    <p className="w-full sm:w-[90%] md:w-[391px] font-inter font-normal text-[16px] leading-[24px] tracking-[0px] text-[#99A1AF]">
                        Executive NFC smart cards for the modern professional. One card, multiple identities.
                    </p>
                    <div className="flex flex-wrap gap-4 sm:gap-8 mt-2">
                        <a href=""><img src={twitter} alt="Twitter" /></a>
                        <a href=""><img src={linkedin} alt="LinkedIn" /></a>
                        <a href="https://www.instagram.com/carteon_cards?igsh=cmczaGQ2anUxaDF6" target="_blank" rel="noopener noreferrer"><img src={instagram} alt="Instagram" /></a>
                        <a href=""><img src={mail} alt="Mail" /></a>
                    </div>
                </div>

                <div className="flex flex-wrap gap-10 lg:flex-nowrap lg:gap-16 flex-1">
                    <div className="flex flex-col w-full sm:w-1/2 lg:w-auto min-w-[120px]">
                        <h4 className="font-inter font-normal text-[18px] leading-[28px] tracking-[0px] text-white">Product</h4>
                        <ul className="mt-[10px] flex flex-col gap-4">
                            <li><a href="#feature" className="font-inter font-normal text-[14px] leading-[20px] tracking-[0px] text-[#99A1AF]">Features</a></li>
                            <li><a href="#pricing" className="font-inter font-normal text-[14px] leading-[20px] tracking-[0px] text-[#99A1AF]">Pricing</a></li>
                            <li><a href="#how-it-works" className="font-inter font-normal text-[14px] leading-[20px] tracking-[0px] text-[#99A1AF]">How It Works</a></li>
                            <li><a href="#faq" className="font-inter font-normal text-[14px] leading-[20px] tracking-[0px] text-[#99A1AF]">FAQ</a></li>
                        </ul>
                    </div>

                    <div className="flex flex-col w-full sm:w-1/2 lg:w-auto min-w-[120px]">
                        <h4 className="font-inter font-normal text-[18px] leading-[28px] tracking-[0px] text-white">Company</h4>
                        <ul className="mt-[10px] flex flex-col gap-4">
                            <li><a href="#" className="font-inter font-normal text-[14px] leading-[20px] tracking-[0px] text-[#99A1AF]">About</a></li>
                            <li><a href="#" className="font-inter font-normal text-[14px] leading-[20px] tracking-[0px] text-[#99A1AF]">Blog</a></li>
                            <li><a href="#" className="font-inter font-normal text-[14px] leading-[20px] tracking-[0px] text-[#99A1AF]">Careers</a></li>
                            <li><a href="#" className="font-inter font-normal text-[14px] leading-[20px] tracking-[0px] text-[#99A1AF]">Contact</a></li>
                        </ul>
                    </div>

                    <div className="flex flex-col w-full sm:w-1/2 lg:w-auto min-w-[120px]">
                        <h4 className="font-inter font-normal text-[18px] leading-[28px] tracking-[0px] text-white">Legal</h4>
                        <ul className="mt-[10px] flex flex-col gap-4">
                            <li><a href="#feature" className="font-inter font-normal text-[14px] leading-[20px] tracking-[0px] text-[#99A1AF]">Privacy Policy</a></li>
                            <li><a href="#pricing" className="font-inter font-normal text-[14px] leading-[20px] tracking-[0px] text-[#99A1AF]">Terms of Service</a></li>
                            <li><a href="#feature" className="font-inter font-normal text-[14px] leading-[20px] tracking-[0px] text-[#99A1AF]">Cookie Policy</a></li>
                        </ul>
                    </div>

                    <div className="flex flex-col w-full sm:w-1/2 lg:w-auto min-w-[120px]">
                        <h4 className="font-inter font-normal text-[18px] leading-[28px] tracking-[0px] text-white">Support</h4>
                        <ul className="mt-[10px] flex flex-col gap-4">
                            <li><a href="#" className="font-inter font-normal text-[14px] leading-[20px] tracking-[0px] text-[#99A1AF]">Help Center</a></li>
                            <li><a href="#" className="font-inter font-normal text-[14px] leading-[20px] tracking-[0px] text-[#99A1AF]">Contact Support</a></li>
                            <li><a href="#" className="font-inter font-normal text-[14px] leading-[20px] tracking-[0px] text-[#99A1AF]">Order Status</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="mt-[40px] border-t border-[#F5F5F58C] pt-[20px] pb-[20px] flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-600">
                <p className="font-inter font-normal text-[14px] leading-[20px] tracking-[0px] text-[#99A1AF]">
                    © {new Date().getFullYear()} Carteon. All rights reserved.
                </p>
                <div className="flex flex-wrap items-center gap-4">
                    <a href="#" className="font-inter font-normal text-[14px] leading-[20px] tracking-[0px] text-[#99A1AF]">Privacy</a>
                    <a href="#" className="font-inter font-normal text-[14px] leading-[20px] tracking-[0px] text-[#99A1AF]">Terms</a>
                    <a href="#" className="font-inter font-normal text-[14px] leading-[20px] tracking-[0px] text-[#99A1AF]">Cookies</a>
                </div>
            </div>
        </section>
    )
}

export default Footer;