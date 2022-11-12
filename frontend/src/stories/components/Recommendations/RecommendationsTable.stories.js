import React from 'react';

import RecommendationTable from "main/components/Recommendations/RecommendationsTable";
import { recommendationsFixtures } from 'fixtures/recommendationsFixtures';
import { currentUserFixtures } from 'fixtures/currentUserFixtures';

export default {
    title: 'components/Recommendations/RecommendationsTable',
    component: RecommendationTable
};

const Template = (args) => {
    return (
        <RecommendationTable {...args} />
    )
};

export const Empty = Template.bind({});

Empty.args = {
    recommendations: []
};

export const ThreeRecommendations = Template.bind({});

ThreeRecommendations.args = {
    recommendations: recommendationsFixtures.threeRecommendations
};

export const ThreeRecommendationsAsAdmin = Template.bind({});

ThreeRecommendationsAsAdmin.args = {
    recommendations: recommendationsFixtures.threeRecommendations,
    currentUser: currentUserFixtures.adminUser
};

