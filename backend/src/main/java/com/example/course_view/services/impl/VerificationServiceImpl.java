package com.example.course_view.services.impl;

import com.example.course_view.exceptions.ResourceNotFoundException;
import com.example.course_view.models.User;
import com.example.course_view.models.VerificationToken;
import com.example.course_view.payload.request.UserUpdateRequest;
import com.example.course_view.repositories.UserRepository;
import com.example.course_view.repositories.VerificationTokenRepository;
import com.example.course_view.security.response.UserInfoResponse;
import com.example.course_view.services.VerificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class VerificationServiceImpl implements VerificationService {
    private final VerificationTokenRepository tokenRepository;
    private final UserRepository userRepository;

    private String generateCode() {
        Random rnd = new Random();
        int number = 100000 + rnd.nextInt(900000);
        return String.valueOf(number);
    }

    @Override
    @Transactional
    public VerificationToken requestPhoneUpdate(Long userId, String newPhone) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));

        VerificationToken token = new VerificationToken();
        token.setUser(user);
        token.setNewValue(newPhone);
        token.setType("PHONE_UPDATE");
        token.setCode(generateCode());
        token.setExpiresAt(LocalDateTime.now().plusMinutes(10));

        VerificationToken saved = tokenRepository.save(token);

        // In real system: send SMS/email here. For dev/testing we return code in response.
        System.out.println("[Verification] code for user " + user.getUsername() + ": " + saved.getCode());
        return saved;
    }

    @Override
    @Transactional
    public UserInfoResponse confirmPhoneUpdate(Long tokenId, String code) {
        VerificationToken token = tokenRepository.findByIdAndCode(tokenId, code)
                .orElseThrow(() -> new RuntimeException("Invalid token or code"));

        if (token.getExpiresAt().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("Token expired");
        }

        User user = token.getUser();
        user.setPhoneNumber(token.getNewValue());
        User saved = userRepository.save(user);

        tokenRepository.delete(token);

        return new UserInfoResponse(
                saved.getUserId(),
                null,
                saved.getUsername(),
                saved.getName(),
                saved.getRoles().stream().map(r -> r.getRoleName().name()).toList(),
                saved.getPhoneNumber(),
                saved.getBirth(),
                saved.getGender(),
                saved.getState()
        );
    }
}
