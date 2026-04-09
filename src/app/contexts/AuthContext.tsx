import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { account } from "../utils/appwrite";
import type { Models } from "appwrite";

interface User {
  id: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  accessToken: string | null;
  signUp: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signOut: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Check if user is already logged in on mount
  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    try {
      const session = await account.get();
      setUser({ id: session.$id, email: session.email });
      // For Appwrite, we don't use JWT tokens in the same way
      // The session is managed by Appwrite SDK
      setAccessToken("appwrite-session-active");
    } catch (error) {
      // No active session
      setUser(null);
      setAccessToken(null);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      console.log("Starting sign up process for:", email);
      
      // Create account with Appwrite
      await account.create(
        'unique()', // Let Appwrite generate unique ID
        email,
        password,
        undefined // Optional name parameter
      );

      console.log("Account created, now signing in...");
      
      // Automatically sign in after signup
      const signInResult = await signIn(email, password);
      return signInResult;
    } catch (error: any) {
      console.error("Sign up error:", error);
      return { 
        success: false, 
        error: error.message || "Failed to sign up" 
      };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      console.log("Starting sign in process for:", email);
      
      // Delete any existing session first
      try {
        await account.deleteSession('current');
        console.log("Deleted existing session");
      } catch (e) {
        // No existing session, that's fine
        console.log("No existing session to delete");
      }
      
      // Create email session
      const session = await account.createEmailPasswordSession(email, password);
      
      console.log("Sign in successful!");
      
      // Get user data
      const userData = await account.get();
      
      setUser({ id: userData.$id, email: userData.email });
      setAccessToken("appwrite-session-active");
      
      // Store session info in localStorage for PostSignupOnboarding
      localStorage.setItem("access_token", session.$id);
      localStorage.setItem("user_id", userData.$id);
      
      console.log("User data set:", { id: userData.$id, email: userData.email });
      console.log("Session stored in localStorage");

      return { success: true };
    } catch (error: any) {
      console.error("Sign in error:", error);
      return { 
        success: false, 
        error: error.message || "Failed to sign in" 
      };
    }
  };

  const signOut = async () => {
    try {
      await account.deleteSession('current');
      
      // Clear local state
      setUser(null);
      setAccessToken(null);
      
      // Clear localStorage
      localStorage.removeItem("access_token");
      localStorage.removeItem("user_id");
      
      console.log("Signed out successfully");
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, accessToken, signUp, signIn, signOut, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}