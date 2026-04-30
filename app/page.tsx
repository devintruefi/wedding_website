import { fetchRooms, computeStats } from "@/lib/data";
import { Hero } from "@/components/Hero";
import { Footer } from "@/components/Footer";
import { RoomChart } from "@/components/RoomChart";
import { ErrorState } from "@/components/States";

export const revalidate = 60;

export default async function Home() {
  let rooms;
  try {
    rooms = await fetchRooms();
  } catch (e) {
    return (
      <>
        <Hero />
        <ErrorState message={(e as Error).message} />
        <Footer />
      </>
    );
  }

  const stats = computeStats(rooms);

  return (
    <>
      <Hero />
      <RoomChart
        initialRooms={rooms}
        initialStats={stats}
        initialSyncedAt={Date.now()}
      />
      <Footer />
    </>
  );
}
