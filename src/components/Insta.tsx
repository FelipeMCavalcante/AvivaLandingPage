'use client';
import { Play } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const ACCESS_TOKEN =
  'IGAAIdumwEgFFBZAE1sZA3hOLVlmNmJwTkxOU3IwcmxzSU5PV3V6ZAnBoSkpvdE92NUxvU1NlRHE4aUx4cHVoN2ZALNjV5eE1WTWVOSGNHLWo3ZA092TmhWQ1lnLWpsRXBpemlDdzZAsaDJ4ZAkd5YkowR25sbXVNVVduNW5oeFY2ZA1BmdwZDZD'; // Adicione seu token aqui

interface Profile {
  id: string;
  username: string;
  account_type: string;
  media_count: string;
  followers_count: string;
  follows_count: string;
  profile_picture_url: string;
}

interface Post {
  id: string;
  media_type: 'IMAGE' | 'CAROUSEL_ALBUM' | 'VIDEO';
  media_url: string;
  permalink: string;
  caption: string;
  thumbnail_url?: string;
}

export default function Insta() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [modalVideo, setModalVideo] = useState<{
    url: string;
    permalink: string;
  } | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    function formatNumber(number: number): string {
      if (!number) return '0';
      if (number >= 1000000) {
        return (number / 1000000).toFixed(1).replace('.0', '') + ' mi';
      }
      if (number >= 1000) {
        return (number / 1000).toFixed(1).replace('.0', '') + ' mil';
      }
      return number.toString();
    }

    async function fetchProfile() {
      try {
        const response = await fetch(
          `https://graph.instagram.com/me?fields=id,username,account_type,media_count,followers_count,follows_count,profile_picture_url&access_token=${ACCESS_TOKEN}`
        );
        const data = await response.json();
        setProfile({
          ...data,
          media_count: formatNumber(data.media_count),
          followers_count: formatNumber(data.followers_count),
          follows_count: formatNumber(data.follows_count),
        });
      } catch (error) {
        console.error('Erro ao buscar informações do perfil:', error);
      }
    }

    async function fetchPosts() {
      try {
        const response = await fetch(
          `https://graph.instagram.com/me/media?fields=id,media_type,media_url,thumbnail_url,permalink,caption&access_token=${ACCESS_TOKEN}`
        );
        const data = await response.json();
        setPosts(data.data);
      } catch (error) {
        console.error('Erro ao buscar posts do Instagram:', error);
      }
    }

    fetchProfile();
    fetchPosts();
  }, []);

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  };

  // Fechar modal ao pressionar "ESC"
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setModalVideo(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className='p-5 bg-[#F7F7F7] w-full' id='Insta'>
      <div className='flex justify-center'>
        <p className='text-[40px] sm:text-[60px] md:text-[80px] font-ozikB mt-10 text-[#030303] text-center'>
          INSTA VYBBE
        </p>
      </div>

      <div className='text-gray-800 flex justify-center text-base sm:text-lg p-5 font-bold text-center'>
        <p>
          Acompanhe todas as novidades e conteúdos exclusivos dos nossos
          artistas seguindo a Vybbe no Instagram!
        </p>
      </div>

      <div className='max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-lg w-full'>
        {profile && (
          <div className='flex flex-col sm:flex-row items-center sm:justify-between bg-white p-5 rounded-lg max-w-full'>
            <div className='flex flex-col sm:flex-row items-center space-x-4 text-center sm:text-left'>
              <img
                src={profile.profile_picture_url}
                alt={`${profile.username} profile`}
                className='w-20 h-20 sm:w-16 sm:h-16 rounded-full'
              />
              <div>
                <h1 className='text-[25px] md:text-[35px] py-1 font-bold text-[#030303]'>
                  {profile.username}
                </h1>
                <p className='text-sm text-gray-500'>@{profile.username}</p>
              </div>
            </div>

            <div className='flex space-x-5 md:space-x-10 text-center mt-4 sm:mt-0'>
              <div>
                <p className='text-lg text-[#030303] font-black'>
                  {profile.media_count}
                </p>
                <p className='text-sm text-gray-500'>Publicações</p>
              </div>
              <div>
                <p className='text-lg font-black text-[#030303]'>
                  {profile.followers_count}
                </p>
                <p className='text-sm text-gray-500'>Seguidores</p>
              </div>
              <div>
                <p className='text-lg font-black text-[#030303]'>
                  {profile.follows_count}
                </p>
                <p className='text-sm text-gray-500'>Seguindo</p>
              </div>
            </div>

            <button
              className='bg-blue-500 text-white font-ozikB px-4 py-2 rounded-lg hover:bg-blue-600 mt-4 sm:mt-0'
              onClick={() =>
                window.open(
                  `https://www.instagram.com/${profile.username}/`,
                  '_blank'
                )
              }
            >
              SEGUIR
            </button>
          </div>
        )}

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6'>
          {posts.slice(0, 6).map((post) => (
            <div
              key={post.id}
              className='rounded-lg transition-all bg-white overflow-hidden cursor-pointer relative'
              onClick={() =>
                post.media_type === 'VIDEO' && window.innerWidth > 768
                  ? setModalVideo({
                      url: post.media_url,
                      permalink: post.permalink,
                    })
                  : window.open(post.permalink, '_blank')
              }
            >
              <img
                src={post.thumbnail_url || post.media_url}
                alt='Capa do post'
                className='w-full h-[200px] sm:h-[250px] object-cover rounded-lg'
              />

              {post.media_type === 'VIDEO' && (
                <div className='absolute inset-0 flex items-center justify-center'>
                  <Play className='w-16 h-16 text-white' />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {modalVideo && (
        <div
          className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50'
          onClick={() => setModalVideo(null)}
        >
          <div
            className='relative w-full max-w-lg p-4 bg-white rounded-lg shadow-lg '
            onClick={(e) => e.stopPropagation()}
          >
            <video
              ref={videoRef}
              className='w-full h-[500px] rounded-lg cursor-pointer'
              controls
              autoPlay
              onClick={togglePlayPause}
            >
              <source src={modalVideo.url} type='video/mp4' />
            </video>
            <div className='flex justify-center mt-4'>
              <a
                className=' text-white px-4 rounded-lg'
                href={modalVideo.permalink}
                target='_blank'
              >
                <svg
                  className='w-12 h-12 text-black hover:text-red-500 transition-all duration-300'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 32 32'
                  fill='currentColor'
                >
                  <path d='M0 16C0 7.16344 7.16344 0 16 0C24.8366 0 32 7.16344 32 16C32 24.8366 24.8366 32 16 32C7.16344 32 0 24.8366 0 16ZM16 6.66667C13.4651 6.66667 13.1477 6.67724 12.1522 6.72267C11.1585 6.76809 10.4796 6.92613 9.88604 7.15698C9.26382 7.39093 8.69947 7.75804 8.2328 8.23342C7.75818 8.69955 7.39084 9.26351 7.15636 9.88604C6.92676 10.4796 6.76809 11.1591 6.72267 12.1528C6.67787 13.1477 6.66667 13.4644 6.66667 16C6.66667 18.5356 6.67724 18.8523 6.72267 19.8478C6.76809 20.8415 6.92613 21.5204 7.15698 22.114C7.39093 22.7362 7.75804 23.3005 8.23342 23.7672C8.69956 24.2418 9.26352 24.6091 9.88604 24.8436C10.4796 25.0739 11.1585 25.2319 12.1522 25.2773C13.1477 25.3228 13.4651 25.3333 16 25.3333C18.5349 25.3333 18.8523 25.3228 19.8478 25.2773C20.8415 25.2319 21.5204 25.0739 22.114 24.843C22.7362 24.6091 23.3005 24.242 23.7672 23.7666C24.2418 23.3005 24.6092 22.7365 24.8436 22.114C25.0739 21.5204 25.2319 20.8415 25.2773 19.8478C25.3228 18.8523 25.3333 18.5349 25.3333 16C25.3333 13.4651 25.3228 13.1477 25.2773 12.1522C25.2319 11.1585 25.0739 10.4796 24.843 9.88604C24.6087 9.26324 24.2414 8.69904 23.7666 8.2328C23.3005 7.75818 22.7365 7.39084 22.114 7.15636C21.5204 6.92676 20.8409 6.76809 19.8472 6.72267C18.8523 6.67787 18.5356 6.66667 16 6.66667ZM14.8327 18.773C15.1994 18.9273 15.5925 19.0068 15.9894 19.0068C16.791 19.0068 17.5598 18.6832 18.1266 18.1072C18.6935 17.5312 19.0119 16.75 19.0119 15.9355C19.0119 15.1209 18.6935 14.3397 18.1266 13.7637C17.5598 13.1878 16.791 12.8642 15.9894 12.8642C15.5925 12.8642 15.1994 12.9436 14.8327 13.098C14.466 13.2523 14.1328 13.4785 13.8522 13.7637C13.5715 14.0489 13.3489 14.3875 13.197 14.7601C13.0451 15.1328 12.9669 15.5321 12.9669 15.9355C12.9669 16.3388 13.0451 16.7382 13.197 17.1108C13.3489 17.4834 13.5715 17.822 13.8522 18.1072C14.1328 18.3924 14.466 18.6186 14.8327 18.773ZM12.6971 12.59C13.5702 11.7027 14.7545 11.2043 15.9894 11.2043C17.2243 11.2043 18.4085 11.7027 19.2817 12.59C20.1549 13.4773 20.6455 14.6807 20.6455 15.9355C20.6455 17.1903 20.1549 18.3937 19.2817 19.2809C18.4085 20.1682 17.2243 20.6667 15.9894 20.6667C14.7545 20.6667 13.5702 20.1682 12.6971 19.2809C11.8239 18.3937 11.3333 17.1903 11.3333 15.9355C11.3333 14.6807 11.8239 13.4773 12.6971 12.59ZM21.6776 11.9092C21.884 11.6994 22 11.415 22 11.1184C22 10.8218 21.884 10.5373 21.6776 10.3276C21.4712 10.1178 21.1913 10 20.8994 10C20.6075 10 20.3276 10.1178 20.1212 10.3276C19.9147 10.5373 19.7988 10.8218 19.7988 11.1184C19.7988 11.415 19.9147 11.6994 20.1212 11.9092C20.3276 12.1189 20.6075 12.2367 20.8994 12.2367C21.1913 12.2367 21.4712 12.1189 21.6776 11.9092Z'></path>
                </svg>
              </a>
              <a
                href={modalVideo.permalink}
                target='_blank'
                className='relative font-ozikB mt-2 text-black 
             bg-gradient-to-r from-black via-red-500 to-black 
             bg-[length:200%_100%] bg-clip-text text-transparent 
             animate-wave'
              >
                SENTE ESSA VYBBE
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
