
module.exports = (sequelize, DataTypes) => 
    {
        const Services = sequelize.define("Services",
            {
                service_id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                    allowNull: false,
                },
                service_name: {
                    type: DataTypes.STRING(100),
                    allowNull: false,
                },
                price: {
                    type: DataTypes.DECIMAL(6, 2),
                    allowNull: false,
                },
                duration: {
                    type: DataTypes.INTEGER,
                    allowNull: true, // Optional field as per your table structure
                },
            },
            {
                tableName: "Services", // Explicitly set the table name to match the existing table
                timestamps: false, // Disable Sequelize's auto-added timestamps
                freezeTableName: true, // Prevent Sequelize from pluralizing the table name
            });
        
    
            return Services
    };
