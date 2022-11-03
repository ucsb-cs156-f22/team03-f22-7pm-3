package edu.ucsb.cs156.example.controllers;

import edu.ucsb.cs156.example.repositories.UserRepository;
import edu.ucsb.cs156.example.testconfig.TestConfig;
import edu.ucsb.cs156.example.ControllerTestCase;
import edu.ucsb.cs156.example.entities.UCSBDiningCommonsMenuItem;
import edu.ucsb.cs156.example.repositories.UCSBDiningCommonsMenuItemRepository;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Map;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MvcResult;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@WebMvcTest(controllers = UCSBDiningCommonsMenuItemController.class)
@Import(TestConfig.class)
public class UCSBDiningCommonsMenuItemControllerTests extends ControllerTestCase {

        @MockBean
        UCSBDiningCommonsMenuItemRepository ucsbDiningCommonsMenuItemRepository;

        @MockBean
        UserRepository userRepository;

        // Authorization tests for /api/ucsbdiningcommons/admin/all

        @Test
        public void logged_out_users_cannot_get_all() throws Exception {
                mockMvc.perform(get("/api/UCSBDiningCommonsMenuItem/all"))
                                .andExpect(status().is(403)); // logged out users can't get all
        }

        @WithMockUser(roles = { "USER" })
        @Test
        public void logged_in_users_can_get_all() throws Exception {
                mockMvc.perform(get("/api/UCSBDiningCommonsMenuItem/all"))
                                .andExpect(status().is(200)); // logged
        }
        /*
        @Test
        public void logged_out_users_cannot_get_by_id() throws Exception {
                mockMvc.perform(get("/api/UCSBDiningCommonsMenuItem?code=carrillo"))
                                .andExpect(status().is(403)); // logged out users can't get by id
        }
`       */
        // Authorization tests for /api/ucsbdiningcommons/post
        // (Perhaps should also have these for put and delete)

        @Test
        public void logged_out_users_cannot_post() throws Exception {
                mockMvc.perform(post("/api/UCSBDiningCommonsMenuItem/post"))
                                .andExpect(status().is(403));
        }

        @WithMockUser(roles = { "USER" })
        @Test
        public void logged_in_regular_users_cannot_post() throws Exception {
                mockMvc.perform(post("/api/UCSBDiningCommonsMenuItem/post"))
                                .andExpect(status().is(403)); // only admins can post
        }

        // Tests with mocks for database actions
        @WithMockUser(roles = { "USER" })
        @Test
        public void test_that_logged_in_user_can_get_by_id_when_the_id_exists() throws Exception {

                // arrange

                UCSBDiningCommonsMenuItem commons = UCSBDiningCommonsMenuItem.builder()
                                .diningCommonsCode("carrillo")
                                .id(12)
                                .name("Baked Pesto Pasta with Chicken")
                                .station("Entree Specials")
                                .build();

                when(ucsbDiningCommonsMenuItemRepository.findById(eq(12L))).thenReturn(Optional.of(commons));

                // act
                MvcResult response = mockMvc.perform(get("/api/UCSBDiningCommonsMenuItem?id=12"))
                                .andExpect(status().isOk()).andReturn();

                // assert


                verify(ucsbDiningCommonsMenuItemRepository, times(1)).findById(eq(12L));
                String expectedJson = mapper.writeValueAsString(commons);
                String responseString = response.getResponse().getContentAsString();
                assertEquals(expectedJson, responseString);
        }
        @WithMockUser(roles = { "USER" })
        @Test
        public void test_that_logged_in_user_can_get_by_id_when_the_id_does_not_exist() throws Exception {

                // arrange


                when(ucsbDiningCommonsMenuItemRepository.findById(eq(123L))).thenReturn(Optional.empty());

                // act
                MvcResult response = mockMvc.perform(get("/api/UCSBDiningCommonsMenuItem?id=123")).andExpect(status().isNotFound()).andReturn();

                // assert
                verify(ucsbDiningCommonsMenuItemRepository, times(1)).findById(eq(123L));
                Map<String, Object> json = responseToJson(response);
                assertEquals("EntityNotFoundException", json.get("type"));
                assertEquals("UCSBDiningCommonsMenuItem with id 123 not found", json.get("message"));
        }

        @WithMockUser(roles = { "USER" })
        @Test
        public void logged_in_user_can_get_all_ucsbdiningcommons() throws Exception {

                // arrange

                UCSBDiningCommonsMenuItem carrillo = UCSBDiningCommonsMenuItem.builder()
                                .id(1)
                                .diningCommonsCode("carrillo")
                                .name("Baked Pesto Pasta with Chicken")
                                .station("Entree Specials")
                                .build();

                UCSBDiningCommonsMenuItem dlg = UCSBDiningCommonsMenuItem.builder()
                                .id(2)
                                .diningCommonsCode("de-la-guerra")
                                .name("Baked Pesto Pasta with Chicken")
                                .station("Entree Specials")
                                .build();

                ArrayList<UCSBDiningCommonsMenuItem> expectedCommons = new ArrayList<>();
                expectedCommons.addAll(Arrays.asList(carrillo, dlg));

                when(ucsbDiningCommonsMenuItemRepository.findAll()).thenReturn(expectedCommons);

                // act
                MvcResult response = mockMvc.perform(get("/api/UCSBDiningCommonsMenuItem/all"))
                                .andExpect(status().isOk()).andReturn();

                // assert

                verify(ucsbDiningCommonsMenuItemRepository, times(1)).findAll();
                String expectedJson = mapper.writeValueAsString(expectedCommons);
                String responseString = response.getResponse().getContentAsString();
                assertEquals(expectedJson, responseString);
        }
        
