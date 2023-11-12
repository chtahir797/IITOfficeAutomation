import React from 'react';
import Header from "../components/Header";
import { Copyright } from "../components/Map";
import { Link } from "react-router-dom";
import tahir from "../assets/images/tahir.jpg"
import adeel from "../assets/images/dr-adeel.jpg"
import arslan from "../assets/images/arslan.jpg"
const AboutUs = () => {
    return (
        <div className="min-h-screen flex flex-col justify-between">
            {/* Header */}
            <Header />

            {/* Mission Section */}
            <section className="bg-gray-50 dark:bg-gray-800 flex-grow flex justify-center items-center py-8 lg:py-16 px-4">
                <div className="container mx-auto text-center py-8 lg:py-1 px-4">
                    <h2 className="text-2xl md:text-3xl font-semibold text-gray dark:text-white">Our Mission</h2>
                    <p className="mt-4 text-lg text-gray dark:text-white mx-auto text-center">
                        At the heart of our project, IIT Office Automation, lies a steadfast commitment to revolutionize the daily operations at the Institute of Information Technology. Our mission is clear: to empower the institute's staff and administrators by streamlining their manual processes through the development of a comprehensive web application.

                        Our main focus is to make things better for students. We want to make it easy for them to get help with questions or problems related to their studies, all from their own homes. We also have a way for students to share their concerns without revealing their names, so their worries are kept private and handled with care. We're committed to making sure students' needs are met in a way that respects their privacy.
                    </p>


                </div>
            </section>


            {/* About Us Section */}
            <div className="bg-gray-100 dark:bg-gray-900 py-8 md:py-12 text-gray dark:text-white">
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Picture (Column 1) */}
                        <div className="md:col-span-1 flex flex-col items-center">
                            <div className="w-48 md:w-64 h-48 md:h-64 mb-4">
                                <img
                                    src={adeel}
                                    alt="Director"
                                    className="w-full h-full rounded-xl"
                                />
                            </div>
                            <h3 className="text-xl md:text-2xl font-semibold text-gray dark:text-white">Dr Adeel</h3>
                        </div>
                        {/* Text (Column 2) */}
                        <div className="md:col-span-2">
                            <div className="max-w-screen-lg mx-auto text-center md:text-left md:mr-8"> {/* Added md:mr-8 for margin */}
                                <h3 className="text-xl md:text-2xl font-semibold text-gray dark:text-white">Message from the Director</h3>
                                <p className="mt-4 text-lg text-gray dark:text-white">
                                    At the Institute of Information Technology (I.I.T), we aim to follow the vision of Quaid-i-Azam University i.e.,
                                    to strive for the eminence in teaching, services, research, and innovation. I.I.T offers undergraduate program
                                    in Information Technology (BS-IT) which is purely a skill oriented degree. Our students are known to have a very strong
                                    theoretical background of the computing and other related courses.
                                    Equipping our students with latest technologies and exposing them to the real word problems is our core strategy.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Developer Section */}
            <section className="bg-gray-100 dark:bg-gray-800 py-8 md:py-12 text-gray dark:text-white">
                <div className="container mx-auto text-center">
                    <h2 className="text-2xl md:text-3xl font-semibold text-gray dark:text-white">Meet Our Developers</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mt-4 md:mt-8">
                        {/* Developer 1 */}
                        <div className="flex flex-col items-center">
                            <img
                                src={tahir}
                                alt="Developer 1"
                                className="w-32 md:w-48 h-62 md:h-68 rounded-full mb-4"
                            />
                            <h3 className="text-lg md:text-xl font-semibold text-gray dark:text-white">Muhammad Tahir Yasin</h3>
                            <div className="flex mt-2">
                                <a href="mailto:chtahir797@gmail.com" target="_blank" className="p-3 text-blue-500 rounded-full bg-blue-100/80 dark:bg-gray-800">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                                    </svg>
                                </a>
                                <a href="https://www.linkedin.com/in/chtahir797/" target="_blank" className="p-3 text-blue-500 rounded-full bg-blue-100/80 dark:bg-gray-800">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                    </svg>
                                </a>

                            </div>
                        </div>
                        {/* Developer 1 */}
                        <div className="flex flex-col items-center">
                            <img
                                src={arslan}
                                alt="Developer 1"
                                className="w-32 md:w-48 h-62 md:h-68 rounded-full mb-4"
                            />
                            <h3 className="text-lg md:text-xl font-semibold text-gray dark:text-white">Arslan Akhter</h3>
                            <div className="flex mt-2">
                                <a href="mailto:arslanakhter890@gmail.com" target="_blank" className="p-3 text-blue-500 rounded-full bg-blue-100/80 dark:bg-gray-800">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                                    </svg>
                                </a>
                                <a href="https://www.linkedin.com/in/" target="_blank" className="p-3 text-blue-500 rounded-full bg-blue-100/80 dark:bg-gray-800">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                    </svg>
                                </a>

                            </div>
                        </div>

                    </div>
                </div>
            </section>
            <Copyright />
        </div>
    );
};

export default AboutUs;
