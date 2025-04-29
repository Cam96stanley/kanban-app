import db from "@/lib/db/db";

// Create a Task for a Column
export async function POST(req, { params }) {
  const { boardId, columnId } = await params;
  const { title, description } = await req.json();

  if (!title || !columnId || !boardId) {
    return new Response(
      JSON.stringify({
        error: "Board ID, Column ID, and Task title are required.",
      }),
      { status: 400 }
    );
  }

  try {
    const stmt = db.prepare(
      "INSERT INTO tasks (board_id, column_id, title, description) VALUES (?, ?, ?, ?)"
    );
    const result = stmt.run(boardId, columnId, title, description);

    if (result.changes === 0) {
      throw new Error("Failed to create task.");
    }

    const newTaskStmt = db.prepare("SELECT * FROM tasks WHERE id = ?");
    const newTask = newTaskStmt.get(result.lastInsertRowid);

    return new Response(JSON.stringify(newTask), { status: 201 });
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: error.message || "An error occurred while creating the task.",
      }),
      { status: 500 }
    );
  }
}
