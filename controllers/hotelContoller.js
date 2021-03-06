const { validationResult } = require('express-validator');
const fs = require('fs');
const upload = require('../middleware/upload');
const Hotel = require('../models/hotel');

exports.getHotels = async(req, res) => {

    let result;
    try {
        result = await Hotel.find();
    } catch (err) {
        return res.status(400).send(err)
    }
    res.send(result);
}

exports.getHotel = async(req, res) => {

    let result;
    try {
        result = await Hotel.findById(req.params.hotelId);
    } catch (err) {
        return res.status(400).send(err)
    }
    if (result) {
        res.send(result);
    } else {
        res.status(400).send({ success: false, msg: 'Hotel not found' })
    }

}

exports.getHotelbyName = async(req, res) => {

    let result;
    try {
        result = await Hotel.findOne({ name: req.params.hotelName });
    } catch (err) {
        return res.status(400).send(err)
    }

    if (result) {
        res.send(result);
    } else {
        res.status(400).send({ success: false, msg: 'Hotel not found' })
    }
}

exports.addHotel = async(req, res) => {

    //Error handling
    const errors = validationResult(req);
    if (!errors.isEmpty()) {

        errorMassageArray = errors.array().map((errorObj) => errorObj.msg);
        return res.status(422).send({ sucess: false, errorMessages: errorMassageArray });
    }

    const hotel = new Hotel({
        name: req.body.name,
        owner: req.body.owner,
        ratings: [],
        freeRooms: req.body.freeRooms,
        rooms: req.body.rooms,
        images: []
    });
    hotel.images = [];

    let result;

    try {
        result = await hotel.save();
    } catch (err) {
        return res.status(400).send(err)
    }
    res.send({ sucess: true, msg: 'Hotel created successfully!' })
}

exports.editHotel = async(req, res) => {

    let hotel;
    let result;

    try {
        hotel = await Hotel.findById(req.body.hotelId);

        hotel.name = req.body.name;
        hotel.owner = req.body.owner;
        hotel.ratings = req.body.raitings;
        hotel.freeRooms = req.body.freeRooms;
        hotel.rooms = req.body.rooms;

        result = await hotel.save();

    } catch (err) {
        return res.status(400).send(err)
    }
    res.send({ sucess: true, msg: 'Hotel updated successfully' });
}

exports.deleteHotel = async(req, res) => {

    //Error handling
    const errors = validationResult(req);
    if (!errors.isEmpty()) {

        errorMassageArray = errors.array().map((errorObj) => errorObj.msg);
        return res.status(422).send({ sucess: false, errorMessages: errorMassageArray });
    }

    let hotel;
    let result;
    try {
        hotel = await Hotel.findById(req.body.hotelId);
        result = await hotel.delete();
    } catch (err) {
        return res.status(400).send(err)
    }
    res.send({ sucess: true, msg: 'Hotel deleted successfully' });
}

exports.uploadHotelImage = async(req, res) => {

    //Error handling
    if (req.extensionError) {
        return res.status(422).send({ sucess: false, msg: req.extensionError })
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {

        fs.unlinkSync(req.file.path);
        errorMassageArray = errors.array().map((errorObj) => errorObj.msg);
        return res.status(422).send({ sucess: false, errorMessages: errorMassageArray });
    }

    let hotel;
    try {
        hotel = await Hotel.findOne({ name: req.body.hotelName });
    } catch (err) {
        return res.status(400).send(err)
    }

    hotel.images.push({ imagePath: `http://localhost:3000/${req.file.path}` });
    try {
        await hotel.save();
    } catch (err) {
        return res.status(400).send(err)
    }

    res.send({ sucess: true, msg: 'Hotel image uploaded!' })
}

exports.uploadRoomImage = async(req, res) => {

    //Error handling
    if (req.extensionError) {
        return res.status(422).send({ sucess: false, msg: req.extensionError })
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {

        fs.unlinkSync(req.file.path);
        errorMassageArray = errors.array().map((errorObj) => errorObj.msg);
        return res.status(422).send({ sucess: false, errorMessages: errorMassageArray });
    }

    let hotel;
    try {
        hotel = await Hotel.findOne({ name: req.body.hotelName });
    } catch (err) {
        return res.status(400).send(err)
    }
    hotel.rooms.forEach(room => {
        if (room.roomNumber == req.body.roomNumber) {
            room.images.push({ imagePath: `http://localhost:3000/${req.file.path}` })
        }
    });

    try {
        await hotel.save();
    } catch (err) {
        return res.status(400).send(err)
    }

    res.send({ sucess: true, msg: 'Room image uploaded!' })
}

exports.deleteHotelImages = async(req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {

        errorMassageArray = errors.array().map((errorObj) => errorObj.msg);
        return res.status(422).send({ sucess: false, errorMessages: errorMassageArray });
    }

    let hotel;
    try {
        hotel = await Hotel.findOne({ name: req.body.hotelName });
    } catch (err) {
        return res.status(400).send(err)
    }

    //Deleting hotel images from server, and clean database link
    hotel.images.forEach(image => {
        arr = image.imagePath.split('http://localhost:3000/');
        fs.unlinkSync(arr[1]);
    });
    hotel.images = [];

    try {
        await hotel.save();
    } catch (err) {
        return res.status(400).send(err)
    }

    res.send({ sucess: true, msg: 'Hotel images deleted!' })
}

exports.deleteRoomImages = async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {

        errorMassageArray = errors.array().map((errorObj) => errorObj.msg);
        return res.status(422).send({ sucess: false, errorMessages: errorMassageArray });
    }

    let hotel;
    try {
        hotel = await Hotel.findOne({ name: req.body.hotelName });
    } catch (err) {
        return res.status(400).send(err)
    }

    //Deleting room images from server, and clean database link
    hotel.rooms.forEach(room => {
        if (room.roomNumber == req.body.roomNumber) {
            room.images.forEach(img => {
                arr = img.imagePath.split('http://localhost:3000/');
                fs.unlinkSync(arr[1]);
            })
            room.images = [];
        }
    });

    try {
        await hotel.save();
    } catch (err) {
        return res.status(400).send(err)
    }
    res.send({ sucess: true, msg: 'Room images deleted!' })
}

//TODO 
//Delete hotel and room images by name