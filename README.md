# CC-Node.js-Project

## specification and documentation

## specification
This Project has 7 endpoints:
- Get All Members sorted by last_seen_at
```
    URL: /api/members

    Method:    GET

    Header Params: authtoken: token received during login

    Data Params

    Success Response:

    Code: 200
    Content: [{
        "username": "KN",
        "last_seen_at": "2021-04-20T14:37:39.262Z"
        }]
    Error Response:

    Code: 400 BAD REQUEST
    Content: { error : "Token Error" }
```

- Gets all the highscores for all levels for any user
```
    URL: /api/members/highscores/user

    Method:    GET

    Header Params: authtoken: token received during login

    Data Params
    BODY
    {"username": "KN"}

    Success Response:

    Code: 200
    Content: [{
        "level": 9,
        "score": 910
        },{
        "level": 10,
        "score": 910
        }]
    Error Response:

    Code: 400 BAD REQUEST
    Content: { error : "Token Error" }

    Code: 400 BAD REQUEST
    Content: { error : "UserName Invalid" }
```

- Get all the highscores of a level
```
    URL: /api/members/highscores/level/:level

    Method:    GET

    Header Params: authtoken: token received during login

    Data Params
    URL Params
    :level = 9

    Success Response:

    Code: 200
    Content: [{
        "score": 9,
        "level": 910
        },{
        "score": 9,
        "level": 920
        }]
    Error Response:

    Code: 400 BAD REQUEST
    Content: { error : "Token Error" }
    
    Code: 400 BAD REQUEST
    Content: { error : "UserName Invalid" }
```

- Login Single Member
```
    URL: /api/members/login

    Method:    POST

    Header Params: authtoken: token received during login

    Data Params
    BODY
    {
    "username": "DheerajKN",
    "password": "Password@123"
    }
    
    Success Response:

    Code: 200
    Content: {
    "authToken": "tidg9m"
    }
    Error Response:

    Code: 400 BAD REQUEST
    Content: { error : "Password Incorrect" }

    Code: 400 BAD REQUEST
    Content: { error : "No member with this usename" }
```


-  Create Member
```
    URL: /api/members

    Method:    POST

    Header Params:

    Data Params
    BODY
    {
    "username": "DheerajKN",
    "password": "Password@123"
    }

    Success Response:

    Code: 200
    Content: {
    "username": "DheerajKN",
    "password": "Password@123",
    "scores": [],
    "last_seen_at": "2021-04-20T14:40:11.685Z"
    }
    Error Response:

    Code: 400 BAD REQUEST
    Content: { error : "UserName exists" }
    
    Code: 400 BAD REQUEST
    Content: { error : "Password must have at least one upper, lower character and digits" }
```

- Update Score of the user
```
    URL: /api/members

    Method:    PUT

    Header Params: authtoken: token received during login

    Data Params
    BODY
    {
    "level": 9,
    "score": 905
    }

    Success Response:

    Code: 200
    Content: {
    "username": "DheerajKN",
    "password": "Password@123",
    "scores": [
        {
            "level": 9,
            "score": 905
        }
    ],
    "last_seen_at": "2021-04-20T14:36:12.245Z",
    "authToken": "8x5lqk"
    }
    Error Response:

    Code: 400 BAD REQUEST
    Content: { error : "Token Error" }
```

- Update User Object with email field
```
    URL: /api/members/email

    Method:    PUT

    Header Params: authtoken: token received during login

    Data Params
    BODY
    {
    "email": "knd@mail.com"
    }

    Success Response:

    Code: 200
    Content: {
    "username": "DheerajKN",
    "password": "Password@123",
    "scores": [],
    "last_seen_at": "2021-04-20T14:40:49.832Z",
    "authToken": "tidg9m",
    "email": "knd@mail.com"
    }

    Error Response:
    Code: 400 BAD REQUEST
    Content: { error : "Email is not Valid" }
    
    Code: 400 BAD REQUEST
    Content: { error : "Token Error" }
```

## documentation

- Setup

Will Require Node Installation: Use https://nodejs.org/en/download/ to download both node and npm

```
Verify if both are installed or not by:
node -v
npm -v
```

Then after cloning this repo, we need to download all the packages

```
npm i
```

Then we need to start the server: nodemon package has being installed and configured so that server auto-restarts on file save

```
npm start
```

## packages used
- Express: LightWeight HTTP Server module that makes writing REST APIs simple that handling most of the HTTP Process in background
- Email-Validator: Simple Email Validator module that is simple and intutive to use
- Password-Validator: Simple Password Validator module that is simple and intutive to use
- Nodemon: Simple Script Monitor that restarts the Node Server on file save.
