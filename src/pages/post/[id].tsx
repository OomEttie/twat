import { type NextPage } from 'next';
import Head from 'next/head';

const PostSingleView: NextPage = () => {
  return (
    <>
      <Head>
        <title>Post</title>
      </Head>
      <main className='flex justify-center h-screen'>
        <div>SINGLE POST VIEW</div>
      </main>
    </>
  );
};

export default PostSingleView;
