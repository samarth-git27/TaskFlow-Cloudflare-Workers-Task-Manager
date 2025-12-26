const API = "https://task-manager-api.task-manager-api.workers.dev";

const input = document.getElementById("taskInput");
const button = document.getElementById("addBtn");
const list = document.getElementById("list");

button.onclick = async () => {
  const title = input.value.trim();
  if (!title) {
    alert("Please enter a task");
    return;
  }

  await fetch(`${API}/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title })
  });

  input.value = "";
  loadTasks();
};

async function loadTasks() {
  list.innerHTML = "";

  const res = await fetch(`${API}/tasks`);
  const tasks = await res.json();

  tasks.forEach(task => {
    const li = document.createElement("li");
    li.textContent = task.title;
    list.appendChild(li);
  });
}

loadTasks();
