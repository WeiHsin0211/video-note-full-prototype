import { motion } from "framer-motion";
import {
  FileText,
  Brain,
  ClipboardCheck,
  Highlighter,
  Search,
  BarChart3,
  Users,
  Shield,
} from "lucide-react";

const features = [
  {
    icon: FileText,
    title: "自動逐字稿",
    description: "AI 自動將影片內容轉換為可編輯的文字稿，支援多語言識別。",
    color: "from-primary/20 to-primary/5",
  },
  {
    icon: Brain,
    title: "AI 智慧摘要",
    description: "一鍵生成課程重點摘要與子彈列筆記，快速掌握核心知識。",
    color: "from-accent/20 to-accent/5",
  },
  {
    icon: ClipboardCheck,
    title: "自動生成測驗",
    description: "根據影片內容自動產生選擇題、是非題、填充題，即時驗收學習成果。",
    color: "from-cta/20 to-cta/5",
  },
  {
    icon: Highlighter,
    title: "高亮標記系統",
    description: "在影片時間軸上標記重點，加入標籤和備註，方便複習回顧。",
    color: "from-success/20 to-success/5",
  },
  {
    icon: Search,
    title: "全文搜尋",
    description: "跨影片搜尋逐字稿內容，快速定位到特定知識點。",
    color: "from-warning/20 to-warning/5",
  },
  {
    icon: BarChart3,
    title: "學習分析",
    description: "追蹤學習進度、觀看時長、測驗成績，提供個人化學習報告。",
    color: "from-primary/20 to-primary/5",
  },
  {
    icon: Users,
    title: "多角色管理",
    description: "支援學生、教師、管理員多種角色，完整的權限控管系統。",
    color: "from-accent/20 to-accent/5",
  },
  {
    icon: Shield,
    title: "企業級安全",
    description: "支援 SSO 單一登入、完整稽核日誌，符合學校資安規範。",
    color: "from-cta/20 to-cta/5",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            核心功能
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            打造完整的<span className="text-gradient-primary">學習生態系</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            從影片轉錄到測驗驗收，一站式解決您的線上學習需求
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="h-full p-6 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-6 h-6 text-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
