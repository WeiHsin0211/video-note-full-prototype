import { videoApi } from "@/api/videoApi";
import { useState, useRef } from "react";
import { Upload, X, Youtube, Video, Link2, FileVideo } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { SourceType } from "../UploadWizard";

interface SourceInputStepProps {
  sourceType: SourceType;
  file: File | null;
  url: string;
  urlType: "youtube" | "vimeo" | "other" | null;
  onFileChange: (file: File | null) => void;
  onUrlChange: (url: string, urlType: "youtube" | "vimeo" | "other" | null) => void;
  onNext: () => void;
  onBack: () => void;
  updateFormData: (data: { title?: string;description?: string; thumbnail?: string;duration?: number }) => void;
}

function detectUrlType(url: string): "youtube" | "vimeo" | "other" | null {
  if (!url) return null;
  if (url.includes("youtube.com") || url.includes("youtu.be")) return "youtube";
  if (url.includes("vimeo.com")) return "vimeo";
  return "other";
}

function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

export function SourceInputStep({
  sourceType,
  file,
  url,
  urlType,
  onFileChange,
  onUrlChange,
  onNext,
  onBack,
  // 建議在 UploadWizard 增加一個 updateFormData 傳進來，用來存後端抓到的標題和縮圖
  updateFormData,
}: SourceInputStepProps) {
  const [loading, setLoading] = useState(false); // 新增這行處理 API 讀取狀態
  const [isDragging, setIsDragging] = useState(false);
  const [urlError, setUrlError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // --- 新加的處理函式 ---
  const handleStepNext = async () => {
    if (sourceType === "url") {
      if (!url.trim()) return;
      
      setLoading(true);
      setUrlError("");
      
      try {
        // 呼叫後端 FastAPI 使用 yt_dlp 抓取資料
        const data = await videoApi.fetchVideoInfo(url);
        console.log(data)
        // 將後端回傳的標題 (title)、描述 (description)、縮圖 (thumbnail)
        // 存回父組件的 State，這樣 VideoDetailsStep 才會自動顯示這些資訊
        if (updateFormData) {
          updateFormData({
            title: data.title || "",
            description: data.description || "",
            thumbnail: data.thumbnail || "",
            duration: data.duration || 0
          });
        }
        
        // 確保 URL 狀態也更新了
        onUrlChange(url, detectUrlType(url));
        
        // 成功抓到資料後，才跳到下一步
        onNext(); 
      } catch (error) {
        console.error("Fetch error:", error);
        setUrlError("無法取得影片資訊，請檢查連結是否有效或網路連線");
      } finally {
        setLoading(false);
      }
    } else {
      // 如果是「上傳檔案」，目前暫不需調用 yt-dlp 預覽，直接下一步
      onNext();
    }
  };
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type.startsWith("video/")) {
      onFileChange(droppedFile);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      onFileChange(selectedFile);
    }
  };

  const handleUrlChange = (value: string) => {
    setUrlError("");
    const detectedType = detectUrlType(value);
    onUrlChange(value, detectedType);
    
    if (value && detectedType === "other") {
      setUrlError("請使用 YouTube 或 Vimeo 連結");
    }
  };

  const canProceed = sourceType === "file" 
    ? file !== null 
    : url.trim() !== "" && urlType !== "other";

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-foreground">
          {sourceType === "file" ? "上傳影片檔案" : "輸入影片連結"}
        </h2>
        <p className="text-muted-foreground">
          {sourceType === "file"
            ? "拖放或點擊選擇您要上傳的影片"
            : "貼上 YouTube 或 Vimeo 影片連結"}
        </p>
      </div>

      {sourceType === "file" ? (
        <div className="space-y-4">
          <div
            className={cn(
              "border-2 border-dashed rounded-xl p-8 text-center transition-colors",
              isDragging
                ? "border-primary bg-primary/5"
                : "border-muted-foreground/25 hover:border-primary/50",
              file && "border-primary bg-primary/5"
            )}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {file ? (
              <div className="space-y-4">
                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                  <FileVideo className="w-8 h-8 text-primary" />
                </div>
                <div className="space-y-1">
                  <p className="font-medium text-foreground">{file.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {formatFileSize(file.size)}
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onFileChange(null)}
                >
                  <X className="w-4 h-4 mr-2" />
                  移除檔案
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center">
                  <Upload className="w-8 h-8 text-muted-foreground" />
                </div>
                <div className="space-y-1">
                  <p className="font-medium text-foreground">
                    拖放影片檔案至此處
                  </p>
                  <p className="text-sm text-muted-foreground">
                    或點擊下方按鈕選擇檔案
                  </p>
                </div>
                <Button
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                >
                  選擇檔案
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="video/*"
                  className="hidden"
                  onChange={handleFileSelect}
                />
              </div>
            )}
          </div>
          <p className="text-xs text-muted-foreground text-center">
            支援格式：MP4, MOV, AVI, WebM（最大 2GB）
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="video-url">影片連結</Label>
            <div className="relative">
              <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="video-url"
                placeholder="https://www.youtube.com/watch?v=..."
                value={url}
                onChange={(e) => handleUrlChange(e.target.value)}
                className={cn("pl-10", urlError && "border-destructive")}
              />
            </div>
            {urlError && (
              <p className="text-sm text-destructive">{urlError}</p>
            )}
          </div>

          {url && urlType && urlType !== "other" && (
            <Card className="p-4 bg-primary/5 border-primary/20">
              <div className="flex items-center gap-3">
                {urlType === "youtube" ? (
                  <Youtube className="w-8 h-8 text-red-500" />
                ) : (
                  <Video className="w-8 h-8 text-blue-500" />
                )}
                <div>
                  <p className="font-medium text-foreground">
                    {urlType === "youtube" ? "YouTube" : "Vimeo"} 影片
                  </p>
                  <p className="text-sm text-muted-foreground truncate max-w-md">
                    {url}
                  </p>
                </div>
              </div>
            </Card>
          )}

          <div className="flex gap-4 justify-center">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Youtube className="w-5 h-5" />
              <span>YouTube</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Video className="w-5 h-5" />
              <span>Vimeo</span>
            </div>
          </div>
        </div>
      )}

     <div className="flex justify-between">
        <Button variant="outline" onClick={onBack} disabled={loading}>
          上一步
        </Button>
        {/* 改成 handleStepNext，並在 loading 時禁用按鈕 */}
        <Button onClick={handleStepNext} disabled={!canProceed || loading}>
          {loading ? (
            <>
              <span className="animate-spin mr-2">⏳</span> 解析中...
            </>
          ) : (
            "下一步"
          )}
        </Button>
      </div>
    </div>
  );
}
