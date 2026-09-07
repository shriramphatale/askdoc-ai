import {useState} from "react"

const UserProfile = () => {
    const [avatarError, setAvatarError] = useState(false);
  return (
    <div className="p-3 mt-auto shrink-0">
        <div className="flex items-center gap-3 p-2 rounded-xl bg-zinc-900/60 hover:bg-zinc-800/60 border border-zinc-800/50 transition-all cursor-pointer group select-none">
            {/* Circular Avatar */}
            <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 bg-zinc-800 border border-zinc-700/60 flex items-center justify-center">
                {!avatarError ? (
                <img
                    src="https://github.com/shadcn.png"
                    alt="shadcn"
                    className="w-full h-full object-cover"
                    onError={() => setAvatarError(true)}
                />
                ) : (
                <span className="text-xs font-semibold text-zinc-200 uppercase">
                    CN
                </span>
                )}
            </div>

            {/* Profile Info */}
            <div className="flex flex-col min-w-0 text-left">
                <span className="text-sm font-medium text-zinc-100 truncate group-hover:text-white leading-tight">
                Shriram Phatale
                </span>
                <span className="text-xs text-zinc-400 truncate leading-tight mt-0.5">
                demo@gmail.com
                </span>
            </div>

            {/* Chevron icon on the right */}
            <svg
                className="w-4 h-4 text-zinc-400 group-hover:text-zinc-200 ml-auto shrink-0 transition-colors"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="m9 18 6-6-6-6" />
            </svg>
        </div>
    </div>
  )
}

export default UserProfile