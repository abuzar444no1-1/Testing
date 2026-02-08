
import React from 'react';
import { motion } from 'framer-motion';
import { Twitter, Github, Linkedin, Mail, Zap, ChevronUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer id="footer" className="relative pt-32 pb-12 overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        {/* Newsletter Section */}
        <div className="relative mb-32 p-12 md:p-20 rounded-[3rem] bg-gradient-to-br from-primary/20 via-surface to-secondary/10 border border-white/10 overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/5 to-transparent blur-3xl" />
          
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-display font-extrabold mb-6 leading-tight">
              Ready to transcend the <span className="text-primary italic">ordinary?</span>
            </h2>
            <p className="text-white/60 text-lg mb-10">
              Join our exclusive network of innovators and get the latest digital trends delivered directly to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-primary transition-colors backdrop-blur-md"
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 bg-white text-dark rounded-2xl font-bold"
              >
                Join Now
              </motion.button>
            </div>
          </div>
        </div>

        {/* Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-8">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Zap className="text-white w-5 h-5 fill-current" />
              </div>
              <span className="text-xl font-display font-bold tracking-tight">AETHERIA</span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed mb-8">
              Crafting digital excellence since 2024. Pushing the boundaries of what is possible on the web.
            </p>
            <div className="flex gap-4">
              {[Twitter, Github, Linkedin, Mail].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ y: -5, color: '#6366f1' }}
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/60 transition-colors"
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-8 text-lg">Services</h4>
            <ul className="space-y-4 text-white/40 text-sm">
              <li><a href="#" className="hover:text-primary transition-colors">UI/UX Design</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Web Development</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">AI Solutions</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Brand Identity</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-8 text-lg">Company</h4>
            <ul className="space-y-4 text-white/40 text-sm">
              <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Career</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Journal</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-8 text-lg">Contact</h4>
            <ul className="space-y-4 text-white/40 text-sm">
              <li className="flex items-center gap-2">
                <Mail size={16} /> hello@aetheria.io
              </li>
              <li className="flex items-center gap-2 italic">
                Tokyo • San Francisco • London
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/20 text-xs">
            © 2024 AETHERIA DIGITAL. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-8 text-white/20 text-xs uppercase tracking-widest font-bold">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center border border-white/10 hover:border-primary/50 transition-colors"
          >
            <ChevronUp />
          </motion.button>
        </div>
      </div>
    </footer>
  );
};
