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
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
      {availableLanguages.map(language => (
        <div
          key={language}
          className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg border cursor-pointer transition-all ${
            selectedLanguages.includes(language)
              ? "bg-primary/8 border-primary/30 shadow-sm"
              : "bg-muted/30 border-border/40 hover:bg-muted/50"
          }`}
          onClick={() => handleToggle(language)}
        >
          <Checkbox
            id={`lang-${language}`}
            checked={selectedLanguages.includes(language)}
            onCheckedChange={() => handleToggle(language)}
          />
          <Label
            htmlFor={`lang-${language}`}
            className="text-xs font-medium cursor-pointer flex-1"
          >
            {language}
          </Label>
        </div>
      ))}
    </div>
  );
};
