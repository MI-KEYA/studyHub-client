import React from "react";
import { BookOpen } from "lucide-react";

// Reusable component for displaying a detail row
const DetailItem = ({ label, value, color = "text-gray-700", isBold = false }) => (
    <div className="flex justify-between items-center p-2 bg-gray-50 rounded-lg shadow-sm">
        <span className="text-sm font-medium text-gray-500">{label}:</span>
        <span className={`text-sm ${color} ${isBold ? "font-bold" : ""}`}>{value}</span>
    </div>
);

const SessionModal = ({ session, onClose, onRegister, isDetailLoading }) => {
    if (!session) return null;

    const registrationEnd = new Date(session.regEndDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const isRegistrationOpen = registrationEnd.getTime() >= today.getTime();

    const buttonText = isRegistrationOpen ? "Register Now" : "Registration Closed";
    const buttonAction = isRegistrationOpen ? onRegister : onClose;
    const buttonClass = isRegistrationOpen
        ? "bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors shadow-xl hover:shadow-2xl transform hover:scale-[1.02]"
        : "bg-red-500 text-white font-semibold py-2 px-6 rounded-lg cursor-not-allowed opacity-70 shadow-md";

    return (
        <div
            className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center p-4 z-50"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="p-6 bg-[#112a44] text-white flex justify-between items-center rounded-t-xl">
                    <h3 className="text-xl font-bold flex items-center">
                        <BookOpen className="mr-2 h-5 w-5" /> {session.sessionTitle} Details
                    </h3>
                    <button onClick={onClose} className="text-white text-3xl font-light leading-none">
                        &times;
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
                    {isDetailLoading ? (
                        <p>Loading details...</p>
                    ) : (
                        <>
                            <div className="pt-2">
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
                        </>
                    )}
                </div>

                {/* Footer */}
                <div className="p-4 bg-gray-100 flex justify-between items-center border-t border-gray-200 rounded-b-xl">
                    <span className={`text-base font-extrabold ${isRegistrationOpen ? "text-green-600" : "text-red-500"}`}>
                        Status: {isRegistrationOpen ? "Open" : "Closed"}
                    </span>
                    <button onClick={buttonAction} className={buttonClass} disabled={!isRegistrationOpen}>
                        {buttonText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SessionModal;
