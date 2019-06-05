const Sequelize = require('sequelize')
const bcrypt = require('bcrypt')

const db = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost:5432/webmusic_db', {
    database: 'webmusic_db',
    dialect: 'postgres',
    define: {
        underscored: true,
        returning: true
    }
})

const User = db.define('user', {
    name: Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.STRING
})

const Beat = db.define('beat', {
    name: Sequelize.STRING,
    setting: Sequelize.INTEGER

})

const Effect = db.define('effect', {
    label: Sequelize.STRING,
    key: Sequelize.STRING

})


User.hasMany(Beat, {
    onDelete: 'cascade'
});

User.hasMany(Effect, {
    onDelete: 'cascade'
});

Beat.belongsTo(User)
Effect.belongsTo(User)



User.beforeCreate(async (user, options) => {
    const hashedPassword = await bcrypt.hash(user.password, 12)
    user.password = hashedPassword
})

module.exports = {
    db,
    User,
    Beat,
    Effect
}
