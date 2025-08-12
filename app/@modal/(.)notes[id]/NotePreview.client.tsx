'use client';
import { fetchNoteById } from '@/lib/api';
import { useRouter } from 'next/navigation';
import css from '../../../components/NotePreview/NotePreview.module.css';
import Modal from '@/components/Modal/Modal';
import { useQuery } from '@tanstack/react-query';

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
        {isLoading && <p>Loading...</p>}
        {error && <p>Something went wrong.</p>}
        {note && (
          <>
            <h2>{note.title}</h2>
            <p>{note.content}</p>
            <p>
              {note.updatedAt
                ? `Updated: ${new Date(note.updatedAt).toLocaleString()}`
                : `Created: ${new Date(note.createdAt).toLocaleString()}`}
            </p>
            <button onClick={close}>Close</button>
          </>
        )}
      </div>
    </Modal>
  );
}
