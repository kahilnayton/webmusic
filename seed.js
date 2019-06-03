const { db, Beat, User } = require('./models.js')

async function main() {

    await User.destroy({
        where: {}
    })
    await Beat.destroy({
        where: {}
    })



    const user1 = await User.create({
        name: 'Tim',
        email: 'lovestorock@gmail.com',
        password: 'letsrock'
    })


    const tango = await Beat.create({
        name: 'tango',
        setting: 30
    })

    const edm = await Beat.create({
        name: 'edm',
        setting: 60
    })

    const funk = await Beat.create({
        name: 'funk',
        setting: 90
    })


    await user1.setBeat(tango)
    await user1.setBeat(edm)
    await user1.setBeat(funk)


}

async function run() {
    try {
        await main()
    } catch (e) {
        console.error(e)
    } finally {
        await process.exit()
    }
}

run()
