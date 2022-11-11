import { toast } from "react-toastify";

export function onDeleteSuccess(message) {
    console.log(message);
    toast(message);
}

// Stryker disable all : TODO reenable when delete is implemented
export function cellToAxiosParamsDelete(cell) {
    return {
        url: "/api/Article",
        method: "DELETE",
        params: {
            id: cell.row.values.id
        }
    }
}
// Stryker enable all

