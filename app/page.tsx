import { revalidateTag } from "next/cache";
import { Suspense } from "react";

import { NoteWelcome } from "@/app/note/_components/welcome";
import { notesTable } from "@/lib/db";

export default async function Home() {
  // await notesTable.truncate();

  return (
    <div className="flex h-full items-center justify-center bg-zinc-50 p-4">
      <Suspense>
        <NoteWelcome />
      </Suspense>
    </div>
  );
}
