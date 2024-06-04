#!/usr/bin/env bash

today=`date +%Y_%m_%d`
tmstamp=`date +%s`
zip -r "transcribe_to_json_${today}_${tmstamp}.zip" . -x build.sh updatelayer.sh test.js "node_modules/*" "build/*" "lambda-layer/*"
mkdir ./build
mv "transcribe_to_json_${today}_${tmstamp}.zip" ./build/