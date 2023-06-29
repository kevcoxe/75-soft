
import ProfileCreator from "./components/client/ProfileCreator"


export default async function Home() {
  return (
    <main className="flex flex-col items-center justify-between min-h-screen p-24">
      <div className="container">
        <ProfileCreator />
      </div>
    </main>
  )
}
