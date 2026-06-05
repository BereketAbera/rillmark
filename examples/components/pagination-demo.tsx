"use client"
import { useState } from "react"
import { Pagination } from "rillmark/pagination"

const notes = ["Tidal pools at first light", "An unexpected nesting site", "Walking the northern edge", "Spring growth survey", "Stories from the harbor", "A map of returning birds"]

export default function ComponentDemo() {
  const [page, setPage] = useState(1)
  return <div className="w-full space-y-5">
    <ul className="space-y-3 text-sm">{notes.slice((page - 1) * 2, page * 2).map((note) => <li key={note} className="rounded-lg border border-border p-4">{note}</li>)}</ul>
    <Pagination page={page} pageCount={3} onPageChange={setPage} />
  </div>
}
