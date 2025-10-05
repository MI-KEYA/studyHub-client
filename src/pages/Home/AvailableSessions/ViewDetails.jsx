import React from "react";
import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { BookOpen } from "lucide-react";

const DetailItem = ({ label, value, color = "text-gray-700", isBold = false }) => (
    <div className="flex justify-between items-center p-2 bg-gray-50 rounded-lg shadow-sm">
        <span className="text-sm font-medium text-gray-500">{label}:</span>
        <span className={`text-sm ${color} ${isBold ? "font-bold" : ""}`}>{value}</span>
    </div>
);

const ViewDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    const { data: session, isLoading, isError } = useQuery({
        queryKey: ["session", id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/sessions/${id}`);
            return res.data;
        },
    });

    if (isLoading) return <p className="p-10 text-center">Loading session details...</p>;
    if (isError || !session) return <p className="p-10 text-center text-red-500">Failed to load session</p>;

    // Check registration status
    const registrationEnd = new Date(session.regEndDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const isRegistrationOpen = registrationEnd.getTime() >= today.getTime();

    const handleRegister = () => {
        navigate(`/payment/${id}`)
    }

    return (
        <div className="max-w-4xl mx-auto my-12 px-6">
            {/* Header */}
            <div className="bg-[#112a44] text-white rounded-t-xl p-6 flex justify-between items-center">
                <h2 className="text-2xl font-bold flex items-center">
                    <BookOpen className="mr-2 h-6 w-6" /> {session.sessionTitle} Details
                </h2>
                <button
                    onClick={() => navigate(-1)}
                    className="bg-white text-[#112a44] px-4 py-2 rounded-lg shadow hover:bg-gray-200 transition"
                >
                    Back
                </button>
            </div>

            {/* Body */}
            <div className="p-6 bg-white shadow-lg rounded-b-xl space-y-6">
                <div>
                    <strong className="block text-gray-700 mb-2">Description:</strong>
                    <p className="text-gray-600 text-sm border-l-4 border-blue-300 pl-3 py-2 bg-gray-50 rounded-md shadow-inner italic">
                        {session.sessionDescription}
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <DetailItem label="Tutor" value={session.tutorName} isBold />
                    <DetailItem label="Tutor Email" value={session.tutoremail} color="text-indigo-600" />
                    <DetailItem label="Reg. Fee" value={`$${session.regFee}`} color="text-green-600" isBold />
                    <DetailItem label="Duration" value={session.sessionDuration} />
                    <DetailItem label="Reg. Start Date" value={session.regStartDate} />
                    <DetailItem
                        label="Reg. End Date"
                        value={session.regEndDate}
                        color={isRegistrationOpen ? "text-green-700" : "text-red-600"}
                        isBold
                    />
                    <DetailItem label="Class Start Time" value={session.classStartTime} />
                    <DetailItem label="Class End Date" value={session.classEndDate} />
                </div>
            </div>

            {/* Footer */}
            <div className="flex justify-between items-center mt-6 bg-gray-100 p-4 rounded-lg shadow">
                <span className={`text-base font-extrabold ${isRegistrationOpen ? "text-green-600" : "text-red-500"}`}>
                    Status: {isRegistrationOpen ? "Open" : "Closed"}
                </span>
                <button
                    onClick={handleRegister}
                    disabled={!isRegistrationOpen}
                    className={`px-6 py-2 rounded-lg shadow-lg font-semibold transition ${isRegistrationOpen
                        ? "bg-green-600 hover:bg-green-700 text-white"
                        : "bg-red-500 text-white cursor-not-allowed opacity-70"
                        }`}
                >
                    {isRegistrationOpen ? "Register Now" : "Registration Closed"}


                </button>
            </div>
        </div>
    );
};

export default ViewDetails;
