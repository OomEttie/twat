import { type NextPage } from 'next';
import Head from 'next/head';
import { api } from '~/utils/api';

const Slug: NextPage = () => {
  const { data, isLoading } = api.profile.getUserByUsername.useQuery({
    userId: 'user_2OTXFd2rzVHjcLtZSCSiebEfoKN',
  });

  if (isLoading) return <div>Loading...</div>;
  if (!data) return <div>So much empty!</div>;

  console.log('data', data);
  return (
    <>
      <Head>
        <title>Profile</title>
      </Head>
      <main className='flex justify-center h-screen'>
        <div>{`SLUG VIEW @${data.firstName || ''}`}</div>
      </main>
    </>
  );
};

export default Slug;
