package com.example.course_view.security.jwt;

import java.util.List;

public class LoginResponse {
    private String jwtToken;
    private String username;
    private List<String> roles;

    public LoginResponse(String jwtToken, String username, List<String> rolse) {
        this.jwtToken = jwtToken;
        this.username = username;
        this.roles = rolse;
    }

    public String getJwtToken() {
        return jwtToken;
    }

    public void setJwtToken(String jwtToken) {
        this.jwtToken = jwtToken;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public List<String> getRolse() {
        return roles;
    }

    public void setRolse(List<String> rolse) {
        this.roles = rolse;
    }
}
