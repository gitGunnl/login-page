// Import the initFirebase function from firebaseInit.js
import { initFirebase } from "./firebaseInit.js";

async function main() {
  try {
    // Wait for Firebase to initialize before proceeding
    const { auth } = await initFirebase();

    // DOM elements
    const submitButton = document.getElementById("submit");
    const signupButton = document.getElementById("sign-up");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const main = document.getElementById("main");
    const createacct = document.getElementById("create-acct");
    const signupEmailIn = document.getElementById("email-signup");
    const confirmSignupEmailIn = document.getElementById("confirm-email-signup");
    const signupPasswordIn = document.getElementById("password-signup");
    const confirmSignUpPasswordIn = document.getElementById("confirm-password-signup");
    const createacctbtn = document.getElementById("create-acct-btn");

    const returnBtn = document.getElementById("return-btn");

    // Event listeners
    createacctbtn.addEventListener("click", async function() {
      let isVerified = true;

      const signupEmail = signupEmailIn.value;
      const confirmSignupEmail = confirmSignupEmailIn.value;
      if (signupEmail !== confirmSignupEmail) {
        window.alert("Email fields do not match. Try again.");
        isVerified = false;
      }

      const signupPassword = signupPasswordIn.value;
      const confirmSignUpPassword = confirmSignUpPasswordIn.value;
      if (signupPassword !== confirmSignUpPassword) {
        window.alert("Password fields do not match. Try again.");
        isVerified = false;
      }

      if (!signupEmail || !confirmSignupEmail || !signupPassword || !confirmSignUpPassword) {
        window.alert("Please fill out all required fields.");
        isVerified = false;
      }

      if (isVerified) {
        try {
          const userCredential = await auth.createUserWithEmailAndPassword(signupEmail, signupPassword);
          console.log("Success! Account created for:", signupEmail);
          window.alert("Success! Account created.");
        } catch (error) {
          console.error("Error occurred during account creation:", error);
          window.alert("Error occurred. Try again.");
        }
      }
    });

    submitButton.addEventListener("click", async function() {
      const email = emailInput.value;
      const password = passwordInput.value;

      try {
        const userCredential = await auth.signInWithEmailAndPassword(email, password);
        console.log("Success! Welcome back!");
        window.alert("Success! Welcome back!");
      } catch (error) {
        console.error("Error occurred during sign in:", error);
        window.alert("Error occurred. Try again.");
      }
    });

    signupButton.addEventListener("click", function() {
      main.style.display = "none";
      createacct.style.display = "block";
      console.log("Navigating to account creation view.");
    });

    returnBtn.addEventListener("click", function() {
      main.style.display = "block";
      createacct.style.display = "none";
      console.log("Returning to main sign in view.");
    });
  } catch (error) {
    console.error("Error in main function", error);
  }
}

main().catch(error => console.error("Failed to run main function", error));