import { PostItem } from "@/components/PostItem";
import { PostProps } from "@/types/Articles";
import styles from "@/styles/Articles.module.css"

async function getPosts(){
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts`);

  return response.json()
}

export default async function Articles() {
  const posts: PostProps[] = await getPosts();
  
  return (
      <div className={styles.container}>
        Articles page
        {posts.map((postData, idx) => {
          return(
            <PostItem key={idx} idx={idx+1} post={postData}/>
          )
        })}
      </div>
    );
}