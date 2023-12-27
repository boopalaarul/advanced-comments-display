import Image from 'next/image'
import CommentsSection from './ui-components/comments-section'

export default function Home() {
  return (
    //semantic tag, contains main feature of page
    <main>
      <CommentsSection />
    </main>
  )
}
