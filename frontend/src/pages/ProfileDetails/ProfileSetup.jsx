import { useState } from "react";
import axios from "axios";
import Footer from "../../components/Footer/Footer";

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
                "http://localhost:5000/api/v1/admin/profiles",
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
        <section>
            <div className="min-h-screen flex items-center justify-center bg-gray-50 px-8">
                <div className="bg-white w-full max-w-xl p-6 rounded-xl shadow-md">
                    <div className="mb-6">
                        <p className="text-sm text-gray-500">Step {step} of 4</p>
                        <div className="w-full bg-gray-200 h-2 rounded mt-2">
                            <div
                                className="bg-black h-2 rounded"
                                style={{ width: `${(step / 4) * 100}%` }}
                            />
                        </div>
                    </div>

                    {/* STEP 1 */}
                    {step === 1 && (
                        <div>
                            <h2 className="text-xl font-semibold mb-4">Basic Information</h2>

                            <input
                                className="w-full border p-3 rounded-md"
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

                            <input
                                className="w-full border p-3 rounded-md mt-3"
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

                            <textarea
                                className="w-full border p-3 rounded-md mt-3"
                                placeholder="Bio"
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
                            />

                            <button
                                onClick={next}
                                className="bg-[#0F172A] text-white w-full py-3 rounded-md mt-4"
                            >
                                Continue
                            </button>
                        </div>
                    )}

                    {/* STEP 2 */}
                    {step === 2 && (
                        <div>
                            <h2 className="text-xl font-semibold mb-4">Contact Details</h2>

                            <input
                                className="w-full border p-3 rounded-md"
                                placeholder="Phone"
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

                            <input
                                className="w-full border p-3 rounded-md mt-3"
                                placeholder="Email"
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

                            <input
                                className="w-full border p-3 rounded-md mt-3"
                                placeholder="Website"
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

                            <input
                                className="w-full border p-3 rounded-md mt-3"
                                placeholder="Location"
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

                            <div className="flex gap-3 mt-4">
                                <button onClick={back} className="border w-full py-3 rounded-md">
                                    Back
                                </button>
                                <button
                                    onClick={next}
                                    className="bg-[#0F172A] text-white w-full py-3 rounded-md"
                                >
                                    Continue
                                </button>
                            </div>
                        </div>
                    )}

                    {/* STEP 3 */}
                    {step === 3 && (
                        <div>
                            <h2 className="text-xl font-semibold mb-4">Links</h2>

                            <input
                                className="w-full border p-3 rounded-md"
                                placeholder="Platform"
                                value={platform}
                                onChange={(e) => setPlatform(e.target.value)}
                            />

                            <input
                                className="w-full border p-3 rounded-md mt-3"
                                placeholder="URL"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                            />

                            <button onClick={addLink} className="mt-3 text-blue-500">
                                + Add Link
                            </button>

                            <div className="mt-3">
                                {profileData.links.map((link, i) => (
                                    <p key={i}>
                                        {link.platform} - {link.url}
                                    </p>
                                ))}
                            </div>

                            <div className="flex gap-3 mt-4">
                                <button onClick={back} className="border w-full py-3 rounded-md">
                                    Back
                                </button>
                                <button
                                    onClick={next}
                                    className="bg-[#0F172A] text-white w-full py-3 rounded-md"
                                >
                                    Continue
                                </button>
                            </div>
                        </div>
                    )}

                    {/* STEP 4 */}
                    {step === 4 && (
                        <div>
                            <h2 className="text-xl font-semibold mb-4">Review</h2>

                            <p><strong>Name:</strong> {profileData.identity.fullName}</p>
                            <p><strong>Title:</strong> {profileData.identity.title}</p>
                            <p><strong>Email:</strong> {profileData.contactInfo.email}</p>

                            <div className="mt-3">
                                <strong>Links:</strong>
                                {profileData.links.map((l, i) => (
                                    <p key={i}>{l.platform} - {l.url}</p>
                                ))}
                            </div>

                            <div className="flex gap-3 mt-4">
                                <button onClick={back} className="border w-full py-3 rounded-md">
                                    Back
                                </button>
                                <button
                                    onClick={handleSubmit}
                                    className="bg-[#0F172A] text-white w-full py-3 rounded-md"
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