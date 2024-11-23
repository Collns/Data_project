module.exports = (sequelize, DataTypes) => {
    const Customers = sequelize.define("Customers", 
        {
        customer_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true, // Ensure this matches the existing column's behavior
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
        },
        phoneNo: {
            type: DataTypes.STRING(15),
            allowNull: false,
        },
    }, {
        tableName: "Customers", // Explicitly set the table name to match the existing table
        timestamps: false, // Disable Sequelize's auto-added timestamps
        freezeTableName: true, // Prevent Sequelize from pluralizing the table name
    });

    return Customers;
};

