const mongoose = require ('mongoose')

module.exports = uri => {
    mongoose.connect(uri,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    })

    mongoose.connection.on('connected', () => 
        console.log('Mongoose conectado com sucesso ao servidor!')
    )

    process.on('SIGINT', () =>
        mongoose.connection.close(() => {
            console.log('Mongoose desconectado pelo término da aplicação!')
            process.exit(0)
        })
    )

    mongoose.connection.on('disconnected', () =>
       console.log('Mongoose desconectado do servidor!') 
    )
}