export const SearchField = ({ name, ...props }) => {
  return (
    <div className="flex items-center">
      <i className="absolute p-2 box-border">
        <svg
          className="h-3 w-3 text-zinc-500 stroke-gray-80 "
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </i>
      <input
        className="w-full pl-6 pr-2.5 py-3 rounded-lg border border-gray-30 outline-none text-sm text-gray-90 focus:border-primary"
        {...props}
      />
    </div>
  );
};
