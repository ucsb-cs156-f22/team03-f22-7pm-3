import { fireEvent, render, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import DiningCommonsMenuItemEditPage from "main/pages/DiningCommonsMenuItem/DiningCommonsMenuItemEditPage";

import { apiCurrentUserFixtures } from "fixtures/currentUserFixtures";
import { systemInfoFixtures } from "fixtures/systemInfoFixtures";
import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";

import mockConsole from "jest-mock-console";

const mockToast = jest.fn();
jest.mock('react-toastify', () => {
    const originalModule = jest.requireActual('react-toastify');
    return {
        __esModule: true,
        ...originalModule,
        toast: (x) => mockToast(x)
    };
});

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => {
    const originalModule = jest.requireActual('react-router-dom');
    return {
        __esModule: true,
        ...originalModule,
        useParams: () => ({
            id: 17
        }),
        Navigate: (x) => { mockNavigate(x); return null; }
    };
});

describe("DiningCommonsMenuItemEditPage tests", () => {

    describe("when the backend doesn't return a todo", () => {

        const axiosMock = new AxiosMockAdapter(axios);

        beforeEach(() => {
            axiosMock.reset();
            axiosMock.resetHistory();
            axiosMock.onGet("/api/currentUser").reply(200, apiCurrentUserFixtures.userOnly);
            axiosMock.onGet("/api/systemInfo").reply(200, systemInfoFixtures.showingNeither);
            axiosMock.onGet("/api/UCSBDiningCommonsMenuItem", { params: { id: 17 } }).timeout();
        });

        const queryClient = new QueryClient();
        test("renders header but table is not present", async () => {

            const restoreConsole = mockConsole();

            const {getByText, queryByTestId} = render(
                <QueryClientProvider client={queryClient}>
                    <MemoryRouter>
                        <DiningCommonsMenuItemEditPage />
                    </MemoryRouter>
                </QueryClientProvider>
            );
            await waitFor(() => expect(getByText("Edit Dining Commons Menu Item")).toBeInTheDocument());
            expect(queryByTestId("DiningCommonsMenuItem-name")).not.toBeInTheDocument();
            restoreConsole();
        });
    });

    describe("tests where backend is working normally", () => {

        const axiosMock = new AxiosMockAdapter(axios);

        beforeEach(() => {
            axiosMock.reset();
            axiosMock.resetHistory();
            axiosMock.onGet("/api/currentUser").reply(200, apiCurrentUserFixtures.userOnly);
            axiosMock.onGet("/api/systemInfo").reply(200, systemInfoFixtures.showingNeither);
            axiosMock.onGet("/api/UCSBDiningCommonsMenuItem", { params: { id: 17 } }).reply(200, {
                id: 17,
                diningCommonsCode: '20221',
                name: "Pi Day",
                station: "2022-03-14T15:00"
            });
            axiosMock.onPut('/api/UCSBDiningCommonsMenuItem').reply(200, {
                id: "17",
                diningCommonsCode: '20224',
                name: "Christmas Morning",
                station: "2022-12-25T08:00"
            });
        });

        const queryClient = new QueryClient();
        test("renders without crashing", () => {
            render(
                <QueryClientProvider client={queryClient}>
                    <MemoryRouter>
                        <DiningCommonsMenuItemEditPage />
                    </MemoryRouter>
                </QueryClientProvider>
            );
        });

        test("Is populated with the data provided", async () => {

            const { getByTestId } = render(
                <QueryClientProvider client={queryClient}>
                    <MemoryRouter>
                        <DiningCommonsMenuItemEditPage />
                    </MemoryRouter>
                </QueryClientProvider>
            );

            await waitFor(() => expect(getByTestId("DiningCommonsMenuItemForm-diningCommonsCode")).toBeInTheDocument());

            const idField = getByTestId("DiningCommonsMenuItemForm-id");
            const quarterYYYYQField = getByTestId("DiningCommonsMenuItemForm-diningCommonsCode");
            const nameField = getByTestId("DiningCommonsMenuItemForm-name");
            const localDateTimeField = getByTestId("DiningCommonsMenuItemForm-station");

            expect(idField).toHaveValue(17);
            expect(quarterYYYYQField).toHaveValue("20221");
            expect(nameField).toHaveValue("Pi Day");
            expect(localDateTimeField).toHaveValue("2022-03-14T15:00");
        });

        test("Changes when you click Update", async () => {



            const { getByTestId } = render(
                <QueryClientProvider client={queryClient}>
                    <MemoryRouter>
                        <DiningCommonsMenuItemEditPage />
                    </MemoryRouter>
                </QueryClientProvider>
            );

            await waitFor(() => expect(getByTestId("DiningCommonsMenuItemForm-diningCommonsCode")).toBeInTheDocument());

            const idField = getByTestId("DiningCommonsMenuItemForm-id");
            const quarterYYYYQField = getByTestId("DiningCommonsMenuItemForm-diningCommonsCode");
            const nameField = getByTestId("DiningCommonsMenuItemForm-name");
            const localDateTimeField = getByTestId("DiningCommonsMenuItemForm-station");
            const submitButton = getByTestId("DiningCommonsMenuItemForm-submit");

            expect(idField).toHaveValue(17);
            expect(quarterYYYYQField).toHaveValue("20221");
            expect(nameField).toHaveValue("Pi Day");
            expect(localDateTimeField).toHaveValue("2022-03-14T15:00");

            expect(submitButton).toBeInTheDocument();

            fireEvent.change(quarterYYYYQField, { target: { value: '20224' } })
            fireEvent.change(nameField, { target: { value: 'Christmas Morning' } })
            fireEvent.change(localDateTimeField, { target: { value: "2022-12-25T08:00" } })

            fireEvent.click(submitButton);

            await waitFor(() => expect(mockToast).toBeCalled);
            expect(mockToast).toBeCalledWith("DiningCommonsMenuItem Updated - id: 17 name: Christmas Morning");
            expect(mockNavigate).toBeCalledWith({ "to": "/UCSBDiningCommonsMenuItem/list" });

            expect(axiosMock.history.put.length).toBe(1); // times called
            expect(axiosMock.history.put[0].params).toEqual({ id: 17 });
            expect(axiosMock.history.put[0].data).toBe(JSON.stringify({
                diningCommonsCode: '20224',
                name: "Christmas Morning",
                station: "2022-12-25T08:00"
            })); // posted object

        });

       
    });
});


