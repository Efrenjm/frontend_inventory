import BackgroundCard from "@/components/card/BackgroundCard";
import { Typography } from "@mui/material";
import dynamic from "next/dynamic";

const NotFound = dynamic(
  () => import('@/components/animations/NotFound'),
  { ssr: false }
);

export default function NotFoundPage() {
  return (
    <BackgroundCard component="div">
      <main className="not-found">
        <NotFound
          title="Oops, something went wrong"
          message="Unfortunately, the page you requested doesn't exist"/>
      </main>
    </BackgroundCard>
  )
}