
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const morgan = require ('morgan');
dotenv.config({ path: '.env' });
//const productRoute = require('./Routes/productRoute');
const categoryRoute = require('./Routes/categoryRoute');
//const productModel = require('./model/productmodel');


const app = express();

if(process.env.NODE_ENV == 'development'){
  app.use(morgan("dev"));
  console.log(`mode: ${process.env.NODE_ENV} `);
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
//app.use("/api/v1/products", productRoute);
app.use("/api/categories", categoryRoute)

// error handling middleware
app.use((err,req, res, next) => {
 res.json({err}).status(500);
});




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
