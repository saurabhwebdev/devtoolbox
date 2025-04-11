# Firebase Setup for DevToolBox

This document provides instructions for setting up Firebase for the DevToolBox application, particularly focusing on the feedback and tool request features.

## Prerequisites

1. A Firebase account and a project (jargon-a0120)
2. Firebase CLI installed (`npm install -g firebase-tools`)

## Environment Variables

Make sure your `.env.local` file has the following Firebase configuration variables:

```
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyD8Vjs8U63Xg6tgGInajrsWwHfLzW0SyUk
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=jargon-a0120.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=jargon-a0120
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=jargon-a0120.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=653247798745
NEXT_PUBLIC_FIREBASE_APP_ID=1:653247798745:web:afbc0b30ab2c3a479fcdc8
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-L3WJBPWX80
```

## Deploy Firestore Security Rules

To deploy the Firestore security rules:

1. Log in to Firebase:

```bash
firebase login
```

2. Initialize Firebase in your project (if not already done):

```bash
firebase init
```
- Select Firestore and any other services you need
- Select your project
- When asked about security rules, point to the existing `firestore.rules` file

3. Deploy only the Firestore rules:

```bash
firebase deploy --only firestore:rules
```

## Firestore Data Structure

The application uses two main collections:

### 1. `feedback` Collection

Fields:
- `type`: "feedback"
- `name`: User's name
- `email`: User's email
- `message`: Feedback message
- `createdAt`: Timestamp

### 2. `toolRequests` Collection

Fields:
- `type`: "tool-request"
- `name`: User's name
- `email`: User's email
- `toolName`: Requested tool name
- `toolDescription`: Description of the requested tool
- `createdAt`: Timestamp

## Accessing Submitted Data

To view the submitted feedback and tool requests:

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Select your project (jargon-a0120)
3. Navigate to Firestore Database
4. Browse the `feedback` and `toolRequests` collections

## Firestore Security Rules

The security rules (in `firestore.rules`) are configured to:

- Allow anyone to submit feedback and tool requests (public write access)
- Restrict reading of feedback and tool requests to authenticated users only
- Deny access to all other collections by default

To modify these rules, edit the `firestore.rules` file and deploy again. 