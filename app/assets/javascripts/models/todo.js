var post = function(options) {
  options.method = "POST";
  return m.request(options);
};

var put = function(options) {
  options.method = "PUT";
  return m.request(options);
};

todo.Todo = function(data) {
  this.description = m.prop(data.description);
  this.done = m.prop(data.done);
  this.user_id = m.prop(1);
  this.id = m.prop();
  this.save = function() {
    if (this.id()) {
      return put({ url: "/todos/" + this.id(), data: this });
    } else {
      return post({ url: "/todos/", data: this }).then(function(response) {
          this.id(response.id);
          }.bind(this));
    }
  };
};

todo.TodoList = Array;

//view-model
todo.vm = {
init: function() {
        var vm = todo.vm;
        var mytodos = m.prop([]);
        vm.list = m.request({method: "GET", url: "/todos", type: todo.Todo });

        vm.description = m.prop('');

        vm.add = function() {
          if(vm.description()) {
            var myTodo = new todo.Todo({description: vm.description()});
            vm.list().push(myTodo);
            vm.description("");
            m.request({method: "POST", url: "/todos", data: myTodo});
          }
        };

        vm.markAsDone = function(task, event) {
          // m.withAttr("checked", task.done)(event);
          // or just task.done(event.checked)
          task.done(event.target.checked);
          task.save();
        };
      }
};
