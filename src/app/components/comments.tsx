
"use client";

import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";  // for uniq id

interface Comment {
  id: string;
  text: string;
  blogId: string;
}

interface CommentsSectionProps {
  blogId: string; // Accept blogId as a prop
}

export default function CommentsSection({ blogId }: CommentsSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");

  // Fetch comments for the specific blogId
  useEffect(() => {
    fetch(`/api/comments/${blogId}`)
      .then((res) => res.json())
      .then((data) => setComments(data));
  }, [blogId]);

  // Add a new comment
  const addComment = async () => {
    const id = uuidv4();
    const res = await fetch(`/api/comments/${blogId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, text: newComment, blogId }), 
    });

    if (res.ok) {
      setComments([...comments, { id, text: newComment, blogId }]);
      setNewComment("");
    }
  };

  // Delete a comment
  const deleteComment = async (id: string) => {
    const res = await fetch(`/api/comments/${blogId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    if (res.ok) {
      setComments(comments.filter((comment) => comment.id !== id));
    }
  };

  return (
    <div className="mt-4">
        <h1 className='text-[30px] pl-3 pt-4' >Comments</h1>
      <div className="grid gap-2 mb-4">

      <textarea    value={newComment}
          onChange={(e) => setNewComment(e.target.value)}  placeholder="write your comment"  className="  h-24 p-2 w-full border border-gray-400  rounded-md">

            </textarea>
            <button   onClick={addComment} className="bg-[#FE4A51]   text-white p-2 w-full sm:w-[200px]  rounded-md mt-2">Add Comment</button>

      </div>
      <ul>
        {comments.map((comment) => (
          <li
            key={comment.id}
            className="flex justify-between items-center border-2 border-red-400 mt-2  rounded-lg p-2"
          >
            <span>{comment.text}</span>
            <button
              onClick={() => deleteComment(comment.id)}
              className="text-red-500"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
