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
      <div className="space-y-2">
        <Label htmlFor="source-language" className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Source Language</Label>
        <Select value={language} onValueChange={onLanguageChange}>
          <SelectTrigger id="source-language" className="bg-muted/40 border-border/60 h-10">
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
        <Label htmlFor="code-input" className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Code</Label>
        <Textarea
          id="code-input"
          value={code}
          onChange={(e) => onCodeChange(e.target.value)}
          placeholder={`Enter your ${language} code here...`}
          className="min-h-[320px] font-mono text-sm bg-code-bg border-code-border resize-none rounded-lg"
        />
      </div>
    </div>
  );
};
