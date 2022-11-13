import { cellToAxiosParamsDelete } from "main/utils/HelpRequestUtils";

const mockToast = jest.fn();
jest.mock('react-toastify', () => {
    const originalModule = jest.requireActual('react-toastify');
    return {
        __esModule: true,
        ...originalModule,
        toast: (x) => mockToast(x)
    };
});

describe("HelpRequestUtils", () => {
    describe("cellToAxiosParamsDelete", () => {

        test("It returns the correct params", () => {
            // arrange
            const cell = { row: { values: { id: 17 } } };

            // act
            const result = cellToAxiosParamsDelete(cell);

            // assert
            expect(result).toEqual({
                url: "/api/HelpRequest",
                method: "DELETE",
                params: { id: 17 }
            });
        });

    });
});