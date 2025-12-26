fetch("https://task-manager-api.task-manager-api.workers.dev/tasks")
  .then(r => r.json())
  .then(console.log)
