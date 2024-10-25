<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>

## Description

RESTful API for Auth and crud Organization Collcetion with [Nest](https://github.com/nestjs/nest) framework.

## Token

> In order to use some of the endpoints you will need first to login and use your own token

#### In Request headers add prop calls "token"

#### example:

```js
headers = {
  Authorization: 'Bearer yourOwnToken',
};
```

#### And then send this as header, something like this

```js
response = requests.get(url, { headers });
```

## API Endpoints

<details>
 <summary><b>Authentication</b></summary>

#### POST /auth/signup

> ##### request body props: (\* means required)
>
> - name\*: string, min length 2, max length 64
> - email\*: valid email (---@---.---)
> - password\*: string, min length 2, max length 64

```json
// request body example
{
  "name": "Your Name",
  "email": "yourEmail@domain.com",
  "password": "1234abCd!"
}
```

#### POST /auth/signin

> request an access_token and refresh_token

```json
// request body example
{
  "email": "yourEmail@domain.com",
  "password": "1234abCd!"
}
```

```json
// response body example
{
  "message": "success",
  "user:": {
    "name": "Your Name",
    "email": "yourEmail@domain.com"
  },
  "access_token": "yourUnqiueAccessToken",
  "refresh_token": "yourUnqiueRefreshToken"
}
```

#### POST /auth/refresh

> request an access_token

```json
// request body example
{
  "access_token": "yourUnqiueAccessToken"
}
```

```json
// response body example
{
  "message": "success",
  "access_token": "yourNewUnqiueAccessToken"
}
```

#### POST /auth/revoke-refresh-token

> request to delete your refresh token

```json
// request body example
{
  "refresh_token": "yourUnqiueAccessToken"
}
```

```json
// response body example
{
  "message": "success"
}
```

</details>

---

<details>
 <summary><b>Organization</b></summary>

#### GET /organization

> get all organizations
> [!CAUTION]
> Requires Token

#### return:

```json
[
  {
    "organization_id": "MongoId",
    "name": "orgName",
    "description": "orgDesc",
    "organization_members": [
      {
        "name": "membName",
        "email": "membEmail",
        "access_level": "member"
      }
    ]
  }
]
```

---

#### GET organization/:organization_id

> get all organization by organization_id
> [!CAUTION]
> Requires Token

#### return:

```json
{
  "organization_id": "MongoId",
  "name": "orgName",
  "description": "orgDesc",
  "organization_members": [
    {
      "name": "membName",
      "email": "membEmail",
      "access_level": "member"
    }
  ]
}
```

---

#### POST /organization

> Create new product
> [!CAUTION]
> Requires Token

##### props: (\* means required)

- name\*: string, min length 2, max length 64
- description\*: string, min length 2, max length 64
- organization_members: array of organization_member[] and min array length can be 0
- organization_members["name"]: string, min length 2, max length 64
- organization_members["email"]: string, a vaild email
- organization_members["access_level"]: string, min length 2, max length 64 or "memeber"

#### example:

```json
{
  "name": "orgName",
  "description": "orgDesc",
  "organization_members": [
    {
      "name": "membName",
      "email": "membEmail",
      "access_level": "member"
    }
  ]
}
```

---

#### PUT /organization/:organization_id/invite

> Update product by productId
> [!CAUTION]
> Requires Token

##### props: (\* means required)

- name\*: string, min length 2, max length 64
- email\*: string, a vaild email
- access_level: string, min length 2, max length 64 or "memeber"

#### example:

```json
{
  "name": "membName",
  "email": "membEmail",
  "access_level": "member"
}
```

---

#### DELETE /organization/:organization_id

> Delete product by productId
> [!CAUTION]
> Requires Token

</details>

---

## Installation and App Running

> This project is configured with Docker

```bash
# development
$ docker-compose -f docker.compose.dev.yml up --build

# production
$ docker-compose -f docker.compose.prod.yml up --build
```


