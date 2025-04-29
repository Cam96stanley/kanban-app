import db from "@/lib/db/db";

// Get all Columns for a board
export async function GET(req, { params }) {
  const { boardId } = params;

  // Check if boardId is present in the params
  if (!boardId) {
    return new Response(JSON.stringify({ error: "Board ID is required." }), {
      status: 400,
    });
  }

  try {
    const stmt = db.prepare("SELECT * FROM columns WHERE board_id = ?");
    const columns = stmt.all(boardId); // Pass boardId to the query

    // Check if columns were found and return the appropriate response
    if (columns.length === 0) {
      return new Response(JSON.stringify([]), { status: 200 });
    }

    return new Response(JSON.stringify(columns), { status: 200 });
  } catch (error) {
    // Log error for debugging
    console.error("Error fetching columns:", error);

    // Return detailed error message in the response
    return new Response(
      JSON.stringify({
        error: error.message || "An error occurred while retrieving columns.",
      }),
      { status: 500 }
    );
  }
}

// Create a Column
export async function POST(req, { params }) {
  const { boardId } = params;
  const { name } = await req.json();

  if (!name || !boardId) {
    return new Response(
      JSON.stringify({ error: "Board ID and Column name are required." }),
      { status: 400 }
    );
  }

  // Check if the board exists
  const boardCheckStmt = db.prepare("SELECT id FROM boards WHERE id = ?");
  const board = boardCheckStmt.get(boardId);

  if (!board) {
    return new Response(
      JSON.stringify({ error: "Board with the given ID does not exist." }),
      { status: 404 }
    );
  }

  try {
    const stmt = db.prepare(
      "INSERT INTO columns (board_id, name) VALUES (?, ?)"
    );
    const result = stmt.run(boardId, name);

    if (result.changes === 0) {
      throw new Error("Failed to create column.");
    }

    const newColumnStmt = db.prepare("SELECT * FROM columns WHERE id = ?");
    const newColumn = newColumnStmt.get(result.lastInsertRowid);

    return new Response(JSON.stringify(newColumn), { status: 201 });
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: error.message || "An error occurred while creating the column.",
      }),
      { status: 500 }
    );
  }
}
