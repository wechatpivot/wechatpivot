import ToolkitMenuView from './components/ToolkitMenuView';
import MessageView from './components/MessageView';
import MessageTextView from './components/MessageTextView/MessageTextView';


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
    path: '/message',
    name: 'message',
    component: MessageView,
    children: [
      {path: 'text', component: MessageTextView}
    ]
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
  {
    path: '/user/info',
    name: 'user-info',
    component: require('./components/UserInfoView'),
  },
]
