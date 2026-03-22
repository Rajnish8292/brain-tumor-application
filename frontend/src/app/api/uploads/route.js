import { verifyToken } from "@/lib/jwt";
import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

const checkUserExist = async (usersCollection, email) => {
  const user = await usersCollection.findOne(
    { email },
    { projection: { _id: 1 } },
  );
  return !!user;
};

export async function GET(req) {
  const authHeader = req.headers.get("authorization");

  if (!authHeader)
    return NextResponse.json(
      { message: "jwt token not found in authorization header." },
      { status: 404 },
    );

  try {
    const token = authHeader.split(" ")[1];
    const { email } = verifyToken(token);

    const client = await clientPromise;
    const db = client.db("brain_tumor");

    const user_collection = db.collection("users");
    const upload_collection = db.collection("uploads");

    const isExist = await checkUserExist(user_collection, email);

    if (isExist) {
      const uploads = await upload_collection.findOne({ email });
      return NextResponse.json({
        message: "uploads successfully fetched!",
        uploads,
      });
    }

    return NextResponse.json(
      { message: "user does not exist!" },
      { status: 404 },
    );
  } catch (err) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}

export async function POST(req) {
  const authHeader = await req.headers.get("Authorization");
  const body = await req.formData();

  if (!authHeader)
    return NextResponse.json(
      { message: "jwt token not found in authorization header." },
      { status: 404 },
    );

  try {
    const token = authHeader.split(" ")[1];
    const { email } = verifyToken(token);

    const files = body.getAll("files");

    const client = await clientPromise;
    const db = client.db("brain_tumor");
    const user_collection = db.collection("users");
    const upload_collection = db.collection("uploads");

    const isExist = await checkUserExist(user_collection, email);

    if (isExist) {
      const uploadResults = [];

      for (const file of files) {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // convert buffer → base64
        const base64 = buffer.toString("base64");
        const dataURI = `data:${file.type};base64,${base64}`;

        const result = await cloudinary.uploader.upload(dataURI, {
          folder: "mri-scans", // optional
        });

        uploadResults.push(result.secure_url);
      }

      return NextResponse.json({
        message: "data uploaded successfully!",
        urls: uploadResults,
      });
      // await upload_collection.updateOne(
      //   { email },
      //   {
      //     $push: {
      //       uploads: { name, image_url, confidence },
      //     },
      //   },
      // );

      return NextResponse.json({});
    }

    return NextResponse.json(
      { message: "user does not exist!" },
      { status: 404 },
    );
  } catch (err) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
