import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Languages } from "lucide-react";

interface LanguageSelectorProps {
  selectedLanguages: string[];
  onLanguagesChange: (languages: string[]) => void;
  sourceLanguage: string;
}

const TARGET_LANGUAGES = [
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
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-accent/10">
          <Languages className="w-5 h-5 text-accent" />
        </div>
        <div>
          <h2 className="text-xl font-semibold">Target Languages</h2>
          <p className="text-sm text-muted-foreground">Select languages to translate to</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {availableLanguages.map(language => (
          <div key={language} className="flex items-center space-x-3 p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors">
            <Checkbox
              id={`lang-${language}`}
              checked={selectedLanguages.includes(language)}
              onCheckedChange={() => handleToggle(language)}
            />
            <Label
              htmlFor={`lang-${language}`}
              className="text-sm font-medium cursor-pointer flex-1"
            >
              {language}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
};
