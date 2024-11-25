import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Book = ({ user }) => {
    const [stylists, setStylists] = useState([]);
    const [services, setServices] = useState([]);
    const [selectedStylist, setSelectedStylist] = useState('');
    const [selectedService, setSelectedService] = useState('');
    const [appointmentDate, setAppointmentDate] = useState('');
    const [appointmentTime, setAppointmentTime] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        console.log("Rendering Book component");
        console.log("User in Book component:", user);

        const fetchOptions = async () => {
            try {
                console.log("Fetching booking options...");
                const response = await axios.get('http://localhost:3002/appointments/options');
                console.log("Fetched booking options:", response.data);
                setStylists(response.data.stylists);
                setServices(response.data.services);
            } catch (error) {
                console.error('Error fetching booking options:', error);
                setMessage('Failed to load booking options. Please try again later.');
            }
        };

        fetchOptions();
    }, []);

    const handleBookAppointment = async () => {
        if (!selectedStylist || !selectedService || !appointmentDate || !appointmentTime) {
            setMessage('Please fill in all fields before booking.');
            return;
        }

        try {
            console.log("Sending booking request...");
            const response = await axios.post('http://localhost:3002/appointments/create', {
                customer_id: user?.id,
                stylist_id: selectedStylist,
                service_id: selectedService,
                appointment_date: appointmentDate,
                appointment_time: appointmentTime,
                status: 'Scheduled',
            });
            console.log("Appointment created:", response.data);
            setMessage('Appointment booked successfully!');
        } catch (error) {
            console.error('Error booking appointment:', error);
            setMessage('Failed to book appointment. Please try again.');
        }
    };

    return (
        <div className="booking-page min-h-screen bg-white flex items-center justify-center py-12">
            <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-2xl">
                <h1 className="text-3xl font-bold text-black mb-6 text-center">
                    BOOK AN APPOINTMENT
                </h1>
                {message && (
                    <p
                        className={`mb-4 p-2 text-white rounded ${
                            message.includes('Failed') ? 'bg-red-500' : 'bg-green-500'
                        }`}
                    >
                        {message}
                    </p>
                )}
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleBookAppointment();
                    }}
                    className="space-y-4"
                >
                    <label className="block">
                        <span className="text-black font-semibold"> Stylist:</span>
                        <select
                            value={selectedStylist}
                            onChange={(e) => setSelectedStylist(e.target.value)}
                            required
                            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 tracking-tighter"
                        >
                            <option value="">select a stylist</option>
                            {stylists.map(stylist => (
                                <option key={stylist.stylist_id} value={stylist.stylist_id}>
                                    {stylist.stylist_name}
                                </option>
                            ))}
                        </select>
                    </label>

                    <label className="block">
                        <span className="text-black font-semibold">Service:</span>
                        <select
                            value={selectedService}
                            onChange={(e) => setSelectedService(e.target.value)}
                            required
                            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 tracking-tighter"
                        >
                            <option value="">select a service</option>
                            {services.map(service => (
                                <option key={service.service_id} value={service.service_id}>
                                    {service.service_name} (${service.price.toFixed(2)})
                                </option>
                            ))}
                        </select>
                    </label>

                    <label className="block">
                        <span className="text-black font-semibold">Appointment Date:</span>
                        <input
                            type="date"
                            value={appointmentDate}
                            onChange={(e) => setAppointmentDate(e.target.value)}
                            required
                            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 tracking-tighter"
                        />
                    </label>

                    <label className="block">
                        <span className="text-black font-semibold">Appointment Time:</span>
                        <input
                            type="time"
                            value={appointmentTime}
                            onChange={(e) => setAppointmentTime(e.target.value)}
                            required
                            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                    </label>

                    <button
                        type="submit"
                        className="w-full bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                        Book Appointment
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Book;
