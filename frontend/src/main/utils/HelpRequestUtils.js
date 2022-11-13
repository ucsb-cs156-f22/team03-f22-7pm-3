export function cellToAxiosParamsDelete(cell) {
    return {
        url: "/api/HelpRequest",
        method: "DELETE",
        params: {
            id: cell.row.values.id
        }
    }
}