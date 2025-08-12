import { fetchNotes } from '@/lib/api';
import NotesClient from './Notes.client';
import type { NotesResponse } from '@/types/api';

export default async function NotesFilterPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug?: string[] }>;
  searchParams: Promise<{ page?: string; search?: string }>;
}) {
  const awaitedParams = await params;
  const awaitedSearchParams = await searchParams;

  const page = Number(awaitedSearchParams.page) || 1;
  const search = awaitedSearchParams.search || '';

  let tag = awaitedParams.slug?.[0];
  if (tag === 'All') {
    tag = undefined;
  }

  const initialData: NotesResponse = await fetchNotes(page, search, 12, tag);

  return (
    <NotesClient
      initialPage={page}
      initialSearch={search}
      initialTag={tag}
      initialData={initialData}
    />
  );
}



