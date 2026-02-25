import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface LanguageSelectorProps {
  selectedLanguages: string[];
  onLanguagesChange: (languages: string[]) => void;
  sourceLanguage: string;
}

const TARGET_LANGUAGES = [
  "Python", "JavaScript", "TypeScript", "Java", "C", "C++", "C#", "Go", "Rust", "Ruby", "PHP", "Swift", "Kotlin"
];

export const LanguageSelector = ({ selectedLanguages, onLanguagesChange, sourceLanguage }: LanguageSelectorProps) => {
  const availableLanguages = TARGET_LANGUAGES.filter(lang => lang !== sourceLanguage);

  const handleToggle = (language: string) => {
    if (selectedLanguages.includes(language)) {
      onLanguagesChange(selectedLanguages.filter(l => l !== language));
    } else {
      onLanguagesChange([...selectedLanguages, language]);
    }
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
      {availableLanguages.map(language => (
        <div
          key={language}
          onClick={() => handleToggle(language)}
          className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border-2 cursor-pointer transition-all text-xs font-semibold ${
            selectedLanguages.includes(language)
              ? "bg-primary/10 border-primary/40 text-primary shadow-sm"
              : "bg-muted/30 border-border/50 text-foreground hover:border-primary/20 hover:bg-muted/50"
          }`}
        >
          <Checkbox
            id={`lang-${language}`}
            checked={selectedLanguages.includes(language)}
            onCheckedChange={() => handleToggle(language)}
            className="pointer-events-none"
          />
          <Label htmlFor={`lang-${language}`} className="cursor-pointer flex-1 text-xs font-semibold">
            {language}
          </Label>
        </div>
      ))}
    </div>
  );
};
