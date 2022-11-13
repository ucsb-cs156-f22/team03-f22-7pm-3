import OurTable, { ButtonColumn } from "main/components/OurTable";
import { useBackendMutation } from "main/utils/useBackend";
import {  onDeleteSuccess, cellToAxiosParamsDelete } from "main/utils/DiningCommonsMenuItemUtils"
import { useNavigate } from "react-router-dom";
import { hasRole } from "main/utils/currentUser";



export default function DiningCommonsMenuItemTable({ diningCommonsMenuItem, currentUser }) {

    const navigate = useNavigate();
    const editCallback = (cell) => {
        navigate(`/UCSBDiningCommonsMenuItem/edit/${cell.row.values.id}`)
    }

    // Stryker disable all : hard to test for query caching
    const deleteMutation = useBackendMutation(
        cellToAxiosParamsDelete,
        { onSuccess: onDeleteSuccess },
        ["/api/UCSBDiningCommonsMenuItem/all"]
    );
    // Stryker enable all 

    // // Stryker disable next-line all : TODO try to make a good test for this
    const deleteCallback = async (cell) => { deleteMutation.mutate(cell); }

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


    const testId = "DiningCommonsMenuItemTable"

    const columnsIfAdmin = [
        ...columns,
        ButtonColumn("Edit", "primary", editCallback, testId),
        ButtonColumn("Delete", "danger", deleteCallback, testId)
    ];

    const columnsToDisplay = hasRole(currentUser, "ROLE_ADMIN") ? columnsIfAdmin : columns;
    // const columnsToDisplay = columns;



    return <OurTable
        data={diningCommonsMenuItem}
        columns={columnsToDisplay}
        testid={testId}
    />;
};