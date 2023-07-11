
const express =  require('express');
const mongoose = require('mongoose');
const morgan = require ('morgan');
const dotenv = require('dotenv');
const ErrorApi = require('./middleware/ErrorApi')
const errorHandling = require('./middleware/ErrorMiddelware')
dotenv.config({ path: '.env' });
//const jwt = require('jsonwebtoken')
const categoryRoute = require('./Routes/categoryRoute');
const userRoute= require('./Routes/userRoute');
const authenRoute = require('./Routes/authenRoute');



const app = express();

if(process.env.NODE_ENV === 'development'){
  app.use(morgan("dev"));
  console.log(`mode: ${process.env.NODE_ENV}`);
}

//middleware

app.use(express.json()); 

const PORT = process.env.PORT ||8000;
const server =app.listen(PORT, () => {
    console.log('app is running ')
  
})

//DataBase 
mongoose.set('strictQuery', false);
mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then((conn) => {
    console.log(`Connected to the database: ${conn.connection.host}`);
  })
  // .catch((err) => {
  //   console.error(`Failed to connect to the database: ${err}`);
  //   process.exit(1);
  // });

//app.use("/api/subcategory", subcatRoute)
app.use('/api/category', categoryRoute);
app.use('/api/user', userRoute)
app.use('/api/authen' ,authenRoute)

app.all('*', (req,res,next) =>{
 
  next(new ErrorApi(`can not find this route : ${req.originalUrl}`, 400))
})
// error handling middleware
app.use(errorHandling);

//handling errors outside Express
process.on('unhandledRejection', (err)=> {
  console.error(`unhandledRejection Errors: ${err.message}`);
  server.close(()=>{
    process.exit(1);
  })
 

})


//.then( () => console.log('connect to db .. ') )
//.catch((err) => console.log('failed to connect to db:', err))

/*

mongoose.connect('mongodb://userDB:passwordDB@172.29.0.2:27017',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },(err) => {
    if (err) {
      console.error('FAILED TO CONNECT TO MONGODB');
      console.error(err);
    } else {
      console.log('CONNECTED TO MONGODB');
      app.listen(4000);
    }
  }
);
//.then( () => console.log('connect to db .. ') )
//.catch((err) => console.log('failed to connect to db:', err))

if(process.env.NODE_ENV == 'development'){
  app.use(morgan("dev"));
  console.log('Mode: ${process.env.NODE_ENV}');
}

});
*/
