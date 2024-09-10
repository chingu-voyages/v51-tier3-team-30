## Description

This project from [roadmap.sh](https://roadmap.sh/projects/image-processing-service) backend projects that involves creating a backend system for an image processing service similar to Cloudinary. The service will allow users to upload images, perform various transformations, and retrieve images in different formats. The system will feature user authentication, image upload, transformation operations, and efficient retrieval mechanisms.

## Features

### User Authentication

-   [ ] **SignUp**: Allow users to create an account
-   [ ] **Log-In**: Allow users to log into their account.
-   [ ] **JWT Authentication**: Secure endpoints using JWT tokens for authenticated access.

### Image Management

-   [ ] **Upload Image**: Allow users to upload images.
-   [ ] **Transform Image**: Allow users to perform various transformations (resize, crop, rotate, watermark etc.).
-   [ ] **Retrieve Image**: Allow users to retrieve a saved image in different formats.
-   [ ] **List Images**: List all uploaded images by the user with metadata.

### Here is the list of transformations that you can implement

-   [ ] Resize
-   [ ] Crop
-   [ ] Watermark
-   [ ] Flip
-   [ ] Mirror
-   [ ] Compress
-   [ ] Change format (JPEG, PNG, etc.)
-   [ ] Apply filters (grayscale, sepia, etc.)

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
