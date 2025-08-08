import NotesClient from "./Notes.client";


type NotesPageProps = {
  params: { slug?: string[] };
};

export default function NotesPage({ params }: NotesPageProps) {
  // Якщо slug === ["All"], то фільтрація не застосовується
  const tag = params.slug?.[0] === "All" ? undefined : params.slug?.[0];

  return <NotesClient tag={tag} />;
}

