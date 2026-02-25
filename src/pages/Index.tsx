import { useState } from "react";
import { CodeInput } from "@/components/CodeInput";
import { LanguageSelector } from "@/components/LanguageSelector";
import { AnalysisResults } from "@/components/AnalysisResults";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const [code, setCode] = useState("");
  const [sourceLanguage, setSourceLanguage] = useState("Python");
  const [targetLanguages, setTargetLanguages] = useState<string[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<any>(null);
  const { toast } = useToast();

  const handleAnalyze = async () => {
    if (!code.trim()) {
      toast({ title: "Code Required", description: "Please enter some code to analyze", variant: "destructive" });
      return;
    }
    if (targetLanguages.length === 0) {
      toast({ title: "Target Languages Required", description: "Please select at least one target language", variant: "destructive" });
      return;
    }
    setIsAnalyzing(true);
    setResults(null);
    try {
      const { data, error } = await supabase.functions.invoke("analyze-code", {
        body: { code, sourceLanguage, targetLanguages },
      });
      if (error) throw error;
      if (data.error) throw new Error(data.error);
      setResults(data);
      toast({ title: "Analysis Complete", description: `Translated to ${targetLanguages.length} language(s)` });
    } catch (error: any) {
      console.error("Analysis error:", error);
      toast({ title: "Analysis Failed", description: error.message || "Please try again.", variant: "destructive" });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Top bar */}
      <div className="bg-primary text-primary-foreground text-xs text-center py-1.5 font-medium tracking-wide">
        Department of Computer Science — Academic Year 2025-26
      </div>

      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="max-w-5xl mx-auto px-4 py-5">
          <h1 className="text-xl font-bold text-foreground">PolyCode Insight AI</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Multi-Language Code Translator &amp; Analyzer
          </p>
        </div>
      </header>

      {/* Nav */}
      <nav className="bg-card border-b border-border">
        <div className="max-w-5xl mx-auto px-4 flex gap-6 text-sm">
          <span className="py-2.5 border-b-2 border-primary text-primary font-medium cursor-default">Home</span>
          <span className="py-2.5 border-b-2 border-transparent text-muted-foreground cursor-default">About</span>
          <span className="py-2.5 border-b-2 border-transparent text-muted-foreground cursor-default">Documentation</span>
        </div>
      </nav>

      {/* Main */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-8">
        {/* Intro */}
        <section className="mb-8 p-5 bg-card border border-border rounded">
          <h2 className="text-base font-bold text-foreground mb-1">Project Overview</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            This tool translates source code from one programming language to multiple target languages using AI. 
            It also provides time &amp; space complexity analysis, optimization suggestions, and test cases.
          </p>
        </section>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left — Input */}
          <div className="space-y-5">
            {/* Code input */}
            <section className="bg-card border border-border rounded overflow-hidden">
              <div className="px-4 py-2.5 bg-muted border-b border-border">
                <h3 className="text-sm font-bold text-foreground">Step 1 — Enter Source Code</h3>
              </div>
              <div className="p-4">
                <CodeInput
                  code={code}
                  onCodeChange={setCode}
                  language={sourceLanguage}
                  onLanguageChange={setSourceLanguage}
                />
              </div>
            </section>

            {/* Language select */}
            <section className="bg-card border border-border rounded overflow-hidden">
              <div className="px-4 py-2.5 bg-muted border-b border-border">
                <h3 className="text-sm font-bold text-foreground">Step 2 — Select Target Languages</h3>
              </div>
              <div className="p-4">
                <LanguageSelector
                  selectedLanguages={targetLanguages}
                  onLanguagesChange={setTargetLanguages}
                  sourceLanguage={sourceLanguage}
                />
              </div>
            </section>

            {/* Submit */}
            <Button
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className="w-full h-11 font-bold text-sm bg-primary text-primary-foreground hover:bg-primary/90 rounded"
            >
              {isAnalyzing ? (
                <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Analyzing...</>
              ) : (
                "Analyze & Translate"
              )}
            </Button>
          </div>

          {/* Right — Results */}
          <div>
            <section className="bg-card border border-border rounded overflow-hidden min-h-[480px]">
              <div className="px-4 py-2.5 bg-muted border-b border-border">
                <h3 className="text-sm font-bold text-foreground">Step 3 — Results</h3>
              </div>
              <div className="p-4">
                {results ? (
                  <AnalysisResults
                    translations={results.translations}
                    originalComplexity={results.originalComplexity}
                    suggestions={results.suggestions}
                    applications={results.applications}
                    testCases={results.testCases}
                  />
                ) : (
                  <div className="h-[400px] flex items-center justify-center">
                    <div className="text-center max-w-xs">
                      <p className="text-sm text-muted-foreground">
                        Results will be displayed here after analysis.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-card border-t border-border mt-auto">
        <div className="max-w-5xl mx-auto px-4 py-5 text-xs text-muted-foreground space-y-1">
          <p className="font-bold text-foreground text-sm">PolyCode Insight AI</p>
          <p>A final year project submitted in partial fulfillment of B.Tech in Computer Science</p>
          <p>Developed by: Student Name &nbsp;|&nbsp; Roll No: XXXX &nbsp;|&nbsp; Guide: Prof. Faculty Name</p>
          <p className="pt-1">© 2026 — Department of Computer Science. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
