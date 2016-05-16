#!/usr/bin/env bash

mkdir build || true
mkdir build/docker || true
echo "copying articfact :family-docker-build-container:/code/build/libs/${1} to build/docker/"
docker cp family-docker-build-container:/code/build/libs/${1} build/docker/

cp src/main/docker/Dockerfile build/docker/