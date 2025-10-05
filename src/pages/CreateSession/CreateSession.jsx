import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../context/AuthContext/AuthContext';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const CreateSession = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { user } = useContext(AuthContext)
    const axiosSecure = useAxiosSecure();




    // Handle form submission and log data to console
    const onSubmit = (data) => {
        console.log("Session created:", data);
        const sessionData = {
            ...data,
            email: user.email,
            registration_status: 'pending',
            createdAt: new Date(),
        };
        // save data
        axiosSecure.post('/sessions', sessionData)
            .then(res => {
                console.log(res.data);
                if (res.data.insertedId) {
                    Swal.fire({
                        title: "Success!",
                        text: "Your study session has been created.",
                        icon: "success",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                }
            })

        console.log('Saved session:', sessionData);
    };

    return (
        <div className="bg-transparent shadow-lg min-h-screen p-4 sm:p-8 flex justify-center items-start">
            <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-4xl bg-blue-100 p-6 sm:p-10 rounded-xl shadow-2xl space-y-8 my-10 ">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-gray-800 poppins">Create a New Study Session</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Session Title */}
                    <div>
                        <label htmlFor="sessionTitle" className="block text-gray-700 font-semibold mb-2">Session Title</label>
                        <input
                            type="text"
                            id="sessionTitle"
                            placeholder="e.g., Intro to Machine Learning"
                            className="w-full p-3 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-[#112a44] transition-all duration-200"
                            {...register("sessionTitle", { required: "Session title is required" })}
                        />
                        {errors.sessionTitle && <p className="text-red-500 text-sm mt-1">{errors.sessionTitle.message}</p>}
                    </div>

                    {/* Tutor Name */}
                    <div>
                        <label htmlFor="tutorName" className="block text-gray-700 font-semibold mb-2">Tutor Name</label>
                        <input
                            type="text"
                            id="tutorName"
                            placeholder="e.g., Alex Johnson"
                            className="w-full p-3 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-[#112a44] transition-all duration-200"
                            {...register("tutorName", { required: "Tutor name is required" })}
                        />
                        {errors.tutorName && <p className="text-red-500 text-sm mt-1">{errors.tutorName.message}</p>}
                    </div>


                    {/* Session Image URL */}
                    <div>
                        <label htmlFor="sessionImage" className="block text-gray-700 font-semibold mb-2">Session Image URL</label>
                        <input
                            type="text"
                            id="sessionImage"
                            placeholder="e.g., https://example.com/image.jpg"
                            className="w-full p-3 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-[#112a44] transition-all duration-200"
                            {...register("sessionImage", { required: "Session image URL is required" })}
                        />
                        {errors.sessionImage && <p className="text-red-500 text-sm mt-1">{errors.sessionImage.message}</p>}
                    </div>

                    {/* Registration Fee */}
                    <div>
                        <label htmlFor="regFee" className="block text-gray-700 font-semibold mb-2">Registration Fee ($)</label>
                        <input
                            type="number"
                            id="regFee"
                            placeholder="e.g., 10"
                            min="0"
                            className="w-full p-3 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-[#112a44] transition-all duration-200"
                            {...register("regFee", { required: "Registration fee is required", min: 0 })}
                        />
                        {errors.regFee && <p className="text-red-500 text-sm mt-1">{errors.regFee.message}</p>}
                    </div>

                    {/* Registration Dates */}
                    <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="regStartDate" className="block text-gray-700 font-semibold mb-2">Registration Start Date</label>
                            <input
                                type="date"
                                id="regStartDate"
                                className="w-full p-3 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-[#112a44] transition-all duration-200"
                                {...register("regStartDate", { required: "Start date is required" })}
                            />
                            {errors.regStartDate && <p className="text-red-500 text-sm mt-1">{errors.regStartDate.message}</p>}
                        </div>
                        <div>
                            <label htmlFor="regEndDate" className="block text-gray-700 font-semibold mb-2">Registration End Date</label>
                            <input
                                type="date"
                                id="regEndDate"
                                className="w-full p-3 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-[#112a44] transition-all duration-200"
                                {...register("regEndDate", { required: "End date is required" })}
                            />
                            {errors.regEndDate && <p className="text-red-500 text-sm mt-1">{errors.regEndDate.message}</p>}
                        </div>
                    </div>

                    {/* Class Dates & Times */}
                    <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div>
                            <label htmlFor="classStartTime" className="block text-gray-700 font-semibold mb-2">Class Start Time</label>
                            <input
                                type="time"
                                id="classStartTime"
                                className="w-full p-3 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-[#112a44] transition-all duration-200"
                                {...register("classStartTime", { required: "Start time is required" })}
                            />
                            {errors.classStartTime && <p className="text-red-500 text-sm mt-1">{errors.classStartTime.message}</p>}
                        </div>
                        <div>
                            <label htmlFor="classEndDate" className="block text-gray-700 font-semibold mb-2">Class End Date</label>
                            <input
                                type="date"
                                id="classEndDate"
                                className="w-full p-3 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-[#112a44] transition-all duration-200"
                                {...register("classEndDate", { required: "End date is required" })}
                            />
                            {errors.classEndDate && <p className="text-red-500 text-sm mt-1">{errors.classEndDate.message}</p>}
                        </div>
                        <div>
                            <label htmlFor="sessionDuration" className="block text-gray-700 font-semibold mb-2">Session Duration (minutes)</label>
                            <input
                                type="number"
                                id="sessionDuration"
                                placeholder="e.g., 90"
                                min="1"
                                className="w-full p-3 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-[#112a44] transition-all duration-200"
                                {...register("sessionDuration", { required: "Duration is required", min: 1 })}
                            />
                            {errors.sessionDuration && <p className="text-red-500 text-sm mt-1">{errors.sessionDuration.message}</p>}
                        </div>
                    </div>
                </div>

                {/* Session Description */}
                <div className="col-span-full">
                    <label htmlFor="sessionDescription" className="block text-gray-700 font-semibold mb-2">Session Description</label>
                    <textarea
                        id="sessionDescription"
                        rows="4"
                        placeholder="Provide a detailed description of the session..."
                        className="w-full p-3 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-[#112a44] transition-all duration-200 resize-none"
                        {...register("sessionDescription", { required: "Description is required" })}
                    ></textarea>
                    {errors.sessionDescription && <p className="text-red-500 text-sm mt-1">{errors.sessionDescription.message}</p>}
                </div>

                {/* Submit button */}
                <div className="col-span-full pt-4">
                    <button
                        type="submit"
                        className="w-full py-4 rounded-lg font-bold text-lg text-white transition-all duration-300 bg-[#112a44] hover:bg-blue-900"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateSession;