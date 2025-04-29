import db from "@/lib/db/db";

// Deleting a Task
export async function DELETE(req, { params }) {
  const { taskId } = params;

  if (!taskId) {
    return new Response(JSON.stringify({ error: "Task ID is required." }), {
      status: 400,
    });
  }

  try {
    const result = db.prepare("DELETE FROM tasks WHERE id = ?").run(taskId);

    if (result.changes === 0) {
      return new Response(JSON.stringify({ error: "Task not found." }), {
        status: 404,
      });
    }

    return new Response(
      JSON.stringify({ message: "Task deleted successfully." }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting task:", error);
    return new Response(
      JSON.stringify({ error: "Error deleting task.", details: error.message }),
      { status: 500 }
    );
  }
}

// Update a Task
export async function PATCH(req, { params }) {
  const { taskId } = params;

  if (!taskId) {
    return new Response(JSON.stringify({ error: "Task ID is required." }), {
      status: 400,
    });
  }

  // Parse the request body
  const { title, description } = await req.json();

  // Check if at least one field is provided
  if (!title && !description) {
    return new Response(
      JSON.stringify({
        error: "At least one field (title or description) is required.",
      }),
      { status: 400 }
    );
  }

  try {
    // Prepare the update fields dynamically based on what was passed
    let updateFields = [];
    let paramsArr = [];

    if (title) {
      updateFields.push("title = ?");
      paramsArr.push(title);
    }
    if (description) {
      updateFields.push("description = ?");
      paramsArr.push(description);
    }

    // Add the task ID to the params array
    paramsArr.push(taskId);

    // Dynamically create the UPDATE query with only the fields that need to be updated
    const updateQuery = `
      UPDATE tasks
      SET ${updateFields.join(", ")}
      WHERE id = ?
    `;

    // Run the update query
    const result = db.prepare(updateQuery).run(...paramsArr);

    if (result.changes === 0) {
      return new Response(JSON.stringify({ error: "Task not found." }), {
        status: 404,
      });
    }

    return new Response(
      JSON.stringify({ message: "Task updated successfully." }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating task:", error);
    return new Response(
      JSON.stringify({ error: "Error updating task.", details: error.message }),
      { status: 500 }
    );
  }
}
