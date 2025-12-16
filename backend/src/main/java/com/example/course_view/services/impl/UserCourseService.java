package com.example.course_view.services.impl;

import com.example.course_view.models.Course;
import com.example.course_view.models.User;
import com.example.course_view.models.UserCourse;
import com.example.course_view.models.UserCourseId;
import com.example.course_view.payload.dto.CourseDTO;
import com.example.course_view.payload.dto.UserDTO;
import com.example.course_view.payload.request.UserCourseRequest;
import com.example.course_view.repositories.CourseRepository;
import com.example.course_view.repositories.UserCourseRepository;
import com.example.course_view.repositories.UserRepository;
import com.example.course_view.services.CourseService;
import com.example.course_view.services.UserService;
import jakarta.persistence.EntityNotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserCourseService {
    @Autowired
    private UserCourseRepository userCourseRepository;

    @Autowired
    private UserService userService; // Remove " = new UserService()"

    @Autowired
    private CourseService courseService; // Remove " = new CourseService()"

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CourseRepository courseRepository;


    // Cách tối ưu nhất trong môi trường JPA
    public UserCourse addStudentCourse(UserCourseRequest request) {
        // Dùng getReferenceById (hoặc getOne) để chỉ lấy proxy object chứa ID
        // (Ko cần query toàn bộ dữ liệu User/Course nếu chỉ để lưu khóa ngoại)
        try {
            User user = userRepository.getReferenceById(request.getUserId());
            Course course = courseRepository.getReferenceById(request.getCourseId());

            UserCourse userCourse = new UserCourse();
            userCourse.setId(new UserCourseId(request.getUserId(), request.getCourseId()));
            userCourse.setUser(user);
            userCourse.setCourse(course);

            return userCourseRepository.save(userCourse);
        } catch (EntityNotFoundException e) {
            return null;
        }
    }

    public boolean deleteStudentCourse(UserCourseRequest request) {
        UserCourseId id = new UserCourseId(request.getUserId(), request.getCourseId());
        Optional<UserCourse> userCourseOpt = userCourseRepository.findById(id);
        if (userCourseOpt.isPresent()) {
            userCourseRepository.deleteById(id);
            return true;
        } else {
            return false; // Không tìm thấy bản ghi
        }
    }

    public List<User> getStudentsInCourse(Long courseId) {
        // Gọi hàm repository vừa viết ở trên
        return userCourseRepository.findUsersByCourseId(courseId);
    }
}
