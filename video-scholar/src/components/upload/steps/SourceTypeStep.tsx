import { Upload, Link } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { SourceType } from "../UploadWizard";

interface SourceTypeStepProps {
  selectedType: SourceType;
  onSelect: (type: SourceType) => void;
  onNext: () => void;
}

export function SourceTypeStep({ selectedType, onSelect, onNext }: SourceTypeStepProps) {
  const options = [
    {
      type: "file" as const,
      icon: Upload,
      title: "上傳檔案",
      description: "從電腦選擇影片檔案上傳",
      formats: "支援 MP4, MOV, AVI, WebM",
    },
    {
      type: "url" as const,
      icon: Link,
      title: "貼上連結",
      description: "使用 YouTube 或 Vimeo 連結",
      formats: "支援 YouTube, Vimeo",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-foreground">選擇影片來源</h2>
        <p className="text-muted-foreground">
          您可以上傳本機檔案或使用線上影片連結
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {options.map((option) => (
          <Card
            key={option.type}
            className={cn(
              "p-6 cursor-pointer transition-all hover:shadow-lg",
              selectedType === option.type
                ? "ring-2 ring-primary bg-primary/5"
                : "hover:bg-muted/50"
            )}
            onClick={() => onSelect(option.type)}
          >
            <div className="flex flex-col items-center text-center space-y-4">
              <div
                className={cn(
                  "w-16 h-16 rounded-full flex items-center justify-center transition-colors",
                  selectedType === option.type
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                )}
              >
                <option.icon className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h3 className="font-semibold text-lg">{option.title}</h3>
                <p className="text-sm text-muted-foreground">{option.description}</p>
                <p className="text-xs text-muted-foreground/70">{option.formats}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="flex justify-end">
        <Button onClick={onNext} disabled={!selectedType}>
          下一步
        </Button>
      </div>
    </div>
  );
}
