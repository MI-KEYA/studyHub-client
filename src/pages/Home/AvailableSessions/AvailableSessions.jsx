import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AvailableSessions = () => {
    const axiosSecure = useAxiosSecure();

    // Fetch study sessions
    const { data: sessions = [], isLoading, isError } = useQuery({
        queryKey: ["sessions"],
        queryFn: async () => {
            const res = await axiosSecure.get("/sessions");
            return res.data;
        },
    });

    if (isLoading) return <p>Loading sessions...</p>;
    if (isError) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Failed to load study sessions!",
        });
        return <p>Error loading sessions</p>;
    }

    // take only first 6 sessions
    const displayedSessions = sessions.slice(0, 6);

    // check ongoing / closed
    const getStatus = (regEndDate) => {
        const now = new Date();
        const endDate = new Date(regEndDate);
        return now <= endDate ? "Ongoing" : "Closed";
    };

    return (
        <div className="px-8 py-16 my-5">
            <h2 className="text-3xl font-bold text-center mb-8">
                Available Study Sessions
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayedSessions.map((session) => (
                    <div
                        key={session._id}
                        className="bg-blue-100 rounded-xl shadow-lg p-6 flex flex-col justify-between hover:shadow-2xl transition"
                    >
                        <div>
                            <h3 className="text-xl font-bold mb-2">{session.sessionTitle}</h3>
                            <p className="text-gray-600 mb-4 line-clamp-3">
                                {session.sessionDescription}
                            </p>
                        </div>
                        <div className="mt-4 flex justify-between items-center">
                            <span
                                className={`px-3 py-1 text-sm font-semibold rounded-full ${getStatus(session.regEndDate) === "Ongoing"
                                    ? "bg-green-100 text-green-700"
                                    : "bg-red-100 text-red-700"
                                    }`}
                            >
                                {getStatus(session.regEndDate)}
                            </span>
                            <button className="bg-[#112a44] hover:bg-blue-900 text-white px-4 py-2 rounded-lg text-sm">
                                Read More
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AvailableSessions;
