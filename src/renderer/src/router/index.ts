import { createRouter, createWebHashHistory } from "vue-router";

import { AppRoutes } from '@router/routes'

import {  beforeEach  , afterEach  } from '@router/guards'

const AppRouter = createRouter({
    history: createWebHashHistory(),
    routes:AppRoutes
})

AppRouter.beforeEach(beforeEach)
AppRouter.afterEach(afterEach)

export default AppRouter;

