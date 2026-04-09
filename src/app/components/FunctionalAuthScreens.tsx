import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { useState } from "react";
import imgFrame8769 from "../../assets/5b5cb40b8a653d716ec93572667a47ef7d4b366c.png";
import { useAuth } from "../contexts/AuthContext";

export function FunctionalSignUpScreen() {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    setError("");

    const result = await signUp(email, password);
    
    setLoading(false);

    if (result.success) {
      // Navigate to post-signup onboarding
      console.log("Successfully signed up and signed in!");
      navigate("/onboarding/nickname");
    } else {
      // Check if it's a "user already exists" error
      const errorMessage = result.error || "Failed to sign up";
      if (errorMessage.toLowerCase().includes("already been registered") || 
          errorMessage.toLowerCase().includes("already registered") ||
          errorMessage.toLowerCase().includes("already exists")) {
        setError("This email is already registered. Please sign in instead.");
      } else {
        setError(errorMessage);
      }
    }
  };

  const handleSignIn = () => {
    navigate("/sign-in");
  };

  return (
    <motion.div
      className="absolute inset-0 bg-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <div className="content-stretch flex flex-col items-start justify-between px-[16px] relative min-h-screen">
        {/* Top Section with Logo and Input Fields */}
        <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full">
          {/* Centered Logo */}
          <div className="content-stretch flex flex-col h-[88px] items-start relative shrink-0 w-full">
            <div className="content-stretch flex items-center justify-center py-[16px] relative shrink-0 w-full">
              <div className="h-[56px] relative shrink-0 w-[99.556px]">
                <img 
                  alt="fino logo" 
                  className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" 
                  src={imgFrame8769} 
                />
              </div>
            </div>
          </div>

          {/* Input Fields */}
          <div className="content-stretch flex flex-col gap-[16px] items-start leading-[22px] relative shrink-0 text-[17px] w-full">
            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 w-full">
                <p className="font-['DM_Sans',sans-serif] text-sm text-red-600">{error}</p>
              </div>
            )}

            {/* Email Input */}
            <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
              <p className="font-['DM_Sans',sans-serif] font-semibold relative shrink-0 text-black w-full">
                Your e-mail please
              </p>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setEmailFocused(true)}
                onBlur={() => setEmailFocused(false)}
                placeholder="username@gmail.com"
                disabled={loading}
                className="font-['DM_Sans',sans-serif] font-normal relative shrink-0 w-full bg-transparent border-none outline-none text-black placeholder:text-[rgba(0,0,0,0.6)] p-0 disabled:opacity-50 transition-colors"
              />
              <div className={`h-[1px] w-full transition-colors ${emailFocused ? 'bg-[#ffcf48]' : 'bg-[rgba(0,0,0,0.1)]'}`} />
            </div>

            {/* Password Input */}
            <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
              <p className="font-['DM_Sans',sans-serif] font-semibold relative shrink-0 text-black w-full">
                Your password
              </p>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
                placeholder="Tap to start writing"
                disabled={loading}
                className="font-['DM_Sans',sans-serif] font-normal relative shrink-0 w-full bg-transparent border-none outline-none text-black placeholder:text-[rgba(0,0,0,0.6)] p-0 disabled:opacity-50 transition-colors"
              />
              <div className={`h-[1px] w-full transition-colors ${passwordFocused ? 'bg-[#ffcf48]' : 'bg-[rgba(0,0,0,0.1)]'}`} />
            </div>
          </div>
        </div>

        {/* Bottom Section with Button and Navigation */}
        <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full pb-[16px]">
          {/* Sign Up Button */}
          <button
            onClick={handleSignUp}
            disabled={loading}
            className="bg-[#ffcf48] relative rounded-[100px] shrink-0 w-full cursor-pointer hover:bg-[#ffc829] active:bg-[#f0bd1e] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="flex flex-row items-center justify-center size-full">
              <div className="content-stretch flex items-center justify-center p-[10px] relative w-full">
                <p className="font-['DM_Sans',sans-serif] font-normal leading-[21px] relative shrink-0 text-[16px] text-black whitespace-nowrap">
                  {loading ? "Signing up..." : "Sign up"}
                </p>
              </div>
            </div>
          </button>

          {/* Sign In Link */}
          <button
            onClick={handleSignIn}
            disabled={loading}
            className="content-stretch flex flex-col font-['DM_Sans',sans-serif] font-normal gap-[4px] items-start relative shrink-0 text-center w-full cursor-pointer bg-transparent border-none disabled:opacity-50"
          >
            <p className="leading-[18px] relative shrink-0 text-[13px] text-[rgba(0,0,0,0.6)] w-full">
              Already have an account?
            </p>
            <p className="leading-[21px] relative shrink-0 text-[16px] text-black w-full hover:underline">
              Sign in
            </p>
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export function FunctionalSignInScreen() {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }

    setLoading(true);
    setError("");

    const result = await signIn(email, password);
    
    setLoading(false);

    if (result.success) {
      // Navigate to dashboard after successful signin
      console.log("Successfully signed in!");
      navigate("/dashboard");
    } else {
      setError(result.error || "Failed to sign in");
    }
  };

  const handleSignUp = () => {
    navigate("/sign-up");
  };

  return (
    <motion.div
      className="absolute inset-0 bg-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <div className="content-stretch flex flex-col items-start justify-between px-[16px] relative min-h-screen">
        {/* Top Section with Logo and Input Fields */}
        <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full">
          {/* Centered Logo */}
          <div className="content-stretch flex flex-col h-[88px] items-start relative shrink-0 w-full">
            <div className="content-stretch flex items-center justify-center py-[16px] relative shrink-0 w-full">
              <div className="h-[56px] relative shrink-0 w-[99.556px]">
                <img 
                  alt="fino logo" 
                  className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" 
                  src={imgFrame8769} 
                />
              </div>
            </div>
          </div>

          {/* Input Fields */}
          <div className="content-stretch flex flex-col gap-[16px] items-start leading-[22px] relative shrink-0 text-[17px] w-full">
            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 w-full">
                <p className="font-['DM_Sans',sans-serif] text-sm text-red-600">{error}</p>
              </div>
            )}

            {/* Email Input */}
            <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
              <p className="font-['DM_Sans',sans-serif] font-semibold relative shrink-0 text-black w-full">
                Your e-mail please
              </p>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setEmailFocused(true)}
                onBlur={() => setEmailFocused(false)}
                placeholder="username@gmail.com"
                disabled={loading}
                className="font-['DM_Sans',sans-serif] font-normal relative shrink-0 w-full bg-transparent border-none outline-none text-black placeholder:text-[rgba(0,0,0,0.6)] p-0 disabled:opacity-50 transition-colors"
              />
              <div className={`h-[1px] w-full transition-colors ${emailFocused ? 'bg-[#ffcf48]' : 'bg-[rgba(0,0,0,0.1)]'}`} />
            </div>

            {/* Password Input */}
            <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
              <p className="font-['DM_Sans',sans-serif] font-semibold relative shrink-0 text-black w-full">
                Your password
              </p>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
                placeholder="Tap to start writing"
                disabled={loading}
                className="font-['DM_Sans',sans-serif] font-normal relative shrink-0 w-full bg-transparent border-none outline-none text-black placeholder:text-[rgba(0,0,0,0.6)] p-0 disabled:opacity-50 transition-colors"
              />
              <div className={`h-[1px] w-full transition-colors ${passwordFocused ? 'bg-[#ffcf48]' : 'bg-[rgba(0,0,0,0.1)]'}`} />
            </div>
          </div>
        </div>

        {/* Bottom Section with Button and Navigation */}
        <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full pb-[16px]">
          {/* Sign In Button */}
          <button
            onClick={handleSignIn}
            disabled={loading}
            className="bg-[#ffcf48] relative rounded-[100px] shrink-0 w-full cursor-pointer hover:bg-[#ffc829] active:bg-[#f0bd1e] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="flex flex-row items-center justify-center size-full">
              <div className="content-stretch flex items-center justify-center p-[10px] relative w-full">
                <p className="font-['DM_Sans',sans-serif] font-normal leading-[21px] relative shrink-0 text-[16px] text-black whitespace-nowrap">
                  {loading ? "Signing in..." : "Sign in"}
                </p>
              </div>
            </div>
          </button>

          {/* Sign Up Link */}
          <button
            onClick={handleSignUp}
            disabled={loading}
            className="content-stretch flex flex-col font-['DM_Sans',sans-serif] font-normal gap-[4px] items-start relative shrink-0 text-center w-full cursor-pointer bg-transparent border-none disabled:opacity-50"
          >
            <p className="leading-[18px] relative shrink-0 text-[13px] text-[rgba(0,0,0,0.6)] w-full">
              Don't have an account?
            </p>
            <p className="leading-[21px] relative shrink-0 text-[16px] text-black w-full hover:underline">
              Sign up
            </p>
          </button>
        </div>
      </div>
    </motion.div>
  );
}