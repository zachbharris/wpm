import TypeTest from "@/components/TypeTest";

export default function Home() {
  return (
    <div className="pt-16 flex flex-col gap-8">
      <div className="text-center w-full">
        <h1 className="text-2xl font-bold">Words Per Minute</h1>
        <span className="text-sm text-neutral-400">
          a typing test by{" "}
          <a
            href="https://github.com/zachbharris"
            target="_blank"
            rel="noopener"
            className="font-bold text-neutral-200 underline"
          >
            zachbharris
          </a>
        </span>
      </div>
      <TypeTest />
    </div>
  );
}
