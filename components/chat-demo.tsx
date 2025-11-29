"use client"

import { useState, useRef, useEffect, type FormEvent } from "react"
import { motion, useInView } from "framer-motion"
import { Send, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

interface Message {
  id: number
  role: "user" | "assistant"
  content: string
}

function AnimatedPlaceholder() {
  const [text, setText] = useState("")
  const fullText = "هر سوالی دارید بپرسید..."

  useEffect(() => {
    let index = 0
    const interval = setInterval(() => {
      if (index <= fullText.length) {
        setText(fullText.slice(0, index))
        index++
      } else {
        setTimeout(() => {
          setText("")
          index = 0
        }, 2000)
      }
    }, 100)

    return () => clearInterval(interval)
  }, [])

  return (
    <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground">
      {text}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
        className="inline-block w-0.5 h-5 mr-0.5 bg-muted-foreground align-middle"
      />
    </span>
  )
}

export function ChatDemo() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { amount: 0.3 })
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [isFocused, setIsFocused] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isTyping) return

    const userMessage: Message = {
      id: Date.now(),
      role: "user",
      content: input.trim(),
    }

    setMessages((prev) => [...prev, userMessage])
    const userInput = input.trim()
    setInput("")
    setIsTyping(true)

    // Create assistant message placeholder
    const assistantMessageId = Date.now() + 1
    const assistantMessage: Message = {
      id: assistantMessageId,
      role: "assistant",
      content: "",
    }
    setMessages((prev) => [...prev, assistantMessage])

    try {
      const response = await fetch(
        "https://parsa.api.t.etratnet.ir/user/chat/anonymous?deeper_search=false&project_name=porsyab",
        {
          method: "PATCH",
          headers: {
            accept: "*/*",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messages: [
              {
                role: "user",
                content: userInput,
              },
            ],
          }),
        }
      )

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const reader = response.body?.getReader()
      const decoder = new TextDecoder()
      let accumulatedContent = ""

      if (!reader) {
        throw new Error("No response body")
      }

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value, { stream: true })
        const lines = chunk.split("\n")

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            try {
              const data = JSON.parse(line.slice(6))
              if (data.chunk) {
                accumulatedContent += data.chunk
                setMessages((prev) =>
                  prev.map((msg) =>
                    msg.id === assistantMessageId
                      ? { ...msg, content: accumulatedContent }
                      : msg
                  )
                )
              }
              if (data.done) {
                setIsTyping(false)
                return
              }
            } catch (error) {
              console.error("Error parsing SSE data:", error)
            }
          }
        }
      }

      setIsTyping(false)
    } catch (error) {
      console.error("Error fetching chat response:", error)
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === assistantMessageId
            ? { ...msg, content: "خطا در دریافت پاسخ. لطفا دوباره تلاش کنید." }
            : msg
        )
      )
      setIsTyping(false)
    }
  }

  return (
    <section
      ref={ref}
      className="relative flex h-screen snap-start flex-col items-center justify-center overflow-hidden px-6"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent/5 via-transparent to-transparent" />

      <div className="relative z-10 w-full max-w-xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-8 text-center"
        >
          <span className="mb-4 inline-block text-sm font-medium tracking-[0.2em] text-muted-foreground">
            خودتان امتحان کنید
          </span>
          <h2 className="text-balance text-3xl font-light tracking-tight text-foreground md:text-4xl">
            تفاوت را تجربه کنید
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="overflow-hidden rounded-2xl border border-border bg-card/50 backdrop-blur-sm"
        >
          {/* Messages */}
          <div className="h-64 space-y-3 overflow-y-auto p-4">
            {messages.length === 0 && (
              <div className="flex h-full flex-col items-center justify-center text-center">
                <p className="text-sm text-muted-foreground/60">گفتگو را شروع کنید</p>
              </div>
            )}

            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${message.role === "user" ? "justify-start" : "justify-end"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground"
                  }`}
                >
                  {message.role === "assistant" ? (
                    <div className="text-sm leading-relaxed [&>p]:my-1 [&>p:first-child]:mt-0 [&>p:last-child]:mb-0 [&>h1]:text-base [&>h1]:font-semibold [&>h1]:my-2 [&>h2]:text-sm [&>h2]:font-semibold [&>h2]:my-2 [&>h3]:text-sm [&>h3]:font-medium [&>h3]:my-2 [&>ul]:my-1 [&>ul]:list-disc [&>ul]:list-inside [&>ul]:space-y-0.5 [&>ol]:my-1 [&>ol]:list-decimal [&>ol]:list-inside [&>ol]:space-y-0.5 [&>li]:my-0 [&>code]:text-xs [&>code]:bg-muted/50 [&>code]:px-1 [&>code]:py-0.5 [&>code]:rounded [&>pre]:my-2 [&>pre]:p-2 [&>pre]:bg-muted/30 [&>pre]:rounded [&>pre]:overflow-x-auto [&>pre>code]:bg-transparent [&>pre>code]:p-0 [&>blockquote]:border-r-2 [&>blockquote]:border-muted [&>blockquote]:pr-2 [&>blockquote]:my-2 [&>a]:text-accent [&>a]:underline [&>strong]:font-semibold">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {message.content}
                      </ReactMarkdown>
                    </div>
                  ) : (
                    <p className="text-sm leading-relaxed">{message.content}</p>
                  )}
                </div>
              </motion.div>
            ))}

            {isTyping && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-end">
                <div className="flex items-center gap-1 rounded-2xl bg-secondary px-4 py-2.5">
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground/50 [animation-delay:-0.3s]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground/50 [animation-delay:-0.15s]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground/50" />
                </div>
              </motion.div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="border-t border-border p-3">
            <div className="relative flex gap-2">
              <div className="relative flex-1">
                {!input && !isFocused && <AnimatedPlaceholder />}
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  dir="rtl"
                  className="w-full rounded-xl border-0 bg-secondary/50 px-4 py-3 text-sm text-foreground outline-none ring-1 ring-transparent transition-all focus:bg-secondary focus:ring-accent/50"
                />
              </div>
              <Button
                type="submit"
                size="icon"
                disabled={!input.trim() || isTyping}
                className="h-11 w-11 shrink-0 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-30"
              >
                <Send className="h-4 w-4" />
                <span className="sr-only">ارسال پیام</span>
              </Button>
            </div>
          </form>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 flex flex-col items-center gap-2"
        >
          <span className="text-xs text-muted-foreground/50">ادامه دهید</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          >
            <ChevronDown className="h-5 w-5 text-muted-foreground/50" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
