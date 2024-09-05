require('dotenv').config();

const event = {
    "Records": [
        {
            "eventVersion": "2.1",
            "eventSource": "aws:s3",
            "awsRegion": "us-east-1",
            "eventTime": "2024-06-04T08:49:52.250Z",
            "eventName": "ObjectCreated:Put",
            "userIdentity": {
                "principalId": "AWS:AIDAVDHVW3PSZZ74QORMD"
            },
            "requestParameters": {
                "sourceIPAddress": "44.213.90.38"
            },
            "responseElements": {
                "x-amz-request-id": "920WB18YY6ED7BQ5",
                "x-amz-id-2": "ZoPlCJItFg32i+nmTjDqAs9zNqjFk/iLVIBTXH5WZ9Cm+VBfpNpJPFJh16nsHpbteRYktq/9dN/SUxr59+Fok942wwgmGjBC7G5KvZ/EQo4="
            },
            "s3": {
                "s3SchemaVersion": "1.0",
                "configurationId": "f9eead3a-dbda-45d7-956f-80394c273e8f",
                "bucket": {
                    "name": "spjeaii-assets",
                    "ownerIdentity": {
                        "principalId": "ABA1KYRDC3ZPH"
                    },
                    "arn": "arn:aws:s3:::spjeaii-assets"
                },
                "object": {
                    "key": "development/output-json/4ed3b513a811483bb8f547c5774ec9d0/665eadba8023fd438bb19e2b_665f11ecccd884d51193c342_1717506546050.json ",
                    "size": 1122,
                    "eTag": "5f1305b69fc1467029ff1deae4f07b96",
                    "sequencer": "00665ED53031A3CA70"
                }
            }
        }
    ]
}

const { handler } = require('./index');

handler(event);