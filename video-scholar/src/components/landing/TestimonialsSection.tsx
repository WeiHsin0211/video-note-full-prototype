import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import student1 from "@/assets/student-1.jpg";
import teacher1 from "@/assets/teacher-1.jpg";
import teacher2 from "@/assets/teacher-2.jpg";

const testimonials = [
  {
    id: 1,
    content: "VideoNote 的 AI 摘要功能讓我複習效率提升了三倍！期末考前再也不用花大量時間重看影片，直接看重點就好。",
    author: "王小明",
    role: "台大資工系學生",
    avatar: student1,
    rating: 5,
  },
  {
    id: 2,
    content: "作為教師，我很喜歡自動生成測驗的功能。節省了大量出題時間，而且題目品質很高，學生回饋也很正面。",
    author: "陳美玲",
    role: "國立大學教授",
    avatar: teacher1,
    rating: 5,
  },
  {
    id: 3,
    content: "我們學校導入 VideoNote 後，線上課程的完成率提升了 40%。學生真的很喜歡做筆記和標記的互動功能。",
    author: "林志明",
    role: "教務處主任",
    avatar: teacher2,
    rating: 5,
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1 rounded-full bg-cta/10 text-cta text-sm font-medium mb-4">
            學員見證
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            他們都在用 <span className="text-gradient-primary">VideoNote</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            來自各大學校與企業的真實回饋
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              <div className="h-full p-8 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300">
                {/* Quote icon */}
                <Quote className="w-10 h-10 text-primary/20 mb-4" />

                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-warning fill-current" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-foreground mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.author}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-foreground">
                      {testimonial.author}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
