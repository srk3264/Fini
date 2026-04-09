import { motion } from "motion/react";
import { useNavigate } from "react-router";
import SignUpImport from "../../imports/SignUp";
import SignInImport from "../../imports/SignIn";

export function SignUpScreen() {
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate("/sign-in");
  };

  const handleSignUp = () => {
    // In a real app, this would handle the sign-up logic
    console.log("Sign up clicked");
  };

  return (
    <motion.div
      className="absolute inset-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      onClick={(e) => {
        // Make "Sign in" text clickable
        const target = e.target as HTMLElement;
        if (target.textContent === "Sign in" || target.closest('[data-sign-in-link]')) {
          handleSignIn();
        }
      }}
    >
      <div className="size-full" data-sign-up-wrapper>
        <SignUpImport />
      </div>
    </motion.div>
  );
}

export function SignInScreen() {
  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate("/sign-up");
  };

  const handleSignIn = () => {
    // In a real app, this would handle the sign-in logic
    console.log("Sign in clicked");
  };

  return (
    <motion.div
      className="absolute inset-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      onClick={(e) => {
        // Make "Sign up" text clickable
        const target = e.target as HTMLElement;
        if (target.textContent === "Sign up" || target.closest('[data-sign-up-link]')) {
          handleSignUp();
        }
      }}
    >
      <div className="size-full" data-sign-in-wrapper>
        <SignInImport />
      </div>
    </motion.div>
  );
}
