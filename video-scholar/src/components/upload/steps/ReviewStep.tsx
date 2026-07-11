import { 
  Upload, 
  Link, 
  Youtube, 
  Video, 
  FileVideo, 
  FileText, 
  BookOpen, 
  ListChecks, 
  HelpCircle,
  Pencil,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import type { UploadData } from "../UploadWizard";

interface ReviewStepProps {
  data: UploadData;
  onSubmit: () => void;
  onBack: () => void;
  onEdit: (step: number) => void;
  isSubmitting: boolean;
}

function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

const aiFeatureIcons = {
  transcription: FileText,
  summary: BookOpen,
  notes: ListChecks,
  quiz: HelpCircle,
};

const aiFeatureLabels = {
  transcription: "自動轉錄",
  summary: "AI 摘要",
  notes: "重點筆記",
  quiz: "自動出題",
};

export function ReviewStep({
  data,
  onSubmit,
  onBack,
  onEdit,
  isSubmitting,
}: ReviewStepProps) {
  const enabledAiFeatures = Object.entries(data.aiConfig)
    .filter(([_, enabled]) => enabled)
    .map(([key]) => key as keyof typeof aiFeatureLabels);

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-foreground">確認送出</h2>
        <p className="text-muted-foreground">
          請確認以下資訊無誤後送出
        </p>
      </div>

      <div className="space-y-4">
        {/* Source Info */}
        <Card className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-foreground">影片來源</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(2)}
              className="h-8 px-2"
            >
              <Pencil className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex items-center gap-3">
            {data.sourceType === "file" ? (
              <>
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <FileVideo className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">{data.file?.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {data.file && formatFileSize(data.file.size)}
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  {data.urlType === "youtube" ? (
                    <Youtube className="w-5 h-5 text-red-500" />
                  ) : data.urlType === "vimeo" ? (
                    <Video className="w-5 h-5 text-blue-500" />
                  ) : (
                    <Link className="w-5 h-5 text-primary" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium">
                    {data.urlType === "youtube" ? "YouTube" : "Vimeo"} 影片
                  </p>
                  <p className="text-sm text-muted-foreground truncate">
                    {data.url}
                  </p>
                </div>
              </>
            )}
          </div>
        </Card>

        {/* Video Details */}
        <Card className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-foreground">影片資訊</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(3)}
              className="h-8 px-2"
            >
              <Pencil className="w-4 h-4" />
            </Button>
          </div>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-muted-foreground">標題</p>
              <p className="font-medium">{data.title || "（未填寫）"}</p>
            </div>
            {data.description && (
              <div>
                <p className="text-sm text-muted-foreground">描述</p>
                <p className="text-sm">{data.description}</p>
              </div>
            )}
            {data.tags.length > 0 && (
              <div>
                <p className="text-sm text-muted-foreground mb-1">標籤</p>
                <div className="flex flex-wrap gap-1">
                  {data.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Card>

        {/* AI Features */}
        <Card className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-foreground">AI 功能</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(4)}
              className="h-8 px-2"
            >
              <Pencil className="w-4 h-4" />
            </Button>
          </div>
          {enabledAiFeatures.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {enabledAiFeatures.map((feature) => {
                const Icon = aiFeatureIcons[feature];
                return (
                  <div
                    key={feature}
                    className="flex items-center gap-2 bg-primary/10 text-primary px-3 py-1.5 rounded-full text-sm"
                  >
                    <Icon className="w-4 h-4" />
                    <span>{aiFeatureLabels[feature]}</span>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">未啟用任何 AI 功能</p>
          )}
        </Card>
      </div>

      <Separator />

      <div className="bg-muted/50 rounded-lg p-4 text-sm text-muted-foreground">
        <p>
          送出後，影片將開始上傳並進行 AI 處理。處理時間依影片長度而定，
          完成後會透過通知中心通知您。
        </p>
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack} disabled={isSubmitting}>
          上一步
        </Button>
        <Button onClick={onSubmit} disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              送出中...
            </>
          ) : (
            "確認送出"
          )}
        </Button>
      </div>
    </div>
  );
}
