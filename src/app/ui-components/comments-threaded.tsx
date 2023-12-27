import { fetchRepliesTo } from "../lib/fetchdata"
import CommentCard from "./comment-card";

export default async function CommentsThreaded() {

    //fetch data
    const rows = await fetchRepliesTo(null);

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