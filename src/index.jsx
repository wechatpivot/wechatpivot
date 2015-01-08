var React = require('react');

var Text = require('./html5/text.jsx');

React.render(
  /* jshint ignore:start */
  <Text placeholder="URL: 开发者填写URL，调试时将把消息推送到该URL上" />,
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