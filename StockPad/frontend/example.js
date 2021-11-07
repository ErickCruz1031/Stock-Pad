// Use this code snippet in your app.
// If you need more information about configurations or implementing the sample code, visit the AWS docs:
// https://aws.amazon.com/developers/getting-started/nodejs/

// Load the AWS SDK
var AWS = require('aws-sdk'),
    region = "us-east-2",
    secretName = "arn:aws:secretsmanager:us-east-2:144067153410:secret:polygonKey-JKfwAT",
    secret,
    decodedBinarySecret;

// Create a Secrets Manager client
var client = new AWS.SecretsManager({
    region: region
});

// In this sample we only handle the specific exceptions for the 'GetSecretValue' API.
// See https://docs.aws.amazon.com/secretsmanager/latest/apireference/API_GetSecretValue.html
// We rethrow the exception by default.

client.getSecretValue({SecretId: secretName}, function(err, data) {
    if (err) {
        console.log("Seems we got an error \n", err);
        if (err.code === 'DecryptionFailureException'){
            console.log("Seems we got 1");
            // Secrets Manager can't decrypt the protected secret text using the provided KMS key.
            // Deal with the exception here, and/or rethrow at your discretion.
            throw err;
        }
        else if (err.code === 'InternalServiceErrorException'){
            // An error occurred on the server side.
            // Deal with the exception here, and/or rethrow at your discretion.
            console.log("Seems we got 2")
            throw err;
        }
        else if (err.code === 'InvalidParameterException')
            // You provided an invalid value for a parameter.
            // Deal with the exception here, and/or rethrow at your discretion.
            throw err;
        else if (err.code === 'InvalidRequestException')
            // You provided a parameter value that is not valid for the current state of the resource.
            // Deal with the exception here, and/or rethrow at your discretion.
            throw err;
        else if (err.code === 'ResourceNotFoundException')
            // We can't find the resource that you asked for.
            // Deal with the exception here, and/or rethrow at your discretion.
            throw err;
    }
    else {
        // Decrypts secret using the associated KMS CMK.
        // Depending on whether the secret is a string or binary, one of these fields will be populated.
        console.log("We got in here");
        if ('SecretString' in data) {
            console.log("Data: ", data);
            secret = JSON.parse(data.SecretString);
        } else {
            console.log("In the else with data : \n", data)
            let buff = new Buffer(data.SecretBinary, 'base64');
            decodedBinarySecret = buff.toString('ascii');
        }
    }

    console.log("We got here");
    //var source_secret = JSON.stringify(secret);
    console.log("This is the secret: ", secret.apiKey);
    
    // Your code goes here. 
});