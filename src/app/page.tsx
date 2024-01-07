import Header from "@/components/Header";
import TypeTest from "@/components/TypeTest";

export default function Home() {
  return (
    <div className="pt-16 flex flex-col gap-8">
      <Header />
      <TypeTest />
    </div>
  );
}
