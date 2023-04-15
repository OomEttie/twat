import { type RouterOutputs, api } from '~/utils/api';

import { type NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';

import { SignInButton, SignOutButton, useUser } from '@clerk/clerk-react';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

const CreatePostWizard = () => {
  const { user } = useUser();
  if (!user) {
    return null;
  }

  return (
    <div className='flex gap-3 w-full'>
      <Image src={user?.profileImageUrl} alt='Profile Image' height={50} width={50} className='rounded-full' />
      <input placeholder='Type some emojis' className='bg-transparent grow outline-none' />
    </div>
  );
};

type PostWithUser = RouterOutputs['post']['getAll'][number];
const PostView = (props: PostWithUser) => {
  const { post, author } = props;
  return (
    <div className='flex gap-3 w-full p-4 border-b border-slate-400'>
      <Image src={author?.profileImageUrl || ''} alt='Profile Image' height={50} width={50} className='rounded-full' />
      <div className='flex flex-col'>
        <div className='flex gap-1 font-bold text-slate-300'>
          <span>{`@ ${author.username || author.firstName || ''}`}</span>
          <span className='font-thin'>{`• ${dayjs(post.createdAt).fromNow()}`}</span>
        </div>
        <span>{post.content}</span>
      </div>
    </div>
  );
};

const Home: NextPage = () => {
  const user = useUser();
  const { data, isLoading } = api.post.getAll.useQuery();

  if (isLoading) {
    return <div>data Loading</div>;
  }
  if (!data) {
    return <div>no data</div>;
  }

  return (
    <>
      <Head>
        <title>twat101</title>
        <meta name='description' content='Twatteneers!' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className='flex justify-center h-screen'>
        <div className='w-full md:max-w-2xl border-x border-slate-400'>
          <div>
            {!user.isSignedIn && <SignInButton />}
            {user.isSignedIn && <SignOutButton />}
          </div>
          <div className='border-b border-slate-400 p-4 flex gap-2'>
            <CreatePostWizard />
          </div>
          <div className='flex flex-col'>
            {data.map((fullpost) => {
              return <PostView key={fullpost.post.id} {...fullpost} />;
            })}
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
