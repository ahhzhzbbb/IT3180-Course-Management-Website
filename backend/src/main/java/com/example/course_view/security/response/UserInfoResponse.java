package com.example.course_view.security.response;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserInfoResponse {
    private Long id;
    private String jwtToken;
    private String username;
    private String name;
    private List<String> roles;

    public UserInfoResponse(Long id, String username, String name, List<String> roles) {
        this.id = id;
        this.username = username;
        this.name = name;
        this.roles = roles;
    }

}