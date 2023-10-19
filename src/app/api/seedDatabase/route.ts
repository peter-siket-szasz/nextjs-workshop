import { NextResponse } from "next/server";
import { seed } from "@/lib/db/seed";

export async function GET() {
  await seed();
  return NextResponse.json({ result: "OK" });
}
