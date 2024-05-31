import { render, screen, waitFor } from "@testing-library/react";
import ArticlesFavorite from "@/app/(main)/articles/favorite/page";

describe("FavoritePage", () => {
    it("should render properly", async () => {
        render(<ArticlesFavorite />);

        await waitFor(() => {
            const spanElement = screen.getByText("ArticlesFavorite page");
            expect(spanElement).toBeInTheDocument();
        });
    });
});
