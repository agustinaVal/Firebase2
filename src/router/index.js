import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Login from "../components/Login.vue";
import firebase from 'firebase';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home,
	},
	{
		path: '/admin',
		name: 'Admin',
		component: () => import('../views/Admin.vue'),
		meta: {
			login: true,
		},
	},
	{
		path: '/login',
		name: 'Login',
		component: Login,
	},
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
});
//to: es la instancia de la ruta a donde me quiero dirigir
// from: es la instancia de la ruta de donde provengo
// next: metodo (por si solo), ve a donde quieres ir
router.beforeEach((to, from, next) => {
	let user = firebase.auth().currentUser;
	// authRequired : almacena lo que devuelve el some. siempre devuelve un boolean
	let authRequired = to.matched.some((route) => route.meta.login);
	if (!user && authRequired) {
		// al no tener parametro, el next ira a donde se dirige el to
		next('/');
	} else if (user && !authRequired) {
		next('admin');
	} else {
		next();
	}
});

export default router;
