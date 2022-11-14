import { render, waitFor, fireEvent } from "@testing-library/react";
import DiningCommonsMenuItemCreatePage from "main/pages/DiningCommonsMenuItem/DiningCommonsMenuItemCreatePage";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";

import { apiCurrentUserFixtures }  from "fixtures/currentUserFixtures";
import { systemInfoFixtures } from "fixtures/systemInfoFixtures";
import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";


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
        Navigate: (x) => { mockNavigate(x); return null; }
    };
});


describe("DiningCommonsMenuItemCreatePage tests", () => {

    const axiosMock =new AxiosMockAdapter(axios);

    beforeEach(() => {
        axiosMock.reset();
        axiosMock.resetHistory();
        axiosMock.onGet("/api/currentUser").reply(200, apiCurrentUserFixtures.userOnly);
        axiosMock.onGet("/api/systemInfo").reply(200, systemInfoFixtures.showingNeither);
    });

    test("renders without crashing", () => {
        const queryClient = new QueryClient();
        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <DiningCommonsMenuItemCreatePage />
                </MemoryRouter>
            </QueryClientProvider>
        );
    });

    test("when you fill in the form and hit submit, it makes a request to the backend", async () => {

        const queryClient = new QueryClient();

        const commons = {
            id: 18,
            "diningCommonsCode": "ortega",
            "name": "Noodles",
            "station": "Noodle Shop",
          };
        
    
        axiosMock.onPost("/api/UCSBDiningCommonsMenuItem/post").reply( 202, commons );

        const { getByTestId } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <DiningCommonsMenuItemCreatePage />
                </MemoryRouter>
            </QueryClientProvider>
        );

        await waitFor(() => {
            expect(getByTestId("DiningCommonsMenuItemForm-diningCommonsCode")).toBeInTheDocument();
        });

        const diningCommonsCodeField = getByTestId("DiningCommonsMenuItemForm-diningCommonsCode");
        const nameField = getByTestId("DiningCommonsMenuItemForm-name");
        const stationField = getByTestId("DiningCommonsMenuItemForm-station");


        const submitButton = getByTestId("DiningCommonsMenuItemForm-submit");

        fireEvent.change(diningCommonsCodeField, { target: { value: 'Ortega' } });
        fireEvent.change(nameField, { target: { value: 'Instant Noodles' } });
        fireEvent.change(stationField, { target: { value: 'Counters' } });

        expect(submitButton).toBeInTheDocument();

        fireEvent.click(submitButton);

        await waitFor(() => expect(axiosMock.history.post.length).toBe(1));

        expect(axiosMock.history.post[0].params).toEqual({
            "diningCommonsCode": "Ortega",
            "name": "Instant Noodles",
            "station": 'Counters'
        });

        expect(mockToast).toBeCalledWith("New Dining Commons Menu Item Created - id: 18 name: Noodles");
        expect(mockNavigate).toBeCalledWith({ "to": "/UCSBDiningCommonsMenuItem/list" });
    });


});


