#!/usr/bin/env bash

today=`date +%Y_%m_%d`
tmstamp=`date +%s`

rm -rf ./lambda-layer/nodejs
mkdir -p ./lambda-layer/nodejs
cp ./package.json ./package-lock.json ./lambda-layer/nodejs/
cp -R ./node_modules ./lambda-layer/nodejs/
cd ./lambda-layer/
zip -r "video-to-transcribe_layer_${today}_${tmstamp}.zip" .
mkdir -p ../build
mv "video-to-transcribe_layer_${today}_${tmstamp}.zip" ../build/