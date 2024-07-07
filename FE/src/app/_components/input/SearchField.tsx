export const SearchField = ({ name, ...props }) => {
  return (
    <div className="flex items-center">
      <i className="absolute box-border p-4">
        <svg className="text-zinc-500 stroke-gray-80 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.5"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </i>
      <input
        className="w-full rounded-lg border border-gray-30 py-3 pl-10 pr-2.5 text-sm text-gray-90 outline-none focus:border-primary"
        {...props}
      />
    </div>
  );
};
