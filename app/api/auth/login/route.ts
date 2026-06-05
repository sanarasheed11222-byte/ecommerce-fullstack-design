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
    const { email, password } = await req.json();
    const user = await User.findOne({ email });
    if (!user) return NextResponse.json({ message: 'Invalid email or password' }, { status: 400 });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return NextResponse.json({ message: 'Invalid email or password' }, { status: 400 });
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET!, { expiresIn: '7d' });
    return NextResponse.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
