(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Vuex"] = factory();
	else
		root["Vuex"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(1).default;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.createLogger = exports.Store = undefined;
	exports.install = install;

	var _util = __webpack_require__(2);

	var _devtool = __webpack_require__(3);

	var _devtool2 = _interopRequireDefault(_devtool);

	var _logger = __webpack_require__(4);

	var _logger2 = _interopRequireDefault(_logger);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Vue = undefined;

	var Store = exports.Store = (function () {

	  /**
	   * @param {Object} options
	   *        - {Object} state
	   *        - {Object} actions
	   *        - {Object} mutations
	   *        - {Array} middlewares
	   *        - {Boolean} strict
	   */

	  function Store() {
	    var _this = this;

	    var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	    var _ref$state = _ref.state;
	    var state = _ref$state === undefined ? {} : _ref$state;
	    var _ref$actions = _ref.actions;
	    var actions = _ref$actions === undefined ? {} : _ref$actions;
	    var _ref$mutations = _ref.mutations;
	    var mutations = _ref$mutations === undefined ? {} : _ref$mutations;
	    var _ref$middlewares = _ref.middlewares;
	    var middlewares = _ref$middlewares === undefined ? [] : _ref$middlewares;
	    var _ref$strict = _ref.strict;
	    var strict = _ref$strict === undefined ? false : _ref$strict;

	    _classCallCheck(this, Store);

	    // bind dispatch to self
	    var dispatch = this.dispatch;
	    this.dispatch = function () {
	      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	        args[_key] = arguments[_key];
	      }

	      dispatch.apply(_this, args);
	    };
	    // use a Vue instance to store the state tree
	    this._vm = new Vue({
	      data: state
	    });
	    this._dispatching = false;
	    this.actions = Object.create(null);
	    this._setupActions(actions);
	    this._setupMutations(mutations);
	    this._setupMiddlewares(middlewares, state);
	    // add extra warnings in strict mode
	    if (strict) {
	      this._setupMutationCheck();
	    }
	  }

	  /**
	   * Getter for the entire state tree.
	   * Read only.
	   *
	   * @return {Object}
	   */

	  _createClass(Store, [{
	    key: 'dispatch',

	    /**
	     * Dispatch an action.
	     *
	     * @param {String} type
	     */

	    value: function dispatch(type) {
	      for (var _len2 = arguments.length, payload = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
	        payload[_key2 - 1] = arguments[_key2];
	      }

	      var mutation = this._mutations[type];
	      var prevSnapshot = this._prevSnapshot;
	      var state = this.state;
	      var snapshot = undefined,
	          clonedPayload = undefined;
	      if (mutation) {
	        this._dispatching = true;
	        // apply the mutation
	        if (Array.isArray(mutation)) {
	          mutation.forEach(function (m) {
	            return m.apply(undefined, [state].concat(payload));
	          });
	        } else {
	          mutation.apply(undefined, [state].concat(payload));
	        }
	        this._dispatching = false;
	        // invoke middlewares
	        if (this._needSnapshots) {
	          snapshot = this._prevSnapshot = (0, _util.deepClone)(state);
	          clonedPayload = (0, _util.deepClone)(payload);
	        }
	        this._middlewares.forEach(function (m) {
	          if (m.onMutation) {
	            if (m.snapshot) {
	              m.onMutation({ type: type, payload: clonedPayload }, snapshot, prevSnapshot);
	            } else {
	              m.onMutation({ type: type, payload: payload }, state);
	            }
	          }
	        });
	      } else {
	        console.warn('[vuex] Unknown mutation: ' + type);
	      }
	    }

	    /**
	     * Hot update actions and mutations.
	     *
	     * @param {Object} options
	     *        - {Object} [actions]
	     *        - {Object} [mutations]
	     */

	  }, {
	    key: 'hotUpdate',
	    value: function hotUpdate() {
	      var _ref2 = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	      var actions = _ref2.actions;
	      var mutations = _ref2.mutations;

	      if (actions) {
	        this._setupActions(actions, true);
	      }
	      if (mutations) {
	        this._setupMutations(mutations);
	      }
	    }

	    /**
	     * Setup mutation check: if the vuex instance's state is mutated
	     * outside of a mutation handler, we throw en error. This effectively
	     * enforces all mutations to the state to be trackable and hot-reloadble.
	     * However, this comes at a run time cost since we are doing a deep
	     * watch on the entire state tree, so it is only enalbed with the
	     * strict option is set to true.
	     */

	  }, {
	    key: '_setupMutationCheck',
	    value: function _setupMutationCheck() {
	      var _this2 = this;

	      // a hack to get the watcher constructor from older versions of Vue
	      // mainly because the public $watch method does not allow sync
	      // watchers.
	      var unwatch = this._vm.$watch('__vuex__', function (a) {
	        return a;
	      });
	      var Watcher = this._vm._watchers[0].constructor;
	      unwatch();
	      new Watcher(this._vm, '$data', function () {
	        if (!_this2._dispatching) {
	          throw new Error('[vuex] Do not mutate vuex store state outside mutation handlers.');
	        }
	      }, { deep: true, sync: true });
	    }

	    /**
	     * Set up the callable action functions exposed to components.
	     * This method can be called multiple times for hot updates.
	     * We keep the real action functions in an internal object,
	     * and expose the public object which are just wrapper
	     * functions that point to the real ones. This is so that
	     * the reals ones can be hot reloaded.
	     *
	     * @param {Object} actions
	     * @param {Boolean} [hot]
	     */

	  }, {
	    key: '_setupActions',
	    value: function _setupActions(actions, hot) {
	      var _this3 = this;

	      this._actions = Object.create(null);
	      actions = Array.isArray(actions) ? (0, _util.mergeObjects)(actions) : actions;
	      Object.keys(actions).forEach(function (name) {
	        _this3._actions[name] = (0, _util.createAction)(actions[name], _this3);
	        if (!_this3.actions[name]) {
	          _this3.actions[name] = function () {
	            var _actions;

	            return (_actions = _this3._actions)[name].apply(_actions, arguments);
	          };
	        }
	      });
	      // delete public actions that are no longer present
	      // after a hot reload
	      if (hot) {
	        Object.keys(this.actions).forEach(function (name) {
	          if (!actions[name]) {
	            delete _this3.actions[name];
	          }
	        });
	      }
	    }

	    /**
	     * Setup the mutation handlers. Effectively a event listener.
	     * This method can be called multiple times for hot updates.
	     *
	     * @param {Object} mutations
	     */

	  }, {
	    key: '_setupMutations',
	    value: function _setupMutations(mutations) {
	      this._mutations = Array.isArray(mutations) ? (0, _util.mergeObjects)(mutations, true) : mutations;
	    }

	    /**
	     * Setup the middlewares. The devtools middleware is always
	     * included, since it does nothing if no devtool is detected.
	     *
	     * A middleware can demand the state it receives to be
	     * "snapshots", i.e. deep clones of the actual state tree.
	     *
	     * @param {Array} middlewares
	     * @param {Object} state
	     */

	  }, {
	    key: '_setupMiddlewares',
	    value: function _setupMiddlewares(middlewares, state) {
	      this._middlewares = [_devtool2.default].concat(middlewares);
	      this._needSnapshots = middlewares.some(function (m) {
	        return m.snapshot;
	      });
	      if (this._needSnapshots) {
	        console.log('[vuex] One or more of your middlewares are taking state snapshots ' + 'for each mutation. Make sure to use them only during development.');
	      }
	      var initialSnapshot = this._prevSnapshot = this._needSnapshots ? (0, _util.deepClone)(state) : null;
	      // call init hooks
	      this._middlewares.forEach(function (m) {
	        if (m.onInit) {
	          m.onInit(m.snapshot ? initialSnapshot : state);
	        }
	      });
	    }
	  }, {
	    key: 'state',
	    get: function get() {
	      return this._vm._data;
	    },
	    set: function set(v) {
	      throw new Error('[vuex] Vuex root state is read only.');
	    }
	  }]);

	  return Store;
	})();

	// export logger factory

	exports.createLogger = _logger2.default;

	// export install function

	function install(_Vue) {
	  Vue = _Vue;
	}

	// also export the default
	exports.default = {
	  Store: Store,
	  createLogger: _logger2.default,
	  install: install
	};

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.createAction = createAction;
	exports.mergeObjects = mergeObjects;
	exports.deepClone = deepClone;

	function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

	/**
	 * Create a actual callable action function.
	 *
	 * @param {String|Function} action
	 * @param {Vuex} store
	 * @return {Function} [description]
	 */

	function createAction(action, store) {
	  if (typeof action === 'string') {
	    // simple action string shorthand
	    return function () {
	      for (var _len = arguments.length, payload = Array(_len), _key = 0; _key < _len; _key++) {
	        payload[_key] = arguments[_key];
	      }

	      return store.dispatch.apply(store, [action].concat(payload));
	    };
	  } else if (typeof action === 'function') {
	    // normal action
	    return function () {
	      for (var _len2 = arguments.length, payload = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	        payload[_key2] = arguments[_key2];
	      }

	      return action.apply(undefined, [store].concat(payload));
	    };
	  }
	}

	/**
	 * Merge an array of objects into one.
	 *
	 * @param {Array<Object>} arr
	 * @param {Boolean} allowDuplicate
	 * @return {Object}
	 */

	function mergeObjects(arr, allowDuplicate) {
	  return arr.reduce(function (prev, obj) {
	    Object.keys(obj).forEach(function (key) {
	      var existing = prev[key];
	      if (existing) {
	        // allow multiple mutation objects to contain duplicate
	        // handlers for the same mutation type
	        if (allowDuplicate) {
	          if (Array.isArray(existing)) {
	            existing.push(obj[key]);
	          } else {
	            prev[key] = [prev[key], obj[key]];
	          }
	        } else {
	          console.warn('[vuex] Duplicate action: ' + key);
	        }
	      } else {
	        prev[key] = obj[key];
	      }
	    });
	    return prev;
	  }, {});
	}

	/**
	 * Deep clone an object. Faster than JSON.parse(JSON.stringify()).
	 *
	 * @param {*} obj
	 * @return {*}
	 */

	function deepClone(obj) {
	  if (Array.isArray(obj)) {
	    return obj.map(deepClone);
	  } else if (obj && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object') {
	    var cloned = {};
	    var keys = Object.keys(obj);
	    for (var i = 0, l = keys.length; i < l; i++) {
	      var key = keys[i];
	      cloned[key] = deepClone(obj[key]);
	    }
	    return cloned;
	  } else {
	    return obj;
	  }
	}

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  onInit: function onInit(state) {
	    // TODO
	  },
	  onMutation: function onMutation(mutation, state) {
	    // TODO
	  }
	};

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = createLogger;
	// Credits: borrowed code from fcomb/redux-logger

	function createLogger() {
	  var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	  var _ref$collapsed = _ref.collapsed;
	  var collapsed = _ref$collapsed === undefined ? true : _ref$collapsed;
	  var _ref$transformer = _ref.transformer;
	  var transformer = _ref$transformer === undefined ? function (state) {
	    return state;
	  } : _ref$transformer;
	  var _ref$mutationTransfor = _ref.mutationTransformer;
	  var mutationTransformer = _ref$mutationTransfor === undefined ? function (mut) {
	    return mut;
	  } : _ref$mutationTransfor;

	  return {
	    snapshot: true,
	    onMutation: function onMutation(mutation, nextState, prevState) {
	      if (typeof console === 'undefined') {
	        return;
	      }
	      var time = new Date();
	      var formattedTime = ' @ ' + pad(time.getHours(), 2) + ':' + pad(time.getMinutes(), 2) + ':' + pad(time.getSeconds(), 2) + '.' + pad(time.getMilliseconds(), 3);
	      var formattedMutation = mutationTransformer(mutation);
	      var message = 'mutation ' + mutation.type + formattedTime;
	      var startMessage = collapsed ? console.groupCollapsed : console.group;

	      // render
	      try {
	        startMessage.call(console, message);
	      } catch (e) {
	        console.log(message);
	      }

	      console.log('%c prev state', 'color: #9E9E9E; font-weight: bold', prevState);
	      console.log('%c mutation', 'color: #03A9F4; font-weight: bold', formattedMutation);
	      console.log('%c next state', 'color: #4CAF50; font-weight: bold', nextState);

	      try {
	        console.groupEnd();
	      } catch (e) {
	        console.log('—— log end ——');
	      }
	    }
	  };
	}

	function repeat(str, times) {
	  return new Array(times + 1).join(str);
	}

	function pad(num, maxLength) {
	  return repeat('0', maxLength - num.toString().length) + num;
	}

/***/ }
/******/ ])
});
;