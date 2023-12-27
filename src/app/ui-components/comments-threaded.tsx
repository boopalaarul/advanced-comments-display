import CommentCard from "./comment-card";
import { Comment } from "../lib/definitions"
import { useEffect, useState } from "react";

//this one's a little harder to implement than the chron. comments: question is
//where to implement the nesting: in the API, in the effect, or in the render?
export default function CommentsThreaded() {

    //fetch data from within effect... and then extract response.rows (@vercel/postgres
    //QueryResult<Comment>.rows packaged into NextResponse in route.js)
    //rows is a state variable-- after effect changes "rows", component needs to re-render
    //initial render -> effect -> change in state -> render (but shouldn't have effect again)
    const [rows, setRows] = useState([] as Comment[])

    useEffect(() => {
        
        //useEffect's callback cannot have a return value, but that means it has to 
        //return void; async function returns Promise<void>
        //solution: define the async fetching function inside the sync. callback
        async function fetchComs(){
            try {
                const response = await fetch("/api/chronological/");
                if (response.status === 200) {
                    const resjson = await response.json();
                    setRows(resjson.rows);
                }
            } catch (error) {
                throw error;
            }
        }
        //and then actually call the defined function
        fetchComs();
    //since this effect changes a state variable, deps = null would cause infinite loop
    //(effect reactivates on every render, and then it causes another render)
    //deps = [rows] likewise causes an infinite loop
    }, [])

    //render <CommentCard>, 1 per row
    //since this happens before the effect, rows shouldn't still be null by this time
    return (<>
        {rows.map((row : Comment) => {
            return <CommentCard key={row.id} 
                id={row.id} 
                username={row.username}
                timestamp={row.timestamp}
                text={row.text}
                replying_to={row.replying_to}/>
            })}
    </>)
}
