import db from "@/lib/db/db";

// Deleting a Column
export async function DELETE(req, { params }) {
  const { boardId, columnId } = params;

  if (!boardId || !columnId) {
    return new Response(
      JSON.stringify({ error: "Board ID and Column ID are required." }),
      { status: 400 }
    );
  }

  try {
    const stmt = db.prepare(
      "DELETE FROM columns WHERE board_id = ? AND id = ?"
    );
    const result = stmt.run(boardId, columnId);

    if (result.changes === 0) {
      throw new Error("Column not found or couldn't be deleted.");
    }

    return new Response(
      JSON.stringify({ message: "Column deleted successfully." }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: error.message || "An error occurred while deleting the column.",
      }),
      { status: 500 }
    );
  }
}
