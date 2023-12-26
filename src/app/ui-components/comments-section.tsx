"use client" //need this when using useState
import { useState } from "react"

export default function CommentsSection({comments} : {comments : number}) {

    const [isHierarchical, setMode] = useState(true)

    return (
        <div className="bg-blue-800 rounded-lg p-10">
            <div          className="h-0 w-0 border-b-[40px] border-t-[40px] border-l-[20px] border-r-[20px] border-b-black border-t-red-800 border-x-transparent"
            />
  
            <h1 className="text-2xl text-bold">Comments</h1>
            <p><strong>Comments policy:</strong> Be civil etc etc</p>
            <p>{comments} comments found.</p>
            <p>Comments displaying in: {
                    isHierarchical ? "hierachical" : "non-hierarchical"
                } mode.</p>
            <button onClick={() => {setMode(!isHierarchical)}}>Change Display Mode</button>
        </div>
    )
}