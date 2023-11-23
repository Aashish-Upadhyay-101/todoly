import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

// first time the globalThis.prisma == undefined, and new PrismaClient() get called and store that in db
// second time when the hot-reload happens it will get the previous from globalThis
export const db = globalThis.prisma || new PrismaClient();

// this will store the value of new PrismaClient() in global prisma variable to re-use on hot reloads
if (process.env.NODE_ENV !== "production") globalThis.prisma = db;

/* 
  NOTE:
  because global variable doesn't re-instantiate on nextjs hot reload
  which will prevent multiple instance of prisma client being instantiated at the same time.
*/
