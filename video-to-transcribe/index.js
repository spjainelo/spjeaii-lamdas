const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");
const {
  TranscribeClient,
  StartTranscriptionJobCommand,
} = require("@aws-sdk/client-transcribe");
const path = require("path");

const NodeEnv = process.env.NODE_ENV;
const Region = process.env.AWS_DEFAULT_REGION || "us-east-1";
const LanguageCode = "en-US";
const MediaFormat = "mp4";

const client = new S3Client({});
const transcribeClient = new TranscribeClient({ region: Region });

const getObjectFromS3 = async ({ Bucket, Key }) => {
  let directoryPath = path.dirname(Key);
  directoryPath = directoryPath + "/params.json";

  const command = new GetObjectCommand({ Bucket, Key: directoryPath });
  try {
    const response = await client.send(command);
    return await response.Body.transformToString();
  } catch (err) {
    console.error(err);
  }
};

exports.handler = async function (event, context) {
  try {
    const eRecord = event.Records && event.Records[0],
      inputBucket = eRecord.s3.bucket.name,
      key = eRecord.s3.object.key;

    const s3Result = await getObjectFromS3({ Bucket: inputBucket, Key: key });
    const s3Data = JSON.parse(s3Result);
    const folder = path.dirname(key).split("/")[2];
    const TranscriptionJobName = s3Data.questionId + "_" + Date.now();
    const MediaFileUri = `https://${inputBucket}.s3.amazonaws.com/${key}`;
    const OutputKey = `${NodeEnv}/output-json/${folder}/${TranscriptionJobName}.json`;

    const params = {
      TranscriptionJobName,
      LanguageCode, // For example, 'en-US'
      MediaFormat, // For example, 'mp4'
      Media: {
        MediaFileUri, // For example, "https://transcribe-demo.s3-REGION.amazonaws.com/hello_world.wav"
      },
      OutputKey,
      OutputBucketName: inputBucket,
    };

    const data = await transcribeClient.send(
      new StartTranscriptionJobCommand(params)
    );
    if(data) console.log('transcribed sucessfully');
    return { statusCode: 200, body: data };
  } catch (err) {
    console.log(err);
    return { statusCode: 400, body: err };
  }
};
