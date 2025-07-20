FROM nginx:alpine

# Arguments à passer pendant le build
ARG DOMAIN
ARG API_DOMAIN

ENV DOMAIN=${DOMAIN}
ENV API_DOMAIN=${API_DOMAIN}

COPY certs/* /etc/nginx/certs/
COPY conf.d/* /etc/nginx/conf.d/

RUN apk add --no-cache gettext && \
    envsubst '${DOMAIN}' < /etc/nginx/conf.d/${DOMAIN}.conf > /etc/nginx/conf.d/${DOMAIN}.conf.tmp && \
    mv /etc/nginx/conf.d/${DOMAIN}.conf.tmp /etc/nginx/conf.d/${DOMAIN}.conf && \
    envsubst '${API_DOMAIN}' < /etc/nginx/conf.d/${API_DOMAIN}.conf > /etc/nginx/conf.d/${API_DOMAIN}.conf.tmp && \
    mv /etc/nginx/conf.d/${API_DOMAIN}.conf.tmp /etc/nginx/conf.d/${API_DOMAIN}.conf

EXPOSE 80
EXPOSE 443
