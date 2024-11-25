const express = require('express');
const router = express.Router();
const { Appointments, Stylists, Services, Customers } = require('../models'); // Include Customers if needed
const { Sequelize } = require('sequelize'); // Import Sequelize

// Get all available stylists and services for booking
router.get('/options', async (req, res) => {
    try {
        const stylists = await Stylists.findAll();
        const services = await Services.findAll();
        res.json({ stylists, services });
    } catch (error) {
        console.error('Error fetching options:', error);
        res.status(500).json({ error: 'Failed to fetch options' });
    }
});

// Create a new appointment
router.post('/create', async (req, res) => {
    const { customer_id, stylist_id, service_id, appointment_date, appointment_time, status } = req.body;

    try {
        const newAppointment = await Appointments.create({
            customer_id,
            stylist_id,
            service_id,
            appointment_date,
            appointment_time,
            status: status || 'Scheduled', // Default status
        });
        res.status(201).json({ message: 'Appointment created successfully', newAppointment });
    } catch (error) {
        console.error('Error creating appointment:', error);
        res.status(500).json({ error: 'Failed to create appointment' });
    }
});

// Get all appointments (with customer, stylist, and service details)
router.get('/appointments', async (req, res) => {
    try {
        const appointments = await Appointments.findAll({
            include: [
                {
                    model: Customers,
                    attributes: ['name'],
                    as: 'customer',
                },
                {
                    model: Stylists,
                    attributes: ['stylist_name'],
                    as: 'stylist',
                },
                {
                    model: Services,
                    attributes: ['service_name'],
                    as: 'service',
                },
            ],
        });
        res.json(appointments);
    } catch (error) {
        console.error('Error fetching appointments:', error);
        res.status(500).json({ error: 'Failed to fetch appointments' });
    }
});

router.get('/stats', async (req, res) => {
    try {
        const data = await Appointments.findAll({
            attributes: [
                [Sequelize.col('Appointments.stylist_id'), 'stylist_id'], // Explicitly qualify stylist_id
                [Sequelize.fn('COUNT', Sequelize.col('Appointments.stylist_id')), 'bookings_count'], // Count stylist_id from Appointments table
            ],
            include: [
                {
                    model: Stylists,
                    attributes: ['stylist_name'], // Include stylist name
                    as: 'stylist', // Use the alias defined in the model
                }
            ],
            group: ['Appointments.stylist_id'], // Explicitly qualify stylist_id in the GROUP BY clause
        });

        res.json(data);
    } catch (error) {
        console.error('Error fetching stylist bookings:', error);
        res.status(500).json({ error: 'Failed to fetch stylist bookings' });
    }
});


// Update appointment statuses
router.put('/update', async (req, res) => {
    const { appointments } = req.body; // Expecting an array of appointment updates

    try {
        const updatePromises = appointments.map((appointment) =>
            Appointments.update(
                { status: appointment.status },
                { where: { appointment_id: appointment.id } }
            )
        );
        await Promise.all(updatePromises);
        res.json({ success: true, message: 'Appointments updated successfully' });
    } catch (error) {
        console.error('Error updating appointments:', error);
        res.status(500).json({ error: 'Failed to update appointments' });
    }
});

module.exports = router;
