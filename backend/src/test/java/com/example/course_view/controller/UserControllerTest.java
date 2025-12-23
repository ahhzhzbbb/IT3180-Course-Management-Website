package com.example.course_view.controller;

import com.example.course_view.models.Role;
import com.example.course_view.models.User;
import com.example.course_view.payload.request.UserUpdateRequest;
import com.example.course_view.repositories.RoleRepository;
import com.example.course_view.repositories.UserRepository;
import com.example.course_view.security.services.UserDetailsImpl;
import com.example.course_view.services.UserService;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.TestingAuthenticationToken;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDate;
import java.util.HashSet;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(UserController.class)
@org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc(addFilters = false)
public class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserService userService;

    @Test
    public void updateCurrentUser_shouldNotAllowUsernameChange() throws Exception {
        User user = new User();
        user.setUserId(10L);
        user.setUsername("orig");
        user.setName("Orig");

        UserDetailsImpl ud = UserDetailsImpl.build(user);
        TestingAuthenticationToken auth = new TestingAuthenticationToken(ud, null);

        String body = "{ \"username\": \"hacker\", \"name\": \"NewName\" }";

        mockMvc.perform(put("/api/users/me").contentType(MediaType.APPLICATION_JSON).content(body).with(org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.authentication(auth)))
                .andExpect(status().isCreated());

        ArgumentCaptor<UserUpdateRequest> captor = ArgumentCaptor.forClass(UserUpdateRequest.class);
        verify(userService, times(1)).updateUser(captor.capture(), eq(10L));

        UserUpdateRequest sent = captor.getValue();
        assertThat(sent.getUsername()).isNull();
        assertThat(sent.getName()).isEqualTo("NewName");
    }



}
