"use client"
import { BiSolidHappyHeartEyes } from "react-icons/bi";


const Placements2 = () => {
    return (
        <div className="w-full py-8">
            <div className="max-w-7xl mx-auto p-4">
                {/* Vision and Mission */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-[#113959] rounded-2xl p-6 lg:p-10 flex justify-between flex-col">
                        <h1 className="lg:text-4xl text-2xl text-white font-serif leading-tight font-medium mb-4 lg:mb-6">Our Vision</h1>
                        <p className="text-white mb-6 leading-relaxed">To emerge as a leader in the field of computer science education with innovation and research to create a positive global impact.</p>
                        <ul className="space-y-4">
                            <li className="rounded-lg cursor-pointer duration-200 flex items-center gap-4">
                                <div className="bg-white items-center justify-center flex h-8 w-8 rounded-lg shrink-0">
                                    <BiSolidHappyHeartEyes className="text-[#113959] text-xl" />
                                </div>
                                <div>
                                    <h3 className="text-lg text-white font-semibold">Innovation & Research</h3>
                                    <p className="text-sm font-light text-gray-200">Foster cutting-edge research and innovation.</p>
                                </div>
                            </li>
                            <li className="rounded-lg cursor-pointer duration-200 flex items-center gap-4">
                                <div className="bg-white items-center justify-center flex h-8 w-8 rounded-lg shrink-0">
                                    <BiSolidHappyHeartEyes className="text-[#113959] text-xl" />
                                </div>
                                <div>
                                    <h3 className="text-lg text-white font-semibold">Global Impact</h3>
                                    <p className="text-sm font-light text-gray-200">Create positive change through technology.</p>
                                </div>
                            </li>
                            <li className="rounded-lg cursor-pointer duration-200 flex items-center gap-4">
                                <div className="bg-white items-center justify-center flex h-8 w-8 rounded-lg shrink-0">
                                    <BiSolidHappyHeartEyes className="text-[#113959] text-xl" />
                                </div>
                                <div>
                                    <h3 className="text-lg text-white font-semibold">Educational Excellence</h3>
                                    <p className="text-sm font-light text-gray-200">Lead in quality computer science education.</p>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div className="bg-[#f15b20] rounded-2xl p-6 lg:p-10 flex justify-between flex-col">
                        <h1 className="lg:text-4xl text-2xl text-white font-serif leading-tight font-medium mb-4 lg:mb-6">Our Mission</h1>
                        <ul className="space-y-4 mb-6">
                            <li className="flex items-start gap-3">
                                <BiSolidHappyHeartEyes className="text-white text-xl mt-1 shrink-0" />
                                <div>
                                    <p className="text-white font-semibold">Quality Education</p>
                                    <p className="text-sm text-gray-100">Provide quality education in computer science to shape next-generation leaders for global community.</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <BiSolidHappyHeartEyes className="text-white text-xl mt-1 shrink-0" />
                                <div>
                                    <p className="text-white font-semibold">Industry Integration</p>
                                    <p className="text-sm text-gray-100">Equip students with skills and knowledge by integrating latest technologies and innovative practices.</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <BiSolidHappyHeartEyes className="text-white text-xl mt-1 shrink-0" />
                                <div>
                                    <p className="text-white font-semibold">Research & Innovation</p>
                                    <p className="text-sm text-gray-100">Create a conducive environment for research and innovation for providing sustainable solutions.</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <BiSolidHappyHeartEyes className="text-white text-xl mt-1 shrink-0" />
                                <div>
                                    <p className="text-white font-semibold">Responsible Professionals</p>
                                    <p className="text-sm text-gray-100">Develop socially responsible professionals while encouraging personal and professional growth.</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* PEO and PSO */}
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-gradient-to-br from-[#002855] to-[#113959] rounded-2xl p-6 lg:p-10">
                        <h1 className="lg:text-3xl text-2xl text-white font-serif leading-tight font-medium mb-4 lg:mb-6">Program Educational Objectives (PEO)</h1>
                        <p className="text-gray-200 mb-4 text-sm">Graduates shall be:</p>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3">
                                <BiSolidHappyHeartEyes className="text-[#f15b20] text-lg mt-1 shrink-0" />
                                <div>
                                    <p className="text-white font-semibold text-sm">Successful Career Leaders</p>
                                    <p className="text-xs text-gray-300">Engaged in successful career in the software industry and higher studies.</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <BiSolidHappyHeartEyes className="text-[#f15b20] text-lg mt-1 shrink-0" />
                                <div>
                                    <p className="text-white font-semibold text-sm">Adaptable Innovators</p>
                                    <p className="text-xs text-gray-300">Adaptable to recent trends for developing innovative solutions.</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <BiSolidHappyHeartEyes className="text-[#f15b20] text-lg mt-1 shrink-0" />
                                <div>
                                    <p className="text-white font-semibold text-sm">Global Citizens</p>
                                    <p className="text-xs text-gray-300">Socially responsible global citizen and leaders in their domain.</p>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div className="bg-gradient-to-br from-[#1a5f7a] to-[#0f4c81] rounded-2xl p-6 lg:p-10">
                        <h1 className="lg:text-3xl text-2xl text-white font-serif leading-tight font-medium mb-4 lg:mb-6">Program Specific Objectives (PSO)</h1>
                        <p className="text-gray-200 mb-4 text-sm">Graduates will be:</p>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3">
                                <BiSolidHappyHeartEyes className="text-[#f15b20] text-lg mt-1 shrink-0" />
                                <div>
                                    <p className="text-white font-semibold text-sm">Problem-Solving Experts</p>
                                    <p className="text-xs text-gray-300">Utilize technical skills of problem solving for boosting their employability and career advancement.</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <BiSolidHappyHeartEyes className="text-[#f15b20] text-lg mt-1 shrink-0" />
                                <div>
                                    <p className="text-white font-semibold text-sm">Research Leaders</p>
                                    <p className="text-xs text-gray-300">Equipped to leverage domain knowledge and expertise to enhance their research profile and academic contributions.</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Placements2
