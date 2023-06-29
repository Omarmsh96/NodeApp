//@desc this class is responsible about opertion errors (perdictable errors)

class ErorrApi extends Error {
    constructor(message , statusCode) {
        super(message);
        this.statusCode= statusCode; 
        this.status = `${statusCode}`.startsWith(4)? 'fail ' : 'error';
        
    }
}

module.exports= ErorrApi; ‚