import { Log, getSession } from "@/app/_helpers/api/helpers";
import { getServerCacheValue, addServerCacheValue } from "@/app/_helpers/api/servercache";
import React from "react";
import mysql from "mysql2/promise";
import ArticlesPage from "./Articles";
import { Article } from "@/_types/dbTypes";
import { redirect } from "next/navigation";

//@ts-expect-error
const conn = mysql.createConnection(process.env.DATABASE_URL);

//This function is server side only.
async function getData() {
  try {
    const session = await getSession(conn);
    if (!session?.establishmentId) return "unauthorised";

    const cachedData = await getServerCacheValue("articles" + session.establishmentId);
    if (cachedData) return cachedData;

    const [sites] = await (
      await conn
    ).execute(
      " SELECT `id`, `description`, `title`, `userId`, `thumbnail`, `createdAt`, `updatedAt` FROM `Article` WHERE `establishmentId` = ? ORDER BY `id` DESC LIMIT 30 ",
      [session.establishmentId]
    );

    addServerCacheValue(sites, "articles" + session.establishmentId);
    return sites;
  } catch (err) {
    Log(err);
    return [];
  }
}

export default async function Page() {
  const data = (await getData()) as Article[] | "unauthorised";
  if (data === "unauthorised") return redirect("/login?unauthorised=true");

  return <ArticlesPage data={data} />;
}
