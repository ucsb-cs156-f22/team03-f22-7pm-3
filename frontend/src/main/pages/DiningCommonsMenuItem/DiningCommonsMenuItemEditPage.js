import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import { useParams } from "react-router-dom";
import DiningCommonsMenuItemForm from "main/components/DiningCommonsMenuItem/DiningCommonsMenuItemForm";
import { Navigate } from 'react-router-dom'
import { useBackend, useBackendMutation } from "main/utils/useBackend";
import { toast } from "react-toastify";

export default function DiningCommonsMenuItemEditPage() {
  let { id } = useParams();

  const { data: commonsMenuItem, _error, _status } =
    useBackend(
      // Stryker disable next-line all : don't test internal caching of React Query
      [`/api/UCSBDiningCommonsMenuItem?id=${id}`],
      {  // Stryker disable next-line all : GET is the default, so changing this to "" doesn't introduce a bug
        method: "GET",
        url: `/api/UCSBDiningCommonsMenuItem`,
        params: {
          id
        }
      }
    );


  const objectToAxiosPutParams = (commonsMenuItem) => ({
    url: "/api/UCSBDiningCommonsMenuItem",
    method: "PUT",
    params: {
      id: commonsMenuItem.id,
    },
    data: {
      diningCommonsCode: commonsMenuItem.diningCommonsCode,
      name: commonsMenuItem.name,
      station: commonsMenuItem.station,
    }
  });

  const onSuccess = (commonsMenuItem) => {
    toast(`DiningCommonsMenuItem Updated - id: ${commonsMenuItem.id} name: ${commonsMenuItem.name}`);
  }

  const mutation = useBackendMutation(
    objectToAxiosPutParams,
    { onSuccess },
    // Stryker disable next-line all : hard to set up test for caching
    [`/api/UCSBDiningCommonsMenuItem?id=${id}`]
  );

  const { isSuccess } = mutation

  const onSubmit = async (data) => {
    mutation.mutate(data);
  }

  if (isSuccess) {
    return <Navigate to="/UCSBDiningCommonsMenuItem/list" />
  }

  return (
    <BasicLayout>
      <div className="pt-2">
        <h1>Edit Dining Commons Menu Item</h1>
        {commonsMenuItem &&
          <DiningCommonsMenuItemForm initialCommonsMenuItem={commonsMenuItem} submitAction={onSubmit} buttonLabel="Update" />
        }
      </div>
    </BasicLayout>
  )
}

