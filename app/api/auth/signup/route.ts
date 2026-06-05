import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const UserSchema = new mongoose.Schema({
  name: String, email: { type: String, unique: true },
  password: String, role: { type: String, default: 'user' }
});
const User = mongoose.models.User || mongoose.model('User', UserSchema);

export async function POST(req: Request) {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    const { name, email, password } = await req.json();
    const existing = await User.findOne({ email });
    if (existing) return NextResponse.json({ message: 'Email already registered' }, { status: 400 });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET!, { expiresIn: '7d' });
    return NextResponse.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
