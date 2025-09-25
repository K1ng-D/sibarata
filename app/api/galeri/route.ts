import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  getDoc,
} from "firebase/firestore";

// 🔹 GET → ambil semua galeri
export async function GET() {
  try {
    const snapshot = await getDocs(collection(db, "galeri"));
    const data = snapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      ...docSnap.data(),
    }));
    return NextResponse.json({ success: true, data });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: String(err) },
      { status: 500 }
    );
  }
}

// 🔹 POST → tambah galeri
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, url } = body;

    await addDoc(collection(db, "galeri"), {
      title,
      url,
      createdAt: new Date(),
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: String(err) },
      { status: 500 }
    );
  }
}

// 🔹 PATCH → edit galeri (judul + gambar baru)
export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { id, title, newUrl } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: "ID harus disertakan" },
        { status: 400 }
      );
    }

    const ref = doc(db, "galeri", id);
    const existing = await getDoc(ref);

    if (!existing.exists()) {
      return NextResponse.json(
        { success: false, error: "Data tidak ditemukan" },
        { status: 404 }
      );
    }

    const updateData: any = { updatedAt: new Date() };
    if (title) updateData.title = title;
    if (newUrl) updateData.url = newUrl; // ganti dengan gambar baru

    await updateDoc(ref, updateData);

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: String(err) },
      { status: 500 }
    );
  }
}

// 🔹 DELETE → hapus galeri
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, error: "ID harus disertakan" },
        { status: 400 }
      );
    }

    await deleteDoc(doc(db, "galeri", id));
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: String(err) },
      { status: 500 }
    );
  }
}
