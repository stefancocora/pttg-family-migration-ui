#!/usr/bin/env bash
NAME=${NAME:-pttg-ip-fm-ui}

JAR=$(find . -name ${NAME}*.jar|head -1)
java -Xmx750m -Xms256m -Dcom.sun.management.jmxremote.local.only=false -Djava.security.egd=file:/dev/./urandom -jar "${JAR}"
