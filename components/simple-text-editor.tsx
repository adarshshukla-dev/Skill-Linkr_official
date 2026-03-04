"use client"

import { useRef } from "react"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Bold, Heading1, Heading2, Italic } from "lucide-react"

interface SimpleTextEditorProps {
  value: string
  onChange: (value: string) => void
  label?: string
  placeholder?: string
}

export function SimpleTextEditor({ value, onChange, label, placeholder }: SimpleTextEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const insertFormatting = (tag: string) => {
    if (!textareaRef.current) return

    const textarea = textareaRef.current
    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = value.substring(start, end)

    let newText = value
    let newCursorPos = 0

    switch (tag) {
      case "bold":
        newText = value.substring(0, start) + `<strong>${selectedText}</strong>` + value.substring(end)
        newCursorPos = start + 8 + selectedText.length
        break
      case "italic":
        newText = value.substring(0, start) + `<em>${selectedText}</em>` + value.substring(end)
        newCursorPos = start + 4 + selectedText.length
        break
      case "h1":
        newText = value.substring(0, start) + `<h1>${selectedText}</h1>` + value.substring(end)
        newCursorPos = start + 4 + selectedText.length
        break
      case "h2":
        newText = value.substring(0, start) + `<h2>${selectedText}</h2>` + value.substring(end)
        newCursorPos = start + 4 + selectedText.length
        break
    }

    onChange(newText)

    // Set focus back to textarea and position cursor after the inserted tag
    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(newCursorPos, newCursorPos)
    }, 0)
  }

  return (
    <div className="space-y-2">
      {label && <Label>{label}</Label>}

      <div className="space-y-2">
        <div className="flex flex-wrap gap-2 border-b pb-2">
          <Button type="button" variant="outline" size="sm" onClick={() => insertFormatting("bold")} title="Bold">
            <Bold className="h-4 w-4" />
          </Button>
          <Button type="button" variant="outline" size="sm" onClick={() => insertFormatting("italic")} title="Italic">
            <Italic className="h-4 w-4" />
          </Button>
          <Button type="button" variant="outline" size="sm" onClick={() => insertFormatting("h1")} title="Heading 1">
            <Heading1 className="h-4 w-4" />
          </Button>
          <Button type="button" variant="outline" size="sm" onClick={() => insertFormatting("h2")} title="Heading 2">
            <Heading2 className="h-4 w-4" />
          </Button>
        </div>

        <Textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="min-h-[200px] font-mono"
          rows={10}
        />
      </div>

      <div className="text-xs text-muted-foreground">
        <p>Use the buttons above to add formatting or directly type HTML tags.</p>
        <p>Supported tags: &lt;strong&gt; (bold), &lt;em&gt; (italic), &lt;h1&gt;, &lt;h2&gt;</p>
      </div>
    </div>
  )
}
