import { useState } from "react";
import { CodeInput } from "@/components/CodeInput";
import { LanguageSelector } from "@/components/LanguageSelector";
import { AnalysisResults } from "@/components/AnalysisResults";
import { Button } from "@/components/ui/button";
import { Loader2, Sparkles } from "lucide-react";
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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-primary">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                PolyCode Insight AI
              </h1>
              <p className="text-sm text-muted-foreground">
                One code, many languages, infinite possibilities
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Left Column - Input */}
          <div className="space-y-8">
            <CodeInput
              code={code}
              onCodeChange={setCode}
              language={sourceLanguage}
              onLanguageChange={setSourceLanguage}
            />
            
            <LanguageSelector
              selectedLanguages={targetLanguages}
              onLanguagesChange={setTargetLanguages}
              sourceLanguage={sourceLanguage}
            />

            <Button
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className="w-full h-12 text-base bg-gradient-primary hover:opacity-90 transition-opacity shadow-glow"
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

          {/* Right Column - Results */}
          <div>
            {results ? (
              <AnalysisResults
                translations={results.translations}
                originalComplexity={results.originalComplexity}
                suggestions={results.suggestions}
              />
            ) : (
              <div className="h-full flex items-center justify-center">
                <div className="text-center space-y-4 max-w-md">
                  <div className="w-20 h-20 mx-auto rounded-full bg-gradient-primary/10 flex items-center justify-center">
                    <Sparkles className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Ready to Analyze</h3>
                  <p className="text-muted-foreground">
                    Enter your code, select target languages, and click "Analyze & Translate" to see AI-powered translations with complexity analysis.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
