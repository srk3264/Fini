import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "jsr:@supabase/supabase-js@2";
import * as kv from "./kv_store.tsx";

// Server version: 2.1 - Forcing redeployment to fix JWT handling
const app = new Hono();

// Create Supabase clients
const getSupabaseAdmin = () => {
  return createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
  );
};

const getSupabaseClient = () => {
  return createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_ANON_KEY') ?? '',
  );
};

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Handle OPTIONS preflight requests
app.options("/*", (c) => {
  return c.text("", 200);
});

// Health check endpoint
app.get("/make-server-c028dd1d/health", (c) => {
  return c.json({ status: "ok" });
});

// Test KV store endpoint
app.get("/make-server-c028dd1d/test-kv", async (c) => {
  try {
    console.log("Testing KV store...");
    const testKey = "test:connection";
    const testValue = { message: "KV store is working!", timestamp: new Date().toISOString() };
    
    await kv.set(testKey, testValue);
    console.log("KV set successful");
    
    const retrieved = await kv.get(testKey);
    console.log("KV get result:", retrieved);
    
    await kv.del(testKey);
    console.log("KV delete successful");
    
    return c.json({ 
      success: true, 
      message: "KV store is working correctly",
      testData: retrieved
    });
  } catch (error) {
    console.log(`KV test error: ${error.message}`);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// Sign up endpoint
app.post("/make-server-c028dd1d/auth/signup", async (c) => {
  try {
    const body = await c.req.json();
    const { email, password } = body;

    if (!email || !password) {
      return c.json({ error: "Email and password are required" }, 400);
    }

    const supabase = getSupabaseAdmin();
    
    // Create user with admin API
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      // Automatically confirm the user's email since an email server hasn't been configured.
      email_confirm: true,
    });

    if (error) {
      console.log(`Sign up error: ${error.message}`);
      return c.json({ error: error.message }, 400);
    }

    console.log(`User created successfully: ${email}`);
    
    // Now sign in the user to get a session token
    const supabaseClient = getSupabaseClient();
    const { data: signInData, error: signInError } = await supabaseClient.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      console.log(`Auto sign-in error after signup: ${signInError.message}`);
      // User was created but auto sign-in failed - that's okay, they can sign in manually
      return c.json({ 
        message: "User created successfully",
        user: {
          id: data.user.id,
          email: data.user.email,
        },
        note: "Please sign in to continue"
      });
    }

    console.log(`User created and signed in successfully: ${email}`);
    return c.json({ 
      message: "User created and signed in successfully",
      user: {
        id: signInData.user.id,
        email: signInData.user.email,
      },
      session: {
        access_token: signInData.session.access_token,
        refresh_token: signInData.session.refresh_token,
      }
    });
  } catch (error) {
    console.log(`Sign up error: ${error.message}`);
    return c.json({ error: "Failed to create user" }, 500);
  }
});

// Sign in endpoint
app.post("/make-server-c028dd1d/auth/signin", async (c) => {
  try {
    const body = await c.req.json();
    const { email, password } = body;

    if (!email || !password) {
      return c.json({ error: "Email and password are required" }, 400);
    }

    const supabase = getSupabaseClient();
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.log(`Sign in error: ${error.message}`);
      return c.json({ error: error.message }, 401);
    }

    console.log(`User signed in successfully: ${email}`);
    return c.json({
      message: "Signed in successfully",
      user: {
        id: data.user.id,
        email: data.user.email,
      },
      session: {
        access_token: data.session.access_token,
        refresh_token: data.session.refresh_token,
      }
    });
  } catch (error) {
    console.log(`Sign in error: ${error.message}`);
    return c.json({ error: "Failed to sign in" }, 500);
  }
});

// Sign out endpoint
app.post("/make-server-c028dd1d/auth/signout", async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    const accessToken = authHeader?.split(' ')[1];

    if (!accessToken) {
      return c.json({ error: "No access token provided" }, 401);
    }

    const supabase = getSupabaseClient();
    
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.log(`Sign out error: ${error.message}`);
      return c.json({ error: error.message }, 400);
    }

    console.log("User signed out successfully");
    return c.json({ message: "Signed out successfully" });
  } catch (error) {
    console.log(`Sign out error: ${error.message}`);
    return c.json({ error: "Failed to sign out" }, 500);
  }
});

// Get current user endpoint
app.get("/make-server-c028dd1d/auth/user", async (c) => {
  try {
    console.log("=== GET USER REQUEST ===");
    const authHeader = c.req.header('Authorization');
    console.log("Authorization header:", authHeader ? "Present" : "Missing");
    
    const accessToken = authHeader?.split(' ')[1];
    console.log("Access token extracted:", accessToken ? `Yes (${accessToken.substring(0, 20)}...)` : "No");

    if (!accessToken) {
      console.log("ERROR: No access token provided");
      return c.json({ error: "No access token provided" }, 401);
    }

    // Create a client with the user's access token
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      }
    );
    
    console.log("Calling supabase.auth.getUser()...");
    
    const { data: { user }, error } = await supabase.auth.getUser();

    console.log("getUser result - User:", user ? `${user.email} (${user.id})` : "null");
    console.log("getUser result - Error:", error?.message || "none");

    if (error || !user) {
      console.log(`Get user error: ${error?.message || 'User not found'}`);
      return c.json({ 
        error: error?.message || "User not found",
        code: 401,
        message: "Invalid JWT"
      }, 401);
    }

    console.log(`User retrieved successfully: ${user.email}`);
    return c.json({
      user: {
        id: user.id,
        email: user.email,
      }
    });
  } catch (error) {
    console.log(`Get user exception: ${error.message}`);
    return c.json({ error: "Failed to get user" }, 500);
  }
});

