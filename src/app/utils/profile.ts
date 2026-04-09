import { databases, DATABASE_ID, PROFILES_COLLECTION_ID, ID, account } from "./appwrite";

export interface UserProfile {
  nickname: string | null;
  aiPersona: string | null;
  gender: string | null;
  occupation: string | null;
  faiths: string[];
  relationshipStatus: string | null;
  birthday: string | null;
  notificationTimes: string[];
  completedOnboarding: boolean;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Save user profile to Appwrite
 */
export async function saveProfile(
  accessToken: string,
  profileData: Partial<Omit<UserProfile, "createdAt" | "updatedAt" | "completedOnboarding">>
): Promise<{ success: boolean; profile?: UserProfile; error?: string }> {
  try {
    console.log("Saving profile with data:", profileData);
    
    // Get current user
    const user = await account.get();
    const userId = user.$id;
    
    console.log("User ID:", userId);
    
    // Check if profile already exists
    try {
      const existingProfile = await databases.getDocument(
        DATABASE_ID,
        PROFILES_COLLECTION_ID,
        userId
      );
      
      // Update existing profile
      console.log("Updating existing profile...");
      const updatedProfile = await databases.updateDocument(
        DATABASE_ID,
        PROFILES_COLLECTION_ID,
        userId,
        {
          ...profileData,
          completedOnboarding: true,
        }
      );
      
      console.log("Profile updated successfully:", updatedProfile);
      return { success: true, profile: updatedProfile as any };
    } catch (error: any) {
      // Profile doesn't exist, create it
      if (error.code === 404) {
        console.log("Creating new profile...");
        const newProfile = await databases.createDocument(
          DATABASE_ID,
          PROFILES_COLLECTION_ID,
          userId, // Use userId as document ID
          {
            ...profileData,
            completedOnboarding: true,
          }
        );
        
        console.log("Profile created successfully:", newProfile);
        return { success: true, profile: newProfile as any };
      }
      throw error;
    }
  } catch (error: any) {
    console.error("Error saving profile:", error);
    const errorMessage = error.message || "Failed to save profile";
    return { success: false, error: errorMessage };
  }
}

/**
 * Get user profile from Appwrite
 */
export async function getProfile(
  accessToken: string
): Promise<{ success: boolean; profile?: UserProfile | null; error?: string }> {
  try {
    console.log("=== FETCHING PROFILE ===");
    
    // Get current user
    const user = await account.get();
    const userId = user.$id;
    
    console.log("Fetching profile for user:", userId);
    
    // Get profile document
    const profile = await databases.getDocument(
      DATABASE_ID,
      PROFILES_COLLECTION_ID,
      userId
    );
    
    console.log("Profile retrieved successfully:", profile);
    return { success: true, profile: profile as any };
  } catch (error: any) {
    if (error.code === 404) {
      // No profile found
      console.log("No profile found (404)");
      return { success: true, profile: null };
    }
    
    console.error("Exception getting profile:", error);
    return { success: false, error: error.message || "Failed to get profile" };
  }
}