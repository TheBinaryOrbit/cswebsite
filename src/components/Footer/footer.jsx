import img from '../../assets/logofooter.png';

const Footer = () => {
    return (
        <footer className="relative w-full bg-black rounded-t-3xl h-fit p-5 overflow-hidden">
            <div className="relative z-10 max-w-7xl mx-auto pt-8">
                {/* <div className='flex flex-col md:flex-row justify-between items-center mb-10 text-center md:text-left'>
                    <img src={img} alt="img" className='w-32' />
                    <h1 className="text-2xl md:text-3xl text-white font-semibold capitalize mt-4 md:mt-0">Job well-done.</h1>
                </div> */}

                <div className='text-white grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5 mb-10'>
                    <div className="col-span-2 md:col-span-2 md:mr-10 mr-0 flex flex-col items-center md:items-start gap-4">
                        <img src="https://kiet.edu/assets/images/logo/dark_logo.png" alt="img" className='w-[60%] sm:w-[80%]' />
                    </div>
                    <div className='hidden md:block'>
                        {/* <h3 className="text-lg font-semibold mb-4">Home & Repairs</h3>
                        <ul className="flex flex-col gap-2 text-sm">
                            <li className="hover:text-gray-300 cursor-pointer">Home Repairs</li>
                            <li className="hover:text-gray-300 cursor-pointer">Furniture Assembly</li>
                            <li className="hover:text-gray-300 cursor-pointer">Painting</li>
                            <li className="hover:text-gray-300 cursor-pointer">Farm Work</li>
                        </ul> */}
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Resources</h3>
                        <ul className="flex flex-col gap-2 text-sm">
                            <li className="hover:text-gray-300 cursor-pointer">1<sup>st</sup> Year Syllabus</li>
                            <li className="hover:text-gray-300 cursor-pointer">2<sup>nd</sup> Year Syllabus</li>
                            <li className="hover:text-gray-300 cursor-pointer">3<sup>rd</sup> Year Syllabus</li>
                            <li className="hover:text-gray-300 cursor-pointer">4<sup>th</sup> Year Syllabus</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Important Links</h3>
                        <ul className="flex flex-col gap-2 text-sm">
                            <li className="hover:text-gray-300 cursor-pointer"><a href="https://kiet.edu/student-welfare/internal-complaints-committee/" target="_blank" rel="noopener noreferrer" className="text-inherit"> Internal Complaints Committee (ICC)</a></li>
                            <li className="hover:text-gray-300 cursor-pointer"><a href="https://kiet.edu/academics/student-grievance-redressal/" target="_blank" rel="noopener noreferrer" className="text-inherit">Student Grievance Redressal</a></li>
                            <li className="hover:text-gray-300 cursor-pointer"><a href="https://kiet.edu/student-welfare/student-discipline-policy/" target="_blank" rel="noopener noreferrer" className="text-inherit">Student Discipline Policy</a></li>
                            <li className="hover:text-gray-300 cursor-pointer"><a href="https://kiet.edu/student-welfare/counselling-support/" target="_blank" rel="noopener noreferrer" className="text-inherit">Counselling Support</a></li>
                            <li className="hover:text-gray-300 cursor-pointer"><a href="https://kiet.edu/careers/" target="_blank" rel="noopener noreferrer" className="text-inherit">Careers</a></li>
                            <li className="hover:text-gray-300 cursor-pointer"><a href="https://kiet.edu/contact-us/" target="_blank" rel="noopener noreferrer" className="text-inherit">Contact Us</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Contacts</h3>
                        <ul className="flex flex-col gap-2 text-sm">
                            <li className="hover:text-gray-300 cursor-pointer">+91-8445557599</li>
                            <li className="hover:text-gray-300 cursor-pointer">admissions@kiet.edu</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className='relative z-10  max-w-7xl mx-auto py-5 flex flex-col md:flex-row justify-center items-center mb-8 sm:mb-14 md:mb-28 '>
                <p className='text-white'>
                    Made with ❤️ by {" "}
                    <a href="https://github.com/7anish" target="_blank"  className=" underline cursor-pointer z-50">
                        @7anish
                    </a>
                </p>
            </div>

            
            <div className="pointer-events-none absolute inset-x-0 bottom-[-18px] md:bottom-[-36px] z-0 text-center select-none ">
                
                <p className="text-[17vw] md:text-[11vw] leading-none font-extrabold tracking-tight text-white/10 whitespace-nowrap z-30">
                    KIET CS &amp; CSE-DS
                </p>
            </div>
        </footer>
    );
};

export default Footer;
