//Renders a colorful comment card from props.
import { Comment } from '../lib/definitions'
import ReplyButton from './button-reply-comment'
import EditButton from './button-edit-comment'
import RemoveButton from './button-remove-comment'

import { AuthorizeContext } from './context/authorize-provider'
import { useContext } from 'react'
/*
id: number, 
username: string,
timestamp: Date,
text: string,
replying_to: number
*/

export default function CommentCard(props : Comment) {
    const credentials = useContext(AuthorizeContext)
    const loggedInUser = credentials?.username;
    return (
        props.deleted 
        ? <div className='bg-inherit text-black'>
            <p>This comment has been deleted.</p>
        </div>
        : <div id={`comment-${props.id}`} className="bg-blue-800 rounded-lg p-5">

            {/* display user that posted comment & time of post */}
            <div className="flex flex-row border-b-[2px] border-b-white space-x-5">
                <p className="w-auto">{props.username}</p>
                <p className="text-gray-500 grow">{`#${props.id}`}</p>
                <p className="w-auto">{(new Date(props.timestamp)).toString()}</p>
            </div>

            <div className="flex justify-end">
                {/* display link to comment this is replying to*/}
                {props.replying_to !== null 
                ? <p className="text-gray-500 grow">Replying to #{props.replying_to}</p> 
                : null}

                {/* display reply button but only if a user is currently logged in*/}
                {loggedInUser ? <ReplyButton target={props.id} /> : null}
            </div>
            
            {/* display text of comment */}
            <p>{props.text}</p>

            {/*display edit and remove buttons but only if current user is the one who
            posted these comments*/}
            {loggedInUser === props.username
            ?<div className="flex justify-end space-x-1">
                <EditButton target={props.id} text={props.text} />
                <RemoveButton target={props.id} text={props.text} />
            </div>:null}
        </div>
    )
}