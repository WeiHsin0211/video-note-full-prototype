import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Clock, Users, Star } from "lucide-react";
import { Link } from "react-router-dom";
import teacher1 from "@/assets/teacher-1.jpg";
import teacher2 from "@/assets/teacher-2.jpg";

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
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=450&fit=crop",
    tags: ["熱門", "AI"],
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
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop",
    tags: ["新課程"],
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
    image: "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?w=800&h=450&fit=crop",
    tags: ["USR"],
  },
];

export function CoursesPreview() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4"
        >
          <div>
            <span className="inline-block px-4 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
              精選課程
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              探索<span className="text-gradient-accent">熱門課程</span>
            </h2>
          </div>
          <Link to="/courses">
            <Button variant="outline" className="group">
              查看全部課程
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
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
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>

                  {/* Course Info */}
                  <div className="p-6">
                    <p className="text-sm text-muted-foreground mb-2">
                      {course.category}
                    </p>
                    <h3 className="text-xl font-semibold text-foreground mb-4 group-hover:text-primary transition-colors">
                      {course.title}
                    </h3>

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
                        <Clock className="w-4 h-4" />
                        {course.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {course.students}
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
  );
}
