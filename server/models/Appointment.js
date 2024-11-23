module.exports = (sequelize, DataTypes) => {
    const Appointments = sequelize.define("Appointments", 
        {
            appointment_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true, // Enable auto-increment if it exists in the table
            },
            customer_id: {
                type: DataTypes.INTEGER,
                allowNull: true, // Set to match the table definition
            },
            stylist_id: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            service_id: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            appointment_date: {
                type: DataTypes.DATEONLY, // Matches a `DATE` column in MySQL
                allowNull: true,
            },
            appointment_time: {
                type: DataTypes.TIME, // Matches a `TIME` column in MySQL
                allowNull: true,
            },
            status: {
                type: DataTypes.ENUM('Scheduled', 'Completed', 'Cancelled'),
                allowNull: true,
                defaultValue: 'Scheduled', // Default value as seen in the screenshot
            },
        }, 
        {
            tableName: "Appointments", // Explicitly match the table name
            timestamps: false, // Disable Sequelize's default timestamps
            freezeTableName: true, // Prevent Sequelize from pluralizing the table name
        }
    );

    // Define associations if necessary
    Appointments.associate = (models) => {
        Appointments.belongsTo(models.Customers, { foreignKey: "customer_id" }); // Assuming this relationship exists
        Appointments.belongsTo(models.Stylists, { foreignKey: "stylist_id" }); // Assuming stylist table exists
        Appointments.belongsTo(models.Services, { foreignKey: "service_id" }); // Assuming service table exists
    };

    return Appointments;
};
