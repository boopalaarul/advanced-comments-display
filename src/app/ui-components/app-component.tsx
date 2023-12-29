import CommentsSection from "./comments-section"
import CommentInput from "./comment-input"
import UserProfile from "./user-profile"
import { useState, useCallback } from "react"

export default function App() {
    /**
     * Active contexts: 
     * AuthorizeContext, "logged in" switch and "show" three different elements:
     * 1) the "submit comment" box 2) an "edit comment" button, but only for comments left
     * by the user who's logged in 3) a "remove comment" button, likewise only for comments
     * left by logged-in user
     * SubmitModeContext / SetSubmitModeContext, for regulating function of the input box
     * to avoid another two contexts, make a state variable and pass it down here
     */ 
    
    //const [updateMe,updateComments] = useState();
    //const forceUpdate = useCallback(() => updateComments({} as any), []);

    return (
      <main className="p-10 space-y-5">
        <CommentsSection />
        <section className="sticky bottom-0">
          <CommentInput />
          <UserProfile />
        </section>
      </main>
    )
  }
  