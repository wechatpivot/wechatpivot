(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var TextInput = React.createClass({displayName: "TextInput",
  handleBlur: function (e) {
    console.log(e);
  },

  getDefaultProps: function() {
    return {
      _class: 'form-control'
    };
  },

  render: function () {
    return (
      /* jshint ignore:start */
      React.createElement("input", {type: "text", className: this.props._class, placeholder: this.props.placeholder, 
             onBlur: this.handleBlur})
      /* jshint ignore:end */
    );
  }
});


module.exports = TextInput;

},{}],2:[function(require,module,exports){
(function (global){
var React = (typeof window !== "undefined" ? window.React : typeof global !== "undefined" ? global.React : null);

var Text = require('./html5/text.jsx');

React.render(
  /* jshint ignore:start */
  React.createElement(Text, {placeholder: "URL: 开发者填写URL，调试时将把消息推送到该URL上"}),
  /* jshint ignore:end */
  document.getElementById('url')
);

// var Flow = React.createClass({
//   render: function() {
//     return (
//       <svg className="flow">
//         <Node y="10" />
//         <Node y="50" />
//       </svg>
//     );
//   }
// });

// var CommentList = React.createClass({
//   render: function() {
//     return (
//       <div className="comment-list">
//         Hello, world! I am a CommentList.
//       </div>
//     );
//   }
// });


// var Node = React.createClass({
//   render: function() {
//     function _position(x, y) {
//       return "translate(" + x + "," + y + ")";
//     }

//     return (
//       <g transform={_position(10, this.props.y)}>
//         <rect width="30" height="30" stroke="black" fill="transparent" stroke-width="5">
//         </rect>
//         <text fill="navy" font-size="16">
//           It was the best of times
//         </text>
//       </g>
//     );
//   }
// });



// React.render(
//   <Flow />,
//   document.getElementById('content')
// );
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./html5/text.jsx":1}]},{},[2]);
