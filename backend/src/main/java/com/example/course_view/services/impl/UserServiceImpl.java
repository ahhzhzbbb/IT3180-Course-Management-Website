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
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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

    @Override
    public UserResponse getAllUsers(Integer pageNumber, Integer pageSize) {
        Pageable pageDetails = PageRequest.of(pageNumber, pageSize);
        Page<User> userPage = userRepository.findAll(pageDetails);
        List<User> users = userPage.getContent();
        if (users.isEmpty())
            throw new RuntimeException("Not Found");
        List<UserDTO> userDTOs = users.stream()
                .map(user -> {
                    List<String> userRoles = user.getRoles().stream()
                            .map(role -> role.getRoleName().name())
                            .toList();
                    return new UserDTO(
                            user.getUserId(),
                            user.getUsername(),
                            user.getName(),
                            userRoles
                    );
                })
                .toList();
        UserResponse userResponse = new UserResponse();
        userResponse.setUsers(userDTOs);
        userResponse.setPageNumber(userPage.getNumber());
        userResponse.setPageSize(userPage.getSize());
        userResponse.setTotalElements(userPage.getTotalElements());
        userResponse.setTotalPages(userPage.getTotalPages());
        userResponse.setLastPage(userPage.isLast());
        return userResponse;
    }

    @Override
    public UserInfoResponse createUser(SignupRequest signupRequest) {
        if (userRepository.existsByUsername(signupRequest.getUsername())) {
            throw new IllegalStateException("username already existed");
        }

        User user = new User(
                signupRequest.getUsername(),
                encoder.encode(signupRequest.getPassword())
        );
        user.setName(signupRequest.getName());
        user.setPhoneNumber(signupRequest.getPhoneNumber());
        user.setBirth(signupRequest.getBirth());
        user.setGender(signupRequest.getGender());
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
        return new UserInfoResponse(savedUser.getUserId(), null, savedUser.getUsername(), savedUser.getName(), savedUserRoles);
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
                null,
                existingUser.getUsername(),
                existingUser.getName(),
                existingUserRoles
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
            if (!user.getUsername().equals(request.getUsername()) &&
                    userRepository.existsByUsername(request.getUsername())) {
                throw new RuntimeException("Error: Username is already taken!");
            }
            user.setUsername(request.getUsername());
        }

        if (request.getName() != null && !request.getName().isEmpty()) {
            user.setName(request.getName());
        }

        if (request.getPassword() != null && !request.getPassword().isEmpty()) {
            user.setPassword(encoder.encode(request.getPassword()));
        }

        // 4. Update Roles
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
                null,
                savedUser.getUsername(),
                savedUser.getName(),
                savedUserRoles
        );
    }

}
