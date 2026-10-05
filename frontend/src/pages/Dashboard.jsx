import { useEffect } from "react";
import { MoreHorizontal, ArrowLeft } from "lucide-react";
import { useNavigate } from 'react-router'
import { useDashboardStore } from "../store/useDashboardStore.js"

const Dashboard = () => {
  
  const {dashboard, isLoading, fetchDashboard} = useDashboardStore()

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  const navigate = useNavigate();
  
  if (isLoading || !dashboard) {
    return <div>Loading...</div>;
  }

  const pdfProgress = Math.min(
    (dashboard.pdfs.monthly / dashboard.pdfs.monthlyLimit) * 100,
    100
  );

  const questionsProgress = Math.min(
    (dashboard.questions.used / dashboard.questions.limit) * 100,
    100
  );

  return (
    <div className="min-h-screen w-full bg-[#111111] px-4 py-6 text-white sm:px-6 lg:py-10 lg:px-30">
      <button
      onClick={() => navigate(-1)}
      className="mb-5 inline-flex cursor-pointer items-center gap-2 py-2 text-sm font-medium text-zinc-300 transition-colors hover:text-white"
      >
        <ArrowLeft size={17} />
        Back
      </button>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Overview
        </h1>

        <p className="mt-1.5 text-sm text-zinc-400">
          Welcome back. Here's a summary of your workspace.
        </p>
      </div>

      {/* Cards */}
      <div className="flex w-full flex-wrap gap-3 sm:gap-5">
        
        {/* Uploaded PDFs */}
        <div className="w-[calc(50%-6px)] max-w-[280px] rounded-xl border border-white/[0.04] bg-[#1c1c1c] p-3 sm:p-4">
            <p className="truncate text-[9px] font-medium tracking-wide text-zinc-400 sm:text-xs">
                TOTAL PDFs
            </p>

            <p className="mt-2 text-xl font-semibold tracking-tight sm:mt-3 sm:text-2xl">
              {dashboard.pdfs.total}
            </p>

            <div className="mt-2.5 h-1 overflow-hidden rounded-full bg-zinc-800 sm:mt-3">
                <div
                className="h-full rounded-full bg-zinc-200"
                style={{ width: `${pdfProgress}%` }}
                />
            </div>

            <div className="mt-2 flex items-center justify-between text-[9px] sm:text-xs">
                <span className="text-zinc-500">
                  {dashboard.pdfs.monthly}
                </span>

                <span className="font-medium text-zinc-100">
                  {dashboard.pdfs.monthlyLimit}/month
                </span>
            </div>
        </div>


        {/* Questions Asked */}
        <div className="w-[calc(50%-6px)] max-w-[280px] rounded-xl border border-white/[0.04] bg-[#1c1c1c] p-3 sm:p-4">
            <p className="truncate text-[9px] font-medium tracking-wide text-zinc-400 sm:text-xs">
                QUESTIONS ASKED
            </p>

            <p className="mt-2 text-xl font-semibold tracking-tight sm:mt-3 sm:text-2xl">
                {dashboard.questions.total}
            </p>

            <div className="mt-2.5 h-1 overflow-hidden rounded-full bg-zinc-800 sm:mt-3">
                <div
                className="h-full rounded-full bg-zinc-200"
                style={{ width: `${questionsProgress}%` }}
                />
            </div>

            <div className="mt-2 flex items-center justify-between text-[9px] sm:text-xs">
                <span className="text-zinc-500">
                  {dashboard.questions.used}
                </span>

                <span className="font-medium text-zinc-100">
                  {dashboard.questions.limit}/day
                </span>
            </div>
        </div>
      </div>

      <div className="mt-6 w-full">
      <div className="mb-3">
        <h2 className="text-base font-medium text-zinc-200">
          Documents
        </h2>
      </div>

      <div className="w-full overflow-hidden rounded-xl border border-white/[0.05] bg-[#181818]">
        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-[560px] border-collapse">
            <thead>
              <tr className="border-b border-white/[0.05] bg-[#1d1d1d]">
                <th className="px-4 py-3 text-left text-[11px] font-medium uppercase tracking-wider text-zinc-500">
                  Title
                </th>

                <th className="px-4 py-3 text-left text-[11px] font-medium uppercase tracking-wider text-zinc-500">
                  Date
                </th>

                <th className="px-4 py-3 text-left text-[11px] font-medium uppercase tracking-wider text-zinc-500">
                  Status
                </th>

                {/* <th className="px-4 py-3 text-center text-[11px] font-medium uppercase tracking-wider text-zinc-500">
                  Actions
                </th> */}
              </tr>
            </thead>

            <tbody>
              {dashboard.recentDocuments.map((document) => (
                <tr
                  key={document._id}
                  className="border-b border-white/[0.04] last:border-0">

                  {/* Title */}
                  <td className="max-w-[260px] px-4 py-3.5 align-middle">
                    <div className="flex min-w-0 items-center gap-2.5">
                      <svg
                        className="h-4 w-4 shrink-0 text-zinc-500"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      >
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <path d="M14 2v6h6" />
                        <path d="M8 13h8M8 17h5" />
                      </svg>

                      <span className="truncate text-xs font-medium text-zinc-200">
                        {document.title.split("-").splice(1).join("-")}
                      </span>
                    </div>
                  </td>

                  {/* Date */}
                  <td className="whitespace-nowrap px-4 py-3.5 align-middle text-xs text-zinc-500">
                    {new Date(document.createdAt).toLocaleDateString("en-IN", {
                      day: "2-digit", month: "short", year: "numeric",})}
                  </td>

                    {/* Status */}
                    <td className="px-4 align-middle">
                        <span
                            className={`inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-[10px] font-medium ${
                            document.status === "Ready"
                                ? "bg-zinc-700/50 text-zinc-200"
                                : "bg-zinc-700/50 text-zinc-500"
                            }`}>
                            <span
                            className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                                document.status === "Ready"
                                ? "bg-zinc-300"
                                : "bg-zinc-500"
                            }`}
                            />

                            {document.status}
                        </span>
                    </td>
                    {/* Actions */}
                    {/* <td className="px-4 py-3.5 align-middle text-right">
                        <div className="flex items-center justify-center">
                            <button type="button" className="text-zinc-500 cursor-pointer transition hover:text-zinc-200">
                                <MoreHorizontal className="h-4 w-4" />
                            </button>
                        </div>
                    </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Dashboard;