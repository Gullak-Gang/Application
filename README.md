# Frontend for Social Media Sentiment Analysis

This repository contains the frontend implementation of a platform for performing sentiment analysis on social media posts for Instagram, Twitter, and custom CSV files. Built with **Next.js**, this project complements the backend workflows managed in Kestra, delivering a user-friendly interface for interacting with the sentiment analysis pipelines.

---

## Key Features
- **User Authentication**: Powered by [Clerk](https://clerk.dev) for secure user sign-ups and logins.
- **Data Visualization**: Rich visualizations using [Recharts](https://recharts.org) for sentiment analysis results.
- **Dynamic Themes**: Dark and light mode support via [next-themes](https://github.com/pacocoursey/next-themes).
- **Interactive UI Components**: Built using [Radix UI](https://radix-ui.com) for accessibility and design consistency.
- **Database Management**: Integration with **Drizzle ORM** for interacting with the database.

---

## Getting Started

### Prerequisites
- **Node.js**: Ensure you have Node.js (v18 or above) installed.
- **PostgreSQL**: Database for storing user data and analysis results.
- **Environment Variables**: Configure a `.env` file in the project root with the following keys:

```
# Application Base URL
NEXT_PUBLIC_BASE_URL=""

# Twitter API
CLIENT_ID=""
CLIENT_SECRET=""
CLIENT_STATE=""

# Clerk (User Authentication)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=""
CLERK_SECRET_KEY=""
NEXT_PUBLIC_CLERK_SIGN_IN_URL="/sign-in"
NEXT_PUBLIC_CLERK_SIGN_UP_URL="/sign-up"
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL="/dashboard"
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL="/dashboard"

# Gemini AI API
GOOGLE_GENERATIVE_AI_API_KEY=""

# Database Connection
DATABASE_URL=""
```

# Installation

- Clone the Repository
    ```
    git clone https://github.com/Gullak-Gang/Application
    ```

- Install Dependencies

    ```
    npm i -g pnpm
    pnpm install
    ```
- Run Development Server

    ```
    pnpm dev
    ```

- Access the app at http://localhost:3000.

---

# Project Structure

```
    src/
    ├── app/                # Next.js pages
    ├── components/         # Reusable UI components
    ├── styles/             # Tailwind CSS configurations
    ├── lib/                # Utilities and services (e.g., API clients)
    ├── hooks/              # Custom React hooks
    ├── providers/          # Client Provider
    ├── services/           # services (db, actions)
    ├── types/              # types
    └── public/             # public assets
```

# Dependencies

- Core Packages
  - Next.js: Framework for building React applications.
  - React: Library for building user interfaces.
  - Tailwind CSS: Utility-first CSS framework.

- UI and State Management
  - ShadCn UI & Magic UI: Reusable UI components.
  - Radix UI: Accessible and customizable UI primitives.
  - Framer Motion: For animations and transitions.

- Database and ORM
  - Drizzle ORM: Type-safe database management.
  - PostgreSQL: Relational database for backend data.

- APIs and SDKs
  - Twitter API SDK: Interacts with the Twitter API.
  - Google AI SDK: For AI and sentiment analysis tasks.


# License

This project is licensed under the MIT License. See the LICENSE file for more information.
