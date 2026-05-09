const express = require('express'); 
const router = express.Router();
const musicController = require('../controllers/music.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const multer = require('multer');

const upload = multer({ storage: multer.memoryStorage() });

router.post('/upload', authMiddleware.authArtist, upload.single('audioFile'), musicController.createMusic);
router.post('/album', authMiddleware.authArtist, musicController.createAlbum);
router.get('/listen', authMiddleware.authUser , musicController.getAllMusic);
router.get('/albums', authMiddleware.authUser , musicController.getAllAlbums);
router.get('/album/:albumId', authMiddleware.authUser , musicController.getAlbum);

module.exports = router; 