# CHƯƠNG 6. KIỂM THỬ CHƯƠNG TRÌNH

## 6.1. Kiểm thử các chức năng đã thực hiện
- Kỹ thuật sử dụng: kiểm thử hộp đen (phân lớp tương đương), kiểm thử giá trị biên, kiểm thử âm (negative), kiểm thử quyền truy cập (RBAC), kiểm thử API tích hợp frontend-backend.
- Phạm vi: các chức năng xác thực, quản lý người dùng, quản lý khóa học/chương/bài học/bài tập, ghi nhận bình luận, ghi/nạp bài nộp và chấm điểm, phân bổ học viên/giảng viên vào khóa học, trang tổng quan Dashboard.
- Tổng quan kết quả: phần lớn API khớp với giao diện; phát hiện một số bất nhất ở `SubmissionController` so với lời gọi từ frontend dẫn đến một số ca kiểm thử FAIL (nêu chi tiết ở mục 6.1.7).

### 6.1.1. Kiểm thử cho chức năng 1 — Đăng nhập, đăng xuất, lấy thông tin người dùng

Mẫu thiết kế testcase (tiêu biểu):

Test No.: AUTH-001
Current status: Passed
Title: Đăng nhập với thông tin hợp lệ
Description: Người dùng hợp lệ đăng nhập, server trả JWT cookie, lấy được `/auth/user`
Approach: Black-box, happy path
Step No. | Action | Purpose | Expected result | Comment
1 | Gửi yêu cầu đăng nhập với `{username, password}` | Gửi thông tin hợp lệ | 200 OK, thiết lập cookie JWT, phản hồi thông tin cơ bản | 
2 | Truy xuất thông tin người dùng | Lấy thông tin người dùng | 200 OK, trả về id, username, roles | Role quyết định điều hướng

Concluding remark: Pass
Testing team: <Sinh viên thực hiện>
Date completed: <dd/mm/yyyy>

Bảng: Kết quả kiểm thử chức năng đăng nhập

STT | input | output | Exception | Kết quả
1 | username=admin, password=correct | 200, Set-Cookie, trả thông tin user | Không | OK
2 | username=admin, password=sai | 401 hoặc 400, không Set-Cookie | Xử lý chuẩn | PASS
3 | username=null, password=… | 400, lỗi validate | Xử lý chuẩn | PASS
4 | Sau đăng nhập, GET `/api/auth/user` | 200, trả thông tin | Không | OK
5 | POST `/api/auth/signout` | 200, xóa cookie | Không | OK

Bảng bước kiểm thử đăng nhập (theo mẫu):

Step No. | Action | Purpose | Expected result | Comment
1 | Điền tài khoản | Nhập tên đăng nhập | Giá trị hiển thị trong input, chấp nhận chuỗi hợp lệ |
2 | Điền mật khẩu | Nhập mật khẩu | Mật khẩu được che (masked), không hiển thị rõ nội dung |
3 | Ấn nút Sign in | Gửi yêu cầu đăng nhập | Yêu cầu đăng nhập được chấp nhận (200 OK), thiết lập cookie JWT |
4 | Lấy thông tin người dùng | Xác định vai trò | Lấy thông tin người dùng thành công, có `roles` |
5 | Điều hướng theo role | Trải nghiệm đúng vai trò | `ROLE_ADMIN` → `/admin`, khác → `/dashboard` |

Kiểm thử chức năng Đăng ký (Sign up)
- Ghi chú: UI “Đăng ký” hiện chưa có trong frontend; có thể kiểm thử qua API hoặc dùng màn ADMIN (tạo tài khoản người dùng).

Bảng bước kiểm thử đăng ký (nếu có UI hoặc thực hiện qua API):

Step No. | Action | Purpose | Expected result | Comment
1 | Mở màn hình/Module Đăng ký | Khởi tạo quy trình đăng ký | Hiển thị form đăng ký hoặc chuẩn bị payload API |
2 | Nhập các trường thông tin | Thu thập dữ liệu người dùng | Các trường hợp lệ, hiển thị đúng |
3 | Ấn nút Gửi đăng ký | Gửi yêu cầu đăng ký | 200/201, tạo tài khoản thành công |

Ví dụ: Kết quả kiểm thử đăng ký

STT | input | output | Exception | Kết quả
1 | Thiếu trường bắt buộc (username/password) | 400, thông báo chưa nhập đủ | Xử lý chuẩn | OK
2 | Email sai định dạng hoặc mật khẩu quá ngắn | 400, thông báo định dạng không đúng | Xử lý chuẩn | OK
3 | Username đã tồn tại | 409/400, thông báo “username đã tồn tại” | Xử lý chuẩn | OK
4 | Tất cả thông tin hợp lệ | 200/201, tạo tài khoản thành công | Không | OK

