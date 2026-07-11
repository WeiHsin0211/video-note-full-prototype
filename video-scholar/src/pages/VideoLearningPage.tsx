import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Settings,
  BookOpen,
  FileText,
  MessageSquare,
  Highlighter,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Clock,
  Sparkles,
  List,
  X,
  Plus,
  Tag,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";

const videoData = {
  id: 1,
  title: "AI 的定義與發展歷程",
  duration: "25:00",
  currentTime: "08:32",
  progress: 34,
  chapter: "第二章：人工智慧基礎概念",
  nextLesson: { id: 5, title: "機器學習 vs 深度學習" },
  prevLesson: { id: 3, title: "Jupyter Notebook 使用指南" },
};

const transcriptData = [
  {
    id: 1,
    startTime: "00:00",
    endTime: "00:15",
    text: "大家好，歡迎來到人工智慧導論的第二章。今天我們要來探討一個非常基礎但重要的問題：什麼是人工智慧？",
    isHighlighted: false,
  },
  {
    id: 2,
    startTime: "00:15",
    endTime: "00:35",
    text: "人工智慧，簡稱 AI，是指由機器展現出的智能。與人類和動物展現的自然智能不同，人工智慧是通過電腦程式來實現的。",
    isHighlighted: true,
  },
  {
    id: 3,
    startTime: "00:35",
    endTime: "00:55",
    text: "AI 的發展可以追溯到 1956 年的達特茅斯會議，這被認為是人工智慧作為一個學科正式誕生的時刻。",
    isHighlighted: false,
  },
  {
    id: 4,
    startTime: "00:55",
    endTime: "01:20",
    text: "在接下來的幾十年裡，AI 經歷了幾次「寒冬」與「復興」。直到近年來，隨著深度學習技術的突破，AI 才真正進入了一個爆發性成長的階段。",
    isHighlighted: false,
  },
  {
    id: 5,
    startTime: "01:20",
    endTime: "01:45",
    text: "讓我們來看看 AI 的幾個主要分支：機器學習、深度學習、自然語言處理、電腦視覺等。這些技術已經廣泛應用在我們的日常生活中。",
    isHighlighted: true,
  },
];

const notesData = [
  {
    id: 1,
    timestamp: "00:15",
    content: "AI 是由機器展現的智能，與自然智能不同",
    tags: ["定義", "重點"],
  },
  {
    id: 2,
    timestamp: "00:35",
    content: "1956 年達特茅斯會議是 AI 學科誕生的時刻",
    tags: ["歷史"],
  },
];

const curriculumData = [
  {
    id: 1,
    title: "課程介紹與環境設定",
    lessons: [
      { id: 1, title: "課程大綱與學習目標", completed: true },
      { id: 2, title: "Python 環境安裝", completed: true },
      { id: 3, title: "Jupyter Notebook 使用指南", completed: true },
    ],
  },
  {
    id: 2,
    title: "人工智慧基礎概念",
    lessons: [
      { id: 4, title: "AI 的定義與發展歷程", completed: false, current: true },
      { id: 5, title: "機器學習 vs 深度學習", completed: false },
      { id: 6, title: "AI 應用案例分析", completed: false },
    ],
  },
];

