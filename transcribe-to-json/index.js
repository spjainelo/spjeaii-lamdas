const path = require("path");
const axios = require("axios");
const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");

const apiUrl = process.env.API_URL;
const token = process.env.API_TOKEN;

const client = new S3Client({});

const getObjectFromS3 = async ({ Bucket, Key }) => {
    const command = new GetObjectCommand({ Bucket, Key });
    try {
        const response = await client.send(command);
        return await response.Body.transformToString();
    } catch (err) {
        console.error(err);
    }
};

exports.handler = async function (event, context) {
    const eRecord = event.Records && event.Records[0],
        inputBucket = eRecord.s3.bucket.name,
        key = eRecord.s3.object.key;

    const s3Result = await getObjectFromS3({ Bucket: inputBucket, Key: key });
    const { jobName, status, results } = JSON.parse(s3Result);

    if (status) {
        const answerId = jobName.split("_")[1];
        const questionId = jobName.split("_")[0];
        const answer_text = results?.transcripts[0]?.transcript;

        const payload = {
            questionId,
            answerId,
            answer_text
        };

        try {
            const config = {
                "headers": {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            }

            const response = await axios.patch(`${apiUrl}/answers/${answerId}`, payload, config)
            console.log(response);
        } catch (e) {
            console.error('Axios Error: ', e)
        }
    }
}