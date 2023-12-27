//array of comment objects, for seeding database
const REPLY_TO_ROOT = null

const users = [
    {
        username: "Frank"
    },
    {
        username: "Joe"
    },
    {
        username: "Jeff"
    },
    {
        username: "Jess"
    },
    {
        username: "Leela"
    },
]

const comments = [
    //each comment's fields: serial id, date-time posted, username, text, replying_to
    {
        //might not be necessary to supply IDs here if I can supply a SERIAL column later
        id: 0,
        username: users[0].username,
        timestamp: new Date('December 19, 2015 23:15:30 UTC').toISOString(),
        text: "I agree! This movie was heartwarming, perfect for the holidays",
        replying_to: REPLY_TO_ROOT //top level comments aren't "replying": INTEGER data type
    },
    {
        id: 1,
        username: users[1].username,
        timestamp: new Date('December 19, 2015 23:18:25 UTC').toISOString(),
        text: `I don't know, ${users[0].username}, I prefer to spend my time off watching good movies. You should value yours as well.`,
        replying_to: 0 //can do equality checks against comment ID
    },
    {
        id: 2,
        username: users[2].username,
        timestamp: new Date('December 20, 2015 00:05:10 UTC').toISOString(),
        text: "Good review. But I still think the source material was better.",
        replying_to: REPLY_TO_ROOT //top level comments aren't "replying": INTEGER data type
    },
    {
        id: 3,
        username: users[2].username,
        timestamp: new Date('December 20, 2015 00:05:55 UTC').toISOString(),
        text: "Sounds like you need to spend some time off from the computer.",
        replying_to: 1
    },
    {
        id: 4,
        username: users[3].username,
        timestamp: new Date('December 20, 2015 01:15:30 UTC').toISOString(),
        text: "If you want to live life like the movie stars, sign up for my course on spamsite.net!",
        replying_to: REPLY_TO_ROOT //top level comments aren't "replying": INTEGER data type
    },
    {
        id: 5,
        username: users[4].username,
        timestamp: new Date('December 20, 2015 03:15:30 UTC').toISOString(),
        text: "This review site has really gone downhill...",
        replying_to: 4 
    },
    {
        id: 6,
        username: users[4].username,
        timestamp: new Date('December 20, 2015 03:33:40 UTC').toISOString(),
        text: "Hard disagree. The second half of the book dragged on way too much. And if people want to know about it so bad they should support the author and buy the book.",
        replying_to: 2 //top level comments aren't "replying": INTEGER data type
    },
    {
        //might not be necessary to supply IDs here if I can supply a SERIAL column later
        id: 7,
        username: users[2].username,
        timestamp: new Date('December 20, 2015 07:15:10 UTC').toISOString(),
        text: "It's exactly that kind of thinking I hoped this movie would change. Maybe in the hands of another director, it could have. Reviewers have to pick up on that sort of thing.",
        replying_to: 6 //top level comments aren't "replying": INTEGER data type
    },
    {
        //might not be necessary to supply IDs here if I can supply a SERIAL column later
        id: 8,
        username: users[1].username,
        timestamp: new Date('December 20, 2015 09:35:45 UTC').toISOString(),
        text: "I tried using the site, but it seems to be broken? Please advise. I'm always looking for new opportunities.",
        replying_to: 4 //top level comments aren't "replying": INTEGER data type
    },
    {
        //might not be necessary to supply IDs here if I can supply a SERIAL column later
        id: 9,
        username: users[0].username,
        timestamp: new Date('December 25, 2015 08:15:30 UTC').toISOString(),
        text: "Merry Christmas everyone!!!",
        replying_to: REPLY_TO_ROOT //top level comments aren't "replying": INTEGER data type
    },
]

module.exports = {users, comments};