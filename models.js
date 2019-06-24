const Sequelize = require('sequelize')
const bcrypt = require('bcrypt')

const db = new Sequelize((process.env.DATABASE_URL || 'postgres://localhost:5432/webmusic_db'), {
    dialect: 'postgres',
    database: 'webmusic_db',
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

const Sound = db.define('sound_entrie', {
    name: Sequelize.STRING,
    setting: Sequelize.INTEGER
})

// const UserSound = db.define('user_sound')



// User.belongsToMany(Sound, { through: UserSound })



User.hasMany(Sound,
    {
        foreignKey: 'user_id',
        onDelete: 'cascade'

    });

    Sound.belongsTo(User,
        {
            foreignKey: 'user_id',
            onDelete: 'cascade'
    
        });




// Promise.all([User.create(), Sound.create()])
//     .then(([user, sound]) => UserSound.create({userId: user.id, soundId: sound.id}))



User.beforeCreate(async (user, options) => {
    const hashedPassword = await bcrypt.hash(user.password, 12)
    user.password = hashedPassword
})

module.exports = {
    db,
    User,
    Sound
}
