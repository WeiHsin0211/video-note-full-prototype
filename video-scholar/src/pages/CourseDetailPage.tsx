import { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Clock,
  Users,
  Star,
  BookOpen,
  Play,
  CheckCircle2,
  Calendar,
  Award,
  Share2,
  Heart,
  ChevronRight,
  FileText,
  Video,
} from "lucide-react";
import { useParams, Link } from "react-router-dom";
import teacher1 from "@/assets/teacher-1.jpg";

const courseData = {
  id: 1,
  title: "人工智慧導論",
  subtitle: "從基礎概念到實務應用，完整學習人工智慧的核心技術",
  instructor: {
    name: "陳美玲 教授",
    title: "國立台灣大學資訊工程學系",
    image: teacher1,
    bio: "專長於機器學習、深度學習與自然語言處理，發表超過 50 篇國際期刊論文。",
    courses: 12,
    students: 5000,
    rating: 4.9,
  },
  category: "資訊科技",
  duration: "12 小時",
  students: 1234,
  rating: 4.9,
  reviews: 156,
  lessons: 24,
  level: "初學者",
  language: "中文",
  lastUpdated: "2024 年 3 月",
  image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=600&fit=crop",
  tags: ["熱門", "AI", "機器學習"],
  description: `
本課程將帶領您從零開始學習人工智慧的核心概念與實務應用。無論您是程式設計新手還是有經驗的開發者，都能透過本課程獲得完整的 AI 知識體系。

課程涵蓋機器學習基礎、深度學習、神經網路、自然語言處理等重要主題，並透過實作專案讓您能夠將所學應用於真實場景。
  `,
  learningOutcomes: [
    "理解人工智慧的基本概念與發展歷程",
    "掌握機器學習的核心演算法",
    "學會使用 Python 實作 AI 模型",
    "了解深度學習與神經網路的原理",
    "具備獨立開發 AI 專案的能力",
  ],
  curriculum: [
    {
      id: 1,
      title: "課程介紹與環境設定",
      duration: "45 分鐘",
      lessons: [
        { id: 1, title: "課程大綱與學習目標", duration: "10:00", type: "video", completed: true },
        { id: 2, title: "Python 環境安裝", duration: "15:00", type: "video", completed: true },
        { id: 3, title: "Jupyter Notebook 使用指南", duration: "20:00", type: "video", completed: false },
      ],
    },
    {
      id: 2,
      title: "人工智慧基礎概念",
      duration: "2 小時",
      lessons: [
        { id: 4, title: "AI 的定義與發展歷程", duration: "25:00", type: "video", completed: false },
        { id: 5, title: "機器學習 vs 深度學習", duration: "30:00", type: "video", completed: false },
        { id: 6, title: "AI 應用案例分析", duration: "35:00", type: "video", completed: false },
        { id: 7, title: "章節測驗", duration: "15:00", type: "quiz", completed: false },
      ],
    },
    {
      id: 3,
      title: "機器學習入門",
      duration: "3 小時",
      lessons: [
        { id: 8, title: "監督式學習概論", duration: "40:00", type: "video", completed: false },
        { id: 9, title: "非監督式學習概論", duration: "35:00", type: "video", completed: false },
        { id: 10, title: "線性迴歸實作", duration: "45:00", type: "video", completed: false },
        { id: 11, title: "分類演算法實作", duration: "50:00", type: "video", completed: false },
        { id: 12, title: "補充教材：數學基礎", duration: "20 頁", type: "pdf", completed: false },
      ],
    },
  ],
};

