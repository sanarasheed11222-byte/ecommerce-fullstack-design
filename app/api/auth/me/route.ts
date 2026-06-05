import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

const UserSchema = new mongoose.Schema({
  name: String, email: String, password: String, role: { type: String, default: 'user' }
});
const User = mongoose.models.User || mongoose.model('User', UserSchema);

export async function GET(req: Request) {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    const token = req.headers.get('authorization')?.split(' ')[1];
    if (!token) return NextResponse.json({ message: 'No token' }, { status: 401 });
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    const user = await User.findById(decoded.id).select('-password');
    return NextResponse.json(user);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
