package com.example.course_view.integration;

import com.example.course_view.models.User;
import com.example.course_view.models.VerificationToken;
import com.example.course_view.repositories.UserRepository;
import com.example.course_view.repositories.VerificationTokenRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.junit.jupiter.api.Disabled;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;


import org.springframework.http.MediaType;
import org.springframework.test.context.transaction.TestTransaction;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc(addFilters = false)
@Transactional
@Disabled("Verification feature removed")
public class VerificationIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private VerificationTokenRepository tokenRepository;

    @Test
    void requestAndConfirmPhoneUpdate_endToEnd() throws Exception {
        User user = new User();
        user.setUsername("intuser");
        user.setPassword("pass");
        user = userRepository.save(user);

        // Request verification
        String req = "{\"phoneNumber\": \"0999888777\"}";
        final String principalName = user.getUsername();
        String resp = mockMvc.perform(post("/api/users/me/verify/request").contentType(MediaType.APPLICATION_JSON).content(req)
                        .principal((java.security.Principal) () -> principalName))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.tokenId").exists())
                .andReturn().getResponse().getContentAsString();

        // parse tokenId
        com.fasterxml.jackson.databind.JsonNode node = new com.fasterxml.jackson.databind.ObjectMapper().readTree(resp);
        Long tokenId = node.get("tokenId").asLong();

        // Confirm using actual token from DB
        Optional<VerificationToken> tOpt = tokenRepository.findById(tokenId);
        assertThat(tOpt).isPresent();
        String realCode = tOpt.get().getCode();

        String confirm = "{\"tokenId\": \"" + tokenId + "\", \"code\": \"" + realCode + "\"}";
        mockMvc.perform(post("/api/users/me/verify/confirm").contentType(MediaType.APPLICATION_JSON).content(confirm))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.phoneNumber").value("0999888777"));
    }

    @Test
    void confirmWithBadCode_returnsError() throws Exception {
        User user = new User();
        user.setUsername("intuser2");
        user.setPassword("pass");
        user = userRepository.save(user);

        VerificationToken token = new VerificationToken();
        token.setUser(user);
        token.setCode("222222");
        token.setNewValue("000");
        token.setType("PHONE_UPDATE");
        token = tokenRepository.save(token);

        String wrongConfirm = "{\"tokenId\": \"" + token.getId() + "\", \"code\": \"999999\"}";
        mockMvc.perform(post("/api/users/me/verify/confirm").contentType(MediaType.APPLICATION_JSON).content(wrongConfirm))
                .andExpect(status().is5xxServerError());
    }
}
