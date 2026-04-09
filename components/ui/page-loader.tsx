import { type FC } from 'react';

const PageLoader: FC = () => {
  return (<main className="min-h-screen bg-background flex-center">
    <img src={'/loader.svg'}
      height={30}
      width={30}
      loading="lazy"
      decoding="async" />
  </main>)
}

export default PageLoader;
