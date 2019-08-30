import Vue from 'vue';
import Router from 'vue-router';

import Welcome from '@views/Welcome';
import { menuArray } from './menu';

Vue.use(Router);

const router = new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: Welcome,
        },
        ...menuArray,
    ],
});

export default router;
