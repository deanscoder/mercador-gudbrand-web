const mongoose = require('mongoose')

function env (): string {
  return process.env.MONGODB_URI
}

mongoose.connect(
  env(),
  {
  	  useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true
  }
)
.then(() => console.log( 'Mongo DB Conectado' ))
.catch(err => console.log( err ));


mongoose.Promise = global.Promise

export default mongoose
