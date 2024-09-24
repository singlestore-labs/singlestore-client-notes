type NotePageProps = {
  params: { id: string };
};

export default async function NotePage({ params }: NotePageProps) {
  const id = Number(params.id);

  return <div>{id}</div>;
}
