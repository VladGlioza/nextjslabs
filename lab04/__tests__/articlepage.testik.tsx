import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import ArticlePage from "@/app/(main)/articles/[id]/page";
import { getPost, getPostComments } from "@/utils/Article/article";
import { notFound } from "next/navigation";
import { PostProps, PostComment } from "@/types/Articles";

jest.mock("@/utils/Article/article", () => ({
    getPost: jest.fn(),
    getPostComments: jest.fn(),
}));

jest.mock("next/navigation", () => ({
    notFound: jest.fn(),
}));

describe("ArticlePage", () => {
    const post: PostProps = {
        id: 1,
        title: "Test Title",
        body: "Test Body",
        userId: 1,
    };

    const comments: PostComment[] = [
        {
            id: 1,
            name: "Alex Alexie",
            email: "Alex1@example.com",
            body: "Good",
            postId: 1,
        },
        {
            id: 2,
            name: "Dan Danovich",
            email: "jane@example.com",
            body: "Thanks for sharing!",
            postId: 1,
        },
    ];

    beforeEach(() => {
        (getPost as jest.Mock).mockResolvedValue(post);
        (getPostComments as jest.Mock).mockResolvedValue(comments);
    });

    it("renders post title and body", async () => {
        render(await ArticlePage({ params: { id: "1" } }));

        await waitFor(() => {
            expect(screen.getByText(post.title)).toBeInTheDocument();
            expect(screen.getByText(post.body)).toBeInTheDocument();
        });
    });

    it("renders post comments", async () => {
        render(await ArticlePage({ params: { id: "1" } }));

        await waitFor(() => {
            expect(screen.getByText("Comments:")).toBeInTheDocument();
            expect(
                screen.getByText(`Name: ${comments[0].name}`)
            ).toBeInTheDocument();
            expect(
                screen.getByText(`Email: ${comments[0].email}`)
            ).toBeInTheDocument();
            expect(screen.getByText(comments[0].body)).toBeInTheDocument();
            expect(
                screen.getByText(`Name: ${comments[1].name}`)
            ).toBeInTheDocument();
            expect(
                screen.getByText(`Email: ${comments[1].email}`)
            ).toBeInTheDocument();
            expect(screen.getByText(comments[1].body)).toBeInTheDocument();
        });
    });

    it("calls notFound when post is not found", async () => {
        (getPost as jest.Mock).mockResolvedValueOnce({});

        render(await ArticlePage({ params: { id: "1" } }));

        await waitFor(() => {
            expect(notFound).toHaveBeenCalled();
        });
    });
});
