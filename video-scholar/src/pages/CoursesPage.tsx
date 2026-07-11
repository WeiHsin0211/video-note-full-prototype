import { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Filter,
  Clock,
  Users,
  Star,
  BookOpen,
  ChevronDown,
} from "lucide-react";
import { Link } from "react-router-dom";
import teacher1 from "@/assets/teacher-1.jpg";
import teacher2 from "@/assets/teacher-2.jpg";

const categories = [
  "全部",
  "資訊科技",
  "商業分析",
  "通識教育",
  "人文社會",
  "自然科學",
  "藝術設計",
];

const courses = [
  {
    id: 1,
    title: "人工智慧導論",
    instructor: "陳美玲 教授",
    instructorImage: teacher1,
    category: "資訊科技",
    duration: "12 小時",
    students: 1234,
    rating: 4.9,
    lessons: 24,
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=450&fit=crop",
    tags: ["熱門", "AI"],
    description: "從基礎概念到實務應用，完整學習人工智慧的核心技術。",
  },
  {
    id: 2,
    title: "數據分析與視覺化",
    instructor: "林志明 講師",
    instructorImage: teacher2,
    category: "商業分析",
    duration: "8 小時",
    students: 892,
    rating: 4.8,
    lessons: 16,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop",
    tags: ["新課程"],
    description: "學習使用 Python 進行數據分析與資料視覺化。",
  },
  {
    id: 3,
    title: "永續發展與社會責任",
    instructor: "陳美玲 教授",
    instructorImage: teacher1,
    category: "通識教育",
    duration: "6 小時",
    students: 567,
    rating: 4.7,
    lessons: 12,
    image: "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?w=800&h=450&fit=crop",
    tags: ["USR"],
    description: "探討企業社會責任與永續發展的重要議題。",
  },
  {
    id: 4,
    title: "機器學習實戰",
    instructor: "林志明 講師",
    instructorImage: teacher2,
    category: "資訊科技",
    duration: "15 小時",
    students: 756,
    rating: 4.9,
    lessons: 30,
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&h=450&fit=crop",
    tags: ["進階", "AI"],
    description: "從零開始學習機器學習演算法與實務應用。",
  },
  {
    id: 5,
    title: "創業與商業模式",
    instructor: "陳美玲 教授",
    instructorImage: teacher1,
    category: "商業分析",
    duration: "10 小時",
    students: 432,
    rating: 4.6,
    lessons: 20,
    image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=450&fit=crop",
    tags: [],
    description: "學習如何發展創新商業模式與創業策略。",
  },
  {
    id: 6,
    title: "設計思考方法論",
    instructor: "林志明 講師",
    instructorImage: teacher2,
    category: "藝術設計",
    duration: "8 小時",
    students: 321,
    rating: 4.8,
    lessons: 16,
    image: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&h=450&fit=crop",
    tags: ["新課程"],
    description: "掌握設計思考的核心方法與實務應用技巧。",
  },
];

export default function CoursesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("全部");

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "全部" || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto text-center mb-8"
          >
            <h1 className="text-4xl font-bold text-foreground mb-4">
              探索所有<span className="text-gradient-primary">課程</span>
            </h1>
            <p className="text-muted-foreground">
              瀏覽超過 500 門精選課程，開始您的學習之旅
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-2xl mx-auto"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="搜尋課程、講師或關鍵字..."
                className="pl-12 h-14 rounded-xl text-base"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filters & Content */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "secondary"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="rounded-full"
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-muted-foreground">
              找到 <span className="font-semibold text-foreground">{filteredCourses.length}</span> 門課程
            </p>
          </div>

          {/* Course Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link to={`/courses/${course.id}`}>
                  <div className="group bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/30 hover:shadow-xl transition-all duration-300">
                    {/* Course Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4 flex gap-2">
                        {course.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="bg-card/90 backdrop-blur-sm"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Course Info */}
                    <div className="p-6">
                      <p className="text-sm text-muted-foreground mb-2">
                        {course.category}
                      </p>
                      <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {course.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {course.description}
                      </p>

                      {/* Instructor */}
                      <div className="flex items-center gap-3 mb-4">
                        <img
                          src={course.instructorImage}
                          alt={course.instructor}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <span className="text-sm text-muted-foreground">
                          {course.instructor}
                        </span>
                      </div>

                      {/* Stats */}
                      <div className="flex items-center justify-between text-sm text-muted-foreground pt-4 border-t border-border">
                        <span className="flex items-center gap-1">
                          <BookOpen className="w-4 h-4" />
                          {course.lessons} 單元
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {course.duration}
                        </span>
                        <span className="flex items-center gap-1 text-warning">
                          <Star className="w-4 h-4 fill-current" />
                          {course.rating}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
