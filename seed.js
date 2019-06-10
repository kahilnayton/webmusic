const { User, Sound } = require('./models.js')

async function main() {

    await User.destroy({
        where: {}
    })


    await Sound.destroy({
        where: {}
    })



    const user1 = await User.create({
        name: 'Tim',
        email: 'lovestorock@gmail.com',
        password: 'letsrock'
    })

    const user2 = await User.create({
        name: 'Bill',
        email: 'billrock@gmail.com',
        password: 'bill'
    })



    const Tango = await Sound.create({
        name: 'Tango',
        setting: 30
    })

    const Machine = await Sound.create({
        name: 'Machine',
        setting: 60
    })

    const PolySynth = await Sound.create({
        name: 'PolySynth',
        setting: 90
    })


    const Arpeggiator = await Sound.create({
        name: 'Arpeggiator',
        setting: 90
    })

    const Plucky = await Sound.create({
        name: 'Plucky',
        setting: 100
    })


    const Am = await Sound.create({
        name: 'Am',
        setting: 13
    })



    await Am.setUser(user1)
    await Plucky.setUser(user1)
    await Arpeggiator.setUser(user1)
    await PolySynth.setUser(user1)
    await Machine.setUser(user1)
    await Tango.setUser(user1)


    // await user1.addSound(machine, { through: {name: 'machine'}})




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