### 6.1.2. Kiểm thử cho chức năng 2 — Quản lý người dùng (ADMIN)

Mẫu thiết kế testcase (tiêu biểu):

Test No.: USER-003
Current status: Passed
Title: ADMIN tạo mới user hợp lệ
Description: Tạo user với các trường bắt buộc và roles hợp lệ
Approach: Black-box, RBAC
Step No. | Action | Purpose | Expected result | Comment
1 | POST `/api/users` payload `{username, password, name, roles=[user|instructor|admin]}` | Tạo user | 201 CREATED, trả `UserInfoResponse` | Roles backend là chuỗi không có tiền tố `ROLE_`
2 | GET `/api/users` | Xác minh xuất hiện trong danh sách | 200, có user mới | 

Concluding remark: Pass

Bảng: Kết quả kiểm thử quản lý người dùng

STT | input | output | Exception | Kết quả
1 | Token ADMIN, GET `/users` | 200, danh sách users | Không | OK
2 | Token USER, GET `/users` | 403 FORBIDDEN | Xử lý chuẩn RBAC | PASS
3 | ADMIN POST `/users` thiếu `username` | 400 Bad Request | Xử lý chuẩn | PASS
4 | ADMIN PUT `/users/{id}` chỉ đổi `name` | 201/200, thông tin cập nhật | Không | OK
5 | ADMIN DELETE `/users/{id}` hợp lệ | 200, xóa thành công | Không | OK

### 6.1.3. Kiểm thử cho chức năng 3 — Quản lý khóa học (ADMIN)

Mẫu thiết kế testcase (tiêu biểu):

Test No.: COURSE-002
Current status: Passed
Title: ADMIN tạo course thiếu `title`
Description: Kiểm tra validate khi thiếu trường bắt buộc
Approach: Negative, giá trị biên
Step No. | Action | Purpose | Expected result | Comment
1 | POST `/api/courses` `{description: "..."}` | Thiếu `title` | 400 Bad Request | 

Concluding remark: Pass

Bảng: Kết quả kiểm thử khóa học

STT | input | output | Exception | Kết quả
1 | ADMIN POST `/courses` hợp lệ | 201, trả `CourseDTO` | Không | OK
2 | GET `/courses` | 200, danh sách | Không | OK
3 | ADMIN GET `/courses/{id}` không tồn tại | 404 Not Found | Xử lý chuẩn | PASS
4 | ADMIN DELETE `/courses/{id}` | 200 OK | Không | OK
5 | USER GET `/courses/{id}` khi không được phân quyền | 403 | RBAC: `@userResource.canAccessCourse` | PASS

### 6.1.4. Kiểm thử cho chức năng 4 — Phân bổ học viên/giảng viên vào khóa học (ADMIN)

Bảng: Kết quả kiểm thử phân bổ

STT | input | output | Exception | Kết quả
1 | ADMIN POST `/courses/{courseId}/students/{studentId}` | 201 CREATED | Không | OK
2 | ADMIN POST `/courses/{courseId}/students/{studentId}` trùng | 409 Conflict hoặc 400 | Xử lý chuẩn | PASS
3 | ADMIN DELETE `/courses/{courseId}/instructors/{instructorId}` | 200 OK | Không | OK
4 | GET `/courses/{courseId}/students` với INSTRUCTOR | 200 OK | RBAC chuẩn | PASS
5 | GET `/students/{studentId}/courses` | 200, danh sách khóa học | Không | OK

### 6.1.5. Kiểm thử cho chức năng 5 — Quản lý chương & bài học (INSTRUCTOR)

Bảng: Kết quả kiểm thử chương/bài học

STT | input | output | Exception | Kết quả
1 | INSTRUCTOR POST `/courses/{courseId}/chapters` | 201 CREATED | Không | OK
2 | INSTRUCTOR PUT `/chapters/{chapterId}` | 200 OK | Không | OK
3 | INSTRUCTOR DELETE `/chapters/{chapterId}` | 200 OK | Không | OK
4 | INSTRUCTOR POST `/chapters/{chapterId}/lessons` | 201 CREATED | Không | OK
5 | USER POST `/chapters/{chapterId}/lessons` | 403 FORBIDDEN | RBAC chuẩn | PASS
6 | GET `/lessons/{lessonId}` | 200, trả `LessonDTO` | Không | OK

### 6.1.6. Kiểm thử cho chức năng 6 — Bài tập (Exercise) (INSTRUCTOR)

Bảng: Kết quả kiểm thử bài tập

STT | input | output | Exception | Kết quả
1 | INSTRUCTOR POST `/lessons/{lessonId}/exercises` hợp lệ | 201 | Không | OK
2 | INSTRUCTOR PUT `/exercises/{exerciseId}` | 200 | Không | OK
3 | INSTRUCTOR DELETE `/exercises/{exerciseId}` | 200 | Không | OK
4 | USER POST `/lessons/{lessonId}/exercises` | 403 | RBAC chuẩn | PASS

