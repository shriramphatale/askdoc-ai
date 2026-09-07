import {useDocumentStore} from "../../store/useDocumentStore";

const SidebarToggle = () => {
  const {isSidebarOpen, toggleSidebar} = useDocumentStore();
  return (
    <>
    {/* Mobile Backdrop Overlay - only active when sidebar is open on mobile */}
    {isSidebarOpen && (
    <div
        className="fixed inset-0 bg-black/60 backdrop-blur-[2px] z-30 transition-opacity duration-300 md:hidden opacity-100 pointer-events-auto"
        onClick={toggleSidebar}
        aria-hidden="true"
    />
    )}

    {/* Sidebar Toggle Button: Positioned OUTSIDE the sidebar directly beside the brand name */}
      <button
        type="button"
        onClick={toggleSidebar}
        aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
        title={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
        className={`fixed top-3.5 z-50 flex items-center justify-center w-8 h-8 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/80 active:bg-zinc-800 border border-transparent hover:border-zinc-700/40 transition-all duration-300 ease-in-out cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-zinc-600 ${
          isSidebarOpen ? "left-[268px]" : "left-4"
        }`}
      >
        <svg
          className="w-4.5 h-4.5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect width="18" height="18" x="3" y="3" rx="2" />
          <path d="M9 3v18" />
        </svg>
      </button>
    </>
  )
}

export default SidebarToggle