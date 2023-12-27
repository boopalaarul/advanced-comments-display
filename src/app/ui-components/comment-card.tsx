//Renders a colorful comment card from props.
import { Comment } from '../lib/definitions'
/*
id: number, 
username: string,
timestamp: Date,
text: string,
replying_to: number
*/

export default function CommentCard(props : Comment) {
    return (
        <div id={`comment-${props.id}`} className="bg-blue-800 rounded-lg p-5">
            {/* display user that posted comment & time of post */}
            <div className="flex flex-row border-b-[2px] border-b-white space-x-5">
                <p className="w-auto">{props.username}</p>
                <p className="text-gray-500 grow">{`#${props.id}`}</p>
                <p className="w-auto">{(new Date(props.timestamp)).toString()}</p>
            </div>

            {/* display link to comment this is replying to, but only if it is a reply
                note that 0 and null both evaluate to boolean false! want a comment
                replying to 0 to be indicated as such */}
            {props.replying_to !== null ? 
            <p className="text-gray-500">
                Replying to #{props.replying_to}
            </p> 
            : null}
            
            {/* display text of comment */}
            <p>{props.text}</p>
        </div>
    )
}