let app = require('./app')
    app.listen(app.get('port'),(err)=>{
        (err) ? console.log(err) : console.log(`Server running on ${app.get('port')} port`)
    })