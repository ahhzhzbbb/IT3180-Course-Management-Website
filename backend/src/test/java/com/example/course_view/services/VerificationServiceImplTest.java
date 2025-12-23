package com.example.course_view.services;

import com.example.course_view.models.User;
import com.example.course_view.models.VerificationToken;
import com.example.course_view.repositories.UserRepository;
import com.example.course_view.repositories.VerificationTokenRepository;
import com.example.course_view.security.response.UserInfoResponse;
import com.example.course_view.services.impl.VerificationServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.Disabled;
import org.mockito.ArgumentCaptor;

import java.time.LocalDateTime;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;

@Disabled("Verification feature removed")
public class VerificationServiceImplTest {

    private VerificationTokenRepository tokenRepository;
    private UserRepository userRepository;
    private VerificationServiceImpl verificationService;

    @BeforeEach
    void setUp() {
        tokenRepository = mock(VerificationTokenRepository.class);
        userRepository = mock(UserRepository.class);
        verificationService = new VerificationServiceImpl(tokenRepository, userRepository);
    }

    @Test
    void requestPhoneUpdate_createsToken() {
        User user = new User();
        user.setUserId(1L);
        user.setUsername("u1");

        when(userRepository.findById(1L)).thenReturn(Optional.of(user));
        when(tokenRepository.save(any())).thenAnswer(invocation -> {
            VerificationToken t = invocation.getArgument(0);
            t.setId(99L);
            return t;
        });

        VerificationToken token = verificationService.requestPhoneUpdate(1L, "0123456789");

        assertThat(token.getId()).isEqualTo(99L);
        assertThat(token.getNewValue()).isEqualTo("0123456789");
        assertThat(token.getType()).isEqualTo("PHONE_UPDATE");
        assertThat(token.getCode()).matches("\\d{6}");
        assertThat(token.getExpiresAt()).isAfter(LocalDateTime.now());

        ArgumentCaptor<VerificationToken> captor = ArgumentCaptor.forClass(VerificationToken.class);
        verify(tokenRepository, times(1)).save(captor.capture());
        VerificationToken saved = captor.getValue();
        assertThat(saved.getUser().getUserId()).isEqualTo(1L);
    }

    @Test
    void confirmPhoneUpdate_success_updatesPhone() {
        User user = new User();
        user.setUserId(2L);
        user.setUsername("u2");
        user.setPhoneNumber("000");

        VerificationToken token = new VerificationToken();
        token.setId(55L);
        token.setCode("123456");
        token.setNewValue("0987654321");
        token.setType("PHONE_UPDATE");
        token.setExpiresAt(LocalDateTime.now().plusMinutes(5));
        token.setUser(user);

        when(tokenRepository.findByIdAndCode(55L, "123456")).thenReturn(Optional.of(token));
        when(userRepository.save(any())).thenAnswer(invocation -> invocation.getArgument(0));

        UserInfoResponse res = verificationService.confirmPhoneUpdate(55L, "123456");

        assertThat(res.getPhoneNumber()).isEqualTo("0987654321");
        verify(tokenRepository, times(1)).delete(token);
    }

    @Test
    void confirmPhoneUpdate_expired_throws() {
        User user = new User();
        user.setUserId(3L);

        VerificationToken token = new VerificationToken();
        token.setId(56L);
        token.setCode("111111");
        token.setNewValue("0123");
        token.setType("PHONE_UPDATE");
        token.setExpiresAt(LocalDateTime.now().minusMinutes(1));
        token.setUser(user);

        when(tokenRepository.findByIdAndCode(56L, "111111")).thenReturn(Optional.of(token));

        assertThatThrownBy(() -> verificationService.confirmPhoneUpdate(56L, "111111")).isInstanceOf(RuntimeException.class).hasMessageContaining("Token expired");
    }

}
