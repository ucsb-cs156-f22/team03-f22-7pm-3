import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

function DiningCommonsMenuItemForm({ initialCommonsMenuItem, submitAction, buttonLabel = "Create" }) {

    // Stryker disable all
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm(
        { defaultValues: initialCommonsMenuItem || {} }
    );
    // Stryker enable all

    const navigate = useNavigate();

    //const minLat = 0;
    //const minLong = -180.0;
    //const maxLong = 180.0;

    return (

        <Form onSubmit={handleSubmit(submitAction)}>

            {initialCommonsMenuItem && (
                <Form.Group className="mb-3" >
                    <Form.Label htmlFor="id">Id</Form.Label>
                    <Form.Control
                        data-testid="DiningCommonsMenuItemForm-id"
                        id="id"
                        type="number"
                        step="1"
                        precision={0}
                        {...register("id")}
                        value={initialCommonsMenuItem.id}
                        disabled
                    />
                </Form.Group>
            )}

            <Form.Group className="mb-3" >
                <Form.Label htmlFor="diningCommonsCode">DiningCommonsCode</Form.Label>
                <Form.Control
                    data-testid="DiningCommonsMenuItemForm-diningCommonsCode"
                    id="diningCommonsCode"
                    type="text"
                    isInvalid={Boolean(errors.diningCommonsCode)}
                    {...register("diningCommonsCode", {
                        required: "DiningCommonsCode is required."
                    })}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.diningCommonsCode?.message}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label htmlFor="name">Name Of Dish</Form.Label>
                <Form.Control
                    data-testid="DiningCommonsMenuItemForm-name"
                    id="name"
                    type="text"
                    isInvalid={Boolean(errors.name)}
                    {...register("name", {
                        required: "Name of menu item is required."
                    })}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.name?.message}
                </Form.Control.Feedback>
            </Form.Group>

        <Form.Group className="mb-3" >
                <Form.Label htmlFor="station">Station Served At</Form.Label>
                <Form.Control
                    data-testid="DiningCommonsMenuItemForm-station"
                    id="station"
                    type="text"
                    isInvalid={Boolean(errors.station)}
                    {...register("station", {
                        required: "Station is required."
                    })}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.station?.message}
                </Form.Control.Feedback>
            </Form.Group>

            <Button
                type="submit"
                data-testid="DiningCommonsMenuItemForm-submit"
            >
                {buttonLabel}
            </Button>
            <Button
                variant="Secondary"
                onClick={() => navigate(-1)}
                data-testid="DiningCommonsMenuItemForm-cancel"
            >
                Cancel
            </Button>

        </Form>

    )
}

export default DiningCommonsMenuItemForm;
