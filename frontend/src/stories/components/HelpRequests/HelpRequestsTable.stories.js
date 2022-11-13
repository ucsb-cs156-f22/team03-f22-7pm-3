import React from 'react';

import HelpRequestsTable from "main/components/HelpRequests/HelpRequestsTable";
import { helpRequestsFixtures } from 'fixtures/helpRequestsFixtures';
import { currentUserFixtures } from 'fixtures/currentUserFixtures';

export default {
    title: 'components/HelpRequests/HelpRequestsTable',
    component: HelpRequestsTable
};

const Template = (args) => {
    return (
        <HelpRequestsTable {...args} />
    )
};

export const Empty = Template.bind({});

Empty.args = {
    requests: []
};

export const ThreeRequests = Template.bind({});

ThreeRequests.args = {
    requests: helpRequestsFixtures.threeRequests
};

export const ThreeRequestsAsAdmin = Template.bind({});

ThreeRequestsAsAdmin.args = {
    requests: helpRequestsFixtures.threeRequests,
    currentUser: currentUserFixtures.adminUser
};



