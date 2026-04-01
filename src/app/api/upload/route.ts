import { NextResponse } from "next/server"
import { auth } from "@/auth"
import { db } from "@/lib/db"

export async function POST(request: Request) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const formData = await request.formData()
    const file = formData.get("file") as File
    const processId = formData.get("processId") as string
    const fileType = formData.get("type") as string || "document"

    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      )
    }

    // Check if process exists
    if (processId) {
      const process = await db.process.findUnique({
        where: { id: processId },
      })

      if (!process) {
        return NextResponse.json(
          { error: "Process not found" },
          { status: 404 }
        )
      }
    }

    // Prepare Cloudinary upload
    const cloudinaryFormData = new FormData()
    cloudinaryFormData.append("file", file)
    
    const uploadPreset = process.env.CLOUDINARY_UPLOAD_PRESET
    if (uploadPreset) {
      cloudinaryFormData.append("upload_preset", uploadPreset)
    }
    
    cloudinaryFormData.append("folder", `projetoyf/processos/${processId || "uncategorized"}`)
    cloudinaryFormData.append("resource_type", "auto")

    // Upload to Cloudinary
    const CLOUDINARY_UPLOAD_URL = `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/upload`
    
    const cloudinaryResponse = await fetch(CLOUDINARY_UPLOAD_URL, {
      method: "POST",
      body: cloudinaryFormData,
    })

    if (!cloudinaryResponse.ok) {
      throw new Error(`Cloudinary upload failed: ${cloudinaryResponse.statusText}`)
    }

    const cloudinaryData = await cloudinaryResponse.json()

    // Save to database if processId is provided
    if (processId) {
      await db.midia.create({
        data: {
          processId,
          url: cloudinaryData.secure_url,
          type: fileType,
        },
      })
    }

    return NextResponse.json(
      {
        success: true,
        url: cloudinaryData.secure_url,
        publicId: cloudinaryData.public_id,
        fileName: file.name,
      },
      { status: 201 }
    )
  } catch (error: any) {
    console.error("Error uploading file:", error)
    return NextResponse.json(
      { error: error.message || "Failed to upload file" },
      { status: 500 }
    )
  }
}
