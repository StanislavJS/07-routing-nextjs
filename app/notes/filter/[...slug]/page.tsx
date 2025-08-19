import { fetchNotes } from '@/lib/api';
import NotesClient from './Notes.client';
import type { NotesResponse } from '@/types/api';

export default async function NotesFilterPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string[] }>;
  searchParams: Promise<{ page?: string; search?: string }>;
}) {
  const { slug } = await params;
  const { page: rawPage, search: rawSearch } = await searchParams;

  const page = Number(rawPage) || 1;
  const search = rawSearch || '';

  let tag: string | undefined = slug[0];
  if (tag === 'All') tag = undefined;

  const initialData: NotesResponse = await fetchNotes(page, search, 12, tag);

  return (
    <NotesClient
      initialPage={page}
      initialSearch={search}
      initialTag={tag ?? 'All'}
      initialData={initialData}
    />
  );
}

