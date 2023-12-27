//Renders a colorful comment card from props.
import { Comment } from '../lib/definitions'
export default function CommentCard(props : Comment) {

    return (
        <div id={`comment-${props.id}`} className="bg-blue-800 rounded-lg p-5">
            {/* display user that posted comment & time of post */}
            <div className="flex flex-row border-b-[2px] border-b-white space-x-5">
                <p className="grow">{props.username}</p>
                <p className="w-auto">{(new Date(props.timestamp)).toString()}</p>
                <p className="text-gray-500 w-auto">{`#${props.id}`}</p>
            </div>
            {/* display link to comment this is replying to, but only if it is a reply */}
            {props.replying_to ? 
            <p className="text-gray-500">
                Replying to #{props.replying_to}
            </p> 
            : null}
            {/* display text of comment */}
            <p>{props.text}</p>
        </div>
    )
    /*
    so here's a problem: i don't want the ID to display here, but i want it to be accessible
    to an external function that operates on the elements... key is numeric, can set that 
    externally when generating <CommentCard />
    id: number, 
    username: string,
    timestamp: Date,
    text: string,
    replying_to: number*/
}