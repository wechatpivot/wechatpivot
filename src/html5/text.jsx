var TextInput = React.createClass({
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
      <input type="text" className={this.props._class} placeholder={this.props.placeholder}
             onBlur={this.handleBlur} />
      /* jshint ignore:end */
    );
  }
});


module.exports = TextInput;
