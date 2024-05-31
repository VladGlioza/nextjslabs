import styles from "@/styles/Articles.module.css"
import Link from "next/link";
import { PostProps } from "@/types/Articles";


export const PostItem = ({post, idx} : {post: PostProps, idx: number}) => {
    return(
        <Link href={`/articles/${post.id}`} className={styles.item}>
            <span className={styles.position}>{idx}.</span>
            <span>
                {post.title}
            </span>
        </Link>
    )
}