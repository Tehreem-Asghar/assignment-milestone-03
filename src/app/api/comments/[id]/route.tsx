import { NextRequest ,NextResponse } from "next/server";


let comments: {id : string , text : string , blogId : string}[] = []

interface Comment {
    id: string;
    text: string;
    blogId: string;
}


export async function GET ( req : NextRequest , {params} : {params : {id : string}}){


    const {id} =  params
    return NextResponse.json(comments.filter(comment => comment.blogId === id))

}



export async function POST(req: NextRequest) {
    try {
        const { id, text, blogId }: Comment = await req.json();

        // Validation check for missing fields
        if (!id || !text || !blogId) {
            return NextResponse.json({ error: "ID, text, and blogId are required" }, { status: 400 });
        }

        // Push the new comment to the array
        comments.push({ id, text, blogId });

        // Return a success response with a 201 status
        return NextResponse.json({ message: "Comment created successfully" }, { status: 201 });
    } catch (error) {
        // Return a 500 error if something goes wrong
        return NextResponse.json({ error: error }, { status: 500 });
    }
}


// DELETE: Delete a comment
export async function DELETE(req: Request) {
    const { id } = await req.json();
    comments = comments.filter((comment) => comment.id !== id);
    return NextResponse.json({ message: "Comment deleted successfully" }, { status: 200 });
  }
  