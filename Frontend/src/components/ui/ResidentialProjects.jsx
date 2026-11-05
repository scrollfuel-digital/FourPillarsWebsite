
import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, MapPin, Building2, Trees } from "lucide-react";
import { Link } from "react-router-dom";

const plotProjects = [
    {
        name: "Canberra City",
        location: "Nagpur",
        path: "/canberra-city",
    },
    {
        name: "Melbourne City Sector II",
        location: "Nagpur",
        path: "/melbourne-city-sector-2",
    },
    {
        name: "Perth City",
        location: "Nagpur",
        path: "/perth-city",
    },
    {
        name: "Kharsoli Township",
        location: "Nagpur",
        path: "/kharsoli-township",
    },
    {
        name: "Mega Township Project",
        location: "Nagpur",
        path: "/mega-township",
    },
];

const apartmentProjects = [
    {
        name: "Shraddha Bhakti Avenue",
        location: "Nagpur",
        path: "/shraddha-bhakti-avenue",
    },
];

const ProjectCard = ({ project, index }) => (
    <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, delay: index * 0.08 }}
    >
        <Link
            to={project.path}
            className="group flex items-center justify-between gap-4
            p-5 md:p-6 bg-white border border-slate-200
            rounded-xl transition-all duration-300
            hover:border-[#2b86c5] hover:shadow-xl
            hover:-translate-y-1"
        >
            <div className="flex items-center gap-4 min-w-0">
                <div className="w-11 h-11 shrink-0 rounded-lg
                    bg-[#003a78]/5 flex items-center justify-center
                    group-hover:bg-[#003a78] transition-colors duration-300"
                >
                    <MapPin
                        size={20}
                        className="text-[#003a78]
                        group-hover:text-white transition-colors"
                    />
                </div>

                <div className="min-w-0">
                    <h4 className="text-base md:text-lg font-semibold
                        text-[#003a78] font-serif
                        group-hover:text-[#2b86c5] transition-colors"
                    >
                        {project.name}
                    </h4>

                    <p className="text-xs text-slate-500 mt-1
                        flex items-center gap-1"
                    >
                        <MapPin size={12} />
                        {project.location}, Maharashtra
                    </p>
                </div>
            </div>

            <div className="w-9 h-9 shrink-0 rounded-full
                border border-slate-200 flex items-center
                justify-center group-hover:bg-[#003a78]
                group-hover:border-[#003a78] transition-all duration-300"
            >
                <ArrowUpRight
                    size={18}
                    className="text-[#003a78]
                    group-hover:text-white transition-colors"
                />
            </div>
        </Link>
    </motion.div>
);

const ResidentialProjects = () => {
    return (
        <section className="relative overflow-hidden 
            py-16 md:py-24"
        >
            <div className="max-w-7xl mx-auto px-5 md:px-10">

                {/* Section Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="text-center max-w-3xl mx-auto mb-14 md:mb-16"
                >
                    <span className="inline-flex items-center gap-2
                        text-xs md:text-sm font-semibold uppercase
                        tracking-[0.2em] text-[#2b86c5] mb-4"
                    >
                        <span className="w-8 h-[2px] bg-[#c23a4a]" />
                        Our Developments
                        <span className="w-8 h-[2px] bg-[#c23a4a]" />
                    </span>

                    <h2 className="text-3xl sm:text-4xl md:text-5xl
                        font-bold text-[#003a78] leading-tight"
                    >
                        Explore Our Residential
                        <span className="block text-[#2b86c5] mt-2">
                            Projects in Nagpur
                        </span>
                    </h2>

                   
                </motion.div>

                {/* Residential Plot Projects */}
                <div className="mb-14 md:mb-16">
                    <div className="flex flex-col md:flex-row
                        md:items-end justify-between gap-4 mb-7"
                    >
                        <div>
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-10 h-10 rounded-lg
                                    bg-[#003a78] flex items-center
                                    justify-center"
                                >
                                    <Trees size={20} className="text-white" />
                                </div>

                                <span className="text-xs uppercase
                                    tracking-widest font-semibold
                                    text-[#2b86c5]"
                                >
                                    Land Ownership
                                </span>
                            </div>

                            <h3 className="text-2xl md:text-3xl
                                font-bold text-[#003a78]"
                            >
                                Residential Plot Projects
                            </h3>

                            <p className="text-sm md:text-base
                                text-slate-600 mt-3 max-w-2xl leading-7"
                            >
                                Explore residential plot developments
                                designed for buyers looking for land
                                ownership and planned residential
                                communities in Nagpur.
                            </p>
                        </div>

                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3
                        gap-4"
                    >
                        {plotProjects.map((project, index) => (
                            <ProjectCard
                                key={project.name}
                                project={project}
                                index={index}
                            />
                        ))}
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-slate-300 mb-14 md:mb-16" />

                {/* Residential Apartment Projects */}
                <div>
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-lg
                            bg-[#2b86c5] flex items-center justify-center"
                        >
                            <Building2 size={20} className="text-white" />
                        </div>

                        <span className="text-xs uppercase
                            tracking-widest font-semibold text-[#2b86c5]"
                        >
                            Modern Living
                        </span>
                    </div>

                    <div className="mb-7">
                        <h3 className="text-2xl md:text-3xl
                            font-bold text-[#003a78]"
                        >
                            Residential Apartment Projects
                        </h3>

                        <p className="text-sm md:text-base text-slate-600
                            mt-3 max-w-2xl leading-7"
                        >
                            Discover residential apartment options
                            designed for modern family living.
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3
                        gap-4"
                    >
                        {apartmentProjects.map((project, index) => (
                            <ProjectCard
                                key={project.name}
                                project={project}
                                index={index}
                            />
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
};

export default ResidentialProjects;
