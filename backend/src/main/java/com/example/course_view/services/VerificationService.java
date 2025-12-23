package com.example.course_view.services;

import com.example.course_view.security.response.UserInfoResponse;
import com.example.course_view.models.VerificationToken;

public interface VerificationService {
    VerificationToken requestPhoneUpdate(Long userId, String newPhone);

    UserInfoResponse confirmPhoneUpdate(Long tokenId, String code);
}
