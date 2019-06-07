const { db, Beat, User, Effect, Theme } = require('./models.js')

async function main() {

    await User.destroy({
        where: {}
    })
    await Beat.destroy({
        where: {}
    })
    await Effect.destroy({
        where: {}
    })
    await Theme.destroy({
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

  

    const reverb = await Effect.create({
        label: 'reverb',
        key: 'reverb'
    })
    const delay = await Effect.create({
        label: 'delay',
        key: 'delay'
    })
    const flanger = await Effect.create({
        label: 'flanger',
        key: 'flanger'
    })


    const chill = await Theme.create({
        name: 'chill',
        red: 100,
        green: 100,
        blue: 100,
    })


    const badass = await Theme.create({
        name: 'badass',
        red: 20,
        green: 30,
        blue: 40,
    })





    await user1.setBeat(tango)
    await user1.setBeat(edm)
    await user1.setBeat(funk)


    await user1.setEffect(reverb)

    await user1.setTheme(chill)
    await user2.setTheme(badass)


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
