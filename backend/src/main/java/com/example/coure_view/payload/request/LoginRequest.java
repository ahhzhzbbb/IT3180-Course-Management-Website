package com.example.coure_view.payload.request;

import lombok.Data;

@Data
public class LoginRequest {
    private String email;
    private String password;
}
