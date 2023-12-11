const router = require('express').Router();
const {jobController} = require('../controllers');
const {authMiddleware, fileMiddleware, inputValidation} = require('../middleware');

// -- public routes -- //
router.get('/', jobController.getJobs);
router.get('/:jobId', jobController.viewJob);

// -- private routes -- //
router.use(authMiddleware.verifyToken);

router.get('/view/bookmarks', jobController.getUserBookmarks);

// --- employer only routes --- //
router.get('/me/my-jobs', authMiddleware.requireEmployer, jobController.getEmployerJobs); // get emp jobs

router.post('/add', [
        authMiddleware.requireEmployer,
        inputValidation.jobInputs,
        inputValidation.validate
    ],
    jobController.addJob);
router.route('/:jobId')
    .put(authMiddleware.requireEmployer, jobController.updateJob)
    .delete(authMiddleware.requireEmployer, jobController.deleteJob);

// candidate only routes
router.put('/bookmark/:jobId', jobController.bookmarkJob)
router.post('/:jobId/apply', fileMiddleware.upload , jobController.applyJob)
router.get('/me/applications', jobController.getCandidateApplications);

module.exports = router;
