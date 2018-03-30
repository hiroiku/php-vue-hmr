import Vue from 'vue';
import Router from 'vue-router';

import Index from '@/vue/views/Index.vue';
import Config from '@/vue/views/Config.vue';

Vue.use(Router);

export default new Router({
    mode: 'hash',
    scrollBehavior(to, from, savedPosition) {
        return { x: 0, y: 0 };
    },
    routes: [{
        path: '/',
        name: 'index',
        component: Index
    }, {
        path: '/config',
        name: 'config',
        component: Config
    }]
});
