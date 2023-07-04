export default async function UserStats ({ profile }: { profile: Profile }) {
  return (
    <>
      <span>username: { profile.username}</span>
      <span>score: { profile.score}</span>
      <span>days: { profile.days_sucessful}</span>
    </>
  )
}