import ToolkitMenuView from './components/ToolkitMenuView';


export default [
  // {
  //   path: '*',
  //   redirect: '/',
  // },
  {
    path: '/',
    name: 'landing-page',
    component: require('components/LandingPageView'),
  },
  {
    path: '/toolkit/menu',
    name: 'toolkit-menu',
    component: ToolkitMenuView,
  },
  {
    path: '/about',
    name: 'about',
    component: require('./components/AboutView'),
  },
  {
    path: '/account',
    name: 'account',
    component: require('./components/AccountView'),
  },
]
