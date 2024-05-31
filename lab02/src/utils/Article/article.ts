export async function getPost(postId: string | number){
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);

    return response.json()
}

export async function getPostComments(postId: string){
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);

    return response.json()
}