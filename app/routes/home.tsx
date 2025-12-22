import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resumeise" },
    { name: "description", content: "Smart feedback for you Resume!" },
  ];
}

export default function Home() {
  return <main>
    
  </main>
}
