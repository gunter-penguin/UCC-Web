let todos = JSON.parse(localStorage.getItem("todos")) || [];
let currentFilter = "all";

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function renderTodos() {
  const list = document.getElementById("todo-list");
  list.innerHTML = "";

  todos.forEach((todo, index) => {
    if (
      (currentFilter === "active" && todo.completed) ||
      (currentFilter === "completed" && !todo.completed)
    ) return;

    const li = document.createElement("li");
    if (todo.completed) li.classList.add("completed");

    // Checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;
    checkbox.onchange = () => toggleComplete(index);

    // Text
    const taskSpan = document.createElement("span");
    taskSpan.textContent = todo.text;
    taskSpan.ondblclick = () => editTodo(index);

    // Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
    deleteBtn.onclick = () => deleteTodo(index);

    li.appendChild(checkbox);
    li.appendChild(taskSpan);
    li.appendChild(deleteBtn);
    list.appendChild(li);
  });
}

function addTodo() {
  const input = document.getElementById("todo-input");
  const text = input.value.trim();
  if (!text) return;

  todos.push({ text, completed: false });
  input.value = "";
  saveTodos();
  renderTodos();
}

function toggleComplete(index) {
  todos[index].completed = !todos[index].completed;
  saveTodos();
  renderTodos();
}

function deleteTodo(index) {
  todos.splice(index, 1);
  saveTodos();
  renderTodos();
}

function editTodo(index) {
  const newText = prompt("Edit task:", todos[index].text);
  if (newText !== null && newText.trim() !== "") {
    todos[index].text = newText.trim();
    saveTodos();
    renderTodos();
  }
}

function filterTodos(filter) {
  currentFilter = filter;
  renderTodos();
}

// Initial render
renderTodos();
