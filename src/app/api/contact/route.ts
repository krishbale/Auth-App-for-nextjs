export const dynamic = 'force-dynamic' // defaults to auto
import dbConn from '@/backend/dbconnect';
import Contact from "@/backend/models/contact";
import {NextResponse} from "next/server";

export async function POST(req: any, res: any) {
    try {

        const body = await req.json();
        await dbConn();

        await Contact.create(body);

        return NextResponse.json({
            message:"Message sent successfully!"
        }, {
            status: 200
        })

    }catch (e) {
        return NextResponse.json(
            { message: "Server error, please try again!", error: e },
            { status: 500 }
        )
    }
}