import {  render } from "@testing-library/react";
import { articlesFixtures } from "fixtures/articlesFixtures";
import ArticlesTable from "main/components/Articles/ArticlesTable";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import { currentUserFixtures } from "fixtures/currentUserFixtures";


const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedNavigate
}));

describe("ArticlesTable tests", () => {
    const queryClient = new QueryClient();


    test("renders without crashing for empty table with user not logged in", () => {
        const currentUser = null;

        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <ArticlesTable articles={[]} currentUser={currentUser} />
                </MemoryRouter>
            </QueryClientProvider>

        );
    });

    test("renders without crashing for empty table for ordinary user", () => {
        const currentUser = currentUserFixtures.userOnly;

        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <ArticlesTable articles={[]} currentUser={currentUser} />
                </MemoryRouter>
            </QueryClientProvider>

        );
    });

    test("renders without crashing for empty table for admin", () => {
        const currentUser = currentUserFixtures.adminUser;

        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <ArticlesTable articles={[]} currentUser={currentUser} />
                </MemoryRouter>
            </QueryClientProvider>

        );
    });

    test("Has the expected column headers and content for adminUser", () => {

        const currentUser = currentUserFixtures.adminUser;

        const { getByText, getByTestId } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <ArticlesTable articles={articlesFixtures.threeArticles} currentUser={currentUser} />
                </MemoryRouter>
            </QueryClientProvider>

        );


        const expectedHeaders = ['ID', 'Title', 'URL', 'Email', 'Explanation', 'Date Added'];
        const expectedFields = ['id', 'title', 'url', 'email', 'explanation', 'dateAdded'];
        const testId = "ArticlesTable";

        expectedHeaders.forEach((headerText) => {
            const header = getByText(headerText);
            expect(header).toBeInTheDocument();
        });

        expectedFields.forEach((field) => {
            const header = getByTestId(`${testId}-cell-row-0-col-${field}`);
            expect(header).toBeInTheDocument();
        });

        expect(getByTestId(`${testId}-cell-row-0-col-title`)).toHaveTextContent("Ol?? Finishes First in Woodstock's Pizza Contest");
        expect(getByTestId(`${testId}-cell-row-1-col-title`)).toHaveTextContent("Ol?? Steals Triton's Surfboard");
        expect(getByTestId(`${testId}-cell-row-2-col-title`)).toHaveTextContent("Ol?? Commits Tax Evasion");

        // const editButton = getByTestId(`${testId}-cell-row-0-col-Edit-button`);
        // expect(editButton).toBeInTheDocument();
        // expect(editButton).toHaveClass("btn-primary");

        const deleteButton = getByTestId(`${testId}-cell-row-0-col-Delete-button`);
        expect(deleteButton).toBeInTheDocument();
        expect(deleteButton).toHaveClass("btn-danger");

    });

    // test("Edit button navigates to the edit page for admin user", async () => {
    //
    //   const currentUser = currentUserFixtures.adminUser;
    //
    //   const { getByTestId } = render(
    //     <QueryClientProvider client={queryClient}>
    //       <MemoryRouter>
    //         <ArticlesTable articles={articlesFixtures.threeArticles} currentUser={currentUser} />
    //       </MemoryRouter>
    //     </QueryClientProvider>
    //
    //   );
    //
    //   await waitFor(() => { expect(getByTestId(`ArticlesTable-cell-row-0-col-id`)).toHaveTextContent("1"); });
    //
    //   const editButton = getByTestId(`ArticlesTable-cell-row-0-col-Edit-button`);
    //   expect(editButton).toBeInTheDocument();
    //
    //   fireEvent.click(editButton);
    //
    //   await waitFor(() => expect(mockedNavigate).toHaveBeenCalledWith('/articles/edit/1'));
    //
    // });


});

