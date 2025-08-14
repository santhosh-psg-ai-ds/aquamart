import Link from "next/link";
import { Fish } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-card border-t mt-auto">
      <div className="container mx-auto py-8 px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Fish className="h-6 w-6 text-primary" />
            <span className="font-bold text-lg">AquaMart</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} AquaMart. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Terms of Service
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
