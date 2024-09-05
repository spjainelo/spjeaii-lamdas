#!/usr/bin/env bash

# Variables for current date and timestamp
today=$(date +%Y_%m_%d)
tmstamp=$(date +%s)
filename=video-to-transcribe

# Clean and create necessary directories
echo "Cleaning up old directories..."
rm -rf ./lambda-layer/nodejs && mkdir -p ./lambda-layer/nodejs || { echo "Failed to clean/create directory."; exit 1; }

# Copy necessary files and directories
echo "Copying necessary files..."
cp -R ./package.json ./package-lock.json ./node_modules ./lambda-layer/nodejs/ || { echo "File copy failed."; exit 1; }

# Zip the layer contents, directly creating it in the build directory
echo "Creating zip file..."
zip -r "./build/${filename}_layer_${today}_${tmstamp}.zip" ./lambda-layer || { echo "Zip creation failed."; exit 1; }

echo "Build complete: ./build/${filename}_layer_${today}_${tmstamp}.zip"


# #!/usr/bin/env bash

# today=`date +%Y_%m_%d`
# tmstamp=`date +%s`

# rm -rf ./lambda-layer/nodejs
# mkdir -p ./lambda-layer/nodejs
# cp ./package.json ./package-lock.json ./lambda-layer/nodejs/
# cp -R ./node_modules ./lambda-layer/nodejs/
# cd ./lambda-layer/
# zip -r "video-to-transcribe_layer_${today}_${tmstamp}.zip" .
# mkdir -p ../build
# mv "video-to-transcribe_layer_${today}_${tmstamp}.zip" ../build/