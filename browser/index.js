var React = require('react');
var TodoItem = require('../common/components/todo-item.jsx');

// Note the identical state to server/index.js
var renderedComponent = React.render(
  TodoItem({done: true, name: 'Changing this value browser side'}),
  document.getElementById('content')
);
