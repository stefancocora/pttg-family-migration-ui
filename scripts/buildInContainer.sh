#!/usr/bin/env bash

echo ${pwd}
node_modules/bower/bin/bower --allow-root install
./gradlew clean build