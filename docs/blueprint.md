# **App Name**: MediVault

## Core Features:

- Secure Authentication: User authentication via email and Google using Firebase Authentication.
- Record Upload: Upload medical records (PDF/images) to Firebase Storage.
- Metadata Storage: Store metadata (doctor, date, type) of records in Firestore.
- Record Access: View uploaded records with associated metadata.
- Record Search: Filter records by date or doctor using Firestore queries.

## Style Guidelines:

- Primary color: Teal (#008080) for a professional and trustworthy feel.
- Secondary color: Light gray (#F0F0F0) for backgrounds and neutral elements.
- Accent: Blue (#007BFF) for interactive elements and CTAs.
- Clean and minimal layout with clear navigation between Home, Upload, View, Search, and Profile.
- Use simple, professional icons for navigation and actions.
- Subtle transitions and animations for a smooth user experience.

## Original User Request:
I want to create a professional app called "Medical Record Keeper" using Firebase Studio.

The app should allow patients to:

Sign up and log in using Firebase Authentication (email, Google).

Upload medical records such as prescriptions and reports (PDF or image formats).

Store these records securely in Firebase Cloud Storage.

Save related metadata (e.g., doctor name, date of upload, type of report) in Firebase Firestore.

View and access previously uploaded reports from their account.

Search and filter records by date or doctor name using Firestore queries.

📌 Additional Notes:

Each user should only be able to view their own documents (use Firebase Security Rules).

Include a profile page with basic info (name, contact).

Create a clean and minimal UI with navigation between Home, Upload, View, Search, and Profile.

Use Firebase Firestore to store structured document metadata.

Please help me structure the app screens and connect them with the appropriate Firebase backend services.
  