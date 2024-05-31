import { getPost } from "@/utils/Article/article";
import { Suspense } from "react";
import FavoriteArticle from "@/components/FavoriteArticle";

export default async function ArticlesFavorite() {
    return (
        <div>
            <Suspense fallback={<p>Loading post with id 1..</p>}>
                <FavoriteArticle articleId={1} />
            </Suspense>
            <Suspense fallback={<p>Loading post with id 4..</p>}>
                <FavoriteArticle articleId={4} />
            </Suspense>
            <Suspense fallback={<p>Loading post with id 7..</p>}>
                <FavoriteArticle articleId={7} />
            </Suspense>
        </div>
    );
}
