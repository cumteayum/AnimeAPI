import BookmarkComponent from '../components/Bookmark';
import {getAllBookmarks} from '../lib/firebaseHelpers';

export default function bookmarks() {
  return (
    <div>
      <BookmarkComponent />
    </div>
  );
}

export async function getStaticProps() {
  return {
    props: {
    },
  };
}
