import React from 'react';
import image1 from '../../../assets/missionImg/img1_PhotoGrid.png'
import image2 from '../../../assets/missionImg/img2_PhotoGrid.png'
import image3 from '../../../assets/missionImg/img3_PhotoGrid.png'

// JSON data for the feature cards with inline SVG icons
const featuresData = [
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 primary-color mb-4" viewBox="0 0 512 512">
                <path fill="currentColor" d="M320 48v48h48v48H320v48h48v48H320v48h48v48H320v48h48v48H320v48H128V48h192zM64 48v48h48v48H64v48h48v48H64v48h48v48H64v48h48v48H64v48H0V0h320c70.7 0 128 57.3 128 128v256c0 70.7-57.3 128-128 128H0V0h64zm320 288v96H96V336h288zM96 240v96H384V240H96zm288-96v96H96V144h288z" />
            </svg>
        ),
        title: "Comprehensive Study Resources",
        description: "Access a vast library of notes, practice exams, and educational videos shared by a global community of students.",
        image: image1
    },
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 primary-color mb-4" viewBox="0 0 640 512">
                <path fill="currentColor" d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm0 32c-63.6 0-192 33.6-192 100.9V448h384v-59.1c0-67.3-128.4-100.9-192-100.9zM512 112c-15.6 0-29.9 3.4-43.2 9.4c17.6 22.8 29.2 52.4 29.2 86.6v80c0 48.6-21.7 91.5-56.9 120.3-5.2 4.3-10.7 8.3-16.3 11.9c5.1 8 11.2 15.2 18 21.6c-48.7 15.9-97.1-1.3-138.8-4.3l-28.7 16.2c41.3 23.3 89 36.3 140.6 36.3c103.5 0 192-38.9 192-128v-100.9c0-67.3-128.4-100.9-192-100.9z" />
            </svg>
        ),
        title: "Collaborative Study Groups",
        description: "Connect with peers, form private or public study groups, and work together on assignments and projects in real-time.",
        image: image2
    },
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 primary-color mb-4" viewBox="0 0 384 512">
                <path fill="currentColor" d="M256 0c-15.1 0-29.2 7.7-37.5 20.3L111.4 176H24c-13.3 0-24 10.7-24 24v288c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V176H256zm-16 48l58.6 88H171.4l58.6-88zm-80 144h160v256H160V192z" />
            </svg>
        ),
        title: "AI-Powered Learning",
        description: "Utilize our smart tools to get instant help with complex topics, find relevant resources, and track your learning progress.",
        image: image3
    }
];

const OurMission = () => {


    return (
        <section className="shadow-lg py-16 px-8 my-5 md:px-16 text-base-content font-inter">
            <div className="max-w-7xl mx-auto flex flex-col items-center gap-12">
                <div className="w-full text-center mb-8">
                    <h2 className="text-4xl md:text-5xl font-bold primary-color poppins mb-4">
                        What We Offer
                    </h2>
                    <p className="text-lg leading-relaxed text-neutral-content">
                        Your one-stop platform for collaborative learning and academic success.
                    </p>
                </div>

                {featuresData.map((feature, index) => (
                    <div
                        key={index}
                        className={`card w-full shadow-xl bg-blue-100 transition-transform duration-500 ease-in-out hover:scale-105
                            flex flex-col items-center p-6 md:p-8
                            ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`
                        }
                        data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
                    >
                        <figure className="w-full md:w-1/2 flex-shrink-0">

                            <img
                                src={feature.image}
                                alt={feature.title}
                                className="rounded-xl w-[300px] h-[200px] object-cover"
                            />
                        </figure>
                        <div className="card-body  w-full md:w-1/2 text-center md:text-left">
                            <div className="flex justify-center md:justify-start items-center">
                                {feature.icon}
                            </div>
                            <h3 className="card-title primary-color text-2xl font-poppins justify-center md:justify-start">
                                {feature.title}
                            </h3>
                            <p className="text-gray-500 text-center md:text-left">{feature.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default OurMission;