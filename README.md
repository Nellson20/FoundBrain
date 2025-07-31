# FoundBrain

install certificates

mkcert -install

cd .docker/nginx/certs

mkcert foundbrain.local
mkcert api.foundbrain.local

rename foundbrain.local.pem to foundbrain.local.crt

rename foundbrain.local-key.pem to foundbrain.local.key

docker compose up --build -d