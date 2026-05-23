"use client"

import { useState } from "react"
import { Copy, Check } from "lucide-react"

export default function CopyEmailButton({ email }: { email: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard API not available — silent fail
    }
  }

  return (
    <button
      onClick={handleCopy}
      aria-label={copied ? "Email copied!" : "Copy email address"}
      className="copy-email-btn"
    >
      {copied
        ? <Check className="w-4 h-4" aria-hidden="true" />
        : <Copy className="w-4 h-4" aria-hidden="true" />}
      {copied && <span className="copied-tooltip" role="status">Copied!</span>}
    </button>
  )
}
