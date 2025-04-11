import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp, Firestore } from 'firebase/firestore';
import { getAnalytics, Analytics } from 'firebase/analytics';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged as _onAuthStateChanged, User, Auth } from 'firebase/auth';
import { FeedbackData, ToolRequestData, ContactFormData, FeedbackResponse } from '@/types/firebase';

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Check if all required environment variables are defined
const isFirebaseConfigValid = () => {
  return Boolean(
    firebaseConfig.apiKey &&
    firebaseConfig.authDomain &&
    firebaseConfig.projectId &&
    firebaseConfig.storageBucket &&
    firebaseConfig.messagingSenderId &&
    firebaseConfig.appId
  );
};

// Initialize Firebase with SSR safety
let app: FirebaseApp | undefined;
let db: Firestore | undefined;
let auth: Auth | undefined;
let analytics: Analytics | null = null;
let googleProvider: GoogleAuthProvider | undefined;

// Only initialize Firebase if not in SSR and config is valid
if (typeof window !== 'undefined' && isFirebaseConfigValid()) {
  try {
    // Initialize Firebase only if no apps exist (prevents re-initialization during hot reloads)
    app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
    db = getFirestore(app);
    auth = getAuth(app);
    googleProvider = new GoogleAuthProvider();

    // Initialize analytics only in browser environment
    try {
      analytics = getAnalytics(app);
    } catch (error) {
      console.error('Analytics could not be initialized:', error);
    }
  } catch (error) {
    console.error('Firebase could not be initialized:', error);
  }
}

// Safe wrapper for onAuthStateChanged
export const onAuthStateChanged = (callback: (user: User | null) => void) => {
  if (!auth) {
    console.warn('Firebase auth not initialized, skipping auth state listener');
    callback(null);
    return () => {}; // Return empty unsubscribe function
  }
  return _onAuthStateChanged(auth, callback);
};

// Function to sign in with Google
export const signInWithGoogle = async () => {
  if (!auth || !googleProvider) {
    console.error('Firebase auth not initialized');
    return { success: false, error: 'Firebase auth not initialized' };
  }
  
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return { success: true, user: result.user };
  } catch (error) {
    console.error('Error signing in with Google:', error);
    return { success: false, error };
  }
};

// Function to sign out
export const signOutUser = async () => {
  if (!auth) {
    console.error('Firebase auth not initialized');
    return { success: false, error: 'Firebase auth not initialized' };
  }
  
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    console.error('Error signing out:', error);
    return { success: false, error };
  }
};

// Function to save feedback to Firestore
export async function saveFeedback(data: FeedbackData): Promise<FeedbackResponse> {
  if (!db || !auth) {
    console.error('Firestore not initialized');
    return { success: false, error: 'Firestore not initialized' };
  }
  
  try {
    const feedbackCollection = collection(db, 'feedback');
    const docRef = await addDoc(feedbackCollection, {
      ...data,
      createdAt: serverTimestamp(),
      userId: auth.currentUser?.uid || null,
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error saving feedback:', error);
    return { success: false, error };
  }
}

// Function to save tool requests to Firestore
export async function saveToolRequest(data: ToolRequestData): Promise<FeedbackResponse> {
  if (!db || !auth) {
    console.error('Firestore not initialized');
    return { success: false, error: 'Firestore not initialized' };
  }
  
  try {
    const toolRequestCollection = collection(db, 'toolRequests');
    const docRef = await addDoc(toolRequestCollection, {
      ...data,
      createdAt: serverTimestamp(),
      userId: auth.currentUser?.uid || null,
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error saving tool request:', error);
    return { success: false, error };
  }
}

// Function to save contact form submissions to Firestore
export async function saveContactForm(data: ContactFormData): Promise<FeedbackResponse> {
  if (!db || !auth) {
    console.error('Firestore not initialized');
    return { success: false, error: 'Firestore not initialized' };
  }
  
  try {
    const contactCollection = collection(db, 'contacts');
    const docRef = await addDoc(contactCollection, {
      ...data,
      createdAt: serverTimestamp(),
      userId: auth.currentUser?.uid || null,
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error saving contact form:', error);
    return { success: false, error };
  }
}

export { app, db, analytics, auth }; 