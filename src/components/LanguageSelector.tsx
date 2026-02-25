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
        <label
          key={language}
          className={`flex items-center gap-2 px-2.5 py-2 rounded border cursor-pointer text-sm transition-colors ${
            selectedLanguages.includes(language)
              ? "bg-primary/8 border-primary/30"
              : "bg-background border-border hover:bg-muted/50"
          }`}
        >
          <Checkbox
            checked={selectedLanguages.includes(language)}
            onCheckedChange={() => handleToggle(language)}
          />
          <span className="text-xs font-medium text-foreground">{language}</span>
        </label>
      ))}
    </div>
  );
};
