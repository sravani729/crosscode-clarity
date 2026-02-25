import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CodeInputProps {
  code: string;
  onCodeChange: (code: string) => void;
  language: string;
  onLanguageChange: (language: string) => void;
}

const LANGUAGES = [
  "Python", "JavaScript", "TypeScript", "Java", "C", "C++", "C#", "Go", "Rust", "Ruby", "PHP", "Swift", "Kotlin"
];

export const CodeInput = ({ code, onCodeChange, language, onLanguageChange }: CodeInputProps) => {
  return (
    <div className="space-y-4">
      <div className="space-y-1.5">
        <Label htmlFor="source-language" className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Language</Label>
        <Select value={language} onValueChange={onLanguageChange}>
          <SelectTrigger id="source-language" className="bg-muted/40 border-2 border-border h-10 rounded-xl font-medium">
            <SelectValue placeholder="Select language" />
          </SelectTrigger>
          <SelectContent>
            {LANGUAGES.map(lang => (
              <SelectItem key={lang} value={lang}>{lang}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="code-input" className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Your Code</Label>
        <Textarea
          id="code-input"
          value={code}
          onChange={(e) => onCodeChange(e.target.value)}
          placeholder={`Paste your ${language} code here...`}
          className="min-h-[280px] font-mono text-sm bg-code-bg border-2 border-code-border resize-none rounded-xl"
        />
      </div>
    </div>
  );
};
