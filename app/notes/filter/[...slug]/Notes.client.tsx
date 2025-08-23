'use client';

import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';
import type { NotesResponse } from '@/types/note';

import { fetchNotes } from '@/lib/api';
import NoteList from '@/components/NoteList/NoteList';
import Modal from '@/components/Modal/Modal';
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import NoteForm from '@/components/NoteForm/NoteForm';
import css from '@/components/NotePage/NotePage.module.css';

type NotesClientProps = {
  initialPage: number;
  initialSearch: string;
  initialTag: string;
  initialData?: NotesResponse; // данные с сервера
};

export default function NotesClient({
  initialPage,
  initialSearch,
  initialTag,
  initialData,
}: NotesClientProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [currentTag, setCurrentTag] = useState(initialTag);
  const [debounceSearchTerm] = useDebounce(searchTerm, 1000);
  const perPage = 12;

  // Обновление тега при изменении пропа
  useEffect(() => {
    setCurrentTag(initialTag);
    setCurrentPage(1);
    setSearchTerm('');
  }, [initialTag]);

  // useQuery без keepPreviousData и корректный initialData
  const query = useQuery({
    queryKey: ['notes', debounceSearchTerm, currentPage, currentTag],
    queryFn: () =>
      fetchNotes(
        currentPage,
        debounceSearchTerm,
        perPage,
        currentTag === 'All' ? undefined : currentTag
      ),
    initialData: initialData ?? undefined, // TS теперь не ругается
  });

  const data = query.data as NotesResponse | undefined;

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSearchChange = (newTerm: string) => {
    setSearchTerm(newTerm);
    setCurrentPage(1);
  };

  const notesExist = !!data?.notes?.length;
  const totalPages = data?.totalPages ?? 1;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={searchTerm} onChange={handleSearchChange} />
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            pageCount={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
        <button className={css.button} onClick={openModal}>
          Create note +
        </button>
      </header>

      {query.isLoading && <p>Loading notes...</p>}
      {query.isError && <p>Error loading notes.</p>}

      {notesExist ? (
        <NoteList notes={data!.notes} onSelectNote={() => {}} />
      ) : (
        !query.isLoading && <p className={css.emptyMessage}>No notes found.</p>
      )}

      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm onClose={closeModal} />
        </Modal>
      )}
    </div>
  );
}
