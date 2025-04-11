import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { FeedbackData, ToolRequestData, FeedbackResponse } from '@/types/firebase';

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

// Initialize Firebase only if no apps exist (prevents re-initialization during hot reloads)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Initialize analytics only in browser environment
let analytics: any = null;
if (typeof window !== 'undefined') {
  // Initialize analytics only if it's available
  try {
    analytics = getAnalytics(app);
  } catch (error) {
    console.error('Analytics could not be initialized:', error);
  }
}

// Function to sign in with Google
export const signInWithGoogle = async () => {
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

export { app, db, analytics, auth, onAuthStateChanged }; 