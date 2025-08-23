'use client';

import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import Modal from '@/components/Modal/Modal';
import css from '@/components/NotePreview/NotePreview.module.css';

type Props = { noteId: string };

export default function NotePreview({ noteId }: Props) {
  const router = useRouter();

  const { data: note, isLoading, error } = useQuery({
    queryKey: ['note', noteId],
    queryFn: () => fetchNoteById(noteId),
    refetchOnMount: false,
  });

  const close = () => router.back();

  return (
    <Modal onClose={close}>
      <div className={css.container}>
        {/* Кнопка закрытия всегда доступна */}
        <button className={css.closeButton} onClick={close}>
          Close
        </button>

        {isLoading && <p>Loading...</p>}
        {error && <p>Something went wrong.</p>}

        {note && (
          <>
            <h2>{note.title}</h2>
            <p>{note.content}</p>
            {note.tag && <p className={css.tag}>Tag: {note.tag}</p>}
            <p>
              {note.updatedAt
                ? `Updated: ${new Date(note.updatedAt).toLocaleString()}`
                : `Created: ${new Date(note.createdAt).toLocaleString()}`}
            </p>
          </>
        )}
      </div>
    </Modal>
  );
}
