module.exports = (sequelize, DataTypes) => {
    const Stylists = sequelize.define("Stylists", 
        {
            stylist_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true, // Matches the `auto_increment` property
            },
            stylist_name: {
                type: DataTypes.STRING(100), // Matches VARCHAR(100)
                allowNull: false, // Matches `NOT NULL`
            },
            level: {
                type: DataTypes.STRING(50), // Matches VARCHAR(50)
                allowNull: true, // Matches `YES` for allowing NULL values
            },
            rating: {
                type: DataTypes.DECIMAL(3, 1), // Matches DECIMAL(3,1)
                allowNull: true, // Matches `YES` for allowing NULL values
            },
        },
        {
            tableName: "Stylists", // Explicitly matches the table name in the database
            timestamps: false, // Disable Sequelize's default timestamps
            freezeTableName: true, // Prevent Sequelize from pluralizing the table name
        }
    );

    return Stylists;
};
