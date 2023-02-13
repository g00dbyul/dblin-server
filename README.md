<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center"> <a>Nest.js</a> framework Boilerplate</p>
  
## Installation
---
```bash
$ npm install
```

## Running the app

---

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

---

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

</br>

## Project Structure Example

---

```bash
├── app.controller.spec.ts
├── app.controller.ts
├── app.module.ts
├── app.service.ts
├──# common
│   ├── constant
│   ├── decorator
│   ├── entity
│   ├── exception
│   ├── filter
│   ├── guard
│   ├── interceptor
│   ├── interface
│   ├── middleware
│   ├── pipe
│   └── type
├── #domain
│   ├── auth
│   └── user
│       ├── dto
│       ├── entity
│       ├── interface
│       ├── user.controller.spec.ts
│       ├── user.controller.ts
│       ├── user.module.ts
│       ├── user.repository.ts
│       ├── user.service.spec.ts
│       └── user.service.ts
├── main.ts
└── #shared
    ├── cache
    │   ├── cache.module.ts
    │   └── cache.service.ts
    ├── config
    │   ├── config.module.ts
    │   └── config.service.ts
    ├── database
    │   ├── database.module.ts
    │   └── database.service.ts
    └── logger
    │  ├── logger.module.ts
    │    └── logger.service.ts
    └── ...
```

</br>

## Project Structure Description

---

### Directory

- ### common
  - A public file folder that doesn't inject.
- ### domain
  - The actual business logic and the module folder including controllers.
  - Service domain unit (endpoint)
- ### shared
  - A common module folder that can be injected to the overall business logic.

</br>

### Rule

- All folders and file names are written in units.
  - ex) user(O),　 users(X)

</br>

## Validation

**Validating Body** using [decorators](src/domain//user/dto/create-user.dto.ts) and [custom decorator](src/common/decorator/match.decorator.ts) <br>

---

Validating Path variable<br>

```javascript
@Param('id', ParseIntPipe) id: number)
```

**Validating query** params

```javascript
@Query('sort', ParseBoolPipe) sort: boolean)
```

**Body with array**

```javascript
@Body(new ParseArrayPipe({ items: CreateUserDto }))
createUserDtos: CreateUserDto[])
```

**Query params array**

```javascript
@Query('ids', new ParseArrayPipe({ items: Number, separator: ',' }))
ids: number[])
```

**Transformation** is enabled at [main.ts](src/main.ts) with (transforms incoming payload to specified primitive type or dto)

**Mapped Types** are used to create subset of dto (i.e [update dto](src/domain/user/dto/update-user.dto.ts) and [update password](src/domain/user/dto/update-user-password.dto.ts)
from createDto)

## Serialization

Serialization is done via [interceptor](src/common/interceptor/serialize.interceptor.ts) by passing Dto as an argument<br>

Set broader restriction on controller level

```javascript
export class UserDto {
  @Expose()
  phoneNumber!: string;
  @Expose()
  email!: string;
}
```

and apply it as

```javascript
@Serialize(UserDto)
@Controller('users')
```

set narrower restriction on route level

```javascript
export class UserDetailDto {
  @Expose()
  email!: string;
}
```

and apply it as

```javascript
export class UserDetailDto {
  @Expose()
  email!: string;
}
```
