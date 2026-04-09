import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import { getProfile, UserProfile } from "../utils/profile";

export function Dashboard() {
  const navigate = useNavigate();
  const { user, accessToken, signOut } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProfile = async () => {
      console.log("=== DASHBOARD: LOADING PROFILE ===");
      console.log("accessToken from context:", accessToken ? `Found (${accessToken.substring(0, 30)}...)` : "NULL");
      console.log("localStorage token:", localStorage.getItem("access_token") ? "Found" : "NULL");
      
      if (!accessToken) {
        console.log("No access token, redirecting to sign in");
        navigate("/sign-in");
        return;
      }

      console.log("Loading user profile...");
      const result = await getProfile(accessToken);

      if (result.success) {
        console.log("Profile loaded:", result.profile);
        setProfile(result.profile || null);
      } else {
        console.error("Failed to load profile:", result.error);
        setError(result.error || "Failed to load profile");
      }

      setLoading(false);
    };

    loadProfile();
  }, [accessToken, navigate]);

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <p className="font-['DM_Sans',sans-serif] text-lg text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-white p-8">
      <div className="w-full max-w-md">
        <h1 className="font-['Museo_Moderno',sans-serif] text-3xl font-bold text-center mb-8">
          fino
        </h1>

        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <h2 className="font-['DM_Sans',sans-serif] text-xl font-semibold mb-4">
            Welcome to Dashboard!
          </h2>

          {user && (
            <div className="mb-4">
              <p className="font-['DM_Sans',sans-serif] text-sm text-gray-600">
                Email: <span className="font-semibold text-black">{user.email}</span>
              </p>
              <p className="font-['DM_Sans',sans-serif] text-sm text-gray-600">
                User ID: <span className="font-mono text-xs">{user.id}</span>
              </p>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
              <p className="font-['DM_Sans',sans-serif] text-sm text-red-600">{error}</p>
            </div>
          )}

          {profile ? (
            <div className="border-t border-gray-200 pt-4">
              <h3 className="font-['DM_Sans',sans-serif] text-lg font-semibold mb-3 text-green-600">
                ✅ Profile Found in KV Store!
              </h3>
              <div className="space-y-2">
                <p className="font-['DM_Sans',sans-serif] text-sm">
                  <span className="font-semibold">Nickname:</span> {profile.nickname || "N/A"}
                </p>
                <p className="font-['DM_Sans',sans-serif] text-sm">
                  <span className="font-semibold">AI Persona:</span> {profile.aiPersona || "N/A"}
                </p>
                <p className="font-['DM_Sans',sans-serif] text-sm">
                  <span className="font-semibold">Gender:</span> {profile.gender || "N/A"}
                </p>
                <p className="font-['DM_Sans',sans-serif] text-sm">
                  <span className="font-semibold">Occupation:</span> {profile.occupation || "N/A"}
                </p>
                <p className="font-['DM_Sans',sans-serif] text-sm">
                  <span className="font-semibold">Faiths:</span> {profile.faiths.join(", ") || "N/A"}
                </p>
                <p className="font-['DM_Sans',sans-serif] text-sm">
                  <span className="font-semibold">Relationship:</span> {profile.relationshipStatus || "N/A"}
                </p>
                <p className="font-['DM_Sans',sans-serif] text-sm">
                  <span className="font-semibold">Birthday:</span> {profile.birthday || "N/A"}
                </p>
                <p className="font-['DM_Sans',sans-serif] text-xs text-gray-500 mt-4">
                  Created: {new Date(profile.createdAt).toLocaleString()}
                </p>
                <p className="font-['DM_Sans',sans-serif] text-xs text-gray-500">
                  Updated: {new Date(profile.updatedAt).toLocaleString()}
                </p>
              </div>
            </div>
          ) : (
            <div className="border-t border-gray-200 pt-4">
              <p className="font-['DM_Sans',sans-serif] text-sm text-gray-600">
                No profile data found. Please complete onboarding.
              </p>
            </div>
          )}
        </div>

        <button
          onClick={handleSignOut}
          className="bg-gray-200 hover:bg-gray-300 active:bg-gray-400 w-full rounded-full py-3 px-6 font-['DM_Sans',sans-serif] font-medium transition-all"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}