import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import { Lead } from "@/models/Lead";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  console.log("[leads] POST /api/leads/create called");
  try {
    const body = await req.json();
    const {
      name,
      email,
      businessName,
      location,
      businessType,
      description,
      services,
      customers,
      differentiation,
      hasLogo,
      brandColors,
      stylePreference,
      competitors,
      phone,
      instagram,
      website,
      notes,
    } = body;

    if (!name?.trim() || !email?.trim() || !businessName?.trim() || !location?.trim()) {
      console.log("[leads] Validation failed: step 1 required fields");
      return NextResponse.json({ error: "Fill in required step 1 fields" }, { status: 400 });
    }
    const servicesOk = Array.isArray(services) && services.length > 0;
    if (!description?.trim() || !servicesOk || !customers?.trim() || !differentiation?.trim()) {
      console.log("[leads] Validation failed: step 2", { description: !!description?.trim(), servicesOk, services: typeof services, customers: !!customers?.trim(), differentiation: !!differentiation?.trim() });
      return NextResponse.json({ error: "Fill in required step 2 fields" }, { status: 400 });
    }

    const validBusinessTypes = ["local-service", "online-business", "personal-brand", "small-company"];
    if (!validBusinessTypes.includes(businessType)) {
      console.log("[leads] Validation failed: invalid businessType", businessType);
      return NextResponse.json({ error: "Invalid business type" }, { status: 400 });
    }

    console.log("[leads] Connecting to DB...");
    await dbConnect();
    console.log("[leads] DB connected, creating lead...");

    const lead = await Lead.create({
      name: name.trim(),
      email: email.trim(),
      businessName: businessName.trim(),
      location: location.trim(),
      businessType,
      answers: {
        description: description?.trim(),
        services: Array.isArray(services) ? services : [],
        customers: customers?.trim(),
        differentiation: differentiation?.trim(),
        hasLogo: Boolean(hasLogo),
        brandColors: brandColors?.trim() || undefined,
        stylePreference: stylePreference || "modern",
        competitors: Array.isArray(competitors) ? competitors : undefined,
        phone: phone?.trim() || undefined,
        instagram: instagram?.trim() || undefined,
        website: website?.trim() || undefined,
        notes: notes?.trim() || undefined,
      },
    });

    const dbName = mongoose.connection?.db?.databaseName ?? "?";
    console.log("[leads] Created:", lead._id.toString(), lead.email, "| db:", dbName);
    return NextResponse.json({ message: "Lead created", id: lead._id });
  } catch (err) {
    console.error("[leads] Error:", err);
    return NextResponse.json({ error: "Failed to save lead" }, { status: 500 });
  }
}
