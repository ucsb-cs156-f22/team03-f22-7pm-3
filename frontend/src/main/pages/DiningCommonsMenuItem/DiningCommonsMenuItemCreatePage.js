import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import DiningCommonsMenuItemForm from "main/components/DiningCommonsMenuItem/DiningCommonsMenuItemForm";
import { Navigate } from 'react-router-dom'
import { useBackendMutation } from "main/utils/useBackend";
import { toast } from "react-toastify";

export default function DiningCommonsMenuItemCreatePage() {

  const objectToAxiosParams = (commonsMenuItem) => ({
    url: "/api/UCSBDiningCommonsMenuItem/post",
    method: "POST",
    params: {
      id: commonsMenuItem.id,
      diningCommonsCode: commonsMenuItem.diningCommonsCode,
      name: commonsMenuItem.name,
      station: commonsMenuItem.station,
    }
  });

  const onSuccess = (commonsMenuItem) => {
    toast(`New Dining Commons Menu Item Created - id: ${commonsMenuItem.id} name: ${commonsMenuItem.name}`);
  }

  const mutation = useBackendMutation(
    objectToAxiosParams,
    { onSuccess },
    // Stryker disable next-line all : hard to set up test for caching
    ["/api/UCSBDiningCommonsMenuItem/all"]
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
        <h1>Create New Dining Commons</h1>

        <DiningCommonsMenuItemForm submitAction={onSubmit} />

      </div>
    </BasicLayout>
  )
}