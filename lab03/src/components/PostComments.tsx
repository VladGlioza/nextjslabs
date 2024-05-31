import styles from "@/styles/Articles.module.css"
import { PostComment } from "@/types/Articles"

export const ArticleComments = ({postComments} : {postComments: PostComment[]}) => {
    return(
        <div className={styles.comments_container}>
            <span className="font-semibold">Comments:</span>
            {postComments.map((comment) => {
                return(
                    <div key={comment.id} className={styles.comment}>
                        <span>Name: {comment.name}</span>
                        <span>Email: {comment.email}</span>
                        <span>{comment.body}</span>
                    </div>
                )
            })}
        </div>
    )
}