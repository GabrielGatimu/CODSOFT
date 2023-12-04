const router = require('express').Router();
const {jobController} = require('../controllers');
const {authMiddleware, inputValidation} = require('../middleware');

// -- public routes -- //
router.get('/', jobController.getJobs);
router.get('/view/:jobId', jobController.viewJob);

// -- private routes -- //
router.use(authMiddleware.verifyToken);

router.get('/bookmarks', jobController.getUserBookmarks);

// --- employer only routes --- //
router.get('/employer', authMiddleware.requireEmployer, jobController.getEmployerJobs); // get emp jobs
router.post('/add', [
        authMiddleware.requireEmployer,
        inputValidation.jobInputs,
        inputValidation.validate
    ],
    jobController.addJob);
router.route('/:jobId')
    .get(jobController.viewJob)
    .put(authMiddleware.requireEmployer, jobController.updateJob)
    .delete(authMiddleware.requireEmployer, jobController.deleteJob);

// candidate only routes
router.put('/candidate/bookmark/:jobId', jobController.bookmarkJob)
router.get('/candidate', jobController.getCandidateApplications);

module.exports = router;
