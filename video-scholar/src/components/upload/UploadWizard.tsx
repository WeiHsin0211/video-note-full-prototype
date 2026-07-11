import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { StepIndicator } from "./StepIndicator";
import { SourceTypeStep } from "./steps/SourceTypeStep";
import { SourceInputStep } from "./steps/SourceInputStep";
import { VideoDetailsStep } from "./steps/VideoDetailsStep";
import { AIConfigStep } from "./steps/AIConfigStep";
import { ReviewStep } from "./steps/ReviewStep";
import { videoApi } from '../../api/videoApi'; // 請根據你的實際路徑調整

export type SourceType = "file" | "url" | null;

export interface UploadData {
  sourceType: SourceType;
  file: File | null;
  url: string;
  urlType: "youtube" | "vimeo" | "other" | null;
  title: string;
  description: string;
  tags: string[];
  aiConfig: {
    transcription: boolean;
    summary: boolean;
    notes: boolean;
    quiz: boolean;
  };
}

const initialData: UploadData = {
  sourceType: null,
  file: null,
  url: "",
  urlType: null,
  title: "",
  description: "",
  tags: [],
  aiConfig: {
    transcription: true,
    summary: true,
    notes: false,
    quiz: false,
  },
};

const STEPS = [
  { id: 1, label: "來源類型" },
  { id: 2, label: "選擇來源" },
  { id: 3, label: "影片資訊" },
  { id: 4, label: "AI 功能" },
  { id: 5, label: "確認送出" },
];

export function UploadWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [data, setData] = useState<UploadData>(initialData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  // 加入這兩行
  const [note, setNote] = useState<string>(''); 
  const [isLoading, setIsLoading] = useState(false);
 
  const updateData = (updates: Partial<UploadData>) => {
    setData((prev) => ({ ...prev, ...updates }));
  };

  const nextStep = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const goToStep = (step: number) => {
    if (step <= currentStep) {
      setCurrentStep(step);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
        // 🚀 關鍵：這裡要呼叫真正連動後端的 handleUpload
        // 傳入目前 data 裡的 url 和 aiConfig
        await handleUpload(data.url, data.aiConfig);
        
        // 成功後才重置資料
        setData(initialData);
        setCurrentStep(1);
        alert("影片處理任務已啟動，請稍候產出筆記！");
    } catch (err) {
        console.error("提交失敗:", err);
    } finally {
        setIsSubmitting(false);
        setIsLoading(false);
    }
  };
  const handleUpload = async (url, options) => {
    try {
        // 1. 提交並拿到 ID
        const { task_id } = await videoApi.submitTask(data.url, data.aiConfig);
        
     // 3. 進入等待狀態
        setIsLoading(true); 
        const finalResult = await videoApi.waitForTask(task_id) as { text: string }; 

        // 4. 更新結果
        setNote(finalResult.text);
        alert("AI 筆記生成完成！");
        
        // 根據需求決定是否跳轉或重置
        // setCurrentStep(1); 
    } catch (err) {
        alert("處理失敗：" + err.message);
    } finally {
        setIsSubmitting(false);
        setIsLoading(false);
    }
};
// 在 UploadWizard 內部定義這個轉接函式
const handleUpdateData = (newData: Partial<UploadData>) => {
    updateData(newData);
};
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <SourceTypeStep 
            selectedType={data.sourceType}
            onSelect={(type) => updateData({ sourceType: type })}
            onNext={nextStep}
          />
        );
      case 2:
        return (
          <SourceInputStep 
            updateFormData={handleUpdateData}
            sourceType={data.sourceType}
            file={data.file}
            url={data.url}
            urlType={data.urlType}
            onFileChange={(file) => updateData({ file })}
            onUrlChange={(url, urlType) => updateData({ url, urlType })}
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case 3:
        return (
          <VideoDetailsStep
            title={data.title}
            description={data.description}
            tags={data.tags}
            onTitleChange={(title) => updateData({ title })}
            onDescriptionChange={(description) => updateData({ description })}
            onTagsChange={(tags) => updateData({ tags })}
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case 4:
        return (
          <AIConfigStep
            config={data.aiConfig}
            onConfigChange={(aiConfig) => updateData({ aiConfig })}
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case 5:
        return (
          <ReviewStep
            data={data}
            onSubmit={handleSubmit}
            onBack={prevStep}
            onEdit={goToStep}
            isSubmitting={isSubmitting}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <StepIndicator
        steps={STEPS}
        currentStep={currentStep}
        onStepClick={goToStep}
      />
      
      <div className="mt-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
