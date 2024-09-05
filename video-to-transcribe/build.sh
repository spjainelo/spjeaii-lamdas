#!/usr/bin/env bash

# Variables for current date and timestamp
today=$(date +%Y_%m_%d)
tmstamp=$(date +%s)
filename=video_transcription

# Create a zip file, excluding unnecessary files and directories
echo "Zipping project, excluding unnecessary files..."
zip -r "${filename}_${today}_${tmstamp}.zip" . \
  -x "build.sh" "updatelayer.sh" "test.js" "node_modules/*" "build/*" "lambda-layer/*" || { echo "Failed to create zip"; exit 1; }

# Create build directory if it doesn't exist
if [ ! -d "./build" ]; then
    echo "Creating build directory..."
    mkdir ./build || { echo "Failed to create build directory"; exit 1; }
fi

# Move the zip file to the build directory
echo "Moving zip file to build directory..."
mv "${filename}_${today}_${tmstamp}.zip" ./build/ || { echo "Failed to move zip"; exit 1; }

echo "Build complete: ./build/${filename}_${today}_${tmstamp}.zip"

# #!/usr/bin/env bash

# today=`date +%Y_%m_%d`
# tmstamp=`date +%s`
# zip -r "video_transcription_${today}_${tmstamp}.zip" . -x build.sh updatelayer.sh test.js "node_modules/*" "build/*" "lambda-layer/*"
# mkdir ./build
# mv "video_transcription_${today}_${tmstamp}.zip" ./build/