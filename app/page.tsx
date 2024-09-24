import { Suspense } from "react";

import { NoteWelcome } from "@/app/note/_components/welcome";

export default function Home() {
  return (
    <div className="flex h-full items-center justify-center bg-zinc-50 p-4">
      <Suspense>
        <NoteWelcome />
      </Suspense>
    </div>
  );
}
