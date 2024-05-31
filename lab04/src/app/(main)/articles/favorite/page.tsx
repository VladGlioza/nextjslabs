import { getPost } from "@/utils/Article/article";
import React, { useEffect, useState } from "react";

const ArticlesFavorite = () => {
    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const post1 = await getPost(1);
            const post2 = await getPost(4);
            const post3 = await getPost(7);
            setLoading(false);
        };

        fetchPosts();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <span>ArticlesFavorite page</span>
        </div>
    );
};

export default ArticlesFavorite;
