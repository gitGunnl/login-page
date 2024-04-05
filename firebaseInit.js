import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { firebaseConfig } from './firebaseConfig.js'; // Ensure this path is correct based on your project structure

async function initFirebase() {
  try {
    console.log("Initializing Firebase...");
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);
    const auth = getAuth(app);
    console.log("Firebase initialized successfully.");
    return { app, analytics, auth };
  } catch (error) {
    console.error("Firebase initialization failed", error);
    throw error;
  }
}

export { initFirebase };