import { useState } from 'react';

import { type RouterOutputs, api } from '~/utils/api';

import { LoadingPage, LoadingSpinner } from '~/components/loading';

import { type NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';

import { SignInButton, SignOutButton, useUser } from '@clerk/clerk-react';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { toast } from 'react-hot-toast';

dayjs.extend(relativeTime);

const CreatePostWizard = () => {
  const [input, setInput] = useState('');

  const { user } = useUser();
  if (!user) {
    return null;
  }

  const ctx = api.useContext();
  const { mutate, isLoading: isPosting } = api.post.create.useMutation({
    onSuccess: () => {
      setInput('');
      void ctx.post.getAll.invalidate();
    },
    onError: (e) => {
      if (e.data?.zodError) {
        const errorMessage = e.data?.zodError?.fieldErrors.content;
        if (errorMessage && errorMessage[0]) {
          toast.error(errorMessage[0]);
          return;
        }
      } else if (e.message) {
        toast.error(e.message);
        return;
      }
      toast.error('failed to post');
    },
  });

  return (
    <div className='flex gap-3 w-full'>
      <Image src={user?.profileImageUrl} alt='Profile Image' height={50} width={50} className='rounded-full' />
      <input
        placeholder='Type some emojis'
        className='bg-transparent grow outline-none'
        value={input}
        onChange={(e) => setInput(e.target.value)}
        disabled={isPosting}
        onKeyDown={(e) => {
          if (e.key == 'Enter') {
            e.preventDefault();
            if (input !== '') {
              mutate({ content: input });
            }
          }
        }}
      />
      {input != '' && !isPosting && <button onClick={() => mutate({ content: input })}>post</button>}
      {isPosting && (
        <div className='flex'>
          <LoadingSpinner size={40} />
        </div>
      )}
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
        <span className='text-xl'>{post.content}</span>
      </div>
    </div>
  );
};

const Feed = () => {
  const { data, isLoading: postLoading } = api.post.getAll.useQuery();

  if (postLoading) return <LoadingPage />;

  if (!data) return <div>Something went wrong</div>;

  return (
    <div className='flex flex-col'>
      {data.map((fullpost) => {
        return <PostView key={fullpost.post.id} {...fullpost} />;
      })}
    </div>
  );
};

const Home: NextPage = () => {
  const { isLoaded: userLoaded, isSignedIn: userIsSignedIn } = useUser();
  api.post.getAll.useQuery();

  // return empty if nothing loaded
  if (!userLoaded) return <div />;

  return (
    <>
      <Head>
        <title>twat101</title>
        <meta name='description' content='Twatteneers!' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className='flex justify-center h-screen'>
        <div className='w-full md:max-w-2xl border-x border-slate-400'>
          <div className='flex justify-center'>
            {!userIsSignedIn && <SignInButton />}
            {userIsSignedIn && <SignOutButton />}
          </div>
          <div className='border-b border-slate-400 p-4 flex gap-2'>{userIsSignedIn && <CreatePostWizard />}</div>
          <Feed />
        </div>
      </main>
    </>
  );
};

export default Home;
