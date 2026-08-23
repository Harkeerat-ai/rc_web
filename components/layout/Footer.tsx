import { socialLinks } from "@/lib/data";
import { socialIcons } from "@/components/ui/SocialIcons";

export default function Footer() {
  return (
    <footer className="border-t border-gold/10 bg-primary/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <p className="font-heading text-goldtext text-lg font-bold">RCBW</p>
            <p className="text-text-muted text-sm mt-1">
              Rotaract Club of Bombay West &middot; RID 3141
            </p>
          </div>

          <div className="flex items-center gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-gold/20 flex items-center justify-center text-text-muted hover:text-goldtext hover:border-gold/50 hover:shadow-[0_0_15px_rgba(227,178,80,0.35)] transition-all duration-300 cursor-pointer"
                aria-label={link.name}
              >
                {socialIcons[link.icon]}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gold/5 text-center">
          <p className="text-text-muted text-xs">
            &copy; {new Date().getFullYear()} Rotaract Club of Bombay West. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
