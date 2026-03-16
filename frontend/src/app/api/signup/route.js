import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
const checkUserExist = async (usersCollection, email) => {
  const user = await usersCollection.findOne(
    { email },
    { projection: { _id: 1 } },
  );
  return !!user;
};

const createUser = async (usersCollection, body) => {
  return await usersCollection.insertOne({
    fullname: body.fullname,
    password: body.password,
    email: body.email,
    createdAt: new Date(),
  });
};

export async function POST(req) {
  try {
    const body = await req.json();
    const { fullname, email, password } = body;

    if (!fullname || !email || !password) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 },
      );
    }

    const client = await clientPromise;
    const db = client.db("brain_tumor");
    const users = db.collection("users");

    const exists = await checkUserExist(users, email);
    if (exists) {
      return NextResponse.json(
        { message: "User already exists!" },
        { status: 409 },
      );
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    await createUser(users, {
      fullname,
      email,
      password: hashedPassword,
    });

    return NextResponse.json(
      { message: "User created successfully" },
      { status: 201 },
    );
  } catch (err) {
    console.error("Signup Error:", err);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
