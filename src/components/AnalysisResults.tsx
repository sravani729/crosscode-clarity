import { TranslationResult } from "./TranslationResult";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, Activity, Boxes, FlaskConical } from "lucide-react";

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
  originalComplexity?: {
    time: string;
    space: string;
  };
  suggestions?: string[];
  applications?: string[];
  testCases?: {
    basic: TestCase[];
    edge: TestCase[];
  };
}

export const AnalysisResults = ({ translations, originalComplexity, suggestions, applications, testCases }: AnalysisResultsProps) => {
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

      {applications && applications.length > 0 && (
        <Card className="p-4 bg-card border-border">
          <div className="flex items-center gap-2 mb-3">
            <Boxes className="w-4 h-4 text-primary" />
            <h3 className="text-sm font-semibold">Real-World Applications</h3>
          </div>
          <ul className="space-y-2">
            {applications.map((app, index) => (
              <li key={index} className="text-sm text-muted-foreground flex gap-2">
                <span className="text-primary">•</span>
                <span>{app}</span>
              </li>
            ))}
          </ul>
        </Card>
      )}

      {testCases && (testCases.basic?.length > 0 || testCases.edge?.length > 0) && (
        <Card className="p-4 bg-card border-border">
          <div className="flex items-center gap-2 mb-3">
            <FlaskConical className="w-4 h-4 text-accent" />
            <h3 className="text-sm font-semibold">Test Cases</h3>
          </div>
          
          {testCases.basic && testCases.basic.length > 0 && (
            <div className="mb-4">
              <h4 className="text-xs font-semibold text-muted-foreground mb-2 uppercase">Basic Tests</h4>
              <div className="space-y-2">
                {testCases.basic.map((test, index) => (
                  <div key={index} className="p-3 rounded-lg bg-secondary/50 border border-border">
                    <p className="text-xs text-muted-foreground mb-1">{test.description}</p>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <div>
                        <Badge variant="outline" className="text-xs mb-1">Input</Badge>
                        <pre className="text-xs font-mono bg-code-bg p-2 rounded border border-code-border overflow-x-auto">
                          {test.input}
                        </pre>
                      </div>
                      <div>
                        <Badge variant="outline" className="text-xs mb-1">Expected</Badge>
                        <pre className="text-xs font-mono bg-code-bg p-2 rounded border border-code-border overflow-x-auto">
                          {test.expected}
                        </pre>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {testCases.edge && testCases.edge.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold text-muted-foreground mb-2 uppercase">Edge Cases</h4>
              <div className="space-y-2">
                {testCases.edge.map((test, index) => (
                  <div key={index} className="p-3 rounded-lg bg-secondary/50 border border-border">
                    <p className="text-xs text-muted-foreground mb-1">{test.description}</p>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <div>
                        <Badge variant="outline" className="text-xs mb-1">Input</Badge>
                        <pre className="text-xs font-mono bg-code-bg p-2 rounded border border-code-border overflow-x-auto">
                          {test.input}
                        </pre>
                      </div>
                      <div>
                        <Badge variant="outline" className="text-xs mb-1">Expected</Badge>
                        <pre className="text-xs font-mono bg-code-bg p-2 rounded border border-code-border overflow-x-auto">
                          {test.expected}
                        </pre>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
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
