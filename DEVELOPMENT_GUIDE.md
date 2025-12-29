# IT3180 Course Management Website - Development Guide

## 📋 Requirements
### Required Versions
- Java: **17 or 21** 
- Node.js: **14+** 
- MySQL: **8.0+** 

## 🔧 Setup Instructions

### 1. Install Java 17 or 21

**Option A: Download Oracle JDK**
- Download from: https://www.oracle.com/java/technologies/downloads/
- Choose JDK 17 or 21
- Install and set JAVA_HOME environment variable

**Option B: Download OpenJDK**
- Download from: https://adoptium.net/
- Choose Temurin 17 or 21
- Install and set JAVA_HOME

**After Installation:**
```powershell
# Verify Java version
java -version
# Should show: openjdk version "17.x.x" or "21.x.x"
```

### 2. Configure MySQL Database

Update database credentials in:
`backend/src/main/resources/application.properties`

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/CourseOnline
spring.datasource.username=YOUR_USERNAME
spring.datasource.password=YOUR_PASSWORD
```

### 3. Start Backend

```powershell
cd backend
.\mvnw.cmd clean install
.\mvnw.cmd spring-boot:run
```

Backend will run on: **http://localhost:8080**

### 4. Start Frontend

```powershell
cd frontend
npm install
npm run dev
```

Frontend will run on: **http://localhost:5173** or **http://localhost:5174**

## 🎨 What's Been Implemented

### ✅ Frontend Features
- **Modern Authentication UI** - Beautiful login page
- **Dashboard** - Course discovery and "My Learning" section  
- **Course Cards** - Udemy-style design with placeholders
- **Navigation** - Clean navbar with user dropdown
- **Responsive Design** - Works on all devices

### ✅ Backend Features (Ready)
- **User Authentication** - JWT-based auth
- **Course Management** - CRUD operations
- **Enrollment System** - Student course enrollment
- **Chapter & Lessons** - Content organization
- **Comments & Exercises** - Interactive learning

## 📁 Project Structure

```
├── backend/                 # Spring Boot API
│   ├── src/main/java/      # Java source code
│   ├── src/main/resources/ # Configuration files
│   └── pom.xml             # Maven dependencies
│
├── frontend/               # React + Vite
│   ├── src/
│   │   ├── api/           # API configuration
│   │   ├── components/    # React components
│   │   ├── context/       # Auth context
│   │   ├── pages/         # Page components
│   │   └── styles/        # CSS modules
│   └── package.json       # npm dependencies
```

## 🎯 Default Credentials

After backend starts and database is initialized, you can use:

**Admin/Instructor:**
- Username: `admin` (or check your database)
- Password: (set during initialization)

**Student:**
- Username: `student` (or register new user)
- Password: (set during registration)

## 🔍 API Endpoints

- **Frontend**: http://localhost:5174
- **Backend**: http://localhost:8080
- **API Base**: http://localhost:8080/api
- **Swagger UI**: http://localhost:8080/swagger-ui.html (after backend starts)

## 🐛 Troubleshooting

### Backend won't start
- ✅ Check Java version: `java -version` (must be 17+)
- ✅ Check MySQL is running
- ✅ Verify database credentials in application.properties
- ✅ Check port 8080 is not in use

### Frontend won't start
- ✅ Run `npm install` in frontend directory
- ✅ Check Node.js version: `node -v`
- ✅ Clear cache: `npm cache clean --force`

### Cannot login
- ✅ Ensure backend is running
- ✅ Check browser console for errors
- ✅ Verify API URL in `frontend/src/api/axiosConfig.js`

## 📞 Support

If you encounter issues:
1. Check console logs (browser and terminal)
2. Verify all requirements are met
3. Check database connection
4. Review application.properties configuration
