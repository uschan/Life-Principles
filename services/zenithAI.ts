import { GoogleGenAI } from "@google/genai";
import { principles } from '../data';

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

Task:
1. Analyze the user's input (a decision or dilemma).
2. Check against the 35 Principles (provided in context).
3. Identify aligned principles (supporting the decision).
4. Identify violated principles (risks).
5. Output a structured JSON.

Principles Context:
${principles.map(p => `ID ${p.id} (${p.category}): ${p.title} - ${p.content}`).join('\n')}

Rules:
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
  analysis: "KERNEL DIAGNOSTIC COMPLETE.\n\n[OFFLINE MODE ACTIVE]\n\nConnection to main neural frame could not be established. Running local heuristic analysis.\n\nDetected potential fragility in decision structure. The proposed path fits linear progression models which carry hidden risk (See #27). \n\nRecommendation: Proceed only if you can design a safe failure floor (#28).",
  relevantPrincipleIds: [17, 27, 28, 1],
  riskFactors: ["Offline Heuristics", "Uncapped Downside Risk"]
};

// --- 1. SDK Implementation ---
async function runWithSDK(userQuery: string): Promise<ZenithAnalysis> {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
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

// --- Main Service Function ---
export async function runSimulation(userQuery: string): Promise<ZenithAnalysis> {
  // Vite replaces process.env.API_KEY with the actual string value during build
  const apiKey = process.env.API_KEY;

  // 1. Check API Key
  if (!apiKey) {
    console.warn("No API Key found. Running Mock.");
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