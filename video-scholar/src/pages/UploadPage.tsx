import { Helmet } from "react-helmet";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { UploadWizard } from "@/components/upload/UploadWizard";

export default function UploadPage() {
  return (
    <>
      <Helmet>
        <title>上傳影片 - VideoNote</title>
        <meta name="description" content="上傳影片並啟用 AI 自動轉錄、摘要、筆記與測驗生成功能" />
      </Helmet>
      
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        
        <main className="flex-1 pt-24 pb-16">
          <div className="container mx-auto px-4">
            <UploadWizard />
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
}
