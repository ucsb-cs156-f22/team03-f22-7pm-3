import React from 'react';

import MenuItemReviewsTable from "main/components/MenuItemReviews/MenuItemReviewsTable";
import { menuItemReviewsFixtures } from 'fixtures/menuItemReviewsFixtures';
import { currentUserFixtures } from 'fixtures/currentUserFixtures';

export default {
    title: 'components/MenuItemReviews/MenuItemReviewsTable',
    component: MenuItemReviewsTable
};

const Template = (args) => {
    return (
        <MenuItemReviewsTable {...args} />
    )
};

export const Empty = Template.bind({});

Empty.args = {
    menuItemReviews: []
};

export const threeReviews = Template.bind({});

threeReviews.args = {
    menuItemReviews: menuItemReviewsFixtures.threeReviews
};

export const threeReviewsAsAdmin = Template.bind({});

threeReviewsAsAdmin.args = {
    menuItemReviews: menuItemReviewsFixtures.threeReviews,
    currentUser: currentUserFixtures.adminUser
};
