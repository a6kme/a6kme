import React from 'react';

export default () => {
  const imagesAndLinks = [
    {
      alt: 'StackOverflow',
      img: '/icons/so.svg',
      href: 'https://stackoverflow.com/users/520554/abhishek'
    },
    {
      alt: 'Quora',
      img: '/icons/quora.svg',
      href: 'https://www.quora.com/profile/Abhishek-Kumar-38'
    },
    {
      alt: 'Github',
      img: '/icons/github.svg',
      href: 'https://github.com/a6kme'
    },
    {
      alt: 'Medium',
      img: '/icons/medium.svg',
      href: 'https://medium.com/@a6kme'
    },
    {
      alt: 'LinkedIn',
      img: '/icons/linkedin.svg',
      href: 'https://www.linkedin.com/in/abhishek-kumar-a9b66418/'
    },
    {
      alt: 'GoodReads',
      img: '/icons/goodreads.svg',
      href: 'https://www.goodreads.com/a6kme'
    },
    {
      alt: 'Youtube',
      img: '/icons/youtube.png',
      href: 'https://www.youtube.com/user/abhiitd/videos'
    }
  ];
  const linksList = [];
  imagesAndLinks.forEach((linkObject) => {
    const linkWithImg = (
      <a
        key={linkObject.alt}
        href={linkObject.href}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={linkObject.img} alt={linkObject.alt} />
      </a>
    );
    linksList.push(linkWithImg);
  });
  return linksList;
};
