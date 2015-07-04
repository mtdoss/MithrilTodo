var todo = todo || {};

todo.view = function () {
  return m("html", [
      m("body", [
        m("input", {onchange: m.withAttr("value", todo.vm.description), value: todo.vm.description()}),
        m("button", {onclick: todo.vm.add}, "Add"),
        m("table", [
          todo.vm.list().map(function(task, index) {
            return m("tr", [
              m("td", [
                // I don't quite get bind here (why do I need todo.vm?)
                m("input[type=checkbox]", { onclick: todo.vm.markAsDone.bind(todo.vm, task), checked: task.done()})
                ]),
              m("td", { style: {textDecoration: task.done() ? "line-through" : "none"} }, task.description()),
              ])
          })
          ])
        ])
      ]);
};
