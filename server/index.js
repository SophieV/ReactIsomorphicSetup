/* ----------
 * Rendering our component server side
 */
var React = require('react/addons');
var TodoItem = require('../common/components/todo-item.jsx');

var renderedComponent = React.renderToString(
  <TodoItem done={true} name={'Changing this value server side'}/>
);



/* ----------
 * Injecting the rendered component in the Handlebars template
 */
var Handlebars = require('jade');
var fs = require('fs');

var fileData = fs.readFileSync(__dirname + '/templates/layout.jade').toString();
var layoutTemplate = Handlebars.compile(fileData);

var renderedLayout = layoutTemplate({
  content: renderedComponent
});



/* ----------
 * Serving up the rendered template
 */
var express = require('express');
var app = express();

app.get('/', function(req, res) {
  res.send(renderedLayout);
});

// NOTE: This route is last since we want to match the dynamic routes above
// first before attempting to match a static resource (js/css/etc)
app.use(express.static('./public'));

app.listen(3000, function() {
  console.log("Listening on port 3000");
});
