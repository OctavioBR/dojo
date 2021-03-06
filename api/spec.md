# API specs
Simple REST API to handle dojo app functionalities.  
Made in Go, it currently persists data into files instead of real DBs.

## Routes
| Method | Route | Description
|-------:|:-----:|:-----------
| POST | `/api/v1/clock/hit` | Register in/out work times .
| POST | `/api/v1/user/new`  | Register new user in DB.

## Stored data structure
Two collections: `users` & (clock)`registers`

For users:
```json
{
    "userName": "octavio",
    "pass": "04d1f151ebfd14e011e8a92cde8c3906",
    "userID": "5861606418a687443cb62a34",
    "rondaweb": {
        "user": "octavio.richter",
        "pass": "72c28cb6c4799f14295b792bf95a5879"
    },
    "contact": {
        "email": "octavio.richter@neoway.com.br",
        "avatar": "http://placehold.it/32x32",
        "githubToken": "23126e54-3f84-4e81-a4ce-ab1e0f440f74"
    }
}
```
Note: Passwords must be cyphered.

For clock registers:
```json
[
    {"user": "5861606418a687443cb62a34", "time": "2012-04-23T18:25:43.511Z"},
    {"user": "5861606418a687443cb62a34", "time": "2012-04-24T12:33:51.511Z"}
]
```
