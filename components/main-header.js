import Image from "next/image";

export default function MainHeader() {
  return (
    <header className="border-b border-dark-line-gray/10 flex">
      <div className="w-87 p-6 flex items-center border-r border-dark-line-gray/10 justify-center">
        <Image
          className="mr-3"
          src="/kanban-logo.png"
          alt="kanban logo"
          width={24}
          height={25}
        />
        <h1 className="font-sans text-3xl font-bold">Kanban</h1>
      </div>
      <div className="w-full flex items-center justify-between">
        <p className="font-sans text-xl font-bold ml-10">Platform Launch</p>
        <button className="rounded-3xl bg-purple px-4 py-2 text-white font-sans mr-10">
          + Add New Task
        </button>
      </div>
    </header>
  );
}
