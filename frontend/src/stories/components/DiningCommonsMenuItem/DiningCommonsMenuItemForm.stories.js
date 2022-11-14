import React from 'react';

import DiningCommonsMenuItemForm from "main/components/DiningCommonsMenuItem/DiningCommonsMenuItemForm"
import { diningCommonsMenuItemFixtures } from 'fixtures/diningCommonsMenuItemFixtures';

export default {
    title: 'components/DiningCommonsMenuItem/DiningCommonsMenuItemForm',
    component: DiningCommonsMenuItemForm
};


const Template = (args) => {
    return (
        <DiningCommonsMenuItemForm {...args} />
    )
};

export const Default = Template.bind({});

Default.args = {
    buttonLabel: "Create",
    submitAction: (data) => { console.log('Create was clicked, parameter to submitAction=',data); }
};

export const Show = Template.bind({});

Show.args = {
    initialCommons: diningCommonsMenuItemFixtures.oneDiningCommonsMenuItem,
    buttonLabel: "Update",
    submitAction: (data) => { console.log('Update was clicked, parameter to submitAction=',data); }
};
