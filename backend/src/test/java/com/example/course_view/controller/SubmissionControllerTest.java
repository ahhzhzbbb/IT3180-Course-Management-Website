package com.example.course_view.controller;

import com.example.course_view.payload.dto.SubmissionDTO;
import com.example.course_view.services.SubmissionService;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(SubmissionController.class)
@org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc(addFilters = false)
class SubmissionControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private SubmissionService submissionService;

    // Mock JwtUtils and UserDetailsService to avoid loading full security beans in @WebMvcTest slice
    @MockBean
    private com.example.course_view.security.jwt.JwtUtils jwtUtils;

    @MockBean
    private com.example.course_view.security.services.UserDetailsServiceImpl userDetailsService;

    @Test
    @WithMockUser(roles = "INSTRUCTOR")
    void gradeSubmission_asInstructor_returnsOk() throws Exception {
        SubmissionDTO dto = new SubmissionDTO();
        dto.setId(1L);
        dto.setScore(85);

        Mockito.when(submissionService.gradeSubmission(eq(1L), eq(85))).thenReturn(dto);

        mockMvc.perform(put("/api/submission/1/85").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.score").value(85));
    }

    @Test
    @WithMockUser(username = "student1", roles = "USER")
    void getMySubmission_whenNone_returnsNoContent() throws Exception {
        Mockito.when(submissionService.getSubmissionByExerciseAndUsername(eq(2L), eq("student1"))).thenReturn(null);

        mockMvc.perform(org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get("/api/submissions/my?exerciseId=2").principal((java.security.Principal) () -> "student1"))
                .andExpect(status().isNoContent());
    }

    @Test
    void getSubmissions_returnsUsernames() throws Exception {
        SubmissionDTO dto = new SubmissionDTO();
        dto.setId(7L);
        dto.setSolution("sol");
        dto.setScore(70);
        dto.setUserUsername("student1");

        Mockito.when(submissionService.getSubmissionsByExercise(eq(2L))).thenReturn(new com.example.course_view.payload.response.SubmissionResponse(java.util.List.of(dto)));

        mockMvc.perform(org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get("/api/submissions?exerciseId=2"))
                .andExpect(status().isOk())
                .andExpect(org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath("$.submissions[0].userUsername").value("student1"));
    }

    @Test
    @WithMockUser(username = "student1", roles = "USER")
    void getMySubmission_whenExists_returnsSubmission() throws Exception {
        SubmissionDTO dto = new SubmissionDTO();
        dto.setId(5L);
        dto.setSolution("My solution");
        dto.setScore(90);
        dto.setUserUsername("student1");

        Mockito.when(submissionService.getSubmissionByExerciseAndUsername(eq(3L), eq("student1"))).thenReturn(dto);

        mockMvc.perform(org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get("/api/submissions/my?exerciseId=3").principal((java.security.Principal) () -> "student1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(5))
                .andExpect(jsonPath("$.score").value(90))
                .andExpect(jsonPath("$.solution").value("My solution"));
    }
}
