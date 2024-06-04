require('dotenv').config();

const event = {
    "Records": [
        {
            "eventVersion": "2.1",
            "eventSource": "aws:s3",
            "awsRegion": "us-east-1",
            "eventTime": "2024-06-04T05:20:52.576Z",
            "eventName": "ObjectCreated:Put",
            "userIdentity": {
                "principalId": "AWS:AIDAVDHVW3PS5MM4VAROO"
            },
            "requestParameters": {
                "sourceIPAddress": "103.121.26.34"
            },
            "responseElements": {
                "x-amz-request-id": "9RFZSGJV4AJ72NSQ",
                "x-amz-id-2": "flc0R+pVMbhSp7f2GXNEJNPBT4NVUSn3MsrWpDr5GzlRWyepfU764zl4VvS8lbEEvMjpyrKfMXgKknXYZDss2ZvtCbfa85FI"
            },
            "s3": {
                "s3SchemaVersion": "1.0",
                "configurationId": "27222762-a461-4ddd-9fc2-f862e9f34f5e",
                "bucket": {
                    "name": "spjeaii-assets",
                    "ownerIdentity": {
                        "principalId": "ABA1KYRDC3ZPH"
                    },
                    "arn": "arn:aws:s3:::spjeaii-assets"
                },
                "object": {
                    "key": "development/recordings/a511b33ec922445b9294d17070c644ed/demo.mp4",
                    "size": 189070,
                    "eTag": "b229d3a99565f5b9d3cc31524539c9ca",
                    "sequencer": "00665EA434767B0F86"
                }
            }
        }
    ]
}

// Import ENV's
process.env.AWS_BUCKET_URL;
process.env.NODE_ENV;
process.env.AWS_BUCKET;
process.env.AWS_DEFAULT_REGION;
process.env.LANGUAGE_CODE;

const { handler } = require('./index');

handler(event);