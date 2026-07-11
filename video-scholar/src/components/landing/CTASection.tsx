import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

const benefits = [
  "免費試用 14 天",
  "無需信用卡",
  "隨時可取消",
  "完整功能體驗",
];

export function CTASection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/10 border border-card/20 mb-6">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-sm text-card/90">立即開始您的學習之旅</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-bold text-card mb-6 leading-tight">
            準備好讓學習更有效率了嗎？
          </h2>

          <p className="text-lg text-card/70 mb-8 max-w-2xl mx-auto">
            加入超過 10,000 名學員，體驗 AI 驅動的智慧學習平台。
            從今天開始，讓每一分鐘的學習都更有價值。
          </p>

          {/* Benefits */}
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            {benefits.map((benefit) => (
              <div
                key={benefit}
                className="flex items-center gap-2 text-card/80"
              >
                <CheckCircle2 className="w-4 h-4 text-accent" />
                <span className="text-sm">{benefit}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/register">
              <Button size="xl" variant="cta" className="group min-w-[200px]">
                免費開始使用
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="xl" variant="hero" className="min-w-[200px]">
                聯繫銷售團隊
              </Button>
            </Link>
          </div>

          <p className="text-sm text-card/50 mt-6">
            有任何問題？歡迎來信 support@videonote.edu
          </p>
        </motion.div>
      </div>
    </section>
  );
}
