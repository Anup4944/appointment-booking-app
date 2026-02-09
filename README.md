# Appointment Booking App https://bookingwithadvisor.vercel.app/

Welcome to the Appointment Booking App! This web application facilitates appointment scheduling between clients and advisors. Clients can log in using their Google account for authentication, while advisors can register, set availability, and manage appointments.

## Features

- **Client Authentication**: Clients can sign in using their Google account for seamless authentication.
- **Advisor Registration**: Advisors can register accounts to offer their services.
- **Advisor Availability**: Advisors can set their availability for appointments.
- **Appointment Booking**: Clients can schedule appointments with available advisors.
- **Appointment Cancellation**: Clients and Advisors  have the option to cancel appointments if needed.
- **Password Reset**: Advisors can reset their passwords if forgotten.
- **Email Notifications**: Both clients and advisors receive email notifications when appointments are booked or canceled, facilitated through Node Mailer.
- **Database**: MongoDB is used as the database for storing user information, appointments, and availability.

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express.js
- **Authentication**:
  - Clients: Google OAuth
  - Advisors: JWT (JSON Web Tokens)
- **Database**: MongoDB
- **Email Notifications**: nodemailer 
- **Deployment**: Vercel (Frontend), Render (Backend)

## Usage

1. **Client Registration and Login**:
   - Clients can register and log in using their Google account.
2. **Advisor Registration and Login**:
   - Advisors can register an account, providing necessary details.
   - Upon registration, advisors can log in using their credentials.
3. **Advisor Availability**:
   - Advisors can set their availability for appointments through their dashboard.
4. **Client Appointment Booking**:
   - Clients can browse available advisors and schedule appointments through the app.
5. **Appointment Management**:
   - Both clients and advisors can manage appointments, including cancellations.
6. **Password Reset (Advisors)**:
   - Advisors can reset their passwords through the password reset feature if forgotten.
7. **Email Notifications**:
   - Clients and advisors receive email notifications when appointments are booked or canceled, ensuring seamless communication.

## Contributing

Contributions to the Appointment Booking App are welcome! If you encounter any issues or have suggestions for improvements, please open an issue or submit a pull request on the GitHub repository.

## License

This project is licensed under the [MIT License](LICENSE).
