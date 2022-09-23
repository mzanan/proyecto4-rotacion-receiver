const cds = require("@sap/cds")                                             // importación de módulos sap
const mod = require("./modules-service")                                    // importación de módulos propios

module.exports = cds.service.impl(async function (srv) {

	const apiBusiness 		= await cds.connect.to("API_BUSINESS_PARTNER")  // conexión al api hub
	const messaging			= await cds.connect.to('messaging')        		// conexión al servicio de mensajes
	const { myBusiness } 	= cds.entities                             		// importación de entidad
	const topic 			= 'demo/auxiliary'								// definición del topic

	srv.on("READ", "Business", async req => {                       		// leyendo la información contenida en el api hub
		return apiBusiness.run(req.query)                          	 		// se almacena la data en nuestra entidad SalesOrder
	})
	
	messaging.on(topic, async (msg) => {
		console.log('---> Receiving message...')

		const messagePayload = JSON.stringify(msg.data)            			// obtengo el mensaje
		const { ID } 		 = msg.data                               		// recupero el ID que envió el emisor
		const q 			 = mod.setQuery(ID)
		console.log('---> Received message: ' + messagePayload)

		mod.matchApiBusiness(apiBusiness, q)
		mod.findOneById(apiBusiness, q, myBusiness, ID)
	})
})


