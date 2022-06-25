const Flight = require('../models/Flight')

exports.findOne = (req, res) => {
    Flight.findById(req.params.id)  
    .then(flight => {
        if(!flight) {  
            return res.status(404).send({   message: "Flight not found with id " + req.params.id });
        }
        res.send(flight);
    })
    .catch(err => {  
        if (err.kind === 'ObjectId') {
            return res.status(404)
            .send({
                message: "Flight not found with id " + req.params.id
            });
        }
        return res.status(500).send({ message: "Error getting flight with id " + req.params.id });
    });
}
exports.findAll = (req, res) => {
    Flight.find()  
    .then(flights => { 
        res.status(200).send(flights);
    })
   .catch(err => {  
        res.status(500).send({
            message: err.message || "Something went wrong while getting list of flights."
        });
    });
}
exports.update = (req, res) => {
    Flight.findByIdAndUpdate(req.params.id, {  
        title: req.body.title, 
        time: req.body.time, 
        price: req.body.price,  
        date: req.body.date,
    }, 
    {new: true})
    .then(flight => {
      if(!flight) {   
         return res.status(404)
         .send({   message: "flight not found with id " + req.params.id });
        }res.send(flight);
            
    })
    .catch(err => {
    if(err.kind === 'ObjectId') { 
        return res.status(404)
        .send({  message: "flight not found with id " + req.params.id});
        }
        return res.status(500).send({  message: "Error updating flight with id " + req.params.id});
    });
}
exports.create = (req, res) => {
    let booking = {
        title: req.body.title, 
        time: req.body.time, 
        price: req.body.price,  
        date: req.body.date,
    }
    Flight.create(booking)
    .then(() => {
        res.status(201).json({
            message: 'Flight booked'
        })
    })
    .catch(err => console.log(err));
}
exports.delete = (req, res) => {
    Flight.findByIdAndRemove(req.params.id).then(Flight => {
        if(!Flight) {  
            return res.status(404).send({  message: "Flight not found with id " + req.params.id});
        }res.send({message: "Flight deleted successfully!"});
})
.catch(err => {
    if(err.kind === 'ObjectId' || err.name === 'NotFound') {
         return res.status(404).send({  message: "Flight not found with id " + req.params.id});
    }
    return res.status(500).send({  message: "Could not delete Flight with id " + req.params.id});
});
}
