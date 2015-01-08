import Vue from 'vue';
Vue.config.debug = process.env.NODE_ENV !== 'production';
import dispatcher from './dispatcher';
import InputNumber from './common/input_number';
import InputString from './common/input_string';
import InputText from './common/input_text';
import InputTimestamp from './common/input_timestamp';
import Nav from './nav';
import Notification from './notification';
import Setup from './setup';
import Panel from './panel';


document.addEventListener('click', function () {
  dispatcher.$emit('CLICK_OUTSIDE');
});


Vue.component('input-number', InputNumber);
Vue.component('input-string', InputString);
Vue.component('input-text', InputText);
Vue.component('input-timestamp', InputTimestamp);


new Vue(Nav);
new Vue(Notification);
new Vue(Setup);
new Vue(Panel);
