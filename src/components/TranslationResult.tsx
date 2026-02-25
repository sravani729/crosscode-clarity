import { Card } from "@/components/ui/card";
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

interface TranslationResultProps {
  translation: Translation;
}

export const TranslationResult = ({ translation }: TranslationResultProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(translation.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="p-6 bg-card border-border shadow-elevated">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">{translation.language}</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopy}
          className="h-8"
        >
          {copied ? (
            <Check className="w-4 h-4 text-accent" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
        </Button>
      </div>

      <div className="mb-4">
        <pre className="p-4 rounded-lg bg-code-bg border border-code-border overflow-x-auto">
          <code className="text-sm font-mono">{translation.code}</code>
        </pre>
      </div>

      <div className="space-y-3">
        <div className="flex gap-2">
          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
            Time: {translation.timeComplexity}
          </Badge>
          <Badge variant="outline" className="bg-accent/10 text-accent border-accent/20">
            Space: {translation.spaceComplexity}
          </Badge>
        </div>

        <div className="p-3 rounded-lg bg-secondary/50 border border-border">
          <p className="text-sm text-muted-foreground">{translation.explanation}</p>
        </div>
      </div>
    </Card>
  );
};
