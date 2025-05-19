FROM nginx:latest
COPY ./nginx/default.conf  /etc/nginx/conf.d/default.conf
COPY ./.output/public /usr/share/nginx/html
EXPOSE 80
EXPOSE 443
CMD ["nginx", "-g", "daemon off;"]