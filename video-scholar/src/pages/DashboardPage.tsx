import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  BookOpen,
  Play,
  Clock,
  CheckCircle2,
  TrendingUp,
  Calendar,
  Award,
  Bell,
  Settings,
  ChevronRight,
  BarChart3,
  FileText,
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import teacher1 from "@/assets/teacher-1.jpg";
import teacher2 from "@/assets/teacher-2.jpg";
import student1 from "@/assets/student-1.jpg";

const userData = {
  name: "王小明",
  email: "xiaoming@example.com",
  avatar: student1,
  totalHours: 42,
  coursesCompleted: 5,
  currentStreak: 7,
};

const enrolledCourses = [
  {
    id: 1,
    title: "人工智慧導論",
    instructor: "陳美玲 教授",
    instructorImage: teacher1,
    progress: 68,
    lastAccessed: "今天",
    nextLesson: "機器學習 vs 深度學習",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=225&fit=crop",
  },
  {
    id: 2,
    title: "數據分析與視覺化",
    instructor: "林志明 講師",
    instructorImage: teacher2,
    progress: 34,
    lastAccessed: "昨天",
    nextLesson: "Pandas 資料處理",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=225&fit=crop",
  },
  {
    id: 3,
    title: "永續發展與社會責任",
    instructor: "陳美玲 教授",
    instructorImage: teacher1,
    progress: 100,
    lastAccessed: "3 天前",
    nextLesson: null,
    image: "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?w=400&h=225&fit=crop",
  },
];

const upcomingTasks = [
  {
    id: 1,
    type: "quiz",
    title: "第二章測驗",
    course: "人工智慧導論",
    dueDate: "明天",
    urgent: true,
  },
  {
    id: 2,
    type: "assignment",
    title: "數據視覺化作業",
    course: "數據分析與視覺化",
    dueDate: "3 天後",
    urgent: false,
  },
];

const recentNotes = [
  {
    id: 1,
    content: "AI 是由機器展現的智能，與自然智能不同",
    course: "人工智慧導論",
    timestamp: "今天 14:32",
  },
  {
    id: 2,
    content: "1956 年達特茅斯會議是 AI 學科誕生的時刻",
    course: "人工智慧導論",
    timestamp: "今天 14:35",
  },
];

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-muted/30">
      <Navbar />

      <main className="pt-20 pb-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8"
          >
            <div className="flex items-center gap-4">
              <img
                src={userData.avatar}
                alt={userData.name}
                className="w-16 h-16 rounded-2xl object-cover"
              />
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  你好，{userData.name}！
                </h1>
                <p className="text-muted-foreground">
                  繼續你的學習之旅吧
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon">
                <Bell className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
          >
            <div className="bg-card rounded-2xl p-6 border border-border">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {userData.totalHours} 小時
                  </p>
                  <p className="text-sm text-muted-foreground">總學習時數</p>
                </div>
              </div>
            </div>
            <div className="bg-card rounded-2xl p-6 border border-border">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Award className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {userData.coursesCompleted} 門
                  </p>
                  <p className="text-sm text-muted-foreground">已完成課程</p>
                </div>
              </div>
            </div>
            <div className="bg-card rounded-2xl p-6 border border-border">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-cta/10 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-cta" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {userData.currentStreak} 天
                  </p>
                  <p className="text-sm text-muted-foreground">連續學習天數</p>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Continue Learning */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-foreground">
                    繼續學習
                  </h2>
                  <Link to="/courses">
                    <Button variant="ghost" size="sm">
                      查看全部
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </Link>
                </div>

                <div className="space-y-4">
                  {enrolledCourses
                    .filter((course) => course.progress < 100)
                    .map((course) => (
                      <div
                        key={course.id}
                        className="bg-card rounded-2xl border border-border overflow-hidden hover:border-primary/30 hover:shadow-lg transition-all"
                      >
                        <div className="flex">
                          <div className="w-40 h-28 shrink-0">
                            <img
                              src={course.image}
                              alt={course.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 p-4">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h3 className="font-semibold text-foreground">
                                  {course.title}
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                  {course.instructor}
                                </p>
                              </div>
                              <Badge variant="secondary">
                                {course.lastAccessed}
                              </Badge>
                            </div>
                            <div className="mb-2">
                              <div className="flex items-center justify-between text-sm mb-1">
                                <span className="text-muted-foreground">
                                  進度
                                </span>
                                <span className="font-medium">
                                  {course.progress}%
                                </span>
                              </div>
                              <Progress value={course.progress} />
                            </div>
                            <div className="flex items-center justify-between">
                              <p className="text-sm text-muted-foreground">
                                下一單元：{course.nextLesson}
                              </p>
                              <Link to={`/learn/${course.id}`}>
                                <Button size="sm" variant="cta">
                                  <Play className="w-3 h-3 mr-1" />
                                  繼續
                                </Button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </motion.section>

              {/* Completed Courses */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  已完成課程
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {enrolledCourses
                    .filter((course) => course.progress === 100)
                    .map((course) => (
                      <div
                        key={course.id}
                        className="bg-card rounded-xl border border-border p-4 flex items-center gap-4"
                      >
                        <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0">
                          <img
                            src={course.image}
                            alt={course.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-foreground truncate">
                            {course.title}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {course.instructor}
                          </p>
                        </div>
                        <CheckCircle2 className="w-6 h-6 text-success shrink-0" />
                      </div>
                    ))}
                </div>
              </motion.section>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Upcoming Tasks */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-card rounded-2xl border border-border p-6"
              >
                <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  待完成任務
                </h2>
                <div className="space-y-3">
                  {upcomingTasks.map((task) => (
                    <div
                      key={task.id}
                      className={`p-3 rounded-xl border ${
                        task.urgent
                          ? "border-destructive/30 bg-destructive/5"
                          : "border-border"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                            task.type === "quiz"
                              ? "bg-accent/10"
                              : "bg-primary/10"
                          }`}
                        >
                          {task.type === "quiz" ? (
                            <FileText
                              className={`w-4 h-4 ${
                                task.type === "quiz"
                                  ? "text-accent"
                                  : "text-primary"
                              }`}
                            />
                          ) : (
                            <BookOpen className="w-4 h-4 text-primary" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-foreground text-sm">
                            {task.title}
                          </p>
                          <p className="text-xs text-muted-foreground truncate">
                            {task.course}
                          </p>
                          <p
                            className={`text-xs mt-1 ${
                              task.urgent ? "text-destructive" : "text-muted-foreground"
                            }`}
                          >
                            截止：{task.dueDate}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.section>

              {/* Recent Notes */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-card rounded-2xl border border-border p-6"
              >
                <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-accent" />
                  最近筆記
                </h2>
                <div className="space-y-3">
                  {recentNotes.map((note) => (
                    <div
                      key={note.id}
                      className="p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors cursor-pointer"
                    >
                      <p className="text-sm text-foreground mb-1 line-clamp-2">
                        {note.content}
                      </p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{note.course}</span>
                        <span>{note.timestamp}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="ghost" className="w-full mt-3" size="sm">
                  查看全部筆記
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </motion.section>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
