import Head from 'next/head';
import { useState } from 'react';

export default function Home() {
  const [testArr, setTestArr] = useState<any>([1, 2, 3, 4, 5]);

  // Test if npm husky works or not

  return (
    <>
      <Head>
        {/* SEO */}
        <title>Blog Project Refactor</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Blog Project with React and NodeJS" />
        <meta property="og:title" content="Blog Project with React and NodeJS" />
        <meta property="og:url" content="https://lsevina126.netlify.app" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Blog Project for lsevina126" />
        <meta
          property="og:image"
          content="https://res.cloudinary.com/dewa3t2gi/image/upload/v1674981291/qyeb9rvghfair1pkgqud.png"
        />
        <meta property="og:description" content="Blog Project for lsevina126 with React and NodeJS" />
        <link rel="canonical" href="https://lsevina126.netlify.app" />
        {/* SEO */}
      </Head>
      <header>Blog Project Refactor</header>
      <main>
        <div>Main Box Contents</div>
      </main>
      <footer>Footer</footer>
    </>
  );
}
