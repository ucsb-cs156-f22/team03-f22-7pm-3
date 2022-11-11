// import OurTable, { ButtonColumn} from "main/components/OurTable";
import OurTable from "main/components/OurTable"
// import { useBackendMutation } from "main/utils/useBackend";
// import {  onDeleteSuccess } from "main/utils/UCSBDateUtils"
// import { useNavigate } from "react-router-dom";
// import { hasRole } from "main/utils/currentUser";

// export function cellToAxiosParamsDelete(cell) {
//     return {
//         url: "/api/ucsbdiningcommons",
//         method: "DELETE",
//         params: {
//             code: cell.row.values.code
//         }
//     }
// }

// {
//   "diningCommonsCode": "string",
//   "id": 0,
//   "name": "string",
//   "station": "string"
// }
export default function DiningCommonsTable({ diningCommonsMenuItem, _currentUser }) {

    // const navigate = useNavigate();

    // const editCallback = (cell) => {
    //     navigate(`/diningCommons/edit/${cell.row.values.code}`)
    // }

    // // Stryker disable all : hard to test for query caching
    // const deleteMutation = useBackendMutation(
    //     cellToAxiosParamsDelete,
    //     { onSuccess: onDeleteSuccess },
    //     ["/api/ucsbdiningcommons/all"]
    // );
    // // Stryker enable all 

    // // Stryker disable next-line all : TODO try to make a good test for this
    // const deleteCallback = async (cell) => { deleteMutation.mutate(cell); }

    const columns = [
        {
            Header: 'ID',
            accessor: 'id',
        },
        {
            Header: 'Dining Commons Code',
            accessor: 'diningCommonsCode', 
        },
        {
            Header: 'Dish',
            accessor: 'name',
        },
        {
            Header: 'Station',
            accessor: 'station',
        }
    ];

    const testid = "DiningCommonsMenuItemTable";

    // const columnsIfAdmin = [
    //     ...columns,
    //     ButtonColumn("Edit", "primary", editCallback, testid),
    //     ButtonColumn("Delete", "danger", deleteCallback, testid)
    // ];

    // const columnsToDisplay = hasRole(currentUser, "ROLE_ADMIN") ? columnsIfAdmin : columns;
    const columnsToDisplay = columns;


    return <OurTable
        data={diningCommonsMenuItem}
        columns={columnsToDisplay}
        testid={testid}
    />;
};