import Link from "next/link";

export default function Logo() {
  return (
    <div>
      <Link
        href="/"
        className="bg-black bg-clip-text text-transparent text-6xl font-bold"
      >
        <Logo />
      </Link>
    </div>
  );
}
