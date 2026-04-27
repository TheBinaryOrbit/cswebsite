
import { useState } from "react";
import { FaInstagram, FaYoutube, FaGithub, FaXTwitter, FaFacebook, FaLinkedin } from "react-icons/fa6";
import { LuMenu } from "react-icons/lu";
import { IoClose } from "react-icons/io5";
import img from '../../assets/logo.jpg';
import { Link, useLocation, useNavigate } from "react-router-dom";

const Header = () => {
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const toggleMobileMenu = () => setIsMobileOpen((prev) => !prev);
    const closeMobileMenu = () => setIsMobileOpen(false);

    const handleScrollToSection = (sectionId) => {
        closeMobileMenu();
        
        // If on home page, scroll directly
        if (location.pathname === "/") {
            setTimeout(() => {
                const element = document.getElementById(sectionId);
                if (element) {
                    element.scrollIntoView({ behavior: "smooth", block: "start" });
                }
            }, 0);
        } else {
            // Navigate to home page first, then scroll
            navigate("/");
            setTimeout(() => {
                const element = document.getElementById(sectionId);
                if (element) {
                    element.scrollIntoView({ behavior: "smooth", block: "start" });
                }
            }, 500);
        }
    };

    return (
        <header className="w-full  py-3 bg-[#fafafa]  z-50 sticky top-0">
            <div className="max-w-7xl flex items-center lg:mx-auto mx-5 gap-20 relative z-50 justify-between">
                <Link to="/">
                    <img src={img}  alt="logo" className="h-14" />
                </Link>
                <nav  className="">
                    <ul className="style-none hidden lg:flex gap-5 text-black ml-24">
                        <button onClick={() => handleScrollToSection("faculty-section")} className="font-medium capitalize text-[#113959] hover:text-[#f15b20] font-serif cursor-pointer bg-transparent border-none">Faculty</button>
                        <Link to="/placements" className="font-medium capitalize text-[#113959] hover:text-[#f15b20] font-serif">Placements</Link>
                        <Link to="/gallery" className="font-medium capitalize text-[#113959] hover:text-[#f15b20] font-serif">Gallery</Link>
                        <li className="group relative">
                            <p className="flex items-center gap-1 font-medium capitalize cursor-pointer text-[#113959] group-hover:text-[#f15b20] font-serif">
                                Community
                                <svg
                                    stroke="#113959"
                                    fill="#113959"
                                    strokeWidth="0"
                                    viewBox="0 0 320 512"
                                    className="translate-y-0.5 group-hover:rotate-180 duration-300 text-[#113959] group-hover:text-[#f15b20] group-hover:stroke-[#f15b20] group-hover:fill-[#f15b20]"
                                    height="12"
                                    width="12"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z"></path>
                                </svg>
                            </p>
                            <ul className="absolute top-full mt-3 bg-gray-100 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible  p-2 font-medium capitalize rounded-xl space-y-2 shadow-lg z-50">
                                <a href="https://www.instagram.com/kiet_edu/" target="_blank" rel="noopener noreferrer" className="hover:bg-gray-200 rounded-lg p-2 cursor-pointer duration-200 flex items-center gap-2 block">
                                    <div className="bg-gray-300 items-center justify-center flex h-10 w-10 rounded-lg">
                                        <FaInstagram />
                                    </div>
                                    <div>
                                        <h1>Instagram</h1>
                                        <p className="text-sm text-gray-400">Follow Us on Instagram</p>
                                    </div>
                                </a>
                                <a href="https://x.com/Kiet_edu" target="_blank" rel="noopener noreferrer" className="hover:bg-gray-200 rounded-lg p-2 cursor-pointer duration-200 flex items-center gap-2 block">
                                    <div className="bg-gray-300 items-center justify-center flex h-10 w-10 rounded-lg">
                                        <FaXTwitter />
                                    </div>
                                    <div>
                                        <h1>Twitter/X</h1>
                                        <p className="text-sm text-gray-400">Follow Us on Twitter</p>
                                    </div>
                                </a>
                                <a href="https://www.facebook.com/kiet.edu/" target="_blank" rel="noopener noreferrer" className="hover:bg-gray-200 rounded-lg p-2 cursor-pointer duration-200 flex items-center gap-2 block">
                                    <div className="bg-gray-300 items-center justify-center flex h-10 w-10 rounded-lg">
                                        <FaFacebook />
                                    </div>
                                    <div>
                                        <h1>Facebook</h1>
                                        <p className="text-sm text-gray-400">Follow Us on Facebook</p>
                                    </div>
                                </a>
                                <a href="https://www.linkedin.com/school/kiet-group-of-institutions/" target="_blank" rel="noopener noreferrer" className="hover:bg-gray-200 rounded-lg p-2 cursor-pointer duration-200 flex items-center gap-2 block">
                                    <div className="bg-gray-300 items-center justify-center flex h-10 w-10 rounded-lg">
                                        <FaLinkedin />
                                    </div>
                                    <div>
                                        <h1>LinkedIn</h1>
                                        <p className="text-sm text-gray-400">Follow Us on LinkedIn</p>
                                    </div>
                                </a>
                                <a href="https://www.youtube.com/@KietEduGzb" target="_blank" rel="noopener noreferrer" className="hover:bg-gray-200 rounded-lg p-2 cursor-pointer duration-200 flex items-center gap-2 block">
                                    <div className="bg-gray-300 items-center justify-center flex h-10 w-10 rounded-lg">
                                        <FaYoutube />
                                    </div>
                                    <div>
                                        <h1>Youtube</h1>
                                        <p className="text-sm text-gray-400">Follow Us on Youtube</p>
                                    </div>
                                </a>
                            </ul>
                        </li>
                        
                    </ul>
                </nav>
                <nav className="gap-4 text-[#113959] hidden lg:flex ">
                        <a
                        href="https://admission.kiet.edu/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="border px-3 border-[#113959] rounded-2xl shadow-button hover:scale-95 hover:border-[#f15b20] hover:text-[#f15b20] duration-300 text-sm py-1 font-medium tracking-wide cursor-pointer"
                    >
                        Get Admission
                    </a>
                </nav>
                <div className="flex lg:hidden items-center">
                    <button
                        type="button"
                        onClick={toggleMobileMenu}
                        aria-label={isMobileOpen ? "Close menu" : "Open menu"}
                        className="text-[#113959]"
                    >
                        {isMobileOpen ? <IoClose size={28} /> : <LuMenu size={24} />}
                    </button>
                </div>
            </div>

            {isMobileOpen && (
                <div className="lg:hidden mt-3 mx-5 rounded-2xl border border-[#113959]/20 bg-[#fafafa] shadow-md">
                    <div className="p-4 flex flex-col gap-3 text-[#113959]">
                        <button
                            onClick={() => handleScrollToSection("faculty-section")}
                            className="font-semibold font-serif hover:text-[#f15b20] bg-transparent border-none text-left cursor-pointer"
                        >
                            Faculty
                        </button>
                        <Link
                            to="/placements"
                            onClick={closeMobileMenu}
                            className="font-semibold font-serif hover:text-[#f15b20]"
                        >
                            Placements
                        </Link>
                      
                        <Link
                            to="/gallery"
                            onClick={closeMobileMenu}
                            className="font-semibold font-serif hover:text-[#f15b20]"
                        >
                            Gallery
                        </Link>

                        <div className="pt-2 border-t border-[#113959]/15">
                            <p className="font-semibold font-serif mb-2">Community</p>
                            <div className="grid grid-cols-2 gap-2 text-sm">
                                <a href="https://www.instagram.com/kiet_edu/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 p-2 rounded-lg bg-gray-100 hover:bg-gray-200">
                                    <FaInstagram /> Instagram
                                </a>
                                <a href="https://x.com/Kiet_edu" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 p-2 rounded-lg bg-gray-100 hover:bg-gray-200">
                                    <FaXTwitter /> Twitter
                                </a>
                                <a href="https://www.facebook.com/kiet.edu/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 p-2 rounded-lg bg-gray-100 hover:bg-gray-200">
                                    <FaFacebook /> Facebook
                                </a>
                                <a href="https://www.linkedin.com/school/kiet-group-of-institutions/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 p-2 rounded-lg bg-gray-100 hover:bg-gray-200">
                                    <FaLinkedin /> LinkedIn
                                </a>
                                <a href="https://www.youtube.com/@KietEduGzb" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 p-2 rounded-lg bg-gray-100 hover:bg-gray-200 col-span-2">
                                    <FaYoutube /> YouTube
                                </a>
                            </div>
                        </div>

                        <a
                            href="https://admission.kiet.edu/"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={closeMobileMenu}
                            className="mt-2 text-center border border-[#113959] rounded-xl py-2 font-medium hover:border-[#f15b20] hover:text-[#f15b20]"
                        >
                            Get Admission
                        </a>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
