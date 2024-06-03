import HighLightHeader from '~/components/common/HighLightHeader';
import { mdiOpenInNew } from '@mdi/js';
import Icon from '~/components/common/Icon';
import { useBlogData } from '~/context/BlogContext';
import { useEffect, useState } from 'react';
import { RandomAnimeProps } from '~/types/BlogTypes';
import 'react-loading-skeleton/dist/skeleton.css';
import SkeletonLoader from '~/components/common/SkeletonLoader';

type ItemProps = {
  anime: string;
  image: string;
  url: string;
};

function Items({ anime, image, url }: ItemProps) {
  return (
    <a
      className="text-shoko-link flex flex-col gap-y-4 font-semibold"
      target="_blank"
      rel="nofollow noreferrer"
      href={url}
    >
      <img className="shadow-custom rounded-lg" src={`/images/blog/${image}`} alt={anime} />
      <div className="mx-auto flex items-center gap-x-2">
        <div>{anime}</div>
        <Icon icon={mdiOpenInNew} />
      </div>
    </a>
  );
}

const tempAnime: RandomAnimeProps = {
  frontmatter: {
    anime: 'One Piece',
    image: 'default.webp',
  },
};

const BlogListSpotlight = () => {
  const [randomAnime, setRandomAnime] = useState<RandomAnimeProps>(tempAnime);
  const { fetchBlogList, blogList } = useBlogData();

  useEffect(() => {
    fetchBlogList(['All']);
  }, []);

  useEffect(() => {
    if (blogList.length !== 0 && randomAnime.frontmatter.image.includes('default.webp')) {
      const randomIndex = Math.floor(Math.random() * blogList.length);
      setRandomAnime({
        frontmatter: {
          anime: blogList[randomIndex].frontmatter.anime,
          image: blogList[randomIndex].frontmatter.image,
        },
      });
    }
  }, [blogList]);

  return (
    <div className="flex flex-col items-start gap-y-6">
      {randomAnime.frontmatter.image.includes('default.webp')
        ? <SkeletonLoader type="highlight" />
        : (
          <>
            <HighLightHeader title="Anime Spotlight" />
            <Items
              image={randomAnime?.frontmatter.image}
              anime={randomAnime?.frontmatter.anime}
              url={`https://anidb.net/anime/?adb.search=${randomAnime?.frontmatter.anime}`}
            />
          </>
        )}
    </div>
  );
};

export default BlogListSpotlight;