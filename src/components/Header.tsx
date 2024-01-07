import Link from "@/components/Link";

export default function Header() {
  return (
    <div className="text-center w-full">
      <h1 className="text-2xl font-bold">Words Per Minute</h1>
      <span className="text-sm text-neutral-400">
        a typing test by{" "}
        <Link href="https://github.com/zachbharris" external>
          zachbharris
        </Link>
      </span>
    </div>
  );
}
