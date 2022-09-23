const cds = require("@sap/cds")

module.exports = { //funciones que se van a exportar
    setQuery : ID => {
        return {				// creo la consulta que usaré...
            SELECT: {
                from: { ref: ['ReceiverService.Business'] },
                where: [{ ref: ['ID'] }, '=', { val: ID }]
            }
        }
    },

    matchApiBusiness : async (api, query) => {
        const response = getBusiness(api, query)					// busco si existe en la API el ID recibido
        if (response.length == 0) {                        			// si no hay coincidencia...
            console.log("log -----------> ID doesn't match")    	// es porque no hay ningún campo con ese ID
            return
        }
    },

    findOneById : async (api, query, entity, ID) => {
        const response = getBusiness(api, query)					// busco si existe en la API el ID recibido
        const getById  = await SELECT.one(entity).where({ ID }) 	// busco si ya se guardó un campo con ese ID
        if (!getById) {                                       	    // si no hay coincidencia...
            try {
                await INSERT.into(entity).entries(response)   		// insertamos los campos en myBusiness
                console.log("Successfully inserted into myBusiness")
            }
            catch (e) {
                console.log(e, "Error inserting into myBusiness")
            }
        }
        else {                                                   // y si hay coincidencia, es poque ya se guardó un campo con ese ID
            console.log("log -----------> Entity already inserted")
            return
        }
    }
}

const getBusiness = async (api, query) => {
    const getBusiness = await api.run(query)
    return getBusiness
}
