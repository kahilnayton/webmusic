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

const Sound = db.define('sound_entrie', {
    name: Sequelize.STRING,
    setting: Sequelize.INTEGER

})

const UserSound = db.define('user_sound')


const Effect = db.define('effect', {
    label: Sequelize.STRING,
    key: Sequelize.STRING

})

const Theme = db.define('theme', {
    name: Sequelize.STRING,
    red: Sequelize.INTEGER,
    green: Sequelize.INTEGER,
    blue: Sequelize.INTEGER

})


User.belongsToMany(Sound, { through: UserSound })
Sound.belongsToMany(User, { through: UserSound })



User.hasMany(Beat, {
    onDelete: 'cascade'
});

// User.hasMany(Sound, {
//     onDelete: 'cascade'
// });

// Sound.belongsToMany(User, {
//     through: UserSound,
//     onDelete: 'cascade'
// });

User.hasMany(Effect, {
    onDelete: 'cascade'
});

User.hasMany(Theme, {
    onDelete: 'cascade'
});

Beat.belongsTo(User)
Effect.belongsTo(User)
Theme.belongsTo(User)

// Sound.belongsTo(User)

Promise.all([User.create(), Sound.create()])
    .then(([user, sound]) => UserSound.create({userId: user.id, soundId: sound.id}))






User.beforeCreate(async (user, options) => {
    const hashedPassword = await bcrypt.hash(user.password, 12)
    user.password = hashedPassword
})

module.exports = {
    db,
    User,
    Beat,
    Effect,
    Theme,
    Sound
}
