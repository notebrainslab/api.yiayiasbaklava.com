const express = require('express');
const authRoute = require('./authRoute');
const profileRoute = require('./profileRoute');
const homeRoute = require('./homeRoute');
const categoryRoute = require('./categoryRoute');
const productRoute = require('./productRoute');
const orderRoute = require('./orderRoute');
const cartRoute = require('./cartRoute');
const pointRoute = require('./pointRoute');

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
router.use(categoryRoute);
router.use(productRoute);
router.use(orderRoute);
router.use(cartRoute);
router.use(pointRoute);

module.exports = router;
