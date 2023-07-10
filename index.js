
const express =  require('express');
const mongoose = require('mongoose');
const morgan = require ('morgan');
const dotenv = require('dotenv');
const ErorrApi = require('./middleware/ErrorApi')

dotenv.config({ path: '.env' });
//const jwt = require('jsonwebtoken')
//const subcatRoute = require('./Routes/subcatRoute');
const categoryRoute = require('./Routes/categoryRoute');
const userRoute= require('./Routes/userRoute');
const authenRoute = require('./Routes/authenRoute');

//const productModel = require('./model/productmodel');
//const productRoute = require('./Routes/productRoute');


const app = express();

if(process.env.NODE_ENV === 'development'){
  app.use(morgan("dev"));
  console.log(`mode: ${process.env.NODE_ENV}`);
}

//middleware

app.use(express.json()); // parsing comming json(string) and convert to js obj

const PORT = process.env.PORT ||8000;
app.listen(PORT, () => {
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
  .catch((err) => {
    console.error(`Failed to connect to the database: ${err}`);
    process.exit(1);
  });


//Mount routes

//app.use("/api/subcategory", subcatRoute)
app.use('/api/category', categoryRoute);
app.use('/api/user', userRoute)
app.use('/api/authen' ,authenRoute)

app.all('*', (req,res,next) =>{
 
  next(new ErorrApi(`can not find this route : ${req.originalUrl}`, 400))
})
// error handling middleware
app.use(ErorrApi);




//.then( () => console.log('connect to db .. ') )
//.catch((err) => console.log('failed to connect to db:', err))

/*

s
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

app.get ('/', (req, res) => {
    
  const message = (' <h1> dev used docker hub new version </h1>');  //os.hostname -- get the id of the container 
  res.send(message)
});
*/
