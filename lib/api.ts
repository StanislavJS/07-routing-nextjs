import axios from "axios";
import type { Note, NewNoteData } from "../types/note";

const BASE_URL = "https://notehub-public.goit.study/api/notes";
const TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

if (!TOKEN) {
  throw new Error("NEXT_PUBLIC_NOTEHUB_TOKEN is not defined in environment variables");
}

const noteServiceClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
});

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (
  page = 1,
  query = '',
  perPage = 12
): Promise<FetchNotesResponse> => {
  const params: Record<string, string | number> = { page, perPage };
  if (query.trim()) params.search = query;

  const res = await noteServiceClient.get<FetchNotesResponse>('/', { params });
  return res.data;
};

export const createNote = async (noteData: NewNoteData): Promise<Note> => {
  const res = await noteServiceClient.post<Note>('/', noteData);
  return res.data;
};

//noteId тип string
export const deleteNote = async (noteId: string): Promise<Note> => {
  const res = await noteServiceClient.delete<Note>(`/${noteId}`);
  return res.data;
};

//id тип string
export const fetchNoteById = async (id: string): Promise<Note> => {
  const res = await noteServiceClient.get<Note>(`/${id}`);
  return res.data;
};