export default function CourseDetailPage() {
  const { id } = useParams();
  const [isEnrolled, setIsEnrolled] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-hero text-card relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={courseData.image}
            alt={courseData.title}
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-transparent" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Course Info */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex flex-wrap gap-2 mb-4">
                  {courseData.tags.map((tag) => (
                    <Badge key={tag} className="bg-accent/20 text-accent border-0">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                  {courseData.title}
                </h1>
                <p className="text-lg text-card/80 mb-6">
                  {courseData.subtitle}
                </p>

                {/* Stats */}
                <div className="flex flex-wrap items-center gap-6 text-sm text-card/70 mb-6">
                  <span className="flex items-center gap-1 text-warning">
                    <Star className="w-4 h-4 fill-current" />
                    {courseData.rating} ({courseData.reviews} 評價)
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {courseData.students} 學員
                  </span>
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-4 h-4" />
                    {courseData.lessons} 單元
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {courseData.duration}
                  </span>
                </div>

                {/* Instructor */}
                <div className="flex items-center gap-3">
                  <img
                    src={courseData.instructor.image}
                    alt={courseData.instructor.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium">{courseData.instructor.name}</p>
                    <p className="text-sm text-card/60">
                      {courseData.instructor.title}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Enrollment Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="lg:row-start-1"
            >
              <div className="bg-card rounded-2xl p-6 shadow-xl">
                <div className="aspect-video rounded-xl overflow-hidden mb-6 relative group">
                  <img
                    src={courseData.image}
                    alt={courseData.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-background/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-16 h-16 rounded-full bg-card/90 flex items-center justify-center">
                      <Play className="w-8 h-8 text-primary ml-1" />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {isEnrolled ? (
                    <Link to={`/learn/${courseData.id}`}>
                      <Button size="lg" className="w-full" variant="cta">
                        繼續學習
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </Link>
                  ) : (
                    <Button
                      size="lg"
                      className="w-full"
                      variant="cta"
                      onClick={() => setIsEnrolled(true)}
                    >
                      免費報名課程
                    </Button>
                  )}

                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1">
                      <Heart className="w-4 h-4 mr-1" />
                      收藏
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Share2 className="w-4 h-4 mr-1" />
                      分享
                    </Button>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-border space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">難易度</span>
                    <span className="font-medium">{courseData.level}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">語言</span>
                    <span className="font-medium">{courseData.language}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">最後更新</span>
                    <span className="font-medium">{courseData.lastUpdated}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Course Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="mb-6">
                  <TabsTrigger value="overview">課程介紹</TabsTrigger>
                  <TabsTrigger value="curriculum">課程大綱</TabsTrigger>
                  <TabsTrigger value="instructor">講師介紹</TabsTrigger>
                </TabsList>

                <TabsContent value="overview">
                  <div className="space-y-8">
                    {/* Description */}
                    <div>
                      <h3 className="text-xl font-semibold mb-4">課程說明</h3>
                      <p className="text-muted-foreground whitespace-pre-line">
                        {courseData.description}
                      </p>
                    </div>

                    {/* Learning Outcomes */}
                    <div>
                      <h3 className="text-xl font-semibold mb-4">學習成果</h3>
                      <div className="grid gap-3">
                        {courseData.learningOutcomes.map((outcome, index) => (
                          <div
                            key={index}
                            className="flex items-start gap-3 p-4 rounded-xl bg-muted/50"
                          >
                            <CheckCircle2 className="w-5 h-5 text-success mt-0.5" />
                            <span>{outcome}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="curriculum">
                  <div className="space-y-4">
                    {courseData.curriculum.map((section, sectionIndex) => (
                      <div
                        key={section.id}
                        className="border border-border rounded-xl overflow-hidden"
                      >
                        <div className="p-4 bg-muted/50 flex justify-between items-center">
                          <div>
                            <h4 className="font-semibold">
                              第 {sectionIndex + 1} 章：{section.title}
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              {section.lessons.length} 個單元 • {section.duration}
                            </p>
                          </div>
                        </div>
                        <div className="divide-y divide-border">
                          {section.lessons.map((lesson) => (
                            <div
                              key={lesson.id}
                              className="p-4 flex items-center justify-between hover:bg-muted/30 transition-colors"
                            >
                              <div className="flex items-center gap-3">
                                {lesson.type === "video" && (
                                  <Video className="w-4 h-4 text-primary" />
                                )}
                                {lesson.type === "quiz" && (
                                  <FileText className="w-4 h-4 text-accent" />
                                )}
                                {lesson.type === "pdf" && (
                                  <FileText className="w-4 h-4 text-muted-foreground" />
                                )}
                                <span className={lesson.completed ? "text-muted-foreground" : ""}>
                                  {lesson.title}
                                </span>
                                {lesson.completed && (
                                  <CheckCircle2 className="w-4 h-4 text-success" />
                                )}
                              </div>
                              <span className="text-sm text-muted-foreground">
                                {lesson.duration}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="instructor">
                  <div className="bg-card rounded-2xl border border-border p-6">
                    <div className="flex items-start gap-6">
                      <img
                        src={courseData.instructor.image}
                        alt={courseData.instructor.name}
                        className="w-24 h-24 rounded-xl object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold mb-1">
                          {courseData.instructor.name}
                        </h3>
                        <p className="text-muted-foreground mb-4">
                          {courseData.instructor.title}
                        </p>
                        <div className="flex gap-6 text-sm text-muted-foreground mb-4">
                          <span className="flex items-center gap-1">
                            <BookOpen className="w-4 h-4" />
                            {courseData.instructor.courses} 門課程
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {courseData.instructor.students} 學員
                          </span>
                          <span className="flex items-center gap-1 text-warning">
                            <Star className="w-4 h-4 fill-current" />
                            {courseData.instructor.rating}
                          </span>
                        </div>
                        <p className="text-muted-foreground">
                          {courseData.instructor.bio}
                        </p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
