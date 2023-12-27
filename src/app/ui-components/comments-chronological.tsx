import { fetchAllComments } from "../lib/fetchdata"
import CommentCard from "./comment-card";

export default async function CommentsChronological() {

    //fetch data
    const rows = await fetchAllComments();

    //render <CommentCard>, 1 per row
    return (<>
        {rows.map((row) => {
            return <CommentCard key={row.id} 
                id={row.id} 
                username={row.username}
                timestamp={row.timestamp}
                text={row.text}
                replying_to={row.replying_to}/>
            })}
    </>)
}
