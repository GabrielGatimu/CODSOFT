const multer = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './job-board-api/uploads')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now()
        cb(null, uniqueSuffix + '-' + file.originalname)
    }
})

const upload = multer({storage: storage}).single('resume')

const fileMiddleware = {
    upload
}
module.exports = fileMiddleware