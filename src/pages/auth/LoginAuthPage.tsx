import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../redux/slices/AuthSlice.ts";
import { RiChat1Line, RiWechatChannelsLine } from "react-icons/ri";
import { GoVerified } from "react-icons/go";
import { CgArrowsExchange } from "react-icons/cg";
import Imag from "../../assets/login_bg.jpg";
import { AppDispatch } from "../../redux/Store.ts";

const Login: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [formValidator, setFormValidator] = useState({
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState({
        email: "",
        password: "",
    });

    const validateField = (name: string, value: string): string => {
        switch (name) {
            case "email":
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? "" : "Invalid email format.";
            case "password":
                return value.length >= 6 ? "" : "Password must be at least 6 characters.";
            default:
                return "";
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        setFormValidator((prevState) => ({
            ...prevState,
            [name]: value,
        }));
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: validateField(name, value),
        }));
    };

    const handleSubmit = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault();

        const newErrors = {
            email: validateField("email", formValidator.email),
            password: validateField("password", formValidator.password),
        };
        setErrors(newErrors);

        if (!Object.values(newErrors).some((error) => error)) {
            try {
                const response = await dispatch(login({ email: formValidator.email, password: formValidator.password })).unwrap();
                const token = response?.token || localStorage.getItem("token");

                if (token) {
                    window.location.href = "/dashboard";
                } else {
                    console.error("No token found.");
                }
            } catch (error) {
                console.error("Login failed:", error);
            }
        }
    };

    return (
        <main className="flex w-full h-screen flex-col md:flex-row">
            <div className="overflow-y-hidden text-black w-full md:w-[35rem]">
                <div className="flex m-3 justify-between">
                    <h1 className="font-extrabold text-lg">You Fragrances</h1>
                    <div className="underline cursor-pointer">Go to Login</div>
                </div>

                <div className="flex items-center align-middle h-screen justify-center w-full">
                    <div className="h-auto md:h-[28rem]">
                        <div className="w-80 sm:w-96 flex flex-col gap-5">
                            <h1 className="text-3xl font-bold">Sign In</h1>
                            <span>Enter your email and password</span>
                            <input
                                name="email"
                                value={formValidator.email}
                                onChange={handleInputChange}
                                className="rounded-lg p-2 border-gray-100 focus:border-gray-200"
                                placeholder="example@gmail.com"
                            />
                            {errors.email && <span className="text-red-500">{errors.email}</span>}

                            <div className="flex justify-end -mt-3 -mb-4">
                                <h1 className="text-gray-400 underline text-sm cursor-pointer">Forgot password?</h1>
                            </div>

                            <input
                                name="password"
                                value={formValidator.password}
                                onChange={handleInputChange}
                                type="password"
                                className="rounded-lg p-2 outline-0 border-gray-100 focus:border-gray-200 focus:outline-0 focus:ring-0"
                                placeholder="password"
                            />
                            {errors.password && <span className="text-red-500">{errors.password}</span>}

                            <div className="flex gap-3">
                                <label className="flex items-center gap-2">
                                    <input type="checkbox" name="rememberMe" />
                                    <span>Remember me for 30 days</span>
                                </label>
                            </div>

                            <button
                                onClick={handleSubmit}
                                className="bg-[#476ACD] p-2 text-white rounded-lg flex justify-center items-center"
                            >
                                Log In
                            </button>

                            <div className="flex items-center">
                                <div className="bg-gray-300 w-20 sm:w-52 h-[1px]" />
                                <span className="m-1.5 text-sm text-gray-400">OR</span>
                                <div className="bg-gray-300 w-20 sm:w-52 h-[1px]" />
                            </div>

                            <button className="bg-[#EFF2FB] w-full p-2 rounded-lg text-[#476ACD]">
                                Sign In with Google
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex-1 relative h-screen bg-[#1F3474] hidden md:flex">
                <div className="relative z-10 flex h-full w-full justify-center items-center">
                    <div className="w-80 sm:w-96 p-4 rounded-lg bg-white h-auto sm:h-[29rem] shadow-lg flex flex-col items-center relative">
                        <div className="flex gap-3 justify-center">
                            <div className="text-2xl h-fit rounded-lg p-4 bg-black text-white">
                                <RiWechatChannelsLine />
                            </div>
                            <div className="text-gray-300 flex justify-center items-center text-4xl">
                                <CgArrowsExchange />
                            </div>
                            <div className="text-2xl h-fit rounded-lg p-4 bg-[#1f3474] text-white">
                                <RiChat1Line />
                            </div>
                        </div>

                        <div className="mt-8 text-center">
                            <h1 className="text-lg font-semibold">Connect Untitled to linear</h1>
                            <span className="text-[13px] text-gray-300">
                                Access your account to stay connected and manage your preferences.
                            </span>
                            <hr className="mt-3" />
                        </div>

                        <div className="mt-3 text-[13px] m-2 text-gray-400">
                            <span className="flex items-center">Access to your microphone <GoVerified className="ml-1 text-green-600" /></span>
                            <span className="flex items-center">Access to your Camera <GoVerified className="ml-1 text-green-600" /></span>
                            <span className="flex items-center">Access to your Storage <GoVerified className="ml-1 text-green-600" /></span>
                            <hr className="mt-3" />
                        </div>

                        <div className="mt-3 space-y-4">
                            <button className="bg-[#476ACD] w-full p-2 rounded-lg text-white">Allow Access</button>
                            <button className="bg-[#EFF2FB] w-full p-2 rounded-lg text-[#476ACD]">Cancel</button>
                        </div>
                    </div>
                </div>
                <img src={Imag} alt="Background" className="absolute inset-0 w-full h-full object-cover" />
            </div>
        </main>
    );
};

export default Login;
