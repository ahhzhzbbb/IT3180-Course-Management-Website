package com.example.course_view.services.impl;

import com.example.course_view.exceptions.ResourceNotFoundException;
import com.example.course_view.models.Course;
import com.example.course_view.models.User;
import com.example.course_view.payload.dto.CourseDTO;
import com.example.course_view.payload.dto.UserDTO;
import com.example.course_view.payload.request.UserCreateRequest;
import com.example.course_view.payload.request.UserUpdateRequest;
import com.example.course_view.payload.response.UserRespond;
import com.example.course_view.repositories.UserRepository;
import com.example.course_view.services.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public UserDTO createUser(UserCreateRequest request) {
        User user = modelMapper.map(request, User.class);
        return modelMapper.map(userRepository.save(user), UserDTO.class);
    }

    @Override
    public UserRespond getUsers() {
        List<User> users = userRepository.findAll();
        List<UserDTO> respond = users.stream()
                .map(user -> modelMapper.map(user, UserDTO.class))
                .toList();
        return new UserRespond(respond);
    }

    @Override
    public UserDTO getUser(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", id));
        return modelMapper.map(user, UserDTO.class);
    }

    @Override
    public UserDTO updateUser(UserUpdateRequest request, Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", id));
        if (request.getPassword() != null && !request.getPassword().isEmpty())
            user.setPassword(request.getPassword());
        modelMapper.map(request, user);
        return  modelMapper.map(userRepository.save(user), UserDTO.class);
    }

    @Override
    public boolean deleteUser(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("user", "id", id));
        userRepository.deleteById(id);
        return true;
    }
}
