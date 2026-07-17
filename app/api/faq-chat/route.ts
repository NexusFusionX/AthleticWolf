import { NextRequest, NextResponse } from "next/server";
import { packages } from "@/app/data/packages";
import { programs } from "@/app/data/programs";

const MODEL = "llama-3.3-70b-versatile";

function buildSystemPrompt() {
  const packagesText = packages
    .map(
      (p) =>
        `- ${p.name} ($${p.price}/month, 6-month package, value $${p.value}): ${p.tagline} Features: ${p.features.join(", ")}.`
    )
    .join("\n");

  const programsText = programs
    .map((p) => `- ${p.title}: ${p.desc}`)
    .join("\n");

  return `You are the AI assistant for Athletic Wolf, an online personal training and nutrition coaching business. Answer visitor questions helpfully, accurately, and concisely (2-4 sentences unless more detail is clearly needed).

BUSINESS INFO:
- Fully online, ISSA-certified 1:1 personal training and nutrition coaching. No gym membership required, works worldwide.
- Every client completes a short intake assessment (goals, experience, schedule, equipment, dietary preferences, injuries) before their coach builds a personalized plan.
- Plans are typically ready within 24-48 hours after checkout.
- Packages are 6-month coaching packages, billed monthly.

PACKAGES:
${packagesText}

PROGRAMS / SPECIALTIES:
${programsText}

RULES:
- Only answer questions related to Athletic Wolf's coaching services, packages, programs, how the process works, or general fitness/nutrition questions a prospective client might ask.
- If asked something unrelated to fitness coaching or this business, politely redirect: say you're here to help with questions about Athletic Wolf's coaching programs.
- Never invent pricing, features, or policies not listed above. If you don't know something specific (e.g. exact refund policy), say the visitor should contact the team directly rather than guessing.
- Do not provide medical advice; for injury or medical conditions, recommend consulting a doctor alongside their coach.
- Keep answers friendly, confident, and concise — this is a chat widget, not an essay.`;
}

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "AI chat is not configured yet." },
        { status: 503 }
      );
    }

    const body = await req.json();
    const message = typeof body?.message === "string" ? body.message.trim() : "";
    const history = Array.isArray(body?.history) ? body.history : [];

    if (!message) {
      return NextResponse.json({ error: "Message is required." }, { status: 400 });
    }
    if (message.length > 1000) {
      return NextResponse.json({ error: "Message is too long." }, { status: 400 });
    }

    const messages = [
      { role: "system", content: buildSystemPrompt() },
      ...history
        .filter(
          (m: any) =>
            m &&
            (m.role === "user" || m.role === "model") &&
            typeof m.text === "string"
        )
        .slice(-10)
        .map((m: any) => ({
          role: m.role === "model" ? "assistant" : "user",
          content: m.text,
        })),
      { role: "user", content: message },
    ];

    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: MODEL,
        messages,
        temperature: 0.4,
        max_tokens: 400,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error("Groq API error:", res.status, errText);
      return NextResponse.json(
        { error: "The AI assistant is temporarily unavailable. Please try again shortly." },
        { status: 502 }
      );
    }

    const data = await res.json();
    const reply =
      data?.choices?.[0]?.message?.content ??
      "Sorry, I couldn't generate a response. Please try rephrasing your question.";

    return NextResponse.json({ reply });
  } catch (err) {
    console.error("FAQ chat error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
