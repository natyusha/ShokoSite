import React, { useEffect, useState } from 'react';
import { Link, useLocation } from '@remix-run/react';
import { getDownloadsCount } from '~/helpers/markdown';
import PageHero from '~/components/layout/PageHero';
import { DownloadListItemProps } from '~/types/downloads';
import { Info } from 'lucide-react';

const DownloadListItem = ({ name, description, count, link }: DownloadListItemProps) => {
  const pluralize = (word: string, count: number) => `${word}${count === 1 ? '' : 's'}`;

  const CountDisplay = ({ text }: { text: string }) => (
    <div className="flex items-center gap-2">
      <div className="text-shoko-highlight">{count}</div>
      <div>{text}</div>
    </div>
  );

  const countConfigs: Record<string, () => React.JSX.Element> = {
    'Shoko Server': () => (
      <div className="flex w-fit items-center gap-2 rounded border border-shoko-highlight p-3">
        <Info />
        <div className="font-semibold">Required</div>
      </div>
    ),
    'Media Player Plugins': () => <CountDisplay text={`${pluralize('Plugin', count)} Available`} />,
    'Web UI Themes': () => <CountDisplay text={`${pluralize('Theme', count)} Available`} />,
    'Renamer Plugins': () => <CountDisplay text={`${pluralize('Renamer', count)} Available`} />,
    'Legacy Apps': () => <CountDisplay text={`${pluralize('App', count)} Listed`} />,
  };

  const CountBuilder = () => {
    const CountComponent = countConfigs[name] || (() => <CountDisplay text={pluralize('Item', count)} />);
    return <CountComponent />;
  };

  return (
    <div className="flex items-center">
      <div className="w-full max-w-[278px] font-semibold">
        <CountBuilder />
      </div>
      <div>
        <div className="font-header text-shoko-20 font-bold">{name}</div>
        <div className="text-shoko-text-75">{description}</div>
      </div>
      <Link className="ml-auto font-semibold text-shoko-link" to={link}>
        {`Download ${name} →`}
      </Link>
    </div>
  );
};

export default function Downloads() {
  const [downloadsList, setDownloadsList] = useState<{ [key: string]: number }>({});
  const location = useLocation();

  useEffect(() => {
    const getDownloadTotalCount = async () => {
      const data = await getDownloadsCount();
      setDownloadsList(data);
    };
    getDownloadTotalCount();
  }, [location.pathname]);

  return (
    <>
      <PageHero
        title="Downloads"
        description="Browse through selection of programs, plugins, Web UI Themes and other tools available in the Shoko Suite."
      />

      <div className="my-16 flex flex-col gap-6">
        <DownloadListItem
          name="Shoko Server"
          description="The main program, required for everything else to properly work. "
          count={downloadsList['shokoServer']}
          link="/downloads/shoko-server"
        />
        <DownloadListItem
          name="Media Player Plugins"
          description="Plugins to get Shoko working with various media players programs."
          count={downloadsList['mediaPlayerPlugins']}
          link="/downloads/media-player-plugins"
        />
        <DownloadListItem
          name="Web UI Themes"
          description="Browse our collection of user submitted themes to enhance the Web UI. "
          count={downloadsList['themes']}
          link="/downloads/webui-themes"
        />
        <DownloadListItem
          name="Renamer Plugins"
          description="Plugins to replace Shoko’s built-in renamer functionality"
          count={downloadsList['renamer']}
          link="/downloads/renamer-plugins"
        />
        <DownloadListItem
          name="Legacy Apps"
          description="Deprecated apps that are listed for archival purposes only."
          count={downloadsList['legacy']}
          link="/downloads/legacy-apps"
        />
      </div>
    </>
  );
}