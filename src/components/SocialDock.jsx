import React from "react";
import { Github, Linkedin, Mail } from "lucide-react";

export default function SocialDock() {
  const links = [
    {
      icon: Github,
      href: "https://github.com/krush-codem",
      label: "GitHub",
      color: "hover:text-white",
    },
    {
      icon: Linkedin,
      href: "https://linkedin.com/in/harekrushnabehera121",
      label: "LinkedIn",
      color: "hover:text-blue-400",
    },
    {
      icon: Mail,
      href: "mailto:harekrushnabehera2006@email.com",
      label: "Email",
      color: "hover:text-red-400",
    },
  ];

  return (
    <div
      className="
      /* SHARED: Fixed position, dark background, border */
      fixed z-40 bg-slate-900/90 backdrop-blur-md border border-slate-700 shadow-2xl flex items-center justify-center
      
      /* MOBILE: Bottom center, Horizontal Row */
      bottom-6 left-1/2 -translate-x-1/2 flex-row gap-8 px-6 py-3 rounded-full

      /* DESKTOP: Left center, Vertical Column */
      md:bottom-auto md:left-6 md:top-1/2 md:-translate-y-1/2 md:translate-x-0 md:flex-col md:gap-6 md:px-3 md:py-6 md:rounded-2xl
    "
    >
      {links.map((link, index) => (
        <a
          key={index}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`text-slate-400 transition-all duration-300 hover:scale-110 ${link.color}`}
          title={link.label}
        >
          <link.icon size={24} />
        </a>
      ))}
    </div>
  );
}
