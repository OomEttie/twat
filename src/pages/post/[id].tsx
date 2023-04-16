import { type NextPage } from 'next';
import Head from 'next/head';

const PostSingleView: NextPage = () => {
  return (
    <>
      <Head>
        <title>twat101</title>
        <meta name='description' content='Twatteneers!' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className='flex justify-center h-screen'>
        <div>SINGLE POST VIEW</div>
      </main>
    </>
  );
};

export default PostSingleView;
