// utils/useS3.js
export const buildS3Url = (key) => {
    const baseUrl = 'https://ogh-spring-prac.s3.ap-northeast-2.amazonaws.com/';
    return `${baseUrl}${key}`;
  };
  