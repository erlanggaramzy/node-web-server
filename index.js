
var http = require('http');
var fs = require('fs');
let users = require('./state').users;
let server = http.createServer(messageReceived);
server.listen(8080);

function messageReceived(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});

    if(req.method === "GET" && (req.url === "/users/" || req.url === "/users")){
        let usersJSON = JSON.stringify(users);
        res.write(usersJSON);
    }

    else if(req.method === "GET" && req.url.indexOf("/users/") > -1){
        let id = req.url.split("/");
        let user = users.find(p=>p["_id"] == id[2]);
        let usersJSON = JSON.stringify(user);
        res.write(usersJSON);
      }
    
    else if(req.method === "POST" && (req.url === "/users/" || req.url === "/users")){
        let body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        }).on('end', () => {
            body = Buffer.concat(body).toString();
            let user = JSON.parse(body);
            user._id = users.length + 1;
            users.push(user);
            // fs.appendFile('state.js'.users, body, (err) => {
            //     if (err) throw err;
            //     console.log('The "data to append" was appended to file!');
            //   });
        });
        // res.write(JSON.parse(body));
    }

    else if(req.method === "PUT" && req.url.indexOf("/users/") > -1){
        res.write("you wanted to update a user")
    }

    else if(req.method === "DELETE" && req.url.indexOf("/users/") > -1){
        res.write("you wanted to delete a user")
    }

    else{
    res.write("Not Found");
    }
    res.end();
}