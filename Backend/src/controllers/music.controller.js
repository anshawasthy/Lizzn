const {uploadFile} = require('../services/storage.services');
const jwt = require('jsonwebtoken');
const musicModel = require('../models/music.model');
const userModel = require('../models/user.model');
const albumModel = require('../models/album.model');

 
async function createMusic(req, res) {
        const title = req.body.title;
        const audioFile = req.file;
        const result = await uploadFile(audioFile.buffer.toString('base64'));
        const music = await musicModel.create({
            uri: result.url,
            title, 
            artistId: req.user.id,
            artist: req.user.username
        });
        return res.status(201).json({ message: 'Music created successfully', music:{
            title: music.title,
            artist: music.artist,
            uri: music.uri
        } 
      });
    }


async function createAlbum(req, res) {
        const {title, musics} = req.body;
        const album = await albumModel.create({
            title,
            musics: musics,
            artist: req.user.id
        });
        return res.status(201).json({ message: 'Album created successfully', album:{
            title: album.title,
            musics: album.musics,
            artist: req.user.username
        } 
      });

};

async function getAllMusic(req, res) {
    const musics = await musicModel.find();
    return res.status(200).json({ message: 'Fetched all the musics successfully', musics });
}

async function getAllAlbums(req, res) {
    const albums = await albumModel.find().limit(2).select("title artist").populate('artist','username');
    return res.status(200).json({ message: 'Fetched all the albums successfully', albums });
}

async function getAlbum(req, res) {
    const albumId = req.params.albumId;
    const album = await albumModel.findById(albumId).populate('musics').populate('artist','username');
    return res.status(200).json({ message: 'Fetched album successfully', album });
}   

module.exports = {
    createMusic,
    createAlbum,
    getAllMusic,
    getAllAlbums,
    getAlbum
};