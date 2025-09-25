import { NextRequest, NextResponse } from 'next/server';
import { 
  getDocs, 
  collection, 
  query, 
  orderBy, 
  where,
  addDoc,
  limit,
  Timestamp
} from 'firebase/firestore';
import { db } from '@/lib/firebase';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const tahun = searchParams.get('tahun');
    const limitParam = parseInt(searchParams.get('limit') || '10');

    let q = query(collection(db, 'produkHukum'), orderBy('tanggal', 'desc'));
    
    if (tahun) {
      q = query(q, where('tahun', '==', parseInt(tahun)));
    }

    if (limitParam > 0) {
      q = query(q, limit(limitParam));
    }

    const snapshot = await getDocs(q);
    const produkHukum = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      tanggal: doc.data().tanggal?.toDate().toISOString(),
      createdAt: doc.data().createdAt?.toDate().toISOString(),
      updatedAt: doc.data().updatedAt?.toDate().toISOString(),
    }));

    return NextResponse.json({
      success: true,
      data: produkHukum
    });
  } catch (error) {
    console.error('Error fetching produk hukum:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to fetch produk hukum',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { judul, nomor, tahun, file } = body;

    if (!judul || !nomor || !tahun || !file) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Missing required fields' 
        },
        { status: 400 }
      );
    }

    const docRef = await addDoc(collection(db, 'produkHukum'), {
      judul,
      nomor,
      tahun: parseInt(tahun),
      file,
      tanggal: Timestamp.now(),
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    });

    return NextResponse.json({
      success: true,
      id: docRef.id,
      message: 'Produk hukum created successfully'
    });
  } catch (error) {
    console.error('Error creating produk hukum:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to create produk hukum',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}