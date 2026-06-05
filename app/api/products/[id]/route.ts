import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: String, price: Number, category: String,
  image: String, description: String, stock: Number,
});
const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    const product = await Product.findById(params.id);
    if (!product) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(product);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
