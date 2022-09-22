const cds = require("@sap/cds")

module.exports = cds.service.impl(async function (srv) {
    const apiBusiness    = await cds.connect.to("API_BUSINESS_PARTNER") //conexión al api hub
    const messaging      = await cds.connect.to('messaging')
    const topic          = 'demo/auxiliary'
    
    const { myBusiness } = cds.entities

    srv.on("READ", "Business", async req => {                       //leyendo la información contenida en el api hub
        return apiBusiness.run(req.query)                           //se almacena la data en nuestra entidad SalesOrder
    })

    messaging.on(topic, async (msg) => {
        console.log('===> R')

        const messagePayload = JSON.stringify(msg.data)
        console.log('===> Received message : ' + messagePayload)
        const { ID } = msg.data

        const apiQuery = {
            SELECT: {
                from: { ref: ['ReceiverService.Business'] },
                where: [{ ref: ['ID'] }, '=', { val: ID }]
            }
        }

        const getBusiness = await apiBusiness.run(apiQuery)
        console.log("getBusiness ", getBusiness)

        const getById = await SELECT.one(myBusiness).where({ ID })
        console.log("getById ", getById)

        if (getBusiness.length == 0) {
            console.log("log -----------> ID doesn't match")
            return
        }

        if (!getById) {
            try {
                await INSERT.into(myBusiness).entries(getBusiness)         //inserto array con objetos en entidad mySales
                console.log("Successfully inserted into myBusiness")
            }
            catch (e) {
                console.log(e, "Error inserting into myBusiness")
            }
        }
        else {
            console.log("log -----------> Entity already inserted")
            return
        }
    })
})
