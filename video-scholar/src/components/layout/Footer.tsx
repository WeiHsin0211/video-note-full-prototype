import { Link } from "react-router-dom";
import { BookOpen, Mail, Phone, MapPin, Facebook, Youtube, Linkedin } from "lucide-react";

const footerLinks = {
  platform: [
    { label: "課程列表", href: "/courses" },
    { label: "教師團隊", href: "/teachers" },
    { label: "常見問題", href: "/faq" },
    { label: "成功案例", href: "/testimonials" },
  ],
  resources: [
    { label: "使用指南", href: "/guide" },
    { label: "部落格", href: "/blog" },
    { label: "API 文件", href: "/api-docs" },
    { label: "更新日誌", href: "/changelog" },
  ],
  company: [
    { label: "關於我們", href: "/about" },
    { label: "聯絡我們", href: "/contact" },
    { label: "隱私政策", href: "/privacy" },
    { label: "服務條款", href: "/terms" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-gradient-hero text-card">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-xl">
                Video<span className="text-accent">Note</span>
              </span>
            </Link>
            <p className="text-card/70 mb-6 max-w-sm">
              智慧學習平台，將影片內容轉化為可搜尋、可編輯、可驗收的學習資產。
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-card/10 flex items-center justify-center hover:bg-card/20 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-card/10 flex items-center justify-center hover:bg-card/20 transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-card/10 flex items-center justify-center hover:bg-card/20 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4">平台功能</h4>
            <ul className="space-y-3">
              {footerLinks.platform.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-card/70 hover:text-card transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">學習資源</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-card/70 hover:text-card transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">關於我們</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-card/70 hover:text-card transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div className="border-t border-card/10 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-wrap items-center gap-6 text-sm text-card/60">
              <span className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                support@videonote.edu
              </span>
              <span className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                +886 2 1234 5678
              </span>
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                台北市大安區羅斯福路四段1號
              </span>
            </div>
            <p className="text-sm text-card/60">
              © 2024 VideoNote. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
