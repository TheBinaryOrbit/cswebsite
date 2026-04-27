
"use client"
import React from "react";
import { FiUser } from "react-icons/fi";
import { motion } from "framer-motion";
import { testimonials } from "../../data/testimonialsData";

const VoicesOfExcellence = () => {
    return (
        <div className="w-full py-10">
            <div className="max-w-7xl mx-auto p-4">
                <div className="flex justify-center md:justify-start items-center h-fit">
                    <p className="flex justify-start items-center border-[1px] border-slate-300 px-3 rounded-lg text-xs  gap-1 mb-4 py-1 text-slate-700 font-semibold">
                        <FiUser size={12} /><span className="text-xs -translate-y-[1px]  font-semibold">Alumni</span>
                    </p>
                </div>
                <h1 className="text-center md:text-left text-4xl md:text-5xl/tight   font-bold  capitalize mb-2">Voices of Excellence</h1>
                <p className="text-sm md:text-lg text-center md:text-left text-slate-500 mb-6 md:mb-10">Hear from our successful alumni who have made their mark in leading companies worldwide.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 overflow-hidden h-[40rem] p-4">
                    <TestimonialsColumn
                        testimonials={testimonials}
                        duration={15}
                    />
                    <TestimonialsColumn
                        testimonials={testimonials}
                        className="hidden md:block"
                        duration={19}
                    />
                    <TestimonialsColumn
                        testimonials={testimonials}
                        className="hidden lg:block"
                        duration={17}
                    />

                </div>
            </div>
        </div>
    )
}


const TestimonialsColumn = (props) => (
    <div className={props.className}>
        <motion.div
            animate={{
                translateY: '-50%',
            }}
            transition={{
                duration: props.duration || 10,
                repeat: Infinity,
                ease: 'linear',
                repeatType: 'loop',
            }}
            className="flex flex-col gap-6 pb-6"
        >
            {[...new Array(2)].fill(0).map((_, index) => (
                <React.Fragment key={index}>
                    {props.testimonials.map(
                        ({ id, text, imageSrc, name, position, company, batch, branch, companyLogo }, index) => (
                            <div
                                key={`${id}-${index}`}
                                className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white shadow-lg hover:shadow-xl transition-all duration-300 p-5 flex flex-col justify-between gap-4"
                            >
                                {/* Top Section */}
                                <div className="flex items-start gap-3">
                                    <img
                                        src={imageSrc}
                                        alt={name}
                                        className="h-12 w-12 rounded-full object-cover border"
                                    />

                                    <div className="flex flex-col flex-1">
                                        <h2 className="text-sm font-semibold text-gray-800">{name}</h2>
                                        <p className="text-xs text-gray-500">{position}</p>
                                        <p className="text-xs text-gray-400 mt-1">{batch} • {branch}</p>
                                    </div>

                                    {/* Company Logo */}
                                    {companyLogo && (
                                        <img
                                            src={companyLogo}
                                            alt={company}
                                            className="ml-auto h-10 object-contain"
                                        />
                                    )}
                                </div>

                                {/* Divider */}
                                <div className="h-[1px] w-full bg-slate-200" />

                                {/* Company Section */}
                                <div className="flex items-center justify-between">
                                    <p className="text-sm font-semibold text-[#002855]">
                                        {company}
                                    </p>

                                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                                        Placed
                                    </span>
                                </div>

                                {/* Review Text */}
                                <p className="text-sm text-gray-600 italic leading-relaxed">
                                    “{text}”
                                </p>
                            </div>
                        )
                    )}
                </React.Fragment>
            ))}
        </motion.div>
    </div>
);

export default VoicesOfExcellence