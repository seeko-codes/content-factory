import { createContext, useContext } from "react";

// Shape of public/voice/<id>/timing.json, written by tools/voice.py.
export type Token = {
  text: string; // display text, including attached punctuation
  start: number; // seconds
  end: number;
  emph: boolean; // *marked* in the script: stays dark after it is read
  tex: boolean; // $...$ in the script: rendered with KaTeX
};

export type Line = { start: number; end: number; tokens: Token[] };

export type Timing = {
  id: string;
  duration: number; // seconds of narration audio
  lines: Line[];
  cues: Record<string, number>;
};

export const NarrationContext = createContext<Timing | null>(null);

export const useNarration = () => {
  const timing = useContext(NarrationContext);
  if (!timing) throw new Error("useNarration outside a <Video>");
  const cue = (name: string) => {
    const t = timing.cues[name];
    if (t === undefined) throw new Error(`No cue {${name}} in ${timing.id}/script.json`);
    return t;
  };
  return { ...timing, cue };
};
