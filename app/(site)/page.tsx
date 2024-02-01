import { getSongs } from '@/actions/getSongs';
import Box from '@/components/Box';
import Header from '@/components/Header';
import ListItem from '@/components/ListItem';
import PageContent from '@/components/PageContent';
import likeImage from '@/public/images/liked.png';

// it means that it will not be cached and data on it will be always up-to-date
export const revalidate = 0;

export default async function Home() {
  const songs = await getSongs();

  return (
    <Box className="overflow-hidden overflow-y-auto h-full">
      <Header>
        <div className="mb-2">
          <h1 className="text-white text-3xl font-semibold">Welcome back</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 mt-4">
            <ListItem name="Liked Songs" image={likeImage} href="liked" />
          </div>
        </div>
      </Header>
      <div className="mt-2 mb-7 px-6">
        <div className="flex justify-between items-center">
          <h1 className="text-white text-2xl font-semibold">Newest Songs</h1>
        </div>
        <PageContent songs={songs} />
      </div>
    </Box>
  );
}
