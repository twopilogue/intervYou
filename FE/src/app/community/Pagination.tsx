export default function Pagination({}) {
  return (
    <nav className="flex w-full flex-col items-center py-4">
      <ul className="inline-flex -space-x-px text-sm">
        <li>
          <a
            href="#"
            className="ms-0 flex h-8 items-center justify-center rounded-s-lg border border-e-0 border-gray-40 bg-white px-3 leading-tight text-gray-90 hover:bg-gray-10"
          >
            Previous
          </a>
        </li>
        <li>
          <a
            href="#"
            className="flex h-8 items-center justify-center border border-gray-40 bg-white px-3 leading-tight text-gray-90 hover:bg-gray-10"
          >
            1
          </a>
        </li>
        <li>
          <a
            href="#"
            className="flex h-8 items-center justify-center border border-gray-40 bg-white px-3 leading-tight text-gray-90 hover:bg-gray-10"
          >
            2
          </a>
        </li>
        <li>
          <a href="#" className="flex h-8 items-center justify-center bg-primary px-3 text-white">
            3
          </a>
        </li>
        <li>
          <a
            href="#"
            className="flex h-8 items-center justify-center border border-gray-40 bg-white px-3 leading-tight text-gray-90 hover:bg-gray-10"
          >
            4
          </a>
        </li>
        <li>
          <a
            href="#"
            className="flex h-8 items-center justify-center border border-gray-40 bg-white px-3 leading-tight text-gray-90 hover:bg-gray-10"
          >
            5
          </a>
        </li>
        <li>
          <a
            href="#"
            className="flex h-8 items-center justify-center rounded-e-lg border border-gray-40 bg-white px-3 leading-tight text-gray-90 hover:bg-gray-10"
          >
            Next
          </a>
        </li>
      </ul>
    </nav>
  );
}
