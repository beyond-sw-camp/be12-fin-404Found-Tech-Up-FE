import blogData from './blog-data';

const communityData = blogData
  .filter((b) => b.blog === 'blog-postbox')
  .map((b) => ({
    ...b,
    blog: 'community-postbox', // 💥 이 줄 중요
  }));

export default communityData;
