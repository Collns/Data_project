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
        // Debugging to ensure component is rendering
        console.log("Rendering Book component");
        console.log("User in Book component:", user);

        // Fetch available stylists and services
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
        // Validate form inputs
        if (!selectedStylist || !selectedService || !appointmentDate || !appointmentTime) {
            setMessage('Please fill in all fields before booking.');
            return;
        }

        try {
            console.log("Sending booking request...");
            const response = await axios.post('http://localhost:3002/appointments/create', {
                customer_id: user?.id, // Assuming `user.id` is the logged-in customer's ID
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
        <div className="booking-page">
            <h1>Book an Appointment</h1>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleBookAppointment();
                }}
            >
                <label>
                    Select Stylist:
                    <select
                        value={selectedStylist}
                        onChange={(e) => setSelectedStylist(e.target.value)}
                        required
                    >
                        <option value="">Select a stylist</option>
                        {stylists.map(stylist => (
                            <option key={stylist.stylist_id} value={stylist.stylist_id}>
                                {stylist.stylist_name}
                            </option>
                        ))}
                    </select>
                </label>

                <label>
                    Select Service:
                    <select
                        value={selectedService}
                        onChange={(e) => setSelectedService(e.target.value)}
                        required
                    >
                        <option value="">Select a service</option>
                        {services.map(service => (
                            <option key={service.service_id} value={service.service_id}>
                                {service.service_name} (${service.price.toFixed(2)})
                            </option>
                        ))}
                    </select>
                </label>

                <label>
                    Appointment Date:
                    <input
                        type="date"
                        value={appointmentDate}
                        onChange={(e) => setAppointmentDate(e.target.value)}
                        required
                    />
                </label>

                <label>
                    Appointment Time:
                    <input
                        type="time"
                        value={appointmentTime}
                        onChange={(e) => setAppointmentTime(e.target.value)}
                        required
                    />
                </label>

                <button type="submit">Book Appointment</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Book;
