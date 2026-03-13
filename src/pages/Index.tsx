import { useState } from "react";
import { CodeInput } from "@/components/CodeInput";
import { LanguageSelector } from "@/components/LanguageSelector";
import { AnalysisResults } from "@/components/AnalysisResults";
import { Button } from "@/components/ui/button";
import { Loader2, Sparkles, ArrowRight, Braces, Layers } from "lucide-react";
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
      const { data, error } = await supabase.functions.invoke('analyze-code', {
        body: { code, sourceLanguage, targetLanguages },
      });
      if (error) throw error;
      if (data.error) throw new Error(data.error);
      setResults(data);
      toast({ title: "Analysis Complete", description: `Successfully translated to ${targetLanguages.length} language(s)` });
    } catch (error: any) {
      console.error("Analysis error:", error);
      toast({ title: "Analysis Failed", description: error.message || "Failed to analyze code. Please try again.", variant: "destructive" });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-card/90 backdrop-blur-lg border-b-[3px] border-foreground/10">
        <div className="max-w-6xl mx-auto px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-glow rotate-3">
              <Braces className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold tracking-tight text-foreground">
              LangForge<span className="text-primary"></span>
            </span>
          </div>
          
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-5 py-10">
        {/* Hero */}
        <section className="mb-14 text-center">
          
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground leading-tight tracking-tight mb-4">
            LangForge<br />
            <span className="bg-gradient-primary bg-clip-text text-transparent">Across multiple Languages</span>
          </h1>
          
        </section>

        

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left — Input */}
          <div className="space-y-6">
            {/* Code Frame */}
            <div className="rounded-2xl border-[3px] border-foreground/8 bg-card overflow-hidden shadow-elevated">
              <div className="px-5 py-3 border-b-[3px] border-foreground/5 bg-primary/5 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-destructive/60" />
                  <span className="w-3 h-3 rounded-full bg-secondary" />
                  <span className="w-3 h-3 rounded-full bg-accent/60" />
                </div>
                <span className="text-xs font-bold text-muted-foreground ml-2 uppercase tracking-wider">Source Code</span>
              </div>
              <div className="p-5">
                <CodeInput
                  code={code}
                  onCodeChange={setCode}
                  language={sourceLanguage}
                  onLanguageChange={setSourceLanguage}
                />
              </div>
            </div>

            {/* Languages Frame */}
            <div className="rounded-2xl border-[3px] border-foreground/8 bg-card overflow-hidden shadow-elevated">
              <div className="px-5 py-3 border-b-[3px] border-foreground/5 bg-accent/5 flex items-center gap-2">
                <Layers className="w-4 h-4 text-accent" />
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Target Languages</span>
              </div>
              <div className="p-5">
                <LanguageSelector
                  selectedLanguages={targetLanguages}
                  onLanguagesChange={setTargetLanguages}
                  sourceLanguage={sourceLanguage}
                />
              </div>
            </div>

            {/* Action Button */}
            <Button
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className="w-full h-14 text-base font-bold bg-gradient-primary hover:opacity-90 transition-all shadow-glow rounded-2xl border-2 border-primary/20"
            >
              {isAnalyzing ? (
                <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Analyzing...</>
              ) : (
                <><Sparkles className="w-5 h-5 mr-2" /> Analyze & Translate</>
              )}
            </Button>
          </div>

          {/* Right — Results */}
          <div>
            <div className="rounded-2xl border-[3px] border-foreground/8 bg-card overflow-hidden shadow-elevated min-h-[540px]">
              <div className="px-5 py-3 border-b-[3px] border-foreground/5 bg-secondary/30 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Results</span>
              </div>
              <div className="p-5">
                {results ? (
                  <AnalysisResults
                    translations={results.translations}
                    originalComplexity={results.originalComplexity}
                    suggestions={results.suggestions}
                    applications={results.applications}
                    testCases={results.testCases}
                  />
                ) : (
                  <div className="h-[440px] flex items-center justify-center">
                    <div className="text-center space-y-4 max-w-xs">
                      
                      <h3 className="text-lg font-bold text-foreground">Ready to Analyze</h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        Your translations and complexity analysis will appear here.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t-[3px] border-foreground/5 mt-20 py-8 bg-card/50">
        <div className="max-w-6xl mx-auto px-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          
          <div className="flex gap-4 text-xs text-muted-foreground">
            <span></span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
