import React from 'react';

import UCSBOrganizationTable from "main/components/UCSBOrganization/UCSBOrganizationTable";
import { ucsbOrganizationFixtures } from 'fixtures/ucsbOrganizationFixtures';
import { currentUserFixtures } from 'fixtures/currentUserFixtures';

export default {
    title: 'components/UCSBOrganization/UCSBOrganizationTable',
    component: UCSBOrganizationTable
};

const Template = (args) => {
    return (
        <UCSBOrganizationTable {...args} />
    )
};

export const Empty = Template.bind({});

Empty.args = {
    UCSBOrganizations: []
};

export const ThreeOrganizations = Template.bind({});

ThreeOrganizations.args = {
    UCSBOrganizations: ucsbOrganizationFixtures.threeOrganizations
};

export const ThreeOrganzationsAsAdmin = Template.bind({});

ThreeOrganzationsAsAdmin.args = {
    UCSBOrganizations: ucsbOrganizationFixtures.threeOrganizations,
    currentUser: currentUserFixtures.adminUser
};

