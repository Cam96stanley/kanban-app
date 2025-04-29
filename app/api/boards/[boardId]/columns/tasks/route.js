// app/api/boards/[boardId]/columns/[columnId]/tasks/route.js
import db from "@/lib/db/db";

export async function GET(req, { params }) {
  const { boardId } = params;

  if (!boardId) {
    return new Response(JSON.stringify({ error: "Board ID is required." }), {
      status: 400,
    });
  }

  try {
    // Fetch columns for the board
    const columns = db
      .prepare("SELECT * FROM columns WHERE board_id = ?")
      .all(boardId);

    if (columns.length === 0) {
      return new Response(
        JSON.stringify({ error: "No columns found for this board." }),
        { status: 404 }
      );
    }

    // Fetch tasks for each column
    const tasksForColumns = columns.map((column) => {
      const tasks = db
        .prepare("SELECT * FROM tasks WHERE column_id = ?")
        .all(column.id);
      return { column, tasks };
    });

    return new Response(JSON.stringify({ columns: tasksForColumns }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching columns and tasks:", error);
    return new Response(
      JSON.stringify({
        error: "Error fetching columns and tasks.",
        details: error.message,
      }),
      { status: 500 }
    );
  }
}
