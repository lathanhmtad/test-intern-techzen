import { House, NotebookPen, School } from "lucide-react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="fixed left-0 inset-y-0 mt-header p-3 w-sidebar">
      <nav>
        <Link className="flex flex-col items-center py-4 px-3 rounded-2xl">
          <House />
          <span className="text-sm">Home</span>
        </Link>
        <Link className="flex flex-col items-center py-4 px-3 rounded-2xl">
          <School />
          <span className="text-sm">Exams</span>
        </Link>
        <Link className="flex flex-col items-center py-4 px-3 rounded-2xl">
          <NotebookPen />
          <span className="text-sm">Articles</span>
        </Link>
      </nav>
    </div>
  )
}