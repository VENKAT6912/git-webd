const todoInput = document.getElementById("todoInput");
const addBtn = document.getElementById("addBtn");
const todoList = document.getElementById("todoList");

let todos = [];

function renderTodos() {
  todoList.innerHTML = "";

  todos.forEach((todo, index) => {
    const li = document.createElement("li");

    if (todo.editing) {
      const editInput = document.createElement("input");
      editInput.type = "text";
      editInput.value = todo.title;
      editInput.id = `edit-${index}`;

      const saveBtn = document.createElement("button");
      saveBtn.textContent = "Save";
      saveBtn.className = "editBtn";
      saveBtn.onclick = () => saveTodo(index);

      const cancelBtn = document.createElement("button");
      cancelBtn.textContent = "Cancel";
      cancelBtn.className = "deleteBtn";
      cancelBtn.onclick = () => cancelEdit(index);

      li.appendChild(editInput);
      li.appendChild(saveBtn);
      li.appendChild(cancelBtn);
    } else {
      const span = document.createElement("span");
      span.textContent = todo.title;

      const editBtn = document.createElement("button");
      editBtn.textContent = "Edit";
      editBtn.className = "editBtn";
      editBtn.onclick = () => editTodo(index);

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.className = "deleteBtn";
      deleteBtn.onclick = () => deleteTodo(index);

      li.appendChild(span);
      li.appendChild(editBtn);
      li.appendChild(deleteBtn);
    }

    todoList.appendChild(li);
  });
}

function addTodo() {
  const title = todoInput.value.trim();
  if (title) {
    todos.push({ title, editing: false });
    todoInput.value = "";
    renderTodos();
  }
}

function editTodo(index) {
  todos[index].editing = true;
  renderTodos();
}

function cancelEdit(index) {
  todos[index].editing = false;
  renderTodos();
}

function saveTodo(index) {
  const editField = document.getElementById(`edit-${index}`);
  const newTitle = editField.value.trim();
  if (newTitle) {
    todos[index].title = newTitle;
    todos[index].editing = false;
    renderTodos();
  }
}

function deleteTodo(index) {
  todos.splice(index, 1);
  renderTodos();
}

addBtn.addEventListener("click", addTodo);
