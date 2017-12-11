var Hi = React.createClass({
  render: function() {
    return (
	 <section>
	  <h1>Homework 7 - React JS</h1>
      <p>
        Hello, <input type="text" placeholder="Your name here" />!
        It is {this.props.date.toTimeString()}
      </p>
	  </section>
    );
  }
});

setInterval(function() {
  ReactDOM.render(
    <Hi date={new Date()} />,
    document.getElementById('hw7')
  );
}, 500);