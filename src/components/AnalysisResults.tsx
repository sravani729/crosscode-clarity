import { TranslationResult } from "./TranslationResult";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, Activity } from "lucide-react";

interface Translation {
  language: string;
  code: string;
  timeComplexity: string;
  spaceComplexity: string;
  explanation: string;
}

interface AnalysisResultsProps {
  translations: Translation[];
  originalComplexity?: {
    time: string;
    space: string;
  };
  suggestions?: string[];
}

export const AnalysisResults = ({ translations, originalComplexity, suggestions }: AnalysisResultsProps) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-gradient-primary">
          <Activity className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-semibold">Analysis Results</h2>
          <p className="text-sm text-muted-foreground">Code translations and complexity analysis</p>
        </div>
      </div>

      {originalComplexity && (
        <Card className="p-4 bg-card border-border">
          <h3 className="text-sm font-semibold mb-3">Original Code Complexity</h3>
          <div className="flex gap-2">
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
              Time: {originalComplexity.time}
            </Badge>
            <Badge variant="outline" className="bg-accent/10 text-accent border-accent/20">
              Space: {originalComplexity.space}
            </Badge>
          </div>
        </Card>
      )}

      {suggestions && suggestions.length > 0 && (
        <Card className="p-4 bg-card border-border shadow-glow">
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb className="w-4 h-4 text-accent" />
            <h3 className="text-sm font-semibold">Optimization Suggestions</h3>
          </div>
          <ul className="space-y-2">
            {suggestions.map((suggestion, index) => (
              <li key={index} className="text-sm text-muted-foreground flex gap-2">
                <span className="text-accent">•</span>
                <span>{suggestion}</span>
              </li>
            ))}
          </ul>
        </Card>
      )}

      <div className="space-y-4">
        {translations.map((translation, index) => (
          <TranslationResult key={index} translation={translation} />
        ))}
      </div>
    </div>
  );
};
