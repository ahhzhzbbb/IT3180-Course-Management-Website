package com.example.course_view.services.impl;

import com.example.course_view.exceptions.ResourceNotFoundException;
import com.example.course_view.models.AppRole;
import com.example.course_view.models.Role;
import com.example.course_view.models.User;
import com.example.course_view.payload.dto.UserDTO;
import com.example.course_view.payload.request.UserUpdateRequest;
import com.example.course_view.payload.response.UserResponse;
import com.example.course_view.repositories.CourseStudentRepository;
import com.example.course_view.repositories.RoleRepository;
import com.example.course_view.repositories.UserRepository;
import com.example.course_view.security.request.SignupRequest;
import com.example.course_view.security.response.UserInfoResponse;
import com.example.course_view.services.UserService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final CourseStudentRepository courseStudentRepository;
    private final PasswordEncoder encoder;
    private final ModelMapper modelMapper;

    @Override
    public UserResponse getAllUsers() {
        List<User> users = userRepository.findAll();
        List<UserDTO> userDTOs = users.stream()
                .map(user -> modelMapper.map(user, UserDTO.class))
                .toList();
        return new UserResponse(userDTOs);
    }

    @Override
    public UserInfoResponse createUser(SignupRequest signupRequest) {
        if (userRepository.existsByUserName(signupRequest.getUsername())) {
            throw new IllegalStateException("username already existed");
        }

        if (userRepository.existsByEmail(signupRequest.getEmail())) {
            throw new IllegalStateException("email already existed");
        }

        User user = new User(
                signupRequest.getUsername(),
                signupRequest.getEmail(),
                encoder.encode(signupRequest.getPassword())
        );

        Set<String> strRoles = signupRequest.getRoles();
        Set<Role> roles = new HashSet<>();

        if (strRoles == null) {
            Role userRole = roleRepository.findByRoleName(AppRole.ROLE_USER)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(userRole);
        } else {
            strRoles.forEach(role -> {
                switch (role) {
                    case "admin":
                        Role adminRole = roleRepository.findByRoleName(AppRole.ROLE_ADMIN)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(adminRole);

                        break;
                    case "instructor":
                        Role instructorRole = roleRepository.findByRoleName(AppRole.ROLE_INSTRUCTOR)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(instructorRole);

                        break;
                    default:
                        Role userRole = roleRepository.findByRoleName(AppRole.ROLE_USER)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(userRole);
                }
            });
        }

        user.setRoles(roles);
        User savedUser = userRepository.save(user);
        List<String> savedUserRoles = savedUser.getRoles().stream()
                .map(role -> role.getRoleName().name())
                .toList();
        return new UserInfoResponse(savedUser.getUserId(), savedUser.getUserName(), savedUserRoles, savedUser.getEmail(), null);
    }

    @Transactional
    @Override
    public UserInfoResponse deleteUser(Long userId) {
        User existingUser = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));
        List<String> existingUserRoles = existingUser.getRoles().stream()
                .map(role -> role.getRoleName().name())
                .toList();
        UserInfoResponse deletedUserInfoResponse = new UserInfoResponse(
                existingUser.getUserId(),
                existingUser.getUserName(),
                existingUserRoles,
                existingUser.getEmail(),
                ""
        );
        userRepository.delete(existingUser);
        courseStudentRepository.deleteByStudent(existingUser);
        return deletedUserInfoResponse;
    }

    @Transactional
    @Override
    public UserInfoResponse updateUser(UserUpdateRequest request, Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));

        if (request.getUsername() != null && !request.getUsername().isEmpty()) {
            if (!user.getUserName().equals(request.getUsername()) &&
                    userRepository.existsByUserName(request.getUsername())) {
                throw new RuntimeException("Error: Username is already taken!");
            }
            user.setUserName(request.getUsername());
        }

        if (request.getEmail() != null && !request.getEmail().isEmpty()) {
            if (!user.getEmail().equals(request.getEmail()) &&
                    userRepository.existsByEmail(request.getEmail())) {
                throw new RuntimeException("Error: Email is already in use!");
            }
            user.setEmail(request.getEmail());
        }

        if (request.getPassword() != null && !request.getPassword().isEmpty()) {
            user.setPassword(encoder.encode(request.getPassword()));
        }

        List<String> strRolesList = request.getRoles();

        if (strRolesList != null) {
            Set<String> strRoles = new HashSet<>(strRolesList);
            Set<Role> roles = new HashSet<>();

            if (strRoles.isEmpty()) {
                Role userRole = roleRepository.findByRoleName(AppRole.ROLE_USER)
                        .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                roles.add(userRole);
            } else {
                strRoles.forEach(role -> {
                    switch (role.toLowerCase()) {
                        case "admin":
                            Role adminRole = roleRepository.findByRoleName(AppRole.ROLE_ADMIN)
                                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                            roles.add(adminRole);
                            break;
                        case "instructor":
                            Role instructorRole = roleRepository.findByRoleName(AppRole.ROLE_INSTRUCTOR)
                                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                            roles.add(instructorRole);
                            break;
                        default:
                            Role userRole = roleRepository.findByRoleName(AppRole.ROLE_USER)
                                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                            roles.add(userRole);
                    }
                });
            }
            user.setRoles(roles);
        }

        User savedUser = userRepository.save(user);

        List<String> savedUserRoles = savedUser.getRoles().stream()
                .map(role -> role.getRoleName().name())
                .toList();

        return new UserInfoResponse(
                savedUser.getUserId(),
                savedUser.getUserName(),
                savedUserRoles,
                savedUser.getEmail(),
                null
        );
    }

}