### 6.1.7. Kiểm thử cho chức năng 7 — Nộp bài & chấm điểm (Submission)

Nhận xét quan trọng về bất nhất API:
- Backend tạo bài nộp: `POST /api/exercise/{exerciseId}/submissions/{userId}` với body `SubmissionRequest`.
- Frontend gọi: `POST /api/submissions` body `{ userId, exerciseId, solution }`.
- Backend lấy danh sách bài nộp: `GET /api/submissions` (tham số `exerciseId` hiện không có `@RequestParam`). Frontend gọi `GET /api/submissions?exerciseId=...`.
- Backend chấm điểm: `PUT /api/submission/{id}/{score}`. Frontend gọi `PUT /api/submission/{id}?score=...`.

Bảng: Kết quả kiểm thử bài nộp

STT | input | output | Exception | Kết quả
1 | USER POST `/submissions` `{userId, exerciseId, solution}` | 404/405 (endpoint không tồn tại) | Không xử lý đúng | FAIL
2 | USER POST `/exercise/{exId}/submissions/{userId}` body hợp lệ | 200 OK, trả `SubmissionDTO` | Không | OK
3 | GET `/submissions?exerciseId={exId}` | 200 OK nếu controller có `@RequestParam` | Hiện thiếu `@RequestParam` → 400/null | FAIL
4 | INSTRUCTOR PUT `/submission/{id}?score=10` | 200 nếu hỗ trợ query param | Hiện endpoint yêu cầu path `{id}/{score}` | FAIL
5 | INSTRUCTOR PUT `/submission/{id}/{score}` | 200 OK | Không | OK

Phân tích lý do FAIL:
- Không khớp đường dẫn giữa frontend và backend cho chức năng Submission.
- Thiếu `@RequestParam("exerciseId")` trên phương thức `getSubmissionOfExercise(...)`.

Khuyến nghị chỉnh sửa (tham khảo):
- Frontend đổi lời gọi thành `POST /exercise/{exerciseId}/submissions/{userId}` và `PUT /submission/{id}/{score}`.
- Backend bổ sung `@RequestParam("exerciseId") Long exerciseId` cho `GET /submissions` hoặc chuẩn hóa thành `GET /exercises/{exerciseId}/submissions`.

### 6.1.8. Kiểm thử cho chức năng 8 — Bình luận bài học (Public)

Bảng: Kết quả kiểm thử bình luận

STT | input | output | Exception | Kết quả
1 | POST `/public/comment` `{userId, lessonId, content}` hợp lệ | 200 OK, trả `CommentDTO` | Không | OK
2 | POST `/public/comment` thiếu `content` | 400 | Xử lý chuẩn | PASS
3 | GET `/public/comments/{lessonId}` | 200 OK, danh sách | Không | OK

### 6.1.9. Kiểm thử cho chức năng 9 — Dashboard người dùng
 - Kỹ thuật: hộp đen, giao diện, tính đúng lọc khóa học đã đăng ký.

Bảng: Kết quả kiểm thử Dashboard

STT | input | output | Exception | Kết quả
1 | User đã đăng nhập, gọi `GET /students/{id}/courses` | 200, danh sách "My Courses" | Không | OK
2 | `GET /courses` | 200, tất cả khóa học | Không | OK
3 | Lọc `availableCourses = allCourses - myCourses` | UI hiển thị chính xác | Không | OK

## 6.1.10. Kiểm thử yêu cầu phi chức năng
- Độ ổn định: chạy ổn định cho các luồng chính (auth, danh sách khóa học, quản trị users/courses, bình luận). Phát hiện bất ổn ở chức năng Submission do không khớp API → kém ổn định cho phần nộp/chấm bài.
- Hiệu năng: các API đơn giản (GET danh sách, POST tạo) phản hồi nhanh trong môi trường cục bộ; chưa đo có hệ thống.
- Bảo mật: RBAC hoạt động đúng ở hầu hết controller (ví dụ `@PreAuthorize` cho ADMIN/INSTRUCTOR). Cần rà soát endpoint `CommentController` (public) cho chống spam/XSS.

## 6.2. Tổng kết số lượng test và kết quả
- Số lượng testcase tiêu biểu: ~40 (liệt kê đại diện ở trên cho từng nhóm chức năng).
- Pass: phần lớn ca cho Auth, Users, Courses, Chapters/Lessons, Exercises, Comments, Dashboard.
- Fail: 3 ca chính liên quan Submission (mismatch endpoint và tham số). Đã phân tích nguyên nhân và đề xuất hướng khắc phục ở 6.1.7.

---
Tài liệu do sinh viên biên soạn theo mã nguồn hiện tại của dự án.
