import { render, waitFor, fireEvent } from "@testing-library/react";
import DiningCommonsMenuItemForm from "main/components/DiningCommonsMenuItem/DiningCommonsMenuItemForm";
import { diningCommonsMenuItemFixtures } from "fixtures/diningCommonsMenuItemFixtures";
import { BrowserRouter as Router } from "react-router-dom";

const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedNavigate
}));


describe("DiningCommonsMenuItemForm tests", () => {

    test("renders correctly ", async () => {

        const { getByText } = render(
            <Router  >
                <DiningCommonsMenuItemForm />
            </Router>
        );
        await waitFor(() => expect(getByText(/Name Of Dish/)).toBeInTheDocument());
        await waitFor(() => expect(getByText(/Create/)).toBeInTheDocument());
    });


    test("renders correctly when passing in a DiningCommonsMenuItem ", async () => {

        const { getByText, getByTestId } = render(
            <Router  >
                <DiningCommonsMenuItemForm initialDiningCommonsMenuItem={diningCommonsMenuItemFixtures.oneDiningCommonsMenuItem} />
            </Router>
        );
        await waitFor(() => expect(getByTestId(/DiningCommonsMenuItemForm-id/)).toBeInTheDocument());
        expect(getByText(/ID/)).toBeInTheDocument();
        expect(getByTestId(/DiningCommonsMenuItem-id/)).toHaveValue("1");
    });

    test("Correct Error messsages on missing input", async () => {

        const { getByTestId, getByText } = render(
            <Router  >
                <DiningCommonsMenuItemForm />
            </Router>
        );
        await waitFor(() => expect(getByTestId("DiningCommonsMenuItemForm-submit")).toBeInTheDocument());
        const submitButton = getByTestId("DiningCommonsMenuItemForm-submit");

        fireEvent.click(submitButton);

        await waitFor(() => expect(getByText(/DiningCommonsCode is required./)).toBeInTheDocument());
        expect(getByText(/Name of menu item is required./)).toBeInTheDocument();
        expect(getByText(/Station is required./)).toBeInTheDocument();

    });

    test("No Error messsages on good input", async () => {

        const mockSubmitAction = jest.fn();


        const { getByTestId, queryByText } = render(
            <Router  >
                <DiningCommonsMenuItemForm submitAction={mockSubmitAction} />
            </Router>
        );
        await waitFor(() => expect(getByTestId("DiningCommonsMenuItemForm-diningCommonsCode")).toBeInTheDocument());

        const quarterYYYYQField = getByTestId("DiningCommonsMenuItemForm-diningCommonsCode");
        const nameField = getByTestId("DiningCommonsMenuItemForm-name");
        const localDateTimeField = getByTestId("DiningCommonsMenuItemForm-station");
        const submitButton = getByTestId("UCSBDateForm-submit");

        fireEvent.change(quarterYYYYQField, { target: { value: 'ortega' } });
        fireEvent.change(nameField, { target: { value: 'French Fries' } });
        fireEvent.change(localDateTimeField, { target: { value: 'Buger Area' } });
        fireEvent.click(submitButton);

        await waitFor(() => expect(mockSubmitAction).toHaveBeenCalled());

        expect(queryByText(/DiningCommonsCode is required./)).not.toBeInTheDocument();
        expect(queryByText(/Station is required./)).not.toBeInTheDocument();

    });


    test("Test that navigate(-1) is called when Cancel is clicked", async () => {

        const { getByTestId } = render(
            <Router  >
                <UCSBDateForm />
            </Router>
        );
        await waitFor(() => expect(getByTestId("UCSBDateForm-cancel")).toBeInTheDocument());
        const cancelButton = getByTestId("UCSBDateForm-cancel");

        fireEvent.click(cancelButton);

        await waitFor(() => expect(mockedNavigate).toHaveBeenCalledWith(-1));

    });

});


