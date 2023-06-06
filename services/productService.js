const productModel = require('../model/productmodel')

exports.getProduct = (req ,res) => {
    const name = req.body.name ;
    console.log(req.body);
  
    const newProduct = new productModel({ name });
    newProduct
      .save()
      .then((doc) => {               //return the document that saved in thE DB
          res.json(doc);
      })
      .catch((err) => {
        res.json(err);
      });
  
  }

