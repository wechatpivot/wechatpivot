import Vue from 'vue';
Vue.config.debug = true;
import InputNumber from './common/input_number';
import InputString from './common/input_string';
import InputText from './common/input_text';
import InputTimestamp from './common/input_timestamp';
import Nav from './nav';
import Setup from './setup';
import Panel from './panel';


Vue.component('input-number', InputNumber);
Vue.component('input-string', InputString);
Vue.component('input-text', InputText);
Vue.component('input-timestamp', InputTimestamp);


new Vue(Nav);
new Vue(Setup);
new Vue(Panel);
