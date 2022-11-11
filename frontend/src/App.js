import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "main/pages/HomePage";
import ProfilePage from "main/pages/ProfilePage";
import AdminUsersPage from "main/pages/AdminUsersPage";

import TodosIndexPage from "main/pages/Todos/TodosIndexPage";
import TodosCreatePage from "main/pages/Todos/TodosCreatePage";
import TodosEditPage from "main/pages/Todos/TodosEditPage";

import DiningCommonsIndexPage from "main/pages/DiningCommons/DiningCommonsIndexPage";
import DiningCommonsCreatePage from "main/pages/DiningCommons/DiningCommonsCreatePage";
import DiningCommonsEditPage from "main/pages/DiningCommons/DiningCommonsEditPage";

import OrganizationIndexPage from "main/pages/UCSBOrganization/UCSBOrganizationIndexPage";

import UCSBDatesIndexPage from "main/pages/UCSBDates/UCSBDatesIndexPage";
import UCSBDatesCreatePage from "main/pages/UCSBDates/UCSBDatesCreatePage";
import UCSBDatesEditPage from "main/pages/UCSBDates/UCSBDatesEditPage";

import RecommendationIndexPage from "main/pages/Recommendations/RecommendationsIndexPage";
import HelpRequsestsIndexPage from "main/pages/HelpRequests/HelpRequestsIndexPage";

/* import RecommendationIndexPage from "main/pages/UCSBDates/UCSBDatesIndexPage"; */
/* import RecommendationCreatePage from "main/pages/UCSBDates/UCSBDatesCreatePage"; */
/* import RecommendationEditPage from "main/pages/UCSBDates/UCSBDatesEditPage"; */


import MenuItemReviewsIndexPage from "main/pages/MenuItemReviews/MenuItemReviewsIndexPage";


import { hasRole, useCurrentUser } from "main/utils/currentUser";

import "bootstrap/dist/css/bootstrap.css";


function App() {

  const { data: currentUser } = useCurrentUser();

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/profile" element={<ProfilePage />} />
        {
          hasRole(currentUser, "ROLE_ADMIN") && <Route exact path="/admin/users" element={<AdminUsersPage />} />
        }
        {
          hasRole(currentUser, "ROLE_USER") && (
            <>
              <Route exact path="/todos/list" element={<TodosIndexPage />} />
              <Route exact path="/todos/create" element={<TodosCreatePage />} />
              <Route exact path="/todos/edit/:todoId" element={<TodosEditPage />} />
            </>
          )
        }
        {
          hasRole(currentUser, "ROLE_USER") && (
            <>
              <Route exact path="/diningCommons/list" element={<DiningCommonsIndexPage />} />
            </>
          )
        }
        {
          hasRole(currentUser, "ROLE_USER") && (
            <>
              <Route exact path="/UCSBOrganization/list" element={<OrganizationIndexPage />} />
            </>
          )
        }
        {
          hasRole(currentUser, "ROLE_ADMIN") && (
            <>
              <Route exact path="/diningCommons/create" element={<DiningCommonsCreatePage />} />
              <Route exact path="/diningCommons/edit/:code" element={<DiningCommonsEditPage />} />
            </>
          )
        }
        {
          hasRole(currentUser, "ROLE_USER") && (
            <>
              <Route exact path="/ucsbdates/list" element={<UCSBDatesIndexPage />} />
            </>
          )
        }
        {
          hasRole(currentUser, "ROLE_ADMIN") && (
            <>
              <Route exact path="/ucsbdates/create" element={<UCSBDatesCreatePage />} />
              <Route exact path="/ucsbdates/edit/:id" element={<UCSBDatesEditPage />} />
            </>
          )
        }
		{/* Creating pages for recommendation */}
        {
          hasRole(currentUser, "ROLE_USER") && (
            <>
              <Route exact path="/recommendations/list" element={<RecommendationIndexPage/>} />
            </>
          )
        }
        {
          hasRole(currentUser, "ROLE_USER") && (
            <>
              <Route exact path="/helprequests/list" element={<HelpRequsestsIndexPage />} />
            </>
          )
        }
        {
          hasRole(currentUser, "ROLE_USER") && (
            <>
              <Route exact path="/MenuItemReview/list" element={<MenuItemReviewsIndexPage />} />
            </>
          )
        }

      </Routes>
    </BrowserRouter>
  );
}

export default App;