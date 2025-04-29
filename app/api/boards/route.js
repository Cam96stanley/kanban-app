import db from "@/lib/db/db";

// Get all boards
export async function GET() {
  const stmt = db.prepare("SELECT * FROM boards");
  const boards = stmt.all();

  return Response.json(boards);
}

// Create a board
export async function POST(req) {
  const { name } = await req.json();

  if (!name) {
    return new Response(JSON.stringify({ error: "Board name is required." }), {
      status: 400,
    });
  }

  const stmt = db.prepare("INSERT INTO boards (name) VALUES (?)");
  const info = stmt.run(name);

  return new Response(JSON.stringify({ id: info.lastInsertRowid, name }), {
    status: 201,
  });
}
