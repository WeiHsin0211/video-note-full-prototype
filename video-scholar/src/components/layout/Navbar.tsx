import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Menu,
  X,
  GraduationCap,
  LayoutDashboard,
  LogIn,
  UserPlus,
  ChevronDown,
  Upload,
} from "lucide-react";

const navLinks = [
  { label: "課程列表", href: "/courses", icon: BookOpen },
  { label: "上傳影片", href: "/upload", icon: Upload },
  { label: "關於我們", href: "/about", icon: GraduationCap },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isHomePage ? "bg-transparent" : "glass"
      }`}
    >
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow group-hover:scale-105 transition-transform">
            <BookOpen className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className={`font-bold text-xl ${isHomePage ? "text-card" : "text-foreground"}`}>
            Video<span className="text-gradient-primary">Note</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link key={link.href} to={link.href}>
              <Button
                variant="ghost"
                className={`${
                  isHomePage
                    ? "text-card/80 hover:text-card hover:bg-card/10"
                    : "text-foreground/80 hover:text-foreground"
                }`}
              >
                <link.icon className="w-4 h-4 mr-1" />
                {link.label}
              </Button>
            </Link>
          ))}
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Link to="/login">
            <Button
              variant={isHomePage ? "hero" : "ghost"}
              className={isHomePage ? "text-card" : ""}
            >
              <LogIn className="w-4 h-4" />
              登入
            </Button>
          </Link>
          <Link to="/register">
            <Button variant="cta">
              <UserPlus className="w-4 h-4" />
              免費註冊
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <Button
          variant="ghost"
          size="icon"
          className={`md:hidden ${isHomePage ? "text-card" : ""}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </Button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-border/50"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link key={link.href} to={link.href} onClick={() => setIsOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start">
                    <link.icon className="w-4 h-4 mr-2" />
                    {link.label}
                  </Button>
                </Link>
              ))}
              <div className="border-t border-border/50 my-2" />
              <Link to="/login" onClick={() => setIsOpen(false)}>
                <Button variant="outline" className="w-full">
                  <LogIn className="w-4 h-4 mr-2" />
                  登入
                </Button>
              </Link>
              <Link to="/register" onClick={() => setIsOpen(false)}>
                <Button variant="cta" className="w-full">
                  <UserPlus className="w-4 h-4 mr-2" />
                  免費註冊
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
