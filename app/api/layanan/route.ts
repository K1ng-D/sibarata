import { NextRequest, NextResponse } from 'next/server';
import { 
  getDocs, getDoc, doc, collection, query, orderBy, where,
  addDoc, updateDoc, deleteDoc, limit, Timestamp
} from 'firebase/firestore';
import { db } from '@/lib/firebase';

// GET (list layanan)
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const featured = searchParams.get('featured') === 'true';
    const limitParam = parseInt(searchParams.get('limit') || '0');

    let q = query(collection(db, 'layanan'), orderBy('createdAt', 'desc'));

    if (featured) q = query(q, where('featured', '==', true));
    if (limitParam > 0) q = query(q, limit(limitParam));

    const snapshot = await getDocs(q);
    const layanan = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate().toISOString(),
      updatedAt: doc.data().updatedAt?.toDate().toISOString(),
    }));

    return NextResponse.json({ success: true, data: layanan });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}

// POST (tambah layanan)
export async function POST(request: NextRequest) {
  try {
    const { nama, deskripsi, icon, link, featured } = await request.json();

    if (!nama || !deskripsi || !icon || !link) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }

    const docRef = await addDoc(collection(db, 'layanan'), {
      nama, deskripsi, icon, link,
      featured: featured || false,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    });

    return NextResponse.json({ success: true, id: docRef.id, message: 'Layanan created successfully' });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}

// PUT (update layanan)
export async function PUT(request: NextRequest) {
  try {
    const { id, ...rest } = await request.json();
    if (!id) return NextResponse.json({ success: false, error: 'Missing ID' }, { status: 400 });

    const layananRef = doc(db, 'layanan', id);
    await updateDoc(layananRef, { ...rest, updatedAt: Timestamp.now() });

    return NextResponse.json({ success: true, message: 'Layanan updated successfully' });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}

// DELETE (hapus layanan)
export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json();
    if (!id) return NextResponse.json({ success: false, error: 'Missing ID' }, { status: 400 });

    const layananRef = doc(db, 'layanan', id);
    await deleteDoc(layananRef);

    return NextResponse.json({ success: true, message: 'Layanan deleted successfully' });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
