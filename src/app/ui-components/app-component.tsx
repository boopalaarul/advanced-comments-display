import CommentsSection from "./comments-section"
import CommentInput from "./comment-input"
import UserProfile from "./user-profile"

export default function App() {

    return (
      //so here's the issue: i kind of just want to useRef and then handle the login with
      //useEffect, so that I can flip a "logged in" switch and "show" three different elements:
      //1) the "submit comment" box (doesn't necessarily have to be a form, could also
      //useEffect) 2) an "edit comment" button, but only for comments left by the user who's
      //logged in 3) a "remove comment" button, likewise only for comments left by logged-in user
      //so 2) and 3) are dug deep into the DOM,... means that unless we prop-drill, the only
      //way to reach those is with Context.
      //so the next step should probably be to get a single Context that can
      //regulate all three of those elements: and then I can worry about making it so the
      //authentication connects with that Context (see the next-auth docs). Rather than 
      //gating access to a page, like in the tutorial example, what I want is to regulate the
      //state of a specific variable on that page... and in case of context not just "in" page
      //but "throughout" it, thanks to enclosure within Provider tag. 
      <main className="p-10 space-y-5">
        <CommentsSection />
        <CommentInput />
        <UserProfile />
      </main>
    )
  }
  