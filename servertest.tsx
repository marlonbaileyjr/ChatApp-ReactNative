const AWS = require('aws-sdk');
const http = require('http');
const express = require('express');
const app = express();

const instanceId = 'YOUR_INSTANCE_ID';
const region = 'YOUR_INSTANCE_REGION';
const port = 3000;

// create a new instance of the EC2 service
const ec2 = new AWS.EC2({region: region});

// get the public IP address of the instance
ec2.describeInstances({ InstanceIds: [instanceId] }, function(err, data) {
  if (err) {
    console.log(err);
    return;
  }

  const ipAddress = data.Reservations[0].Instances[0].PublicIpAddress;
  console.log('Server IP Address: ' + ipAddress);

  // send the post request to the server
  const postData = JSON.stringify(req.body);
  const options = {
    host: ipAddress,
    port: port,
    path: '/api/create-room',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': postData.length
    }
  };

  const request = http.request(options, function(response) {
    let data = '';

    response.on('data', function(chunk) {
      data += chunk;
    });

    response.on('end', function() {
      console.log('Response: ' + data);
      res.send(data);
    });
  });

  request.on('error', function(err) {
    console.log('Error: ' + err.message);
    res.send(err.message);
  });

  request.write(postData);
  request.end();
});

app.post('/api/create-room', async (req, res) => {
    const getMongoId = async (username) => {
        const user = await User.findOne({username}).lean();
        return user._id;
    };

    const {roomName, roomPassword: plainTextPassword, username} = req.body;

    try {
        const hashedPassword = await bcrypt.hash(plainTextPassword, 10);
        const ownerId = await getMongoId(username);

        const room = new Room({
            roomName,
            roomPassword: hashedPassword,
            ownerId,
            participants: [ownerId],
        });

        const savedRoom = await room.save();
        res.send(savedRoom);
    } catch (error) {
        console.log(error);
        res.status(500).send();
    }
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
