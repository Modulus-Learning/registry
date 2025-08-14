#!/bin/bash
docker compose --project-directory . --file ./_docker/web/production/docker-compose.yml --project-name modulus-registry-app "$@"
