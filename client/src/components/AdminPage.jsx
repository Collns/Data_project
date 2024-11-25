import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const AdminPage = () => {
    const [appointments, setAppointments] = useState([]);
    const [stylistStats, setStylistStats] = useState([]);
    const [message, setMessage] = useState("");
    const [chartData, setChartData] = useState(null);

    // Fetch all appointments on page load
    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await axios.get("http://localhost:3002/appointments/appointments");
                setAppointments(response.data);
            } catch (error) {
                console.error("Error fetching appointments:", error);
                setMessage("Failed to load appointments. Please try again later.");
            }
        };

        fetchAppointments();
    }, []);

    // Fetch stylist stats for the line chart
    useEffect(() => {
        const fetchStylistStats = async () => {
            try {
                const response = await axios.get("http://localhost:3002/appointments/stats");
                setStylistStats(response.data);
            } catch (error) {
                console.error("Error fetching stylist stats:", error);
            }
        };

        fetchStylistStats();
    }, []);

    // Prepare chart data
    useEffect(() => {
        if (stylistStats.length > 0) {
            const labels = stylistStats.map((item) => item.stylist.stylist_name);
            const data = stylistStats.map((item) => item.bookings_count);

            setChartData({
                labels,
                datasets: [
                    {
                        label: "Number of Bookings per Stylist",
                        data,
                        borderColor: "rgba(75, 192, 192, 1)",
                        backgroundColor: "rgba(75, 192, 192, 0.2)",
                        tension: 0.4,
                    },
                ],
            });
        }
    }, [stylistStats]);

    const handleStatusChange = (appointmentId, newStatus) => {
        // Update the status of a specific appointment locally
        setAppointments((prevAppointments) =>
            prevAppointments.map((appointment) =>
                appointment.appointment_id === appointmentId
                    ? { ...appointment, status: newStatus }
                    : appointment
            )
        );
    };

    const saveChanges = async () => {
        try {
            // Prepare data for backend
            const updatedAppointments = appointments.map(({ appointment_id, status }) => ({
                id: appointment_id,
                status,
            }));

            await axios.put("http://localhost:3002/appointments/update", {
                appointments: updatedAppointments,
            });

            setMessage("Appointment statuses updated successfully!");
        } catch (error) {
            console.error("Error updating appointments:", error);
            setMessage("Failed to update appointments. Please try again.");
        }
    };

    return (
        <div className="p-6 font-sans">
            <div className="flex items-start lg:w-1/2 ">
                <h1 className="text-6xl font-bold justify-center">
                <span className="block text-black">SHAY'S </span>
                <span className="block text-red-500">ADMIN</span>
                </h1>
            </div>
            {/* <h1 className="text-2xl font-bold mb-6">Admin - Manage Appointments</h1> */}

            {/* Feedback message */}
            {message && (
                <p
                    className={`mb-4 p-2 text-white rounded ${
                        message.includes("Failed") ? "bg-red-500" : "bg-green-500"
                    }`}
                >
                    {message}
                </p>
            )}

            {/* Line Chart */}
            {chartData ? (
                <div className="bg-white shadow-md rounded-lg p-4 pt-2 mb-6">
                    <h2 className="text-xl font-semibold mb-4">Stylist Booking Stats</h2>
                    <Line data={chartData} />
                </div>
            ) : (
                <p>Loading chart...</p>
            )}

            {/* Appointments Table */}
            <table className="table-auto w-full border-collapse border border-gray-300">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="border border-gray-300 px-4 py-2 text-left">Customer Name</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Stylist</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Service</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Date</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Time</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Change Status</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.map((appointment) => (
                        <tr key={appointment.appointment_id} className="hover:bg-gray-50">
                            <td className="border border-gray-300 px-4 py-2">{appointment.customer?.name || "N/A"}</td>
                            <td className="border border-gray-300 px-4 py-2">{appointment.stylist?.stylist_name || "N/A"}</td>
                            <td className="border border-gray-300 px-4 py-2">{appointment.service?.service_name || "N/A"}</td>
                            <td className="border border-gray-300 px-4 py-2">{appointment.appointment_date}</td>
                            <td className="border border-gray-300 px-4 py-2">{appointment.appointment_time}</td>
                            <td className="border border-gray-300 px-4 py-2">{appointment.status}</td>
                            <td className="border border-gray-300 px-4 py-2">
                                <select
                                    value={appointment.status}
                                    onChange={(e) =>
                                        handleStatusChange(appointment.appointment_id, e.target.value)
                                    }
                                    className="border border-gray-300 rounded p-1"
                                >
                                    <option value="Scheduled">Scheduled</option>
                                    <option value="Completed">Completed</option>
                                    <option value="Cancelled">Cancelled</option>
                                </select>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Save Changes Button */}
            <button
                onClick={saveChanges}
                className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-600"
            >
                Save Changes
            </button>
        </div>
    );
};

export default AdminPage;
