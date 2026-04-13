import { databases, DATABASE_ID, JOURNAL_COLLECTION_ID, ID, account } from "./appwrite";
import { Query } from "appwrite";
import { Permission, Role } from "appwrite";

export type JournalSegment = { text: string; tag?: "reflections" | "health" | "todo" | "reminders" };

export interface JournalDoc {
  $id: string;
  $createdAt: string;
  $updatedAt: string;

  userId: string;
  content: string;
  segments?: string;
  tags?: string[];
  mood?: string;
  localTime?: string;

  $collectionId: string;
  $databaseId: string;
  $permissions: string[];
  $sequence: number;
}

export async function createEntry(params: {
  content: string;
  segments?: string;
  localTime?: string;
  mood?: string; 
  /* tags?: string[]; */
}) {
  const user = await account.get();
  const userId = user.$id;
  const permissions = [
    Permission.read(Role.user(userId)),
    Permission.update(Role.user(userId)),
    Permission.delete(Role.user(userId)),
  ];
  const payload: Record<string, any> = {
    userId,
    content: params.content,
  };
  if (params.segments && params.segments.length) {
    payload.segments = params.segments;
  }
  if (params.localTime) {
    payload.localTime = params.localTime;
  }
  if (params.mood) {
    payload.mood = params.mood;
  }

  try {
    console.log("journal.create:start", {
      db: DATABASE_ID,
      col: JOURNAL_COLLECTION_ID,
      hasSegments: !!payload.segments,
      hasLocalTime: !!payload.localTime,
    });
    const doc = await databases.createDocument(
      DATABASE_ID,
      JOURNAL_COLLECTION_ID,
      ID.unique(),
      payload as any,
      permissions
    );
    console.log("journal.create:ok", (doc as any).$id);
    return doc as unknown as JournalDoc;
  } catch (error) {
    console.error("journal.create:err", error);
    throw error;
  }
}

export async function listMyEntries() {
// Ensure session and get user id
const { $id: userId } = await account.get();

const out: JournalDoc[] = [];
const pageSize = 100;
let cursor: string | null = null;

while (true) {
const queries: any[] = [
Query.equal("userId", userId),
Query.orderDesc("$createdAt"),
Query.limit(pageSize),
];
if (cursor) queries.push(Query.cursorAfter(cursor));

const res = await databases.listDocuments(DATABASE_ID, JOURNAL_COLLECTION_ID, queries);
const docs = res.documents as unknown as JournalDoc[];

out.push(...docs);
if (docs.length < pageSize) break;
cursor = docs[docs.length - 1].$id;
}
return out;
}

export async function updateEntry(id: string, patch: Partial<Omit<JournalDoc, "$id" | "$createdAt" | "$updatedAt" | "userId">>) {
  const doc = await databases.updateDocument(
    DATABASE_ID,
    JOURNAL_COLLECTION_ID,
    id,
    { ...patch } as any
  );
  return doc as unknown as JournalDoc;
}

export async function deleteEntry(id: string) {
  await databases.deleteDocument(DATABASE_ID, JOURNAL_COLLECTION_ID, id);
}
