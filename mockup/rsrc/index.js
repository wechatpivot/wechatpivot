import Vue from 'vue';
import ElementUI from 'element-ui'
import App from './App.vue';
import './style.scss';


Vue.use(ElementUI);


Vue.prototype.$notify = Notification


new Vue({
  el: '.App',
  render: h => h(App),
});
