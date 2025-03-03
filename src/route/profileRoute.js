const express = require('express');
const ProfileController = require('../controllers/ProfileController');
const UserValidator = require('../validator/UserValidator');

const router = express.Router();
const auth = require('../middlewares/auth');

const profileController = new ProfileController();
const userValidator = new UserValidator();

router.get(
    '/fetch-profile',
    auth(),    
    profileController.fetchProfile,
);

router.put(
    '/profile-update',
    auth(),
    userValidator.profileupdateValidator,
    profileController.updateProfile,
);

module.exports = router;