        @WithMockUser(roles = { "ADMIN", "USER" })
        @Test
        public void an_admin_user_can_post_a_new_commons() throws Exception {
                // arrange

                UCSBDiningCommonsMenuItem ortega = UCSBDiningCommonsMenuItem.builder()
                                .id(10)
                                .diningCommonsCode("ortega")
                                .name("Baked Pesto Pasta with Chicken")
                                .station("Entree Specials")
                                .build();

                when(ucsbDiningCommonsMenuItemRepository.save(eq(ortega))).thenReturn(ortega);

                // act
                MvcResult response = mockMvc.perform(
                                post("/api/UCSBDiningCommonsMenuItem/post?diningCommonsCode=ortega&id=10&name=Baked Pesto Pasta with Chicken&station=Entree Specials")
                                                .with(csrf()))
                                .andExpect(status().isOk()).andReturn();

                // assert
                verify(ucsbDiningCommonsMenuItemRepository, times(1)).save(ortega);
                String expectedJson = mapper.writeValueAsString(ortega);
                String responseString = response.getResponse().getContentAsString();
                assertEquals(expectedJson, responseString);
        }
        
        @WithMockUser(roles = { "ADMIN", "USER" })
        @Test
        public void admin_can_delete_a_date() throws Exception {
                // arrange

                UCSBDiningCommonsMenuItem portola = UCSBDiningCommonsMenuItem.builder()
                                .id(123L)
                                .diningCommonsCode("portola")
                                .name("Baked Pesto Pasta with Chicken")
                                .station("Entree Specials")
                                .build();


                when(ucsbDiningCommonsMenuItemRepository.findById(eq(123L))).thenReturn(Optional.of(portola));

                // act
                MvcResult response = mockMvc.perform(
                                delete("/api/UCSBDiningCommonsMenuItem?id=123").with(csrf())).andExpect(status().isOk()).andReturn();

                // assert
                verify(ucsbDiningCommonsMenuItemRepository, times(1)).findById(123L);
                verify(ucsbDiningCommonsMenuItemRepository, times(1)).delete(any());

                Map<String, Object> json = responseToJson(response);
                assertEquals("UCSBDiningCommonsMenuItem with id 123 deleted", json.get("message"));
        }
        
        
        @WithMockUser(roles = { "ADMIN", "USER" })
        @Test
        public void admin_tries_to_delete_non_existant_commons_and_gets_right_error_message()
                        throws Exception {
                // arrange


                when(ucsbDiningCommonsMenuItemRepository.findById(eq(123L))).thenReturn(Optional.empty());

                // act
                MvcResult response = mockMvc.perform(
                                delete("/api/UCSBDiningCommonsMenuItem?id=123").with(csrf())).andExpect(status().isNotFound()).andReturn();

                // assert
                verify(ucsbDiningCommonsMenuItemRepository, times(1)).findById(123L);
                Map<String, Object> json = responseToJson(response);
                assertEquals("UCSBDiningCommonsMenuItem with id 123 not found", json.get("message"));
        }
        
       
        @WithMockUser(roles = { "ADMIN", "USER" })
        @Test
        public void admin_can_edit_an_existing_commons() throws Exception {
                // arrange

                UCSBDiningCommonsMenuItem portolaOrig = UCSBDiningCommonsMenuItem.builder()
                                .id(123L)
                                .diningCommonsCode("portola")
                                .name("Baked Pesto Pasta with Chicken")
                                .station("Entree Specials")
                                .build();

                UCSBDiningCommonsMenuItem portolaEdited = UCSBDiningCommonsMenuItem.builder()
                                .id(123L)
                                .diningCommonsCode("portola dining hall")
                                .name("Baked Pesto and spinach Pasta with Chicken")
                                .station("Entree Normals")
                                .build();

                String requestBody = mapper.writeValueAsString(portolaEdited);


                when(ucsbDiningCommonsMenuItemRepository.findById(eq(123L))).thenReturn(Optional.of(portolaOrig));

                // act
                MvcResult response = mockMvc.perform(
                                put("/api/UCSBDiningCommonsMenuItem?id=123")
                                                .contentType(MediaType.APPLICATION_JSON)
                                                .characterEncoding("utf-8")
                                                .content(requestBody)
                                                .with(csrf()))
                                .andExpect(status().isOk()).andReturn();

                // assert
                verify(ucsbDiningCommonsMenuItemRepository, times(1)).findById(123L);
                verify(ucsbDiningCommonsMenuItemRepository, times(1)).save(portolaEdited); // should be saved with updated info
                String responseString = response.getResponse().getContentAsString();
                assertEquals(requestBody, responseString);
        }

        @WithMockUser(roles = { "ADMIN", "USER" })
        @Test
        public void admin_cannot_edit_commons_that_does_not_exist() throws Exception {
                // arrange

                UCSBDiningCommonsMenuItem editedFood = UCSBDiningCommonsMenuItem.builder()
                                .id(12L)
                                .diningCommonsCode("Portola?")
                                .name("Baked Pesto Pasta with Chicken")
                                .station("Entree Specials")
                                .build();

                String requestBody = mapper.writeValueAsString(editedFood);

                when(ucsbDiningCommonsMenuItemRepository.findById(eq(123L))).thenReturn(Optional.empty());

                // act
                MvcResult response = mockMvc.perform(
                                put("/api/UCSBDiningCommonsMenuItem?id=123")
                                                .contentType(MediaType.APPLICATION_JSON)
                                                .characterEncoding("utf-8")
                                                .content(requestBody)
                                                .with(csrf()))
                                .andExpect(status().isNotFound()).andReturn();

                // assert
                verify(ucsbDiningCommonsMenuItemRepository, times(1)).findById(123L);
                Map<String, Object> json = responseToJson(response);
                assertEquals("UCSBDiningCommonsMenuItem with id 123 not found", json.get("message"));

        }
}
