import { Log, RedirectLogin, getSession } from "@/app/_helpers/api/helpers";
import { deleteFromServerCache } from "@/app/_helpers/api/servercache";
import { NextRequest, NextResponse } from "next/server";
import mysql from "mysql2/promise";
import { Article } from "@/_types/dbTypes";

//@ts-expect-error
const conn = mysql.createConnection(process.env.DATABASE_URL);

//Get articles
export const GET = async (req: NextRequest, res: Response) => {
  try {
    const session = await getSession(conn);
    if (!session?.establishmentId) return RedirectLogin();

    const lastId = req.nextUrl.searchParams.get("lastId") || 0;

    const [files] = await (
      await conn
    ).query("SELECT id, description, label, userId, thumbnail, createdAt, updatedAt FROM Site WHERE establishmentId = ? AND id > ? ORDER BY id ASC LIMIT 30", [
      session.establishmentId,
      lastId,
    ]);

    return NextResponse.json(files as Article[]);
  } catch (err) {
    Log(err);
    return NextResponse.json({ message: "There was an error", errors: true }, { status: 500 });
  }
};

//Add a new article
export const POST = async (req: Request, res: Response) => {
  try {
    const session = await getSession(conn);
    if (!session?.establishmentId) return RedirectLogin();

    const body = await req.json();
    const date = new Date() as any;

    const categoryIds = "[]";
    //Create new Article
    await (
      await conn
    ).query(
      "INSERT INTO Article (title, description, userId, content, establishmentId, thumbnail, attachments, updatedAt, categoryIds) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [body.title, body.description, session.userId, body.content, session.establishmentId, body.thumbnail, body.attachments, date, categoryIds]
    );
    //last insert id
    const [lastInsertId] = (await (await conn).query("SELECT LAST_INSERT_ID() as id")) as any;

    deleteFromServerCache("articles" + session.establishmentId);

    return NextResponse.json({ success: true, id: lastInsertId[0].id });
  } catch (err: any) {
    Log(err);
    return NextResponse.json({ message: "There was an error", errors: true }, { status: 500 });
  }
};

//update an article
export const PUT = async (req: Request, res: Response) => {
  try {
    const session = await getSession(conn);
    if (!session?.establishmentId) return RedirectLogin();

    const body = await req.json();
    const date = new Date() as any;

    //Create new Article
    await (
      await conn
    ).query("UPDATE Article SET title = ?, description = ?, content = ?, thumbnail = ?, attachments = ?, updatedAt = ?, categoryIds = ? WHERE id = ?", [
      body.title,
      body.description,
      body.content,
      body.thumbnail,
      body.attachments,
      date,
      body.categoryIds || "[]",
      body.id,
    ]);

    deleteFromServerCache("articles" + session.establishmentId);

    return NextResponse.json({ success: true });
  } catch (err: any) {
    Log(err);
    return NextResponse.json({ message: "There was an error", errors: true }, { status: 500 });
  }
};
