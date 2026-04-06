import { useState } from "react";
import axios from "axios";
import Footer from "../../components/Footer/Footer";
import upload from "../../assets/upload.png";

const ProfileSetup = () => {
    const [step, setStep] = useState(1);

    const [platform, setPlatform] = useState("");
    const [url, setUrl] = useState("");

    const [profileData, setProfileData] = useState({
        userId: "",
        cardId: "",
        profileName: "",
        isDefault: true,

        theme: {
            color: "#0F172A",
        },

        identity: {
            fullName: "",
            title: "",
            bio: "",
            photo: "",
        },

        contactInfo: {
            phone: "",
            email: "",
            website: "",
            location: "",
        },

        links: [],
        isActive: true,
    });

    const next = () => setStep((prev) => prev + 1);
    const back = () => setStep((prev) => prev - 1);

    // API CALL
    const handleSubmit = async () => {
        try {
            const payload = {
                userId: profileData.userId,
                cardId: profileData.cardId,
                profileName: profileData.identity.fullName,
                isDefault: profileData.isDefault,
                theme: profileData.theme,
                identity: profileData.identity,
                contactInfo: profileData.contactInfo,
                links: profileData.links,
                isActive: profileData.isActive,
            };

            const res = await axios.post(
                "http://localhost:3000/api/v1/admin/profiles",
                payload,
                {
                    headers: {
                        "x-admin-api-key": "00dc4e203eb7413e57713272fcb9eee25b752dfbd9343b11028889350bbfe0f5",
                    },
                }
            );

            alert("Profile Created Successfully");
            console.log(res.data);
        } catch (err) {
            console.error(err);
            alert("Error creating profile");
        }
    };

    const addLink = () => {
        if (!platform || !url) return;

        setProfileData({
            ...profileData,
            links: [...profileData.links, { platform, url }],
        });

        setPlatform("");
        setUrl("");
    };

    return (
        <section className=" w-full h-auto bg-white">
            <div className="flex flex-col gap-4 items-center justify-center pt-[120px] sm:pt-20 md:pt-30 px-4 sm:px-6 md:px-0">
                <h2 className="font-Inter font-semibold text-[36px] sm:text-[48px] md:text-[56px] leading-[41px] sm:leading-[54px] md:leading-[61.6px] tracking-[-1.12px] text-[#0F1419] text-center">
                    Create Your Digital Identity
                </h2>
                <p className="font-Inter font-normal text-[18px] sm:text-[16px] md:text-[18px] leading-[28px] sm:leading-[24px] md:leading-[28px] tracking-[-0.16px] text-[#64748B] text-center max-w-[600px] sm:max-w-[90%]">
                    This information will be displayed when someone taps your Carteon card
                </p>
            </div>
            <div className="my-19 flex flex-col gap-3 w-full max-w-[848px] mx-auto px-4 sm:px-6 md:px-0">
                <div className="w-full h-[8px] bg-[#E5E5E5] rounded-full mt-2 overflow-hidden">
                    <div
                        className="h-full bg-[#030213] rounded-full transition-all duration-300"
                        style={{ width: `${(step / 4) * 100}%` }}
                    />
                </div>
                <p className="font-Inter font-normal text-[14px] sm:text-[13px] md:text-[14px] leading-[20px] sm:leading-[18px] md:leading-[20px] text-[#525252] text-left">
                    Step {step} of 4
                </p>
            </div>
            <div className="my-20 flex items-center justify-center px-4 sm:px-6 md:px-0">
                <div className="w-full max-w-[848px] h-auto bg-white border border-t border-[#E5E5E5] rounded-[14px] pt-[32px] pb-[32px] pl-[32px] pr-[32px] shadow-[0px_4px_6px_-4px_#0000001A,0px_10px_15px_-3px_#0000001A]">
                    {step === 1 && (
                        <div className="flex flex-col gap-8">
                            <div className="flex flex-col gap-2">
                                <h2 className="font-Inter font-bold text-[24px] leading-[32px] tracking-[0px] text-[#171717]">Basic Information</h2>
                                <p className="font-Inter font-normal text-[16px] leading-[24px] tracking-[0px] text-[#525252]">Confirm or update your profile details</p>
                            </div>
                            <div className="flex flex-col gap-4">
                                <label className="font-Inter font-medium text-[14px] leading-[14px] tracking-[0px] text-[#404040]">
                                    Photo or Logo
                                </label>
                                <div className="flex items-center gap-4">
                                    <div className="w-[96px] h-[96px] bg-black rounded-[16px] overflow-hidden flex items-center justify-center bg-gray-50">
                                        {profileData.identity.photo ? (
                                            <img
                                                src={profileData.identity.photo}
                                                alt="Profile Preview"
                                                className="object-cover w-full h-full"
                                            />
                                        ) : (
                                            <span className="text-gray-400 text-sm">No image</span>
                                        )}
                                    </div>
                                    <div>
                                        <label className="cursor-pointer flex items-center gap-2 font-Inter font-medium text-[14px] leading-[14px] tracking-[0px] text-[#404040] w-[175px] py-3 px-6 h-[44px] bg-white border-t-2 border-[#D4D4D4] rounded-[10px] border-2 shadow-[0px_1px_2px_-1px_#0000001A,0px_1px_3px_0px_#0000001A]">
                                            <img src={upload} alt="" /> Upload Photo
                                            <input
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={(e) => {
                                                    const file = e.target.files[0];
                                                    if (!file) return;
                                                    if (file.size > 5 * 1024 * 1024) {
                                                        alert("File is too large! Maximum size is 5MB.");
                                                        return;
                                                    }

                                                    // Check file type
                                                    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
                                                    if (!allowedTypes.includes(file.type)) {
                                                        alert("Invalid file format! Allowed: JPG, PNG, GIF.");
                                                        return;
                                                    }

                                                    // Update preview and state
                                                    setProfileData({
                                                        ...profileData,
                                                        identity: {
                                                            ...profileData.identity,
                                                            photo: URL.createObjectURL(file),
                                                        },
                                                    });
                                                }}
                                            />
                                        </label>
                                        <p className="font-Inter font-normal text-[12px] leading-[16px] tracking-[0px] text-[#737373] mt-1">
                                            Allowed formats: JPG, PNG or GIF • Max 5MB
                                        </p>
                                    </div>
                                </div>

                            </div>
                            <div className="flex flex-col gap-3 w-full">
                                <label htmlFor="Full Name" className="font-Inter font-medium text-[14px] leading-[14px] tracking-[0px] text-[#404040]" >Full Name</label>
                                <input
                                    className="w-full h-[48px]  bg-[#F3F3F5] rounded-[8px] pt-[4px] pb-[4px] px-[12px] border border-[#D4D4D4]"
                                    placeholder="Full Name"
                                    value={profileData.identity.fullName}
                                    onChange={(e) =>
                                        setProfileData({
                                            ...profileData,
                                            identity: {
                                                ...profileData.identity,
                                                fullName: e.target.value,
                                            },
                                        })
                                    }
                                />
                            </div>
                            <div className="flex flex-col gap-3 w-full">
                                <label htmlFor="" className="font-Inter font-medium text-[14px] leading-[14px] tracking-[0px] text-[#404040]">Professional Title</label>
                                <input
                                    className="w-full h-[48px] bg-[#F3F3F5] rounded-[8px] pt-[4px] pb-[4px] px-[12px] border border-[#D4D4D4]"
                                    placeholder="Title"
                                    value={profileData.identity.title}
                                    onChange={(e) =>
                                        setProfileData({
                                            ...profileData,
                                            identity: {
                                                ...profileData.identity,
                                                title: e.target.value,
                                            },
                                        })
                                    }
                                />
                            </div>
                            <div className="flex flex-col gap-3 w-full">
                                <label htmlFor="Bio" className="font-Inter font-medium text-[14px] leading-[14px] tracking-[0px] text-[#404040]">Bio <span className="text-[#737373]">(Optional)</span></label>
                                <textarea
                                    className="w-full h-[64px] bg-[#F3F3F5] rounded-[8px] pt-[8px] pb-[8px] px-[12px] border border-t border-[#D4D4D4]"
                                    placeholder="Tell people about yourself..."
                                    value={profileData.identity.bio}
                                    onChange={(e) =>
                                        setProfileData({
                                            ...profileData,
                                            identity: {
                                                ...profileData.identity,
                                                bio: e.target.value,
                                            },
                                        })
                                    }
                                    maxLength={500}
                                />
                                <p className="font-Inter  font-normal text-[12px] leading-[16px] tracking-[0px] text-[#737373]">
                                    {profileData.identity.bio.length} / 500 characters
                                </p>
                            </div>
                            <button
                                onClick={() => {
                                    next();
                                    window.scrollTo({ top: 0, behavior: "smooth" });
                                }}
                                className="w-full h-[48px] cursor-pointer bg-[#252C46] rounded-[8px] shadow-[0px_4px_6px_-4px_#0000001A,0px_10px_15px_-3px_#0000001A] font-Inter font-semibold text-[14px] leading-[20px] tracking-[0px] text-white text-center flex items-center justify-center"
                            >
                                Continue
                            </button>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="flex flex-col gap-8">
                            <div className="flex flex-col gap-2">
                                <h2 className="font-Inter font-bold text-[24px] leading-[32px] tracking-[0px] text-[#171717]">Contact Details</h2>
                                <p className="font-Inter font-normal text-[16px] leading-[24px] tracking-[0px] text-[#525252]">Add your contact information and control what's visible</p>
                            </div>
                            <div className="flex flex-col gap-3 w-full">
                                <label htmlFor="Phone" className="font-Inter font-medium text-[14px] leading-[14px] tracking-[0px] text-[#404040]" >Phone</label>
                                <input
                                    className="w-full h-[48px] bg-[#F3F3F5] rounded-[8px] pt-[4px] pb-[4px] px-[12px] border border-[#D4D4D4]"
                                    placeholder="7010486939"
                                    onChange={(e) =>
                                        setProfileData({
                                            ...profileData,
                                            contactInfo: {
                                                ...profileData.contactInfo,
                                                phone: e.target.value,
                                            },
                                        })
                                    }
                                />
                            </div>
                            <div className="flex flex-col gap-3 w-full">
                                <label htmlFor="Phone" className="font-Inter font-medium text-[14px] leading-[14px] tracking-[0px] text-[#404040]" >Email</label>
                                <input
                                    className="w-full h-[48px] bg-[#F3F3F5] rounded-[8px] pt-[4px] pb-[4px] px-[12px] border border-[#D4D4D4]"
                                    placeholder="dafizzy92@gmail.com"
                                    onChange={(e) =>
                                        setProfileData({
                                            ...profileData,
                                            contactInfo: {
                                                ...profileData.contactInfo,
                                                email: e.target.value,
                                            },
                                        })
                                    }
                                />
                            </div>
                            <div className="flex flex-col gap-3 w-full">
                                <label htmlFor="Phone" className="font-Inter font-medium text-[14px] leading-[14px] tracking-[0px] text-[#404040]" >Website</label>
                                <input
                                    className="w-full h-[48px] bg-[#F3F3F5] rounded-[8px] pt-[4px] pb-[4px] px-[12px] border border-[#D4D4D4]"
                                    placeholder="https://example.com"
                                    onChange={(e) =>
                                        setProfileData({
                                            ...profileData,
                                            contactInfo: {
                                                ...profileData.contactInfo,
                                                website: e.target.value,
                                            },
                                        })
                                    }
                                />
                            </div>
                            <div className="flex flex-col gap-3 w-full">
                                <label htmlFor="Phone" className="font-Inter font-medium text-[14px] leading-[14px] tracking-[0px] text-[#404040]" >Location</label>
                                <input
                                    className="w-full h-[48px] bg-[#F3F3F5] rounded-[8px] pt-[4px] pb-[4px] px-[12px] border border-[#D4D4D4]"
                                    placeholder="Lagos, Nigeria"
                                    onChange={(e) =>
                                        setProfileData({
                                            ...profileData,
                                            contactInfo: {
                                                ...profileData.contactInfo,
                                                location: e.target.value,
                                            },
                                        })
                                    }
                                />
                            </div>
                            <div className="flex gap-3 mt-4">
                                <button
                                    onClick={() => {
                                        back();
                                        window.scrollTo({ top: 0, behavior: "smooth" }); // scroll to top
                                    }}
                                    className="w-full cursor-pointer h-[48px] bg-white rounded-[8px] pt-[8px] pb-[8px] px-[16px] border-2 border-t-2 border-[#D4D4D4] font-Inter font-semibold text-[14px] leading-[20px] tracking-[0px] text-[#0A0A0A] text-center"
                                >
                                    Back
                                </button>

                                <button
                                    onClick={() => {
                                        next();
                                        window.scrollTo({ top: 0, behavior: "smooth" }); // scroll to top
                                    }}
                                    className="w-full h-[48px] cursor-pointer font-Inter font-semibold text-[14px] leading-[20px] tracking-[0px] text-white text-center bg-[#252C46] rounded-[8px] pt-[8px] pb-[8px] px-[16px] shadow-[0px_4px_6px_-4px_#0000001A,0px_10px_15px_-3px_#0000001A]"
                                >
                                    Continue
                                </button>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="flex flex-col gap-8">
                            <div className="flex flex-col gap-2">
                                <h2 className="font-Inter font-bold text-[24px] leading-[32px] tracking-[0px] text-[#171717]">Links</h2>
                                <p className="font-Inter font-normal text-[16px] leading-[24px] tracking-[0px] text-[#525252]">Add social media and other important links</p>
                            </div>

                            <div className="w-full h-auto border-2 border-t-2 flex flex-col gap-4 border-[#D4D4D4] rounded-[10px] pt-[18px] pb-[22px] px-[18px]">
                                {profileData.links.map((link, index) => (
                                    <div key={link.id} className="flex flex-col gap-3 w-full">
                                        <label className="font-Inter font-medium text-[14px] leading-[14px] tracking-[0px] text-[#404040]">
                                            Platform
                                        </label>
                                        <input
                                            className="w-full h-auto bg-[#F3F3F5] rounded-[8px] pt-[4px] pb-[4px] px-[12px] border border-[#D4D4D4]"
                                            placeholder="e.g., LinkedIn, Instagram, Portfolio"
                                            value={link.platform}
                                            onChange={(e) => {
                                                const newLinks = [...profileData.links];
                                                newLinks[index].platform = e.target.value;
                                                setProfileData({ ...profileData, links: newLinks });
                                            }}
                                        />

                                        <label className="font-Inter font-medium text-[14px] leading-[14px] tracking-[0px] text-[#404040]">
                                            URL
                                        </label>
                                        <input
                                            className="w-full h-auto bg-[#F3F3F5] rounded-[8px] pt-[4px] pb-[4px] px-[12px] border border-[#D4D4D4]"
                                            placeholder="https://"
                                            value={link.url}
                                            onChange={(e) => {
                                                const newLinks = [...profileData.links];
                                                newLinks[index].url = e.target.value;
                                                setProfileData({ ...profileData, links: newLinks });
                                            }}
                                        />
                                    </div>
                                ))}
                                <button
                                    onClick={() => {
                                        setProfileData({
                                            ...profileData,
                                            links: [
                                                ...profileData.links,
                                                { id: Date.now(), platform: "", url: "" },
                                            ],
                                        });
                                    }}
                                    className="w-full cursor-pointer h-[48px] bg-white rounded-[8px] border-2 border-t-2 border-[#252C46] flex items-center justify-center font-Inter font-semibold text-[14px] leading-[20px] tracking-[0px] text-[#252C46] text-center"
                                >
                                    + Add Link
                                </button>
                            </div>
                            <div className="flex gap-3 mt-4">
                                <button
                                    onClick={() => {
                                        back();
                                        window.scrollTo({ top: 0, behavior: "smooth" }); // scroll to top
                                    }}
                                    className="w-full cursor-pointer h-[48px] bg-white rounded-[8px] pt-[8px] pb-[8px] px-[16px] border-2 border-t-2 border-[#D4D4D4] font-Inter font-semibold text-[14px] leading-[20px] tracking-[0px] text-[#0A0A0A] text-center"
                                >
                                    Back
                                </button>

                                <button
                                    onClick={() => {
                                        next(); // go to next step
                                        window.scrollTo({ top: 0, behavior: "smooth" }); // scroll to top
                                    }}
                                    className="w-full h-[48px] cursor-pointer font-Inter font-semibold text-[14px] leading-[20px] tracking-[0px] text-white text-center bg-[#252C46] rounded-[8px] pt-[8px] pb-[8px] px-[16px] shadow-[0px_4px_6px_-4px_#0000001A,0px_10px_15px_-3px_#0000001A]"
                                >
                                    Continue
                                </button>
                            </div>
                        </div>
                    )}

                    {step === 4 && (
                        <div className="flex flex-col gap-6 w-full max-w-[782px] px-2 sm:px-6 md:px-0">
                            <h2 className="font-Inter font-bold text-[24px] sm:text-[24px] md:text-[24px] leading-[32px] tracking-[0px] text-[#171717]">
                                Review Your Profile
                            </h2>
                            <p className="font-Inter font-normal text-[16px] sm:text-[16px] md:text-[16px] leading-[24px] tracking-[0px] text-[#525252]">
                                Check all the details before publishing
                            </p>

                            {/* Photo/Logo */}
                            <div className="flex flex-col gap-2">
                                <label className="font-Inter font-medium text-[14px] text-[#404040]">Photo/Logo</label>
                                <div className="w-[96px] h-[96px] sm:w-[80px] sm:h-[80px] md:w-[96px] md:h-[96px] bg-gray-50 rounded-[16px] overflow-hidden flex items-center justify-center">
                                    {profileData.identity.photo ? (
                                        <img
                                            src={profileData.identity.photo}
                                            alt="Profile"
                                            className="object-cover w-full h-full"
                                        />
                                    ) : (
                                        <span className="text-gray-400 text-sm">No image</span>
                                    )}
                                </div>
                            </div>

                            {/* Basic Information */}
                            <div className="flex flex-col gap-2">
                                <p><strong>Full Name:</strong> {profileData.identity.fullName || "-"}</p>
                                <p><strong>Professional Title:</strong> {profileData.identity.title || "-"}</p>
                                <p><strong>Bio:</strong> {profileData.identity.bio || "-"}</p>
                            </div>

                            {/* Contact Details */}
                            <div className="flex flex-col gap-2">
                                <p><strong>Phone:</strong> {profileData.contactInfo.phone || "-"}</p>
                                <p><strong>Email:</strong> {profileData.contactInfo.email || "-"}</p>
                                <p><strong>Website:</strong> {profileData.contactInfo.website || "-"}</p>
                                <p><strong>Location:</strong> {profileData.contactInfo.location || "-"}</p>
                            </div>

                            {/* Links */}
                            <div className="flex flex-col gap-2">
                                <strong>Links:</strong>
                                {profileData.links.length > 0 ? (
                                    profileData.links.map((link, index) => (
                                        <p key={link.id || index}>
                                            {link.platform || "-"}: {link.url || "-"}
                                        </p>
                                    ))
                                ) : (
                                    <p className="text-gray-500">No links added</p>
                                )}
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-row gap-3 mt-4">
                                <button
                                    onClick={() => {
                                        back();
                                        window.scrollTo({ top: 0, behavior: "smooth" }); // scroll to top
                                    }}
                                    className="w-1/2 h-[48px] border border-[#D4D4D4] rounded-[8px] font-Inter font-semibold text-[14px] text-[#0A0A0A]"
                                >
                                    Back
                                </button>

                                <button
                                    onClick={handleSubmit}
                                    className="w-1/2 h-[48px] bg-[#252C46] text-white rounded-[8px] font-Inter font-semibold text-[14px]"
                                >
                                    Publish
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </section>

    );
};

export default ProfileSetup;