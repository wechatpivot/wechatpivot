export default [
  // {
  //   path: '*',
  //   redirect: '/',
  // },
  {
    path: '/',
    name: 'landing-page',
    component: require('components/LandingPageView')
  },
  {
    path: '/about',
    name: 'About',
    component: require('./components/AboutView'),
  },
  {
    path: '/account',
    name: 'account',
    component: require('./components/AccountView'),
  },
]
