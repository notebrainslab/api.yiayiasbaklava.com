const express = require('express');
const authRoute = require('./authRoute');
const profileRoute = require('./profileRoute');
const homeRoute = require('./homeRoute');

const router = express.Router();

const defaultRoutes = [
    {
        path: '/auth',
        route: authRoute,
    },
];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

router.use(profileRoute);
router.use(homeRoute);

module.exports = router;
