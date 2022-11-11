import OurTable, { ButtonColumn} from "main/components/OurTable";
import { useBackendMutation } from "main/utils/useBackend";
import {  onDeleteSuccess } from "main/utils/UCSBDateUtils"
import { useNavigate } from "react-router-dom";
import { hasRole } from "main/utils/currentUser";

export function cellToAxiosParamsDelete(cell) {
    return {
        url: "/api/UCSBOrganization",
        method: "DELETE",
        params: {
            code: cell.row.values.code
        }
    }
}

export default function UCSBOrganizationTable({ UCSBOrganizations, currentUser }) {

    const navigate = useNavigate();

    const editCallback = (cell) => {
        navigate(`/UCSBOrganization/edit/${cell.row.values.code}`)
    }

    // Stryker disable all : hard to test for query caching
    const deleteMutation = useBackendMutation(
        cellToAxiosParamsDelete,
        { onSuccess: onDeleteSuccess },
        ["/api/UCSBOrganization/all"]
    );
    // Stryker enable all 

    // Stryker disable next-line all : TODO try to make a good test for this
    const deleteCallback = async (cell) => { deleteMutation.mutate(cell); }

    const columns = [
        {
            Header: 'Organization Code',
            accessor: 'orgCode', 
        },
        {
            Header: 'Short Name',
            accessor: 'orgTranslationShort',
        },
        {
            Header: 'Full Name',
            accessor: 'orgTranslation', // needed for tests
        },
        {
            Header: 'Inactive?',
            id: 'inactive', // needed for tests
            accessor: (row, _rowIndex) => String(row.inactive) // hack needed for boolean values to show up

        }
    ];

    const testid = "UCSBOrganizationTable";

    const columnsIfAdmin = [
        ...columns,
        ButtonColumn("Edit", "primary", editCallback, testid),
        ButtonColumn("Delete", "danger", deleteCallback, testid)
    ];

    const columnsToDisplay = hasRole(currentUser, "ROLE_ADMIN") ? columnsIfAdmin : columns;

    return <OurTable
        data={UCSBOrganizations}
        columns={columnsToDisplay}
        testid={testid}
    />;
};