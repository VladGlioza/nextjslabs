import { getPost } from "@/utils/Article/article";
import { Suspense } from "react";

export default async function ArticlesFavorite() {
    const post1 = await getPost(1)
    const post2 = await getPost(4)
    const post3 = await getPost(7)

    return (
      <div>
        ArticlesFavorite page
      </div>
    );
  }
  