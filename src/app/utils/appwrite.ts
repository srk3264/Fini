import { Client, Account, Databases, ID } from 'appwrite';

// Appwrite configuration
const APPWRITE_ENDPOINT = 'https://sfo.cloud.appwrite.io/v1';
const APPWRITE_PROJECT_ID = '69c1cb9a00318d9dea10';
const DATABASE_ID = '69c1cbed0025338ed999';
const PROFILES_COLLECTION_ID = 'profiles';
const JOURNAL_COLLECTION_ID = 'journal_entries';

// Initialize Appwrite Client
const client = new Client()
  .setEndpoint(APPWRITE_ENDPOINT)
  .setProject(APPWRITE_PROJECT_ID);

// Initialize services
export const account = new Account(client);
export const databases = new Databases(client);

// Export IDs for use in other files
export { DATABASE_ID, PROFILES_COLLECTION_ID, JOURNAL_COLLECTION_ID, ID };
