import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import { useState } from "react";

interface Translation {
  language: string;
  code: string;
  timeComplexity: string;
  spaceComplexity: string;
  explanation: string;
}

export const TranslationResult = ({ translation }: { translation: Translation }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(translation.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-3 bg-card border border-border rounded">
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-sm font-bold text-foreground">{translation.language}</h4>
        <Button variant="ghost" size="sm" onClick={handleCopy} className="h-7 px-2 text-xs">
          {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
        </Button>
      </div>
      <pre className="p-3 rounded bg-code-bg border border-code-border overflow-x-auto mb-2">
        <code className="text-xs font-mono">{translation.code}</code>
      </pre>
      <div className="flex gap-2 mb-2">
        <Badge variant="outline" className="text-[11px]">Time: {translation.timeComplexity}</Badge>
        <Badge variant="outline" className="text-[11px]">Space: {translation.spaceComplexity}</Badge>
      </div>
      <p className="text-xs text-muted-foreground leading-relaxed">{translation.explanation}</p>
    </div>
  );
};
