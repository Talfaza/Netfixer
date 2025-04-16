import Link from "next/link";
import { FileText, Code, HelpCircle, Linkedin, Github } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-800 bg-slate-900 py-8 px-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left side - Company info */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-md bg-blue-500 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-white"
                >
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                  <polyline points="3.29 7 12 12 20.71 7"></polyline>
                  <line x1="12" y1="22" x2="12" y2="12"></line>
                </svg>
              </div>
              <span className="text-sm font-medium text-white">Netfixer</span>
            </div>
            <p className="text-xs text-slate-400">
              Advanced system monitoring platform
            </p>
            <div className="text-xs text-slate-400">support@netfixer.com</div>
          </div>

          {/* Right side - Navigation and social */}
          <div className="flex flex-col md:items-end justify-between">
            {/* Navigation buttons next to each other */}
            <div className="flex items-center space-x-6">
              <Link
                href="/docs"
                className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
              >
                <FileText className="h-4 w-4" />
                <span>Documentation</span>
              </Link>
              <Link
                href="/docs"
                className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
              >
                <Code className="h-4 w-4" />
                <span>API</span>
              </Link>
              <Link
                href="/docs"
                className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
              >
                <HelpCircle className="h-4 w-4" />
                <span>Troubleshooting</span>
              </Link>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-4 mt-6 md:mt-0">
              <Link
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-colors"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-colors"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-4 border-t border-slate-800 text-xs text-slate-500">
          &copy; {currentYear} Netfixer, Inc. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
