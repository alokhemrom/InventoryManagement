# Inventory Management System

This Inventory Management System is a simple web-based application designed to help businesses manage their inventories, employees, and other associated resources effectively. The application provides role-based access with secure authentication, allowing administrators and users to interact with various features based on their assigned roles.

## Features

### Authentication and Authorization
- **Role-based Authentication**: The system includes user authentication with JWT (JSON Web Token), ensuring secure login.
- **Admin and User Roles**: Access to features is restricted based on user roles, providing administrators with additional controls over the system.

### Inventory Management
- **Inventory List with Search and Filter**: Users can view the list of available products, search by product name, and filter to display only out-of-stock items.
- **Add, Edit, and Delete Inventory**: Authorized users can add new inventory items, edit existing ones, and delete items as needed.
- **Out-of-Stock Notification**: Inventory quantities display in red when a product is out of stock, making it easy to identify shortages.

### Company Management
- **Company List with CRUD Operations**: Administrators can add, edit, view, and delete companies within the system.
- **View Company Details**: Users can see details about each company, including name, location, and capacity.
- **Company-specific Views for Employees and Inventory**: From the company view, users can directly navigate to the inventory and employee lists for that company.

### Employee Management
- **Employee List for Admins**: Administrators can view employees across all companies or view employees specific to a single company.
- **Employee CRUD Operations**: Admin users can add, edit, and delete employee details. Employee details are only accessible to the admin or for the specific company user.
- **Detailed Employee Information**: Each employee record includes name, position, salary, and associated company details.

### Dashboard
- **User Dashboard**: Provides authenticated users with easy access to company details, inventory lists, and employee lists, depending on their role.
- **Admin and User Views**: Admins have access to manage all companies, employees, and inventories, while general users can view their specific company details.

### User Interface
- **Responsive Design with Bootstrap**: The application uses Bootstrap (5.x) for a responsive, mobile-friendly design.
- **Fixed Header with Navigation**: A fixed-top header with navigation options based on user role and authentication status.
- **Icons for Actions**: Intuitive icons for add, edit, and delete actions improve user experience and make the UI easy to navigate.

### Additional Features
- **CORS Handling**: Configured to handle Cross-Origin Resource Sharing (CORS) for secure backend and frontend communication.
- **Error Messages and Notifications**: Display error messages for failed operations or unauthorized access.
- **Token Management with Interceptors**: Angular interceptors manage token attachment for secure API requests.

## Technology Stack

- **Frontend**: Angular 18, Bootstrap 5, Typescript
- **Backend**: Spring Boot (3.x), Spring Security (6.x)
- **Database**: PostgreSQL
- **Authentication**: JWT-based

## Setup Instructions

1. **Backend**:
    - Clone the repository and navigate to the backend folder.
    - Configure PostgreSQL connection in `application.properties`.
    - Run the Spring Boot application.

2. **Frontend**:
    - Navigate to the Angular project folder.
    - Run `npm install` to install dependencies.
    - Start the application using `ng serve`.

## Usage

- Access the application at `http://localhost:4200`.
- Use role-based login to access different features based on user role.

## Contributing

Feel free to contribute to enhance this project by opening issues and submitting pull requests.

---
