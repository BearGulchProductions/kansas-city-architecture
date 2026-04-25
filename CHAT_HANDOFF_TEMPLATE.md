# Chat Handoff Cassette — Reusable Briefing Format

**Use case:** popping into a smaller-model Chat window for a focused brainstorm without burning Cowork-Opus tokens. Fill in the blanks, paste, ask the question. Don't paste HANDOFF.md or this whole site's history — only what the question needs.

---

## How to use
1. Copy everything between the `===PASTE BELOW===` and `===END PASTE===` markers
2. Fill in the `[FILL]` blanks
3. Paste into a fresh Chat window as the FIRST message
4. Ask your one question

---

===PASTE BELOW===

## Project: Look Up, Kansas City
A static SVG-illustrated site documenting Kansas City's neighborhoods, fountains, buildings, history, and overlooks. Each district has a "signature scene" — a hand-built SVG composition with TOD (time-of-day) cycling on a 40-second loop, animated micro-elements (streetcars, jammers, clouds, etc.), and a canonical hero wrapper pattern. Implementation is split across three roles: **Claude Code** does the actual SVG/CSS/HTML edits, **Claude (Opus, in Cowork)** does heavy scoping and visual judgment, **Claude Chat (smaller model)** does focused short-form brainstorms. I (Brian) sit between and steer.

## Where we are
- Most recent shipped version: **v[FILL — e.g., v24]**
- Most recent shipped scene work: **[FILL — e.g., West Bottoms quality pass + UYA anchor on 18th & Vine]**
- In flight: **[FILL — e.g., Crossroads v25 round 1 block-out / 18th & Vine sign accuracy fix / sun+moon clip-path]**
- The repo's `HANDOFF.md` is the long-form record (don't ask to read it). `STATE.md` if present is the short-form digest.

## My one specific question
**[FILL — single question, single decision. Don't dump multiple at once.]**

## Constraints that bound the answer
- [FILL — 3–5 bullets only the ones that matter for THIS question]
- Examples: "must match existing palette tokens", "must read at mobile viewBox 375px", "must not duplicate existing scene's signature move", "must reuse `.hill-walker` grammar"

## Anti-patterns from prior sessions (don't suggest these)
- [FILL — 1–2 explicit no-gos pulled from the planning brief or HANDOFF]

## What I want back
**[FILL — exact format. Examples: "Three options ranked, 2 sentences each, no code." / "A locked decision + one paragraph rationale." / "Yes/no with one reason."]**

===END PASTE===

---

## Token-efficiency tips for the Chat session itself

- **Don't ask Chat to read whole files.** Paste the relevant excerpt inline. Chat with a smaller model burns context fast on ingestion.
- **One question per conversation.** Multi-question prompts dilute every answer. Open new chats for new questions.
- **When Chat returns a recommendation, paste IT BACK to Cowork or Code as the answer** — not the whole conversation. Compress before forwarding.
- **If Chat's first answer feels wrong, say what's off in one sentence.** Don't restart the prompt.
- **End each session by asking Chat to compress the conclusion to ≤5 lines you can paste forward.** Save those 5 lines somewhere durable (a workspace file like `DECISIONS.md` or in the relevant planning doc).
- **If the question gets bigger than a small-model can handle, escalate to Cowork-Opus instead of fighting it.** Opus tokens are expensive but they end the question; small-model tokens are cheap but a wrong answer costs more than the saved tokens.

---

## What NOT to put in the cassette

- Code listings or SVG fragments (paste a focused excerpt only if directly relevant to the question — never the full scene)
- Multiple questions stacked
- The whole HANDOFF.md (Chat won't read it well at small-model size, and the briefing should already extract what matters)
- Long backstory about prior versions unless the question depends on a specific prior decision
