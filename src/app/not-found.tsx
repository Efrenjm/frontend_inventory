import BackgroundCard from "@/components/Card/BackgroundCard";

export default function NotFound() {
  return (
    <BackgroundCard component="div">
      <main className="not-found">
        <h1>Not found</h1>
        <p>Unfortunately, we could not find the requested page.</p>
      </main>
    </BackgroundCard>
  )
}