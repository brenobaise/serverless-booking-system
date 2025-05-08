# Serverless Booking System

## Overview

The **Serverless Booking System** is a web application designed to allow users to book services and manage bookings. It includes a user-facing interface for booking services and an admin dashboard for managing services, bookings, and store configurations.

The project is built using **Next.js**, **MongoDB**, and **TailwindCSS**, with **NextAuth** for authentication.

---

## Features

### User Features

- View available services.
- Book services by selecting a date and time slot.
- Cancel bookings using a unique confirmation code.
- Fetch bookings by email.

### Admin Features

- Manage services (add, edit, delete).
- View and manage bookings.
- Configure store working hours and maximum bookings per slot.

---

## Project Structure

```
.
├── src/
│   ├── app/
│   │   ├── api/               # API routes for services, bookings, and store configurations
│   │   ├── components/        # Reusable React components
│   │   ├── dashboard/         # Admin dashboard pages
│   │   ├── services/          # User-facing services page
│   │   ├── styles/            # Global CSS styles
│   │   ├── models/            # MongoDB models for Service, Booking, and StoreConfig
│   │   ├── middleware.js      # Middleware for authentication and authorization
│   │   └── layout.js          # Root layout for the application
│   ├── lib/                   # Utility functions (e.g., database connection, validators)
│   ├── scripts/               # Utility scripts (e.g., database seeding)
│   └── components/            # UI components (e.g., buttons, dialogs, forms)
├── public/                    # Static assets (e.g., images)
├── .env.local                 # Environment variables
├── package.json               # Project dependencies and scripts
├── tailwind.config.mjs        # TailwindCSS configuration
└── README.md                  # Project documentation
```

---

## Installation

### Prerequisites

- Node.js (v18 or higher)
- MongoDB instance
- Environment variables configured in [`.env.local`](.env.local )

### Steps

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd serverless-booking-system
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables in [`.env.local`](.env.local ):

   ```env
   MONGODB_URI=<your-mongodb-uri>
   NEXTAUTH_SECRET=<your-nextauth-secret>
   ADMIN_USERNAME=<admin-username>
   ADMIN_PASSWORD=<admin-password>
   ```

4. Run the development server:

   ```bash
   npm run dev
   ```

5. Access the application at `http://localhost:3000`.

---

## Usage

### User Interface

- Navigate to `/services` to view available services.
- Book a service by selecting a date and time slot.
- Cancel bookings via `/bookings` by entering your email and confirmation code.

### Admin Dashboard

- Navigate to `/dashboard` (requires admin login).
- Manage services at `/dashboard/services`.
- Manage bookings at `/dashboard/bookings`.
- Configure store settings at `/dashboard/storeconfigs`.

---

## API Endpoints

### Public Endpoints

- `GET /api/services`: Fetch all available services.
- `POST /api/bookings`: Create a new booking.
- `POST /api/bookings/cancel`: Cancel a booking.

### Admin Endpoints

- `GET /api/dashboard/services`: Fetch all services.
- `POST /api/dashboard/services`: Create a new service.
- `PUT /api/dashboard/services/:id`: Update a service.
- `DELETE /api/dashboard/services/:id`: Delete a service.
- `GET /api/dashboard/storeconfig`: Fetch store configuration.
- `PUT /api/dashboard/storeconfig`: Update store configuration.

---

## Database Models

### Service

- `name`: String (required)
- `small_description`: String (required)
- `large_description`: String
- `price`: Number (required)
- `sm_img_url`: String
- `xl_img_url`: String
- `isAvailable`: Boolean (default: true)
- `numOfTimesBooked`: Number (default: 0)
- `duration`: Number (required)

### Booking

- `user_email`: String (required)
- `slot_date`: Date (required)
- `slot_time`: String (required)
- `Service_id`: ObjectId (reference to Service)
- `total_price`: Number (required)
- `unique_code`: String (required)

### StoreConfig

- `Open_times`: Map (day-to-time configuration)
- `max_bookings_per_slot`: Number (default: 1)

---

## Authentication

- Admin login is handled via **NextAuth** with credentials stored in environment variables.
- Users are not required to log in to book services.

---

## Development

### Scripts

- `npm run dev`: Start the development server.
- `npm run build`: Build the application for production.
- `npm run start`: Start the production server.
- `npm run lint`: Run ESLint.

### Linting

The project uses ESLint with React and Next.js configurations.

---

## Contributing

1. Fork the repository.
2. Create a new branch:

   ```bash
   git checkout -b feature-name
   ```

3. Commit your changes:

   ```bash
   git commit -m "Add feature-name"
   ```

4. Push to the branch:

   ```bash
   git push origin feature-name
   ```

5. Open a pull request.

---

## License

This project is licensed under the MIT License.
