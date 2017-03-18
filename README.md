# s3-uploader

Direct upload file to S3 using Node.js

### Getting started


#### 1. Create S3 Bucket


#### 2. Edit Bucket Policy

Write the following code.

    {
        "Version": "2012-10-17",
        "Statement": [
            {
                "Sid": "Stmt1390381397000",
                "Effect": "Allow",
                "Principal": {
                    "AWS": "*"
                },
                "Action": [
                    "s3:PutObject",
                    "s3:PutObjectAcl"
                ],
                "Resource": "arn:aws:s3:::YOUR_BUCKET_NAME/*"
            }
        ]
  }

#### 3. Edit server.js

 Replace PROFILE, BUCKET_NAME  with your aws profile name, bucket name.


#### 4. Run the following command

    npm install
    npm run app
    npm run server
    open index.html
