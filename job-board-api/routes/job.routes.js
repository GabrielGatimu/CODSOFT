const router = require('express').Router();
const { jobController } = require('../controllers');
const { authMiddleware } = require('../middleware');

// -- public routes -- //
router.get('/', jobController.getJobs);
router.get('/view/:jobId', jobController.viewJob);

// -- private routes -- //
router.use(authMiddleware.verifyToken);

// employer routes
router.post('/add', jobController.addJob);
router.route('/:jobId')
    .put(jobController.updateJob)
    .delete(jobController.deleteJob);
router.get('/employer', jobController.getEmployerJobs);

// candidate routes
router.put('/candidate/bookmark/:jobId', jobController.bookmarkJob)
router.get('/candidate', jobController.getCandidateApplications);
router.get('/candidate/bookmarks', jobController.getCandidateBookmarks);

module.exports = router;
