import { useQuery } from "@tanstack/react-query";
import { getNotes } from "@/lib/api";
import css from "./Notes.module.css";

type NotesClientProps = {
  tag?: string;
};

export default function NotesClient({ tag }: NotesClientProps) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", tag],
    queryFn: () => getNotes(tag),
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading notes</p>;

  return (
    <ul className={css.notesList}>
      {(data ?? []).map((note) => (
        <li key={note.id}>{note.title}</li>
      ))}
    </ul>
  );
}
