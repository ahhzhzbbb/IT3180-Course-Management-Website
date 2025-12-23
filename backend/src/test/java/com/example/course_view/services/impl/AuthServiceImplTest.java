package com.example.course_view.services.impl;

import com.example.course_view.models.AppRole;
import com.example.course_view.models.Role;
import com.example.course_view.models.User;
import com.example.course_view.repositories.RoleRepository;
import com.example.course_view.repositories.UserRepository;
import com.example.course_view.security.jwt.JwtUtils;
import com.example.course_view.security.request.LoginRequest;
import com.example.course_view.security.request.SignupRequest;
import com.example.course_view.security.response.AuthenticationResult;
import com.example.course_view.security.response.MessageResponse;
import com.example.course_view.security.services.UserDetailsImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AuthServiceImplTest {

    @Mock private AuthenticationManager authenticationManager;
    @Mock private JwtUtils jwtUtils;
    @Mock private UserRepository userRepository;
    @Mock private RoleRepository roleRepository;
    @Mock private PasswordEncoder encoder;
    @Mock private ModelMapper modelMapper; // Not strictly used in auth logic but required by constructor

    @InjectMocks
    private AuthServiceImpl authService;

    private SignupRequest signupRequest;
    private LoginRequest loginRequest;

    @BeforeEach
    void setUp() {
        // Setup Signup Request
        signupRequest = new SignupRequest();
        signupRequest.setUsername("newuser");
        signupRequest.setPassword("password123");
        signupRequest.setName("John Doe");
        signupRequest.setRoles(Set.of("user"));

        // Setup Login Request
        loginRequest = new LoginRequest();
        loginRequest.setUsername("existinguser");
        loginRequest.setPassword("password123");
    }

    // --- REGISTER TESTS ---

    @Test
    void register_Success_CreatesUserWithEncodedPassword() {
        // Arrange
        when(userRepository.existsByUsername("newuser")).thenReturn(false);
        when(encoder.encode("password123")).thenReturn("encoded_hash_xyz");
        when(roleRepository.findByRoleName(AppRole.ROLE_USER)).thenReturn(Optional.of(new Role(AppRole.ROLE_USER)));
        when(userRepository.save(any(User.class))).thenAnswer(invocation -> invocation.getArgument(0));

        // Act
        ResponseEntity<MessageResponse> response = authService.register(signupRequest);

        // Assert
        assertEquals(200, response.getStatusCodeValue());
        assertEquals("User registered successfully!", response.getBody().getMessage());

        // CRITICAL: Verify password was encoded before saving
        verify(encoder).encode("password123");
        verify(userRepository).save(argThat(user ->
                user.getPassword().equals("encoded_hash_xyz") &&
                        user.getUsername().equals("newuser")
        ));
    }

    @Test
    void register_Fail_UsernameTaken() {
        // Arrange
        when(userRepository.existsByUsername("newuser")).thenReturn(true);

        // Act
        ResponseEntity<MessageResponse> response = authService.register(signupRequest);

        // Assert
        assertEquals(400, response.getStatusCodeValue());
        assertEquals("Error: Username is already taken!", response.getBody().getMessage());
        verify(userRepository, never()).save(any());
    }

    // --- LOGIN TESTS ---

    @Test
    void login_Success_ReturnsJwt() {
        // Arrange
        Authentication authentication = mock(Authentication.class);
        // Create UserDetailsImpl with empty authorities and null profile fields
        UserDetailsImpl userDetails = new UserDetailsImpl(1L, "existinguser", "pass", "John", java.util.List.of(), null, null, null, null);

        when(authentication.getPrincipal()).thenReturn(userDetails);
        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class))).thenReturn(authentication);

        ResponseCookie mockCookie = ResponseCookie.from("jwt-cookie", "fake-jwt-token").build();
        when(jwtUtils.generateJwtCookie(userDetails)).thenReturn(mockCookie);

        // Act
        AuthenticationResult result = authService.login(loginRequest);

        // Assert
        assertNotNull(result);
        assertEquals("fake-jwt-token", result.getJwtCookie().getValue());
        assertEquals("existinguser", result.getResponse().getUsername());
    }
}