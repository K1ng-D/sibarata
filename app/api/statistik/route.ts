import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc, deleteDoc } from "firebase/firestore";

const statistikRef = doc(db, "statistik", "sibarata");

// GET → ambil data
export async function GET() {
  const snap = await getDoc(statistikRef);
  if (snap.exists()) {
    return NextResponse.json(snap.data());
  }
  return NextResponse.json({ litmas: 0, bimbingan: 0, petugas: 0 });
}

// POST → tambah data (atau overwrite)
export async function POST(req: Request) {
  const body = await req.json();
  await setDoc(statistikRef, body);
  return NextResponse.json({ message: "Data disimpan", data: body });
}

// PUT → update data
export async function PUT(req: Request) {
  const body = await req.json();
  await setDoc(statistikRef, body, { merge: true });
  return NextResponse.json({ message: "Data diperbarui", data: body });
}

// DELETE → hapus data
export async function DELETE() {
  await deleteDoc(statistikRef);
  return NextResponse.json({ message: "Data dihapus" });
}
