

const EmptyChat = () => {
  return (
    <div className="flex h-full min-h-0 w-full items-center justify-center px-5">
  <div className="flex w-full max-w-2xl flex-col items-center text-center">

    {/* Icon */}
    <div className="mb-7 flex h-20 w-20 items-center justify-center rounded-2xl bg-[#12121a]">
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        className="text-indigo-400"
      >
        <path
          d="M6 3.5h8l4 4V20a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4.5a1 1 0 0 1 1-1Z"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M14 3.5V8h4"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M8 12h8M8 15h5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </div>

    {/* Heading */}
    <h1 className="text-center text-2xl font-semibold tracking-tight text-white sm:text-3xl">
      Upload a{" "}
      <span className="text-indigo-400">PDF</span>{" "}
      to start
    </h1>

    <p className="mt-3 max-w-md text-center text-sm leading-6 text-[#777784] sm:text-base">
      Upload a document and start asking questions about it.
    </p>

    {/* Actions */}
    {/* Actions */}
<div className="mt-10 flex w-full max-w-2xl flex-col items-center sm:flex-row sm:justify-center">

  {/* Upload PDF */}
  <button
    type="button"
    className="flex w-full max-w-xs items-center gap-4 rounded-xl px-5 py-4 text-left transition hover:bg-white/[0.025] sm:w-auto sm:min-w-[250px]"
  >
    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#151522] text-indigo-400">
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M12 16V4"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
        <path
          d="m7.5 8.5 4.5-4.5 4.5 4.5"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M5 14v5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-5"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
      </svg>
    </div>

    <div>
      <p className="text-sm font-medium text-[#e7e7ed]">
        Upload PDF
      </p>

      <p className="mt-1 text-xs leading-5 text-[#777784]">
        Get instant answers
        <br />
        from your document
      </p>
    </div>
  </button>

  {/* Desktop separator */}
  <div className="hidden h-16 w-px bg-[#24242c] sm:block" />

  {/* Mobile separator */}
  <div className="my-2 h-px w-40 bg-[#24242c] sm:hidden" />

  {/* Ask Questions */}
  <div
    className="flex w-full max-w-xs items-center gap-4 rounded-xl px-5 py-4 text-left sm:w-auto sm:min-w-[250px]"
  >
    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#151522] text-violet-400">
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M5 6.5A2.5 2.5 0 0 1 7.5 4h9A2.5 2.5 0 0 1 19 6.5v7a2.5 2.5 0 0 1-2.5 2.5H12l-4 4v-4h-.5A2.5 2.5 0 0 1 5 13.5v-7Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />

        <path
          d="M9 9h6M9 12h4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </div>

    <div>
      <p className="text-sm font-medium text-[#e7e7ed]">
        Ask questions
      </p>

      <p className="mt-1 text-xs leading-5 text-[#777784]">
        Summarize, explain,
        <br />
        find key points & more
      </p>
    </div>
  </div>

</div>
  </div>
</div>
  );
}

export default EmptyChat;