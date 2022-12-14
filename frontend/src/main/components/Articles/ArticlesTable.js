import OurTable, { ButtonColumn } from "main/components/OurTable";
import { useBackendMutation } from "main/utils/useBackend";
import { cellToAxiosParamsDelete, onDeleteSuccess } from "main/utils/ArticleUtils"
// import { useNavigate } from "react-router-dom";
import { hasRole } from "main/utils/currentUser";

export default function ArticlesTable({ articles, currentUser }) {

    const testid = "ArticlesTable";

    // const navigate = useNavigate();

    // const editCallback = (cell) => {
    //     navigate(`/articles/edit/${cell.row.values.id}`)
    // }

    // Stryker disable all : hard to test for query caching
    const deleteMutation = useBackendMutation(
        cellToAxiosParamsDelete,
        { onSuccess: onDeleteSuccess },
        ["/api/Article/all"]
    );
    // Stryker enable all

    // Stryker disable next-line all : TODO try to make a good test for this
    const deleteCallback = async (cell) => { deleteMutation.mutate(cell); }

    const columns = [
        {
            Header: 'ID',
            accessor: 'id',
        },
        {
            Header: 'Title',
            accessor: 'title',
        },
        {
            Header: 'URL',
            accessor: 'url',
        },
        {
            Header: 'Email',
            accessor: 'email',
        },
        {
            Header: 'Explanation',
            accessor: 'explanation',
        },
        {
            Header: 'Date Added',
            accessor: 'dateAdded',
        }
    ];

    const columnsIfAdmin = [
        ...columns,
        // ButtonColumn("Edit", "primary", editCallback, "ArticlesTable"),
        ButtonColumn("Delete", "danger", deleteCallback, "ArticlesTable")
    ];

    const columnsToDisplay = hasRole(currentUser, "ROLE_ADMIN") ? columnsIfAdmin : columns;

    return <OurTable
        data={articles}
        columns={columnsToDisplay}
        testid={testid}
    />;
};
