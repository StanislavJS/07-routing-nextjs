import NotesClient from "./Notes.client";
import { fetchNotes } from "@/lib/api";
import type { NotesResponse } from "@/types/api";

export default async function NotesPage() {
  const perPage = 12;
  const initialPage = 1;
  const initialSearch = "";

  const initialData: NotesResponse = await fetchNotes(initialPage, initialSearch, perPage);

  return (
    <NotesClient
      initialPage={initialPage}
      initialSearch={initialSearch}
      initialData={initialData}
    />
  );
}


