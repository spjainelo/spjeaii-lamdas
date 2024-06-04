#!/usr/bin/env bash

today=`date +%Y_%m_%d`
tmstamp=`date +%s`
zip -r "video_transcription_${today}_${tmstamp}.zip" . -x build.sh updatelayer.sh test.js "node_modules/*" "build/*" "lambda-layer/*"
mkdir ./build
mv "video_transcription_${today}_${tmstamp}.zip" ./build/