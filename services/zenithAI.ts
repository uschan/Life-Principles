import { GoogleGenAI } from "@google/genai";
import { principles } from '../data';
import { PrincipleItem } from '../types';

// Declare process to satisfy TypeScript for the replaced variable
declare var process: {
  env: {
    API_KEY?: string;
  }
};

// --- Types ---
export interface ZenithAnalysis {
  verdict: 'APPROVED' | 'CAUTION' | 'REJECTED';
  score: number;
  analysis: string;
  relevantPrincipleIds: number[];
  riskFactors: string[];
}

// --- Configuration ---
const SYSTEM_INSTRUCTION = `
You are the Zenith Protocol Kernel, an anti-fragile decision support system. 
Your goal is to audit the user's decision against 35 specific Life Principles.

Role: Ruthless, rational, architect-style advisor.
Tone: Cold, precise, technical, "Cyberpunk/Industrial".
Language: SIMPLIFIED CHINESE (简体中文).

Task:
1. Analyze the user's input (a decision or dilemma).
2. Check against the 35 Principles (provided in context).
3. Identify aligned principles (supporting the decision).
4. Identify violated principles (risks).
5. Output a structured JSON.

Principles Context:
${principles.map(p => `ID ${p.id} (${p.category}): ${p.title} - ${p.content}`).join('\n')}

Rules:
- CRITICAL: The 'verdict' field MUST be strictly one of: 'APPROVED', 'CAUTION', 'REJECTED' (Keep English).
- CRITICAL: The 'analysis' and 'riskFactors' content MUST be in SIMPLIFIED CHINESE (简体中文).
- If a decision is "Hesitant", apply Principle #17 (Absolute Yes).
- If a decision has high downside, apply Principle #28 (Lower Bound).
- If a decision relies on external validation, apply Principle #9 & #35.
- Output purely valid JSON.
`;

const RESPONSE_SCHEMA_JSON = {
  type: "OBJECT" as const,
  properties: {
    verdict: { type: "STRING", enum: ['APPROVED', 'CAUTION', 'REJECTED'] },
    score: { type: "INTEGER" },
    analysis: { type: "STRING" },
    relevantPrincipleIds: { 
      type: "ARRAY", 
      items: { type: "INTEGER" } 
    },
    riskFactors: {
      type: "ARRAY",
      items: { type: "STRING" }
    }
  },
  required: ['verdict', 'score', 'analysis', 'relevantPrincipleIds', 'riskFactors']
};

// --- Mock Data (Safety Net) ---
const MOCK_RESPONSE: ZenithAnalysis = {
  verdict: 'CAUTION',
  score: 65,
  analysis: "核心诊断完毕。\n\n[离线模式已激活]\n\n无法连接至主神经框架，正在运行本地启发式分析。\n\n检测到决策结构中存在潜在的脆弱性。拟议的路径符合线性增长模型，这通常携带隐藏的风险 (参见原则 #27)。\n\n建议：仅在你设计好安全的失败下限 (#28) 后方可推进。",
  relevantPrincipleIds: [17, 27, 28, 1],
  riskFactors: ["离线启发式分析", "下行风险未封顶"]
};

// --- 1. SDK Implementation ---
async function runWithSDK(userQuery: string): Promise<ZenithAnalysis> {
  const apiKey = process.env.API_KEY;
  const ai = new GoogleGenAI({ apiKey: apiKey }); // Using direct variable
  
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: userQuery,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      responseMimeType: "application/json",
      responseSchema: RESPONSE_SCHEMA_JSON
    }
  });

  if (response.text) {
    return JSON.parse(response.text) as ZenithAnalysis;
  }
  throw new Error("SDK returned empty text");
}

