import {createRouter, createWebHistory} from "vue-router";
import CoachesPage from "@/pages/coaches/CoachesListPage.vue";
import {store} from "@/store/store";

const CoachPage = () => import("@/pages/coaches/CoachPage.vue");
const RegisterPage = () => import("@/pages/coaches/CoachRegisterPage.vue");
const ContactPage = () => import("@/pages/requests/ContactPage.vue");
const RequestsPage = () => import("@/pages/requests/RequestsPage.vue");
const UserAuthPage = () => import("@/pages/auth/UserAuthPage.vue");
const NotFoundPage = () => import("@/pages/NotFoundPage.vue");

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/coaches',
    },

    {
      path: '/coaches',
      component: CoachesPage,
    },

    {
      path: '/coaches/:id',
      component: CoachPage,
      props: true,
      children: [
        {
          path: 'contact',
          component: ContactPage,
        },
      ]
    },

    {
      path: '/register',
      component: RegisterPage,
      meta: {
        requiresAuth: true,
      }
    },

    {
      path: '/requests',
      component: RequestsPage,
      meta: {
        requiresAuth: true,
      }
    },

    {
      path: '/auth',
      component: UserAuthPage,
      meta: {
        requiresUnAuth: true,
      }
    },

    {
      path: '/:notFound(.*)',
      component: NotFoundPage,
    },
  ],
});

router.beforeEach((to, _, next) => {
  if (to.meta.requiresAuth && !store.getters.isAuth) {
    next('/auth');
  } else if (to.meta.requiresUnAuth && store.getters.isAuth) {
    next('/coaches');
  } else {
    next();
  }
})
