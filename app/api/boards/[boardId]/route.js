import db from "@/lib/db/db";

// Get Single Board
export async function GET(req, { params }) {
  const { boardId } = params;

  const stmt = db.prepare("SELECT * FROM boards WHERE id = ?");
  const board = stmt.get(boardId);

  if (!board) {
    return new Response(JSON.stringify({ error: "Board not found." }), {
      status: 404,
    });
  }

  return new Response(JSON.stringify(board), { status: 200 });
}

// Update a Board
export async function PATCH(req, { params }) {
  // Log params to ensure it's being passed correctly
  console.log("Params received:", params);

  const { boardId } = params; // Make sure params has boardId

  if (!boardId) {
    return new Response(JSON.stringify({ error: "Board ID is required." }), {
      status: 400,
    });
  }

  const updatedBoardData = await req.json();

  if (!updatedBoardData.name) {
    return new Response(JSON.stringify({ error: "Board name is required." }), {
      status: 400,
    });
  }

  try {
    const stmt = db.prepare("UPDATE boards SET name = ? WHERE id = ?");
    const info = stmt.run(updatedBoardData.name, boardId);

    // If no rows were updated, return a 404 error
    if (info.changes === 0) {
      return new Response(
        JSON.stringify({ error: "Board not found or no change made." }),
        { status: 404 }
      );
    }

    // Return the updated board data
    return new Response(
      JSON.stringify({ id: boardId, name: updatedBoardData.name }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating board:", error);
    return new Response(
      JSON.stringify({
        error: "Error updating board.",
        details: error.message,
      }),
      { status: 500 }
    );
  }
}

// Delete Single Board
export async function DELETE(req, { params }) {
  const { boardId } = params;

  if (!boardId) {
    return new Response(JSON.stringify({ error: "Board ID is required." }), {
      status: 400,
    });
  }

  const stmt = db.prepare("DELETE FROM boards WHERE id = ?");
  const info = stmt.run(boardId);

  if (info.changes === 0) {
    return new Response(JSON.stringify({ error: "Board not found." }), {
      status: 404,
    });
  }

  return new Response(
    JSON.stringify({ message: "Board deleted successfully." }),
    { status: 200 }
  );
}
