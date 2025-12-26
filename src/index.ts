export interface Env {
  DB: D1Database;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    try {
      // Health check
      if (url.pathname === "/" && request.method === "GET") {
        return Response.json({ status: "Task Manager API is running" });
      }

      // GET all tasks
      if (url.pathname === "/tasks" && request.method === "GET") {
        const { results } = await env.DB
          .prepare("SELECT * FROM tasks ORDER BY created_at DESC")
          .all();
        return Response.json(results);
      }

      // CREATE task
      if (url.pathname === "/tasks" && request.method === "POST") {
        const body = await request.json();
        if (!body.title) {
          return new Response("Title is required", { status: 400 });
        }

        await env.DB
          .prepare("INSERT INTO tasks (title) VALUES (?)")
          .bind(body.title)
          .run();

        return new Response("Task created", { status: 201 });
      }

      // UPDATE task
      if (url.pathname.startsWith("/tasks/") && request.method === "PUT") {
        const id = Number(url.pathname.split("/")[2]);
        const body = await request.json();

        if (!id || !body.title) {
          return new Response("Invalid request", { status: 400 });
        }

        await env.DB
          .prepare("UPDATE tasks SET title = ? WHERE id = ?")
          .bind(body.title, id)
          .run();

        return new Response("Task updated", { status: 200 });
      }

      // DELETE task
      if (url.pathname.startsWith("/tasks/") && request.method === "DELETE") {
        const id = Number(url.pathname.split("/")[2]);
        if (!id) {
          return new Response("Invalid ID", { status: 400 });
        }

        await env.DB
          .prepare("DELETE FROM tasks WHERE id = ?")
          .bind(id)
          .run();

        return new Response("Task deleted", { status: 200 });
      }

      return new Response("Not Found", { status: 404 });
    } catch (err) {
      console.error(err);
      return new Response("Internal Server Error", { status: 500 });
    }
  }
};
