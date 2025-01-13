# InstaSurge 📸 ✨

A modern Instagram-inspired social media platform built with React, Express, and PostgreSQL. InstaSurge lets you share your amazing moments, connect with friends, and explore a world of creativity! 🌟

## Features 🚀

- 📱 User authentication with Google Sign-in
- 🎨 Customize your profile with avatars and bio
- 📷 Share your best photos with captions
- ❤️ Interact with posts through likes
- 👥 Follow your friends
- 🔄 Personalized following feed
- 📱 Responsive design

## Tech Stack 🛠️

**Frontend:** 🎨
- React
- TailwindCSS for stunning styles

**Backend:** 💪
- Node.js
- Express.js
- PostgreSQL database
- Cloudinary for image storage

## API Reference 📚

### Authentication 🔐

#### Login
```http
POST /api/auth/login
```
| Parameter  | Type     | Description                |
| :--------- | :------- | :------------------------- |
| `email`    | `string` | **Required**. User email   |
| `password` | `string` | **Required**. User password|

### User Management 👤

#### Get User Profile
```http
GET /api/user/profile/${username}
```
| Parameter  | Type     | Description                    |
| :--------- | :------- | :----------------------------- |
| `username` | `string` | **Required**. Username to fetch|

#### Update Profile
```http
PATCH /api/user/profile
```
| Parameter  | Type     | Description                     |
| :--------- | :------- | :------------------------------ |
| `id`       | `string` | **Required**. User ID          |
| `username` | `string` | New username                    |
| `bio`      | `string` | User biography                  |
| `avatar`   | `file`   | Profile picture                 |

#### Get User Posts
```http
GET /api/user/${username}/posts
```
| Parameter  | Type     | Description                    |
| :--------- | :------- | :----------------------------- |
| `username` | `string` | **Required**. Username to fetch|

#### Get Following Status
```http
GET /api/user/follow
```
| Parameter  | Type     | Description                          |
| :--------- | :------- | :----------------------------------- |
| `username` | `string` | **Required**. Username to check      |

### Posts 📝

#### Create Post
```http
POST /api/post
```
| Parameter | Type     | Description                    |
| :-------- | :------- | :----------------------------- |
| `userId`  | `string` | **Required**. Author's user ID |
| `caption` | `string` | Post caption                   |
| `image`   | `file`   | **Required**. Post image       |

#### Get Single Post
```http
GET /api/post/${id}
```
| Parameter | Type     | Description                    |
| :-------- | :------- | :----------------------------- |
| `id`      | `string` | **Required**. Post ID to fetch |

#### Get All Posts
```http
GET /api/post
```

#### Get Following Feed
```http
GET /api/post/following
```

#### Like Post
```http
POST /api/post/${id}/like
```
| Parameter | Type     | Description                    |
| :-------- | :------- | :----------------------------- |
| `id`      | `string` | **Required**. Post ID to like  |

## Setup and Installation 🚀

1. Clone the repository
2. Install all dependencies (it's a monorepo! 🎉)
```bash
npm install
```
3. Set up PostgreSQL database
4. Configure environment variables (see below)
5. Start both services with Turbo! 🏎️
```bash
turbo dev
```

## Environment Variables ⚙️

Create a `.env` file in the root directory with these variables:

```env
# Port Configuration 🚪
FRONTEND_PORT=
BACKEND_PORT=
FRONTEND_URL=
BACKEND_URL=

# Database Configuration 🗄️
DB_USER=
DB_HOST=
DB_DATABASE=
DB_PASSWORD=
DB_PORT=

# Cloudinary Configuration ☁️
CLOUDINARY_URL=
CLOUDINARY_CLOUDNAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# Google OAuth Configuration 🔐
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_CALLBACK=

# Environment Configuration 🌍
ENVIROEMENT=
```

## Project Structure 📁

```
instasurge/
├── apps/
│   ├── frontend/     # React frontend 🎨
│   └── backend/      # Express backend 💪
├── package.json
└── turbo.json
```

## License 📜

[MIT](https://choosealicense.com/licenses/mit/)
