import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { ChevronLeft, ChevronRight, BookOpen } from "lucide-react";
import Swal from "sweetalert2";
import SessionModal from "./SessionModal";
import { MdDeleteForever } from "react-icons/md";
import { useNavigate } from "react-router"; // ✅ fixed

const StudySession = () => {
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate(); // ✅ fixed

    const [selectedSessionId, setSelectedSessionId] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const { data: sessions = [], refetch, isLoading, isError } = useQuery({
        queryKey: ["sessions"],
        queryFn: async () => {
            const res = await axiosSecure.get("/sessions");
            return res.data;
        },
    });

    const { data: selectedSession, isLoading: isDetailLoading } = useQuery({
        queryKey: ["session", selectedSessionId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/sessions/${selectedSessionId}`);
            return res.data;
        },
        enabled: !!selectedSessionId,
    });

    const totalPages = Math.ceil(sessions.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = sessions.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
            const tableElement = document.getElementById("sessions-table");
            if (tableElement) {
                tableElement.scrollIntoView({ behavior: "smooth" });
            }
        }
    };

    const handleViewDetails = (session) => {
        setSelectedSessionId(session._id);
    };

    const handleDelete = async (session) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "Do you really want to delete",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        });

        if (result.isConfirmed) {
            try {
                const res = await axiosSecure.delete(`/sessions/${session._id}`);
                if (res.data.deletedCount > 0) {
                    Swal.fire({
                        title: "Deleted!",
                        text: "Session has been deleted.",
                        icon: "success",
                        timer: 1500,
                        showConfirmButton: false,
                    });
                    refetch();
                }
            } catch (error) {
                Swal.fire("Error", "Failed to delete session.", "error");
            }
        }
    };

    const handleCloseModal = () => {
        setSelectedSessionId(null);
    };

    const handleRegistrationClick = (session) => {
        navigate(`/payment/${session._id}`); // ✅ fixed
    };

    if (isLoading)
        return (
            <p className="text-center p-8 text-lg font-medium text-gray-700">
                Loading study sessions...
            </p>
        );

    if (isError || !sessions.length) {
        return (
            <div className="p-8 text-center text-lg">
                <p className="text-xl font-bold text-[#112a44]">
                    <BookOpen className="inline mr-2" />
                    No study sessions found at the moment.
                </p>
                {isError && (
                    <p className="text-red-500 mt-2 font-semibold">
                        Error loading data.
                    </p>
                )}
            </div>
        );
    }

    return (
        <div className="p-4 sm:p-8 min-h-screen font-inter">
            <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center border-b-4 border-[#112a44] pb-3 max-w-2xl mx-auto">
                Available Study Sessions
            </h2>

            {/* Table */}
            <div id="sessions-table" className="overflow-x-auto bg-blue-100 rounded-xl shadow-2xl">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-[#112a44] text-white">
                        <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider rounded-tl-xl">#</th>
                            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Title</th>
                            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Tutor</th>
                            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Reg. Fee</th>
                            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Reg. Start</th>
                            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Reg. End</th>
                            <th className="px-4 py-3 text-center text-xs font-medium uppercase tracking-wider rounded-tr-xl">Action</th>
                        </tr>
                    </thead>
                    <tbody className="bg-blue-100 divide-y divide-gray-200">
                        {currentItems.map((session, index) => (
                            <tr key={session._id} className="hover:bg-blue-50 transition duration-150 ease-in-out">
                                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
                                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{session.sessionTitle}</td>
                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">{session.tutorName}</td>
                                <td className="px-4 py-4 whitespace-nowrap text-sm font-bold text-green-600">${session.regFee}</td>
                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">{session.regStartDate}</td>
                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">{session.regEndDate}</td>
                                <td className="px-4 py-4 whitespace-nowrap text-center text-sm font-medium">
                                    <div className="flex items-center justify-center gap-4">
                                        <button
                                            onClick={() => handleViewDetails(session)}
                                            className="bg-[#112a44] hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
                                        >
                                            View Details
                                        </button>
                                        <button
                                            onClick={() => handleDelete(session)}
                                            className="text-red-500 hover:text-red-400 font-semibold py-2 px-4 text-2xl rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
                                        >
                                            <MdDeleteForever />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center mt-8 space-x-2">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="p-2 border border-gray-300 rounded-full bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md"
                    >
                        <ChevronLeft size={20} />
                    </button>

                    {[...Array(totalPages)].map((_, index) => {
                        const pageNumber = index + 1;
                        const isActive = pageNumber === currentPage;
                        return (
                            <button
                                key={pageNumber}
                                onClick={() => handlePageChange(pageNumber)}
                                className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors duration-200 shadow-md ${isActive
                                    ? "bg-[#112a44] text-white hover:bg-blue-800 scale-105"
                                    : "bg-white text-gray-700 hover:bg-gray-200 border border-gray-300"
                                    }`}
                            >
                                {pageNumber}
                            </button>
                        );
                    })}

                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="p-2 border border-gray-300 rounded-full bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md"
                    >
                        <ChevronRight size={20} />
                    </button>
                </div>
            )}

            {/* Modal */}
            <SessionModal
                session={selectedSession}
                onClose={handleCloseModal}
                onRegister={() => handleRegistrationClick(selectedSession)} // ✅ fixed
                isDetailLoading={isDetailLoading}
            />
        </div>
    );
};

export default StudySession;
