// LoginService.java
package com.example.coure_view.services;

import com.example.coure_view.payload.request.LoginRequest;
import com.example.coure_view.payload.response.LoginResponse;

public interface LoginService {
    LoginResponse login(LoginRequest loginRequest);
}
