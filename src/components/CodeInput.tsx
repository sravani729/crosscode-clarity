import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Code2 } from "lucide-react";

interface CodeInputProps {
  code: string;
  onCodeChange: (code: string) => void;
  language: string;
  onLanguageChange: (language: string) => void;
}

const LANGUAGES = [
  "Python",
  "JavaScript",
  "TypeScript",
  "Java",
  "C",
  "C++",
  "C#",
  "Go",
  "Rust",
  "Ruby",
  "PHP",
  "Swift",
  "Kotlin"
];

export const CodeInput = ({ code, onCodeChange, language, onLanguageChange }: CodeInputProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-primary/10">
          <Code2 className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h2 className="text-xl font-semibold">Input Code</h2>
          <p className="text-sm text-muted-foreground">Paste your code to analyze and translate</p>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="source-language">Source Language</Label>
        <Select value={language} onValueChange={onLanguageChange}>
          <SelectTrigger id="source-language" className="bg-secondary border-border">
            <SelectValue placeholder="Select language" />
          </SelectTrigger>
          <SelectContent>
            {LANGUAGES.map(lang => (
              <SelectItem key={lang} value={lang}>{lang}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="code-input">Code</Label>
        <Textarea
          id="code-input"
          value={code}
          onChange={(e) => onCodeChange(e.target.value)}
          placeholder={`Enter your ${language} code here...`}
          className="min-h-[400px] font-mono text-sm bg-code-bg border-code-border resize-none"
        />
      </div>
    </div>
  );
};
