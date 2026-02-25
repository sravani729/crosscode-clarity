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
              PolyCode<span className="text-primary">.</span>AI
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground border-2 border-secondary-foreground/10">
              <Sparkles className="w-3 h-3" /> Student Project
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-5 py-10">
        {/* Hero */}
        <section className="mb-14 text-center">
          <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-primary/10 border-2 border-primary/20 text-primary text-xs font-bold uppercase tracking-widest">
            Code Translator
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground leading-tight tracking-tight mb-4">
            Translate Code<br />
            <span className="bg-gradient-primary bg-clip-text text-transparent">Across Languages</span>
          </h1>
          <p className="text-muted-foreground max-w-lg mx-auto text-sm">
            Paste your code, choose target languages, and let AI handle the translation with full complexity analysis.
          </p>
        </section>

        {/* Steps indicator */}
        <div className="flex items-center justify-center gap-3 mb-10">
          {["Paste Code", "Pick Languages", "Get Results"].map((step, i) => (
            <div key={step} className="flex items-center gap-2">
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold border-2 ${
                i === 0 ? "bg-primary text-primary-foreground border-primary" :
                i === 1 ? "bg-secondary text-secondary-foreground border-secondary-foreground/20" :
                "bg-accent text-accent-foreground border-accent"
              }`}>
                {i + 1}
              </div>
              <span className="text-xs font-semibold text-foreground hidden sm:inline">{step}</span>
              {i < 2 && <ArrowRight className="w-3.5 h-3.5 text-muted-foreground mx-1" />}
            </div>
          ))}
        </div>

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
            <div className="rounded-2xl border-[3px] border-foreground/8 bg-card overflow-hidden shadow-elevated min-h-[540px] lg:sticky lg:top-24">
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
                      <div className="mx-auto w-16 h-16 rounded-2xl bg-muted flex items-center justify-center rotate-6">
                        <Braces className="w-7 h-7 text-muted-foreground/40" />
                      </div>
                      <h3 className="text-lg font-bold text-foreground">Ready to Analyze</h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        Your AI-powered translations and complexity analysis will appear here.
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
          <p className="text-xs font-semibold text-muted-foreground">
            © 2026 PolyCode.AI — A Student Project
          </p>
          <div className="flex gap-4 text-xs text-muted-foreground">
            <span>Built with ❤️ & AI</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