// Save user profile endpoint (POST)
app.post("/make-server-c028dd1d/profile", async (c) => {
  try {
    console.log("=== PROFILE SAVE REQUEST STARTED ===");
    
    const authHeader = c.req.header('Authorization');
    console.log("Authorization header present:", authHeader ? "Yes" : "No");
    
    const accessToken = authHeader?.split(' ')[1];
    console.log("Access token extracted:", accessToken ? "Yes" : "No");

    if (!accessToken) {
      console.log("ERROR: No access token provided");
      return c.json({ error: "No access token provided" }, 401);
    }

    // Create a client with the user's access token
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      }
    );
    
    console.log("Getting user from access token...");
    
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    console.log("Auth result - User:", user ? user.id : "null", "Error:", authError?.message || "none");

    if (authError || !user) {
      console.log(`Authorization error while saving profile: ${authError?.message || 'User not found'}`);
      return c.json({ error: "Unauthorized" }, 401);
    }

    console.log(`Authenticated user: ${user.email} (${user.id})`);

    const body = await c.req.json();
    console.log("Request body received:", JSON.stringify(body, null, 2));
    
    const { nickname, aiPersona, gender, occupation, faiths, relationshipStatus, birthday } = body;

    // Validate required fields (allow optional fields to be missing or empty)
    if (!nickname && !aiPersona && !gender && !occupation && !faiths && !relationshipStatus && !birthday) {
      console.log("ERROR: No profile fields provided");
      return c.json({ error: "At least one profile field is required" }, 400);
    }

    // Create profile data object
    const profileData = {
      nickname: nickname || null,
      aiPersona: aiPersona || null,
      gender: gender || null,
      occupation: occupation || null,
      faiths: faiths || [],
      relationshipStatus: relationshipStatus || null,
      birthday: birthday || null,
      completedOnboarding: true,
      updatedAt: new Date().toISOString(),
    };

    console.log("Profile data to save:", JSON.stringify(profileData, null, 2));

    const kvKey = `user:${user.id}:profile`;
    console.log("KV store key:", kvKey);

    // Check if profile already exists
    console.log("Checking for existing profile...");
    const existingProfile = await kv.get(kvKey);
    console.log("Existing profile found:", existingProfile ? "Yes" : "No");
    
    if (existingProfile) {
      // Merge with existing data
      const mergedData = {
        ...existingProfile,
        ...profileData,
        createdAt: existingProfile.createdAt || new Date().toISOString(),
      };
      console.log("Updating existing profile with merged data...");
      console.log("Calling kv.set with key:", kvKey);
      await kv.set(kvKey, mergedData);
      console.log("✅ KV.SET COMPLETED - Profile updated successfully");
      
      // Verify the save
      const verification = await kv.get(kvKey);
      console.log("Verification - Profile retrieved after save:", verification ? "SUCCESS" : "FAILED");
      
      console.log(`Profile updated successfully for user: ${user.email}`);
      return c.json({ 
        message: "Profile updated successfully",
        profile: mergedData
      });
    } else {
      // Create new profile
      const newProfile = {
        ...profileData,
        createdAt: new Date().toISOString(),
      };
      console.log("Creating new profile...");
      console.log("Calling kv.set with key:", kvKey);
      await kv.set(kvKey, newProfile);
      console.log("✅ KV.SET COMPLETED - Profile created successfully");
      
      // Verify the save
      const verification = await kv.get(kvKey);
      console.log("Verification - Profile retrieved after save:", verification ? "SUCCESS" : "FAILED");
      if (verification) {
        console.log("Verification data:", JSON.stringify(verification, null, 2));
      }
      
      console.log(`Profile created successfully for user: ${user.email}`);
      return c.json({ 
        message: "Profile created successfully",
        profile: newProfile 
      });
    }
  } catch (error) {
    console.log(`!!! EXCEPTION in profile save: ${error.message}`);
    console.log("Error stack:", error.stack);
    return c.json({ error: "Failed to save profile" }, 500);
  }
});

// Get user profile endpoint (GET)
app.get("/make-server-c028dd1d/profile", async (c) => {
  try {
    console.log("=== GET PROFILE REQUEST ===");
    const authHeader = c.req.header('Authorization');
    console.log("Authorization header:", authHeader ? "Present" : "Missing");
    
    const accessToken = authHeader?.split(' ')[1];
    console.log("Access token extracted:", accessToken ? `Yes (${accessToken.substring(0, 20)}...)` : "No");

    if (!accessToken) {
      console.log("ERROR: No access token provided");
      return c.json({ error: "No access token provided" }, 401);
    }

    // Create a client with the user's access token
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      }
    );
    
    console.log("Getting user from token...");
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    console.log("Auth result - User:", user ? `${user.email} (${user.id})` : "null");
    console.log("Auth result - Error:", authError?.message || "none");

    if (authError || !user) {
      console.log(`Authorization error while retrieving profile: ${authError?.message || 'User not found'}`);
      return c.json({ error: "Unauthorized" }, 401);
    }

    // Retrieve profile from KV store
    const kvKey = `user:${user.id}:profile`;
    console.log("Fetching profile with key:", kvKey);
    const profile = await kv.get(kvKey);

    if (!profile) {
      console.log(`No profile found for user: ${user.email}`);
      return c.json({ 
        message: "No profile found",
        profile: null 
      }, 404);
    }

    console.log(`Profile retrieved for user: ${user.email}`);
    return c.json({ 
      message: "Profile retrieved successfully",
      profile 
    });
  } catch (error) {
    console.log(`Error retrieving profile: ${error.message}`);
    return c.json({ error: "Failed to retrieve profile" }, 500);
  }
});

Deno.serve(app.fetch);