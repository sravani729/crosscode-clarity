import { TranslationResult } from "./TranslationResult";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, Boxes, FlaskConical } from "lucide-react";

interface Translation {
  language: string;
  code: string;
  timeComplexity: string;
  spaceComplexity: string;
  explanation: string;
}

interface TestCase {
  input: string;
  expected: string;
  description: string;
}

interface AnalysisResultsProps {
  translations: Translation[];
  originalComplexity?: { time: string; space: string };
  suggestions?: string[];
  applications?: string[];
  testCases?: { basic: TestCase[]; edge: TestCase[] };
}

export const AnalysisResults = ({ translations, originalComplexity, suggestions, applications, testCases }: AnalysisResultsProps) => {
  return (
    <div className="space-y-5">
      <h3 className="text-sm font-bold text-foreground border-b border-border pb-2">Analysis Output</h3>

      {originalComplexity && (
        <div className="p-3 bg-muted rounded border border-border">
          <p className="text-xs font-bold text-foreground mb-2">Original Complexity</p>
          <div className="flex gap-2">
            <Badge variant="outline" className="text-xs">Time: {originalComplexity.time}</Badge>
            <Badge variant="outline" className="text-xs">Space: {originalComplexity.space}</Badge>
          </div>
        </div>
      )}

      {suggestions && suggestions.length > 0 && (
        <div className="p-3 bg-muted rounded border border-border">
          <div className="flex items-center gap-1.5 mb-2">
            <Lightbulb className="w-3.5 h-3.5 text-primary" />
            <p className="text-xs font-bold text-foreground">Suggestions</p>
          </div>
          <ul className="space-y-1">
            {suggestions.map((s, i) => (
              <li key={i} className="text-xs text-muted-foreground">• {s}</li>
            ))}
          </ul>
        </div>
      )}

      {applications && applications.length > 0 && (
        <div className="p-3 bg-muted rounded border border-border">
          <div className="flex items-center gap-1.5 mb-2">
            <Boxes className="w-3.5 h-3.5 text-primary" />
            <p className="text-xs font-bold text-foreground">Applications</p>
          </div>
          <ul className="space-y-1">
            {applications.map((a, i) => (
              <li key={i} className="text-xs text-muted-foreground">• {a}</li>
            ))}
          </ul>
        </div>
      )}

      {testCases && (testCases.basic?.length > 0 || testCases.edge?.length > 0) && (
        <div className="p-3 bg-muted rounded border border-border">
          <div className="flex items-center gap-1.5 mb-2">
            <FlaskConical className="w-3.5 h-3.5 text-primary" />
            <p className="text-xs font-bold text-foreground">Test Cases</p>
          </div>
          {testCases.basic?.map((t, i) => (
            <div key={`b${i}`} className="mb-2 p-2 bg-card rounded border border-border">
              <p className="text-[11px] text-muted-foreground mb-1">{t.description}</p>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div><span className="font-medium">Input:</span> <code className="bg-code-bg px-1 rounded">{t.input}</code></div>
                <div><span className="font-medium">Expected:</span> <code className="bg-code-bg px-1 rounded">{t.expected}</code></div>
              </div>
            </div>
          ))}
          {testCases.edge?.map((t, i) => (
            <div key={`e${i}`} className="mb-2 p-2 bg-card rounded border border-border">
              <p className="text-[11px] text-muted-foreground mb-1">Edge: {t.description}</p>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div><span className="font-medium">Input:</span> <code className="bg-code-bg px-1 rounded">{t.input}</code></div>
                <div><span className="font-medium">Expected:</span> <code className="bg-code-bg px-1 rounded">{t.expected}</code></div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="space-y-3">
        {translations.map((translation, index) => (
          <TranslationResult key={index} translation={translation} />
        ))}
      </div>
    </div>
  );
};
