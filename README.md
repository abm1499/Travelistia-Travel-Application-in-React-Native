# Travelistia - A Smart Travel Planning Application


**Travelistia** is a cross-platform mobile application developed as a Final Year Project (FYP) for the Bachelor of Science in Software Engineering at COMSATS University Islamabad (CUI). This project aims to simplify and personalize the travel experience for users in Pakistan by leveraging AI-driven features and modern software engineering practices.

---

## Project Overview

Travelistia addresses the challenges faced by travelers, such as limited local knowledge, rigid tour packages, and logistical difficulties, by offering a customizable, user-centric travel planning solution. Unlike traditional tour operators or existing applications, Travelistia empowers users to explore cities and plan trips tailored to their preferences, whether within a city or across regions.

### Key Features
- **Trip Planning**: Generates personalized travel itineraries based on user interests and time constraints.
- **In-City Exploration**: Recommends nearby places (restaurants, gas stations, etc.) using Google Maps API.
- **Booking Services**: Allows in-app booking of hotels and cabs with Stripe payment integration.
- **Weather Forecast**: Provides real-time weather updates via Open Weather API.
- **Chatbot Support**: Assists users with queries using a cloud-deployed chatbot.
- **Reviews & Ratings**: Enables users to view and share feedback on places.
- **Trip History**: Stores past trips and bookings for easy reference.
- **Social Sharing**: Lets users share their trips on social media.

### Problem Statement
Travelers often struggle to visit places of interest due to limited knowledge, lack of personalized options, and logistical hurdles. Existing solutions in Pakistan focus on predefined packages, neglecting individual preferences and in-city exploration. Travelistia fills this gap with a comprehensive, smart travel companion.

---

## Team
- **Ammar Bin Mannan** (CIIT/FA17-BSE-019/ISB) - Developer
- **Muhammad Fahad Tufique** (CIIT/FA17-BSE-035/ISB) - Developer
- **Ms. Gulmina Rextina** - Supervisor
- **Ms. Sajida Kulsoom** - Co-Supervisor

**Institution**: COMSATS University Islamabad (CUI)  
**Degree**: Bachelor of Science in Software Engineering (2017-2021)

---

## Technology Stack

### Development
- **Platforms**: Android, iOS (Cross-Platform)
- **Database**: Firebase (NoSQL, real-time data storage)
- **Methodology**: Agile Incremental Development

### External APIs
- **Firebase API**: User authentication and data storage
- **Google Maps API**: Location services and route planning
- **Open Weather API**: Weather forecasting
- **Stripe API**: Payment processing

### Tools
- **IDE**: VS Code
- **Design**: Modern UI/UX principles (minimalistic and user-friendly)
- **Testing**: Manual (Unit, Integration, Functional) and System Testing

---

## System Architecture

Travelistia follows a modular architecture:
1. **User Management**: Handles sign-up, login, and profile updates.
2. **Find Nearby**: Fetches nearby places using Google Maps API.
3. **Trip Planning**: Uses algorithms for personalized itineraries.
4. **Booking & Payment**: Integrates hotel/car booking with Stripe payments.
5. **Weather Forecast**: Displays weather data for trip planning.
6. **Reviews & Ratings**: Stores and displays user feedback.
7. **Chatbot**: Provides real-time support.
8. **History**: Tracks past trips and bookings.

Data is stored in Firebase, with entities like `Username`, `Preferences`, `Generated_route`, etc., ensuring scalability and real-time access.

---

## Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/abm1499/Travelistia-Travel-Application-in-React-Native
2. **Install Dependencies:**:
   
   Ensure Firebase, Google Maps, Open Weather, and Stripe API keys are configured.
   
   Follow platform-specific setup (Android/iOS).
1. **Clone the Repository**:
   
   For Android: Use Android Studio to build and deploy.
   
   For iOS: Use Xcode to build and deploy.

## Usage

1. Sign Up/Login: Create an account or log in using email and password.
2. Plan a Trip:
   
   Select "Plan My Day" for in-city trips or "Plan Outside City" for intercity travel.
   
   Fill out the interest questionnaire and specify the time period.
4. Explore Nearby: View restaurants, gas stations, etc., near your location.
5. Book Services: Reserve hotels or cabs and pay via Stripe.
6. Check Weather: Review forecasts for your travel destinations.
7. Chat Support: Ask the AI chatbot for assistance.
8. Share Feedback: Rate places and share your trip on social media.

## Future Work

1. Enhanced Recommendations: Improve AI accuracy to 99% with more training data.
2. Real-Time Booking: Partner with hotels and cab services for live availability.
3. Web Version: Launch a website with additional features like discounts.
4. Security Upgrades: Strengthen defenses against cyber threats.
5. Chatbot Improvements: Expand query-handling capabilities.

## Conclusion

Travelistia is a comprehensive travel solution that empowers users to plan personalized trips effortlessly. By integrating AI, real-time services, and a user-friendly interface, it stands out as a valuable tool for travelers in Pakistan and beyond.
