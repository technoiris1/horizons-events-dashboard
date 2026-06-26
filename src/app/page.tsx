export default async function Home() {
  interface Stats {
    success: boolean;
    count: number;
  }

const res = await fetch('http://localhost:3000//api/stats',{
next: {revalidate: 3600}
  });

if (!res.ok){
  throw new Error('Failed to fetch data')
}


const stats: Stats = await res.json()

  return (
    <div className="h-full w-full bg-amber-50 flex items-center justify-center">
      <p>
        Horizons Arcana
      </p>
      <img
  src="https://horizons.hackclub.com/logos/arcana.webp"
  alt="Arcana"
  className="h-12 w-auto"
/>

<div>
  <p>{stats.count}</p>
</div>
    </div>
  )
}