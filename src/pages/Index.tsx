import { useState } from "react";
import { CodeInput } from "@/components/CodeInput";
import { LanguageSelector } from "@/components/LanguageSelector";
import { AnalysisResults } from "@/components/AnalysisResults";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Loader2, Sparkles, Code2, Zap } from "lucide-react";
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
      toast({
        title: "Code Required",
        description: "Please enter some code to analyze",
        variant: "destructive",
      });
      return;
    }

    if (targetLanguages.length === 0) {
      toast({
        title: "Target Languages Required",
        description: "Please select at least one target language",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    setResults(null);

    try {
      const { data, error } = await supabase.functions.invoke('analyze-code', {
        body: {
          code,
          sourceLanguage,
          targetLanguages,
        },
      });

      if (error) {
        throw error;
      }

      if (data.error) {
        throw new Error(data.error);
      }

      setResults(data);
      toast({
        title: "Analysis Complete",
        description: `Successfully translated to ${targetLanguages.length} language(s)`,
      });
    } catch (error: any) {
      console.error("Analysis error:", error);
      toast({
        title: "Analysis Failed",
        description: error.message || "Failed to analyze code. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-secondary">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-primary shadow-glow">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-foreground">
                PolyCode Insight AI
              </h1>
              <p className="text-xs text-muted-foreground tracking-wide">
                One code, many languages, infinite possibilities
              </p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20">
              <Zap className="w-3.5 h-3.5 text-accent" />
              <span className="text-xs font-medium text-accent-foreground">AI Powered</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-10">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3 tracking-tight">
            Translate & Analyze Your Code
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm leading-relaxed">
            Paste your code, pick your target languages, and get instant AI-powered translations with complexity analysis.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Left Column - Input (3/5) */}
          <div className="lg:col-span-3 space-y-6">
            {/* Code Input Card */}
            <Card className="overflow-hidden border-border/60 shadow-elevated bg-card">
              <div className="px-6 py-4 border-b border-border/40 bg-muted/30">
                <div className="flex items-center gap-2.5">
                  <Code2 className="w-4 h-4 text-primary" />
                  <h3 className="text-sm font-semibold text-foreground">Source Code</h3>
                </div>
              </div>
              <div className="p-6">
                <CodeInput
                  code={code}
                  onCodeChange={setCode}
                  language={sourceLanguage}
                  onLanguageChange={setSourceLanguage}
                />
              </div>
            </Card>

            {/* Language Selector Card */}
            <Card className="overflow-hidden border-border/60 shadow-elevated bg-card">
              <div className="px-6 py-4 border-b border-border/40 bg-muted/30">
                <div className="flex items-center gap-2.5">
                  <Sparkles className="w-4 h-4 text-accent" />
                  <h3 className="text-sm font-semibold text-foreground">Target Languages</h3>
                </div>
              </div>
              <div className="p-6">
                <LanguageSelector
                  selectedLanguages={targetLanguages}
                  onLanguagesChange={setTargetLanguages}
                  sourceLanguage={sourceLanguage}
                />
              </div>
            </Card>

            {/* Analyze Button */}
            <Button
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className="w-full h-14 text-base font-semibold bg-gradient-primary hover:opacity-90 transition-all shadow-glow rounded-xl"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Analyzing Code...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-2" />
                  Analyze & Translate
                </>
              )}
            </Button>
          </div>

          {/* Right Column - Results (2/5) */}
          <div className="lg:col-span-2">
            <Card className="overflow-hidden border-border/60 shadow-elevated bg-card min-h-[500px] sticky top-24">
              <div className="px-6 py-4 border-b border-border/40 bg-muted/30">
                <div className="flex items-center gap-2.5">
                  <Zap className="w-4 h-4 text-primary" />
                  <h3 className="text-sm font-semibold text-foreground">Results</h3>
                </div>
              </div>
              <div className="p-6">
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
                    <div className="text-center space-y-3 max-w-xs">
                      <div className="mx-auto w-12 h-12 rounded-2xl bg-muted/60 flex items-center justify-center">
                        <Code2 className="w-6 h-6 text-muted-foreground/50" />
                      </div>
                      <h3 className="text-base font-semibold text-foreground">Ready to Analyze</h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        Enter your code and select target languages to see AI-powered translations with complexity analysis.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/40 mt-16 py-6">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-xs text-muted-foreground">
            Built with AI · PolyCode Insight
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
