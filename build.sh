#!/usr/bin/env bash
set -e
[ -n "$DEBUG" ] && set -x

setup() {
	echo "build number:: " ${BUILD_NUMBER}

	VERSION_NUMBER=0.1.0
	ARTIFACT="pttg-family-migration-ui-${VERSION_NUMBER}.jar"

	if [[ -n ${BUILD_NUMBER} ]]; then
	    echo "using build number to produce artifact"
		ARTIFACT="pttg-family-migration-ui-${VERSION_NUMBER}.${BUILD_NUMBER}.jar"
	fi

	echo "Artifact being built: " ${ARTIFACT}

	if [ ! -x ./scripts/assembleAssetsToCreateDockerAppExecutionImage.sh ]; then
		echo "The project specific build file is missing or not executable."
		exit 1
	fi
}

cleanup() {
	CONTAINERS=$(docker ps -aq)

	if [ ! -z "$CONTAINERS" -a "$CONTAINERS" != " " ]; then
		docker stop $CONTAINERS
		docker rm $CONTAINERS
	fi

	IMAGES=$(docker images | grep pttg-family-migration-ui-build | awk '{print $3'})

	if [ ! -z "$IMAGES" -a "$IMAGES" != " " ]; then
		echo "removing images: " ${IMAGES}
		docker rmi -f $IMAGES
	fi
}

createDockerImageToExecuteBuildIn() {
	echo "building docker image to execute app build"
	docker build -t pttg-family-migration-ui-build -f src/main/docker/Dockerfile.build .
}

executeBuild() {
	echo "running docker image as named container - pttg-family-migration-ui-build"
	docker run --name pttg-family-migration-ui-build \
		-e "VERSION_NUMBER=${VERSION_NUMBER}" \
		-e "BUILD_NUMBER=${BUILD_NUMBER}" \
		pttg-family-migration-ui-build
}

# Make this call an external script that populates the folder that is then copied into the Docker image.
assembleAssetsToCreateDockerAppExecutionImage () {

	# Call project specific script to build image
	./scripts/assembleAssetsToCreateDockerAppExecutionImage.sh ${ARTIFACT}
}

buildDockerAppExecutionImage() {
	echo "build docker image for app::"
	cd build/docker
	#TAG="quay.io/family-docker:${VERSION_NUMBER}.${BUILD_NUMBER}"
	if [[ -n ${BUILD_NUMBER} ]]; then
		TAG="quay.io/ukhomeofficedigital/pttg-family-migration-ui:${VERSION_NUMBER}.${BUILD_NUMBER}"
	else
		TAG="quay.io/ukhomeofficedigital/pttg-family-migration-ui:${VERSION_NUMBER}"
	fi
	echo "building " ${TAG}
	docker build -t ${TAG} .
}

pushImageToRepo() {
	docker push ${TAG}
}

# -----
# Build
# -----

# Inputs:
#   1. family-case-worker-tool
#   2. Version
#   3. Build number

setup
cleanup
createDockerImageToExecuteBuildIn
executeBuild
assembleAssetsToCreateDockerAppExecutionImage
cleanup
buildDockerAppExecutionImage
pushImageToRepo
cleanup