export default function VideoLearningPage() {
  const { courseId, lessonId } = useParams();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [activeTab, setActiveTab] = useState<"transcript" | "notes" | "curriculum">("transcript");
  const [showSidebar, setShowSidebar] = useState(true);
  const [newNote, setNewNote] = useState("");

  const tabs = [
    { id: "transcript", label: "逐字稿", icon: FileText },
    { id: "notes", label: "筆記", icon: BookOpen },
    { id: "curriculum", label: "章節", icon: List },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top Bar */}
      <header className="h-14 bg-card border-b border-border flex items-center justify-between px-4 shrink-0">
        <div className="flex items-center gap-4">
          <Link to={`/courses/${courseId}`}>
            <Button variant="ghost" size="sm">
              <ChevronLeft className="w-4 h-4 mr-1" />
              返回課程
            </Button>
          </Link>
          <div className="hidden sm:block">
            <p className="text-sm text-muted-foreground">{videoData.chapter}</p>
            <p className="font-medium">{videoData.title}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Sparkles className="w-4 h-4 mr-1" />
            AI 摘要
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowSidebar(!showSidebar)}
          >
            {showSidebar ? <X className="w-4 h-4" /> : <List className="w-4 h-4" />}
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Video Section */}
        <div className={`flex-1 flex flex-col ${showSidebar ? "" : "w-full"}`}>
          {/* Video Player */}
          <div className="relative bg-foreground aspect-video max-h-[60vh]">
            <div className="absolute inset-0 flex items-center justify-center">
              <img
                src="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=675&fit=crop"
                alt="Video thumbnail"
                className="w-full h-full object-cover opacity-50"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <Button
                  size="xl"
                  variant="glass"
                  className="w-20 h-20 rounded-full"
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  {isPlaying ? (
                    <Pause className="w-8 h-8" />
                  ) : (
                    <Play className="w-8 h-8 ml-1" />
                  )}
                </Button>
              </div>
            </div>

            {/* Video Controls */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/90 to-transparent p-4">
              {/* Progress Bar */}
              <div className="mb-3">
                <Slider
                  defaultValue={[videoData.progress]}
                  max={100}
                  step={1}
                  className="cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsPlaying(!isPlaying)}
                  >
                    {isPlaying ? (
                      <Pause className="w-5 h-5" />
                    ) : (
                      <Play className="w-5 h-5" />
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsMuted(!isMuted)}
                  >
                    {isMuted ? (
                      <VolumeX className="w-5 h-5" />
                    ) : (
                      <Volume2 className="w-5 h-5" />
                    )}
                  </Button>
                  <span className="text-sm text-card">
                    {videoData.currentTime} / {videoData.duration}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <Settings className="w-5 h-5" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Maximize className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="p-4 border-t border-border flex items-center justify-between bg-card">
            <Button variant="outline" disabled={!videoData.prevLesson}>
              <ChevronLeft className="w-4 h-4 mr-1" />
              上一單元
            </Button>
            <div className="flex items-center gap-2">
              <Button variant="outline">
                <MessageSquare className="w-4 h-4 mr-1" />
                討論區
              </Button>
              <Button variant="default">
                <CheckCircle2 className="w-4 h-4 mr-1" />
                完成此單元
              </Button>
            </div>
            <Button variant="outline" disabled={!videoData.nextLesson}>
              下一單元
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>

        {/* Sidebar */}
        {showSidebar && (
          <motion.aside
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 400, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            className="w-[400px] border-l border-border bg-card flex flex-col shrink-0"
          >
            {/* Tabs */}
            <div className="flex border-b border-border">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? "text-primary border-b-2 border-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4">
              {activeTab === "transcript" && (
                <div className="space-y-3">
                  {transcriptData.map((segment) => (
                    <div
                      key={segment.id}
                      className={`p-3 rounded-lg cursor-pointer transition-colors group ${
                        segment.isHighlighted
                          ? "bg-accent/10 border border-accent/30"
                          : "hover:bg-muted/50"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-muted-foreground">
                          {segment.startTime}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="opacity-0 group-hover:opacity-100 h-6 px-2"
                        >
                          <Highlighter className="w-3 h-3 mr-1" />
                          標記
                        </Button>
                      </div>
                      <p className="text-sm">{segment.text}</p>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "notes" && (
                <div className="space-y-4">
                  {/* Add Note */}
                  <div className="p-4 rounded-xl border border-border bg-muted/30">
                    <Textarea
                      placeholder="新增筆記..."
                      value={newNote}
                      onChange={(e) => setNewNote(e.target.value)}
                      className="min-h-[80px] mb-3"
                    />
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        <Clock className="w-3 h-3 inline mr-1" />
                        {videoData.currentTime}
                      </span>
                      <Button size="sm" disabled={!newNote.trim()}>
                        <Plus className="w-4 h-4 mr-1" />
                        新增
                      </Button>
                    </div>
                  </div>

                  {/* Notes List */}
                  {notesData.map((note) => (
                    <div
                      key={note.id}
                      className="p-4 rounded-xl border border-border hover:border-primary/30 transition-colors"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs text-primary font-medium">
                          {note.timestamp}
                        </span>
                        {note.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <p className="text-sm">{note.content}</p>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "curriculum" && (
                <div className="space-y-4">
                  {curriculumData.map((chapter, chapterIndex) => (
                    <div key={chapter.id}>
                      <h4 className="text-sm font-medium text-muted-foreground mb-2">
                        第 {chapterIndex + 1} 章：{chapter.title}
                      </h4>
                      <div className="space-y-1">
                        {chapter.lessons.map((lesson) => (
                          <div
                            key={lesson.id}
                            className={`p-3 rounded-lg flex items-center gap-3 cursor-pointer transition-colors ${
                              lesson.current
                                ? "bg-primary/10 border border-primary/30"
                                : "hover:bg-muted/50"
                            }`}
                          >
                            {lesson.completed ? (
                              <CheckCircle2 className="w-4 h-4 text-success shrink-0" />
                            ) : lesson.current ? (
                              <Play className="w-4 h-4 text-primary shrink-0" />
                            ) : (
                              <div className="w-4 h-4 rounded-full border-2 border-muted-foreground/30 shrink-0" />
                            )}
                            <span
                              className={`text-sm ${
                                lesson.completed ? "text-muted-foreground" : ""
                              }`}
                            >
                              {lesson.title}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.aside>
        )}
      </div>
    </div>
  );
}
