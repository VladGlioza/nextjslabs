import { PostProps, PostComment } from "@/types/Articles";
import { notFound } from "next/navigation";
import styles from "@/styles/Articles.module.css"
import { ArticleComments } from "@/components/PostComments";
import { getPost, getPostComments } from "@/utils/Article/article";

type Props = {
    params: {
        id: string;
    };
}

export default async function ArticlePage(props: Props){
    const postId = props.params.id
    const postData : PostProps  = await getPost(postId)
    
    if(!postData.title){
        return notFound()
    }    

    const postComments: PostComment[] = await getPostComments(postId)

    return(
        <div className={styles.container}>
            <span className={styles.title}>
                {postData.title}
            </span>
            <span>
                {postData.body} 
            </span>
            <ArticleComments postComments={postComments}/>
        </div>
    )
}