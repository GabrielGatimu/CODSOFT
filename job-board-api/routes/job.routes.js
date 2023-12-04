const router = require('express').Router();
const {jobController} = require('../controllers');
const {authMiddleware, inputValidation} = require('../middleware');
const {validate} = require("google-auth-library/build/src/options");

// -- public routes -- //
router.get('/', jobController.getJobs);
router.get('/view/:jobId', jobController.viewJob);

// -- private routes -- //
router.use(authMiddleware.verifyToken);

// --- employer routes --- //
router.get('/employer', authMiddleware.requireEmployer, jobController.getEmployerJobs); // get emp jobs
router.post('/add', [
        authMiddleware.requireEmployer,
        inputValidation.jobInputs,
        inputValidation.validate
    ],
    jobController.addJob);
router.route('/:jobId')
    .put(authMiddleware.requireEmployer, jobController.updateJob)
    .delete(authMiddleware.requireEmployer, jobController.deleteJob);

// candidate routes
router.put('/candidate/bookmark/:jobId', jobController.bookmarkJob)
router.get('/candidate', jobController.getCandidateApplications);
router.get('/candidate/bookmarks', jobController.getCandidateBookmarks);

module.exports = router;
