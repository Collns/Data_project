

module.exports = (sequelize, DataTypes) => 
{
    const posts = sequelize.define("Posts",
        {
            title: {
                type: DataTypes.STRING,
                allowNull: false
            },
            User: {
                type: DataTypes.STRING,
                allowNull: false
            }
        })

        return posts
}