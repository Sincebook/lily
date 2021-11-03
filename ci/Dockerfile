FROM nginx
MAINTAINER Gresstant <gresstant@outlook.com>
VOLUME /tmp
ADD dist /usr/share/nginx/html
COPY ci/nginx.conf /etc/nginx/conf.d/default.conf