// --- 2. REST API Fallback (The Bulletproof Method) ---
async function runWithRestAPI(apiKey: string, userQuery: string): Promise<ZenithAnalysis> {
  console.log("Switching to REST API Fallback...");
  
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
  
  const payload = {
    contents: [{
      parts: [{ text: userQuery }]
    }],
    systemInstruction: {
      parts: [{ text: SYSTEM_INSTRUCTION }]
    },
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: RESPONSE_SCHEMA_JSON
    }
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error(`REST API Error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

  if (text) {
    return JSON.parse(text) as ZenithAnalysis;
  }
  throw new Error("REST API returned invalid structure");
}

// --- Image Generation ---
export async function generatePrincipleImage(principle: PrincipleItem): Promise<string> {
  const apiKey = process.env.API_KEY;
  if (!apiKey) throw new Error("No API Key");

  const ai = new GoogleGenAI({ apiKey: apiKey });

  // Optimized Prompt: Visual Metaphor, Inverted Sketch, Strict No-Text
  const prompt = `
    Role: You are an avant-garde conceptual artist.
    Task: Create a "Raw Inverted Sketch" that acts as a visual metaphor for the following philosophical principle.
    
    PRINCIPLE TITLE: "${principle.title}"
    PRINCIPLE MEANING: "${principle.content}"
    
    VISUAL INSTRUCTIONS:
    1. METAPHORICAL INTERPRETATION: Do not just draw the title. Translate the *meaning* into a scene of tension, structure, or force.
       - Example: If the meaning is "Focus", draw a chaotic storm with a single, sharp, unmoving line cutting through it.
       - Example: If the meaning is "Resilience", draw a small geometric shape holding up a massive weight.
       - Example: If the meaning is "Exit Rights", draw a broken chain or an open door in a solid wall.
    
    2. ART STYLE:
       - Medium: White charcoal/chalk on rough pitch-black paper (Inverted Sketch).
       - Technique: Frantic, expressive, rough strokes. Not clean vectors. Not cartoonish.
       - Atmosphere: Dark, Intellectual, Industrial, Moody.
       - Composition: Use negative space (blackness) aggressively.
    
    3. COLOR ACCENT:
       - The image must be 95% Black and White.
       - Add ONE splash of "Signal Orange" (#FF4D00) or "Red" to highlight the focal point of the metaphor.
    
    NEGATIVE PROMPTS (FORBIDDEN):
    - NO TEXT. NO LETTERS. NO NUMBERS. NO WORDS.
    - NO SIGNATURES. NO WATERMARKS.
    - No photorealism. No 3D rendering style.
    - No complex backgrounds.
  `;

  // Use gemini-2.5-flash-image for generation as per guidelines for general tasks
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [
        { text: prompt }
      ]
    },
    config: {
       imageConfig: {
         aspectRatio: "1:1",
       }
    }
  });

  // Iterate to find the image part
  if (response.candidates?.[0]?.content?.parts) {
    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
  }

  throw new Error("No image generated");
}

// --- Main Service Function ---
export async function runSimulation(userQuery: string): Promise<ZenithAnalysis> {
  // Vite replaces process.env.API_KEY with the actual string value during build.
  // We access it directly to ensure compatibility.
  const apiKey = process.env.API_KEY;

  // Debugging log for the browser console (Will show up in Chrome DevTools)
  console.log("ZENITH KERNEL: Initializing...");
  console.log(`ZENITH KERNEL: API Key detected? ${apiKey && apiKey.length > 0 ? "YES" : "NO"}`);

  // 1. Check API Key
  if (!apiKey || apiKey === "undefined" || apiKey === "") {
    console.warn("ZENITH KERNEL: No API Key found. Aborting to Mock Mode.");
    await new Promise(resolve => setTimeout(resolve, 1500));
    return MOCK_RESPONSE;
  }

  // 2. Try SDK, then REST, then Mock
  try {
    // Attempt A: SDK
    // We try this first to adhere to best practices
    return await runWithSDK(userQuery);
  } catch (sdkError) {
    console.warn("SDK Load Failed, attempting REST Fallback...", sdkError);
    
    try {
      // Attempt B: Raw REST API
      // This has 0 dependencies and should work if the internet is on.
      return await runWithRestAPI(apiKey, userQuery);
    } catch (restError) {
      console.error("Critical Failure (SDK & REST both failed):", restError);
      return MOCK_RESPONSE;
    }
  }
}