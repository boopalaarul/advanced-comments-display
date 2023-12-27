import CommentCard from "./comment-card";
import { Comment } from "../lib/definitions"
import { useEffect, useState } from "react";

//recursive, calling extra <CommentsThreaded> under every comment
//idealized solution, but with too many comments the browser would stack-overflow
//more realistic might be having root comments display 5 at a time, but only the root
export default function CommentsThreaded({ root_id } : { root_id: number | null }) {
    
    //base case for recursion: rows is still [] after useEffect()
    const [rows, setRows] = useState([] as Comment[])

    useEffect(() => {
        
        //useEffect's callback cannot have a return value, but that means it has to 
        //return void; async function returns Promise<void>
        //solution: define the async fetching function inside the sync. callback
        async function fetchComs(){
            try {
                //request's seearch parameters have to be given through ?[key]=[value]
                const response = await fetch(`/api/threaded/?root=${root_id}`);
                if (response.status === 200) {
                    const resjson = await response.json();
                    //when base case reached, setRows doesn't do anything
                    //final render is <></> 
                    resjson.rows.length > 0
                        ? setRows(resjson.rows)
                        : null;
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
        {rows.map((row : Comment, index : number) => {
            return (
                <div className="space-y-[5px]">

                    {/* rendering the parent comment, aka root comment for this thread */}
                    <CommentCard key={row.id} 
                    id={row.id} 
                    username={row.username}
                    timestamp={row.timestamp}
                    text={row.text}
                    replying_to={row.replying_to}/>
                    
                    {/* rendering the child comments */}
                    <div className="flex flex-row">
                        <div className="border-r-blue-100 border-r-[2px] w-5 mr-5"></div>
                        <div className="flex flex-col grow">
                            
                            {/*when rows has length > 1, each reply will have a component
                            generated with the same row.id, etc; will only differ in the 
                            index of Comment "row" within array "rows"
                            key can't be a tuple, so need every (row.id, index) to map
                            to a unique, single integer */}
                            <CommentsThreaded key={row.id * 10000 + index} root_id={row.id}/>
                        </div>
                    </div>
                </div>
            )})}
    </>)
}
