"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"

type Link = {
  id: string
  url: string
  title: string
  created_at: string
}

export default function Home() {
  const [url, setUrl] = useState("")
  const [title, setTitle] = useState("")
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")
  const [links, setLinks] = useState<Link[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadLinks()
  }, [])

  async function loadLinks() {
    const { data } = await supabase
      .from("links")
      .select("*")
      .order("created_at", { ascending: false })
    setLinks(data || [])
    setLoading(false)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!url || !title) return
    setSaving(true)
    setError("")
    const { error } = await supabase
      .from("links")
      .insert({ url, title })
    if (error) {
      setError("Failed to save. Try again.")
    } else {
      setUrl("")
      setTitle("")
      loadLinks()
    }
    setSaving(false)
  }

  async function handleDelete(id: string) {
    await supabase.from("links").delete().eq("id", id)
    setLinks(links.filter((link) => link.id !== id))
  }

  return (
    <main className="max-w-xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-semibold mb-8">My Link Saver</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 mb-10">
        <input
          type="url"
          placeholder="https://example.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-gray-400"
        />
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-gray-400"
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          disabled={saving}
          className="bg-gray-900 text-white rounded-lg px-4 py-2.5 text-sm font-medium hover:bg-gray-700 transition-colors disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save link"}
        </button>
      </form>
      {loading ? (
        <p className="text-sm text-gray-400">Loading links...</p>
      ) : links.length === 0 ? (
        <p className="text-sm text-gray-400">No links saved yet.</p>
      ) : (
        <ul className="flex flex-col gap-3">
          {links.map((link) => (
            <li key={link.id} className="flex items-start justify-between gap-4 border border-gray-100 rounded-lg px-4 py-3">
              <div className="flex flex-col gap-1 min-w-0">
                <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-gray-900 hover:underline truncate">
                  {link.title}
                </a>
                <span className="text-xs text-gray-400 truncate">{link.url}</span>
              </div>
              <button onClick={() => handleDelete(link.id)} className="text-xs text-gray-400 hover:text-red-500 transition-colors shrink-0 mt-0.5">
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}