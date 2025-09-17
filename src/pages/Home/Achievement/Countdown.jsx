import React, { useState, useEffect, useRef } from 'react';

// Data for the countdown cards with icons and target numbers
const statsData = [
    {
        title: "Students",
        target: 15000,
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-900 mb-2" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M9 7m-4 0a4 4 4 0 1 0 8 0a4 4 4 0 1 0 -8 0"></path>
                <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"></path>
                <path d="M16 3.12a2 2 0 0 0 -1.98 2.84l.98 .04l.98 -.04a2 2 0 0 0 -1.98 -2.84z"></path>
                <path d="M15 17a2 2 0 0 0 -1.98 2.84l.98 .04l.98 -.04a2 2 0 0 0 -1.98 -2.84z"></path>
            </svg>
        ),
    },
    {
        title: "Tutorials",
        target: 8500,
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-900 mb-2" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M3 19a9 9 0 0 1 9 -9a9 9 0 0 1 9 9"></path>
                <path d="M12 4a9 9 0 0 1 9 9"></path>
                <path d="M3 13a9 9 0 0 1 9 -9"></path>
                <line x1="12" y1="10" x2="12" y2="10.01"></line>
            </svg>
        ),
    },
    {
        title: "Teachers",
        target: 500,
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-900 mb-2" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M12 16a2 2 0 0 1 2 2v1a2 2 0 0 1 -2 2h-4a2 2 0 0 1 -2 -2v-1a2 2 0 0 1 2 -2h4"></path>
                <path d="M12 16a2 2 0 0 1 2 2v1a2 2 0 0 1 -2 2h-4a2 2 0 0 1 -2 -2v-1a2 2 0 0 1 2 -2h4z" stroke="none" fill="currentColor"></path>
                <path d="M12 10l-.01 0"></path>
                <path d="M12 10l-.01 0z" stroke="none" fill="currentColor"></path>
                <path d="M12 10a4 4 0 1 0 -4 -4v4"></path>
                <path d="M12 10a4 4 0 1 1 4 -4v4"></path>
            </svg>
        ),
    },
    {
        title: "Awards",
        target: 120,
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-900 mb-2" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M12 15l8 -4l-8 -4l-8 4l8 4"></path>
                <path d="M12 15v9"></path>
                <path d="M12 15l-8 -4l-8 4l8 4"></path>
                <path d="M12 15l8 -4l-8 -4l-8 4l8 4z" stroke="none" fill="currentColor"></path>
            </svg>
        ),
    },
];

const Countdown = () => {
    const [counts, setCounts] = useState(statsData.map(() => 0));
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    startCountdown();
                } else {
                    resetCountdown();
                }
            },
            { threshold: 0.5 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    const startCountdown = () => {
        statsData.forEach((stat, index) => {
            const totalSteps = 200; // Duration of animation in steps
            const stepSize = Math.ceil(stat.target / totalSteps);
            let currentStep = 0;

            const interval = setInterval(() => {
                setCounts(prevCounts => {
                    const newCounts = [...prevCounts];
                    const newCount = Math.min(newCounts[index] + stepSize, stat.target);
                    newCounts[index] = newCount;
                    return newCounts;
                });

                if (currentStep >= totalSteps) {
                    clearInterval(interval);
                    setCounts(prevCounts => {
                        const newCounts = [...prevCounts];
                        newCounts[index] = stat.target;
                        return newCounts;
                    });
                }
                currentStep++;
            }, 5); // Interval in milliseconds
        });
    };

    const resetCountdown = () => {
        setCounts(statsData.map(() => 0));
    };

    return (
        <section ref={sectionRef} className="py-20 px-4 shadow-lg my-5 bg-transparent font-inter">
            <div className="max-w-7xl mx-auto text-center">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Our Achievements</h2>
                <p className="text-lg text-white mb-12">
                    We're proud of the community we've built and the milestones we've achieved together.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {statsData.map((stat, index) => (
                        <div
                            key={index}
                            className="bg-blue-100 p-8 rounded-xl shadow-lg transform transition-transform duration-300 hover:scale-105 flex flex-col items-center justify-center"
                        >
                            {stat.icon}
                            <div className="font-poppins text-5xl font-extrabold text-blue-900">
                                {counts[index].toLocaleString()}+
                            </div>
                            <h3 className="mt-2 text-xl font-semibold text-gray-700">{stat.title}</h3>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Countdown;