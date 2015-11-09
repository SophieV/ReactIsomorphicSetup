/* ----------
 * Rendering our component server side
 */
var React = require('react/addons');
var TodoItem = require('../common/components/todo-item.jsx');

/* ----------
 * Injecting the rendered component in the Jade template
 */
var jade = require('jade');
var fs = require('fs');

var fileData = fs.readFileSync(__dirname + '/templates/layout.jade').toString();
var layoutTemplate = jade.compile(fileData);

var renderedLayout = layoutTemplate({
  content: React.renderToString(
    <TodoItem done={true} name={'Changing this value server side'}/>
  )
});



/* ----------
 * Serving up the rendered template
 */
var express = require('express');
var app = express();

app.get('/', function(req, res) {
  res.send(renderedLayout);
});

app.get('/another', function(req, res) {
  res.json('this route is not supported');
});

// NOTE: This route is last since we want to match the dynamic routes above
// first before attempting to match a static resource (js/css/etc)
app.use(express.static('./public'));

app.listen(3000, function() {
  console.log("Listening on port 3000");
});
