import { FileText, BookOpen, ListChecks, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface AIConfig {
  transcription: boolean;
  summary: boolean;
  notes: boolean;
  quiz: boolean;
}

interface AIConfigStepProps {
  config: AIConfig;
  onConfigChange: (config: AIConfig) => void;
  onNext: () => void;
  onBack: () => void;
}

const aiFeatures = [
  {
    key: "transcription" as const,
    icon: FileText,
    title: "自動轉錄",
    description: "將影片語音轉換為文字逐字稿，支援中英文",
    recommended: true,
  },
  {
    key: "summary" as const,
    icon: BookOpen,
    title: "AI 摘要",
    description: "自動生成段落摘要與全片重點整理",
    recommended: true,
  },
  {
    key: "notes" as const,
    icon: ListChecks,
    title: "重點筆記",
    description: "自動產生條列式重點筆記，方便複習",
    recommended: false,
  },
  {
    key: "quiz" as const,
    icon: HelpCircle,
    title: "自動出題",
    description: "根據內容自動生成測驗題（選擇題、是非題）",
    recommended: false,
  },
];

export function AIConfigStep({
  config,
  onConfigChange,
  onNext,
  onBack,
}: AIConfigStepProps) {
  const toggleFeature = (key: keyof AIConfig) => {
    onConfigChange({ ...config, [key]: !config[key] });
  };

  const enabledCount = Object.values(config).filter(Boolean).length;

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-foreground">AI 功能設定</h2>
        <p className="text-muted-foreground">
          選擇要啟用的 AI 處理功能（上傳後將在背景自動執行）
        </p>
      </div>

      <div className="grid gap-3">
        {aiFeatures.map((feature) => {
          const isEnabled = config[feature.key];
          return (
            <Card
              key={feature.key}
              className={cn(
                "p-4 cursor-pointer transition-all",
                isEnabled
                  ? "ring-2 ring-primary bg-primary/5"
                  : "hover:bg-muted/50"
              )}
              onClick={() => toggleFeature(feature.key)}
            >
              <div className="flex items-center gap-4">
                <div
                  className={cn(
                    "w-12 h-12 rounded-lg flex items-center justify-center transition-colors",
                    isEnabled
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  <feature.icon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{feature.title}</h3>
                    {feature.recommended && (
                      <span className="text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full">
                        推薦
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
                <Switch
                  checked={isEnabled}
                  onCheckedChange={() => toggleFeature(feature.key)}
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            </Card>
          );
        })}
      </div>

      <div className="text-center text-sm text-muted-foreground">
        已選擇 {enabledCount} 項 AI 功能
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          上一步
        </Button>
        <Button onClick={onNext}>
          下一步
        </Button>
      </div>
    </div>
  );
}
