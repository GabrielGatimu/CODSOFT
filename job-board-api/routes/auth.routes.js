const router = require('express').Router()
const {authController} = require("../controllers");

router.post('/google', authController.googleAuth)
router.post('/signup', authController.signUp)
router.post('/:userId/verify-email/:verificationCode', authController.verifyEmail)
router.post('/signin', authController.signIn)
router.post('/sign-out', authController.signOut)
router.post('/forgot-password', authController.forgotPassword)
router.post('/reset-password', authController.resetPassword)

module.exports = router