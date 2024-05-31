import { PostProps } from "@/types/Articles";
import { getPost } from "@/utils/Article/article";

export default async function FavoriteArticle({
    articleId,
}: {
    articleId: number;
}) {
    let articleData: PostProps = await getPost(articleId);

    return (
        <div className="flex flex-col py-3 text-red-950">
            <span>ID: {articleData.id}</span>
            <span>Title: {articleData.title}</span>
            <span>Text: {articleData.body.slice(0, 50)}..</span>
        </div>
    );
}
