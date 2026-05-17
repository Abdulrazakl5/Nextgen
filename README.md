# TheTracer - Global People Search Application

A comprehensive web application for searching people worldwide by name, date of birth, and various filters using a global database.

## Features

✅ **Global Search** - Search for people across countries and regions  
✅ **Advanced Filtering** - Filter by name, date of birth, location, occupation  
✅ **User Authentication** - Secure login and registration system  
✅ **Pagination** - Efficient handling of large datasets  
✅ **Full-Text Search** - Advanced search capabilities  
✅ **Search History** - Track user search queries  
✅ **RESTful API** - Well-documented API endpoints  

## Tech Stack

- **Backend**: Node.js + Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: bcryptjs for password hashing

## Installation

1. Clone the repository
   ```bash
   git clone https://github.com/Abdulrazakl5/nextgen.git
   cd nextgen
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Create `.env` file from `.env.example`
   ```bash
   cp .env.example .env
   ```

4. Configure MongoDB URI in `.env`
   ```
   MONGODB_URI=mongodb://localhost:27017/thetracer
   JWT_SECRET=your_secret_key
   ```

5. Start the server
   ```bash
   npm start
   # or for development with auto-reload
   npm run dev
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login

### Search
- `GET /api/search` - Basic search (query params: firstName, lastName, dateOfBirth, country, page, limit)
- `POST /api/search/advanced` - Advanced search with multiple filters
- `GET /api/search/fulltext/:query` - Full-text search

### People Management
- `GET /api/people` - List all people
- `GET /api/people/:id` - Get specific person details
- `POST /api/people` - Add new person
- `PUT /api/people/:id` - Update person information
- `DELETE /api/people/:id` - Delete person record

## Example Requests

### Register User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john_doe",
    "email": "john@example.com",
    "password": "SecurePassword123"
  }'
```

### Search for People
```bash
curl "http://localhost:5000/api/search?firstName=John&lastName=Doe&country=USA&page=1&limit=20"
```

### Add New Person
```bash
curl -X POST http://localhost:5000/api/people \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Jane",
    "lastName": "Smith",
    "dateOfBirth": "1990-05-15",
    "country": "Canada",
    "city": "Toronto",
    "occupation": "Software Engineer",
    "email": "jane@example.com"
  }'
```

## File Structure

```
nextgen/
├── server.js                 # Main application file
├── package.json             # Dependencies
├── .env.example             # Environment variables template
├── models/
│   ├── Person.js           # Person data model
│   └── User.js             # User authentication model
├── routes/
│   ├── auth.js             # Authentication endpoints
│   ├── search.js           # Search endpoints
│   └── people.js           # People management endpoints
└── middleware/
    ├── auth.js             # JWT authentication middleware
    └── errorHandler.js     # Global error handling
```

## Future Enhancements

- [ ] React frontend UI
- [ ] Advanced analytics and reporting
- [ ] Integration with public databases
- [ ] Multi-language support
- [ ] Real-time notifications
- [ ] Mobile app (React Native)

## License

MIT

## Author

Abdulrazakl5
