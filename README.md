# PROJECT_18F AI Content Engine

PROJECT_18F is a web-based AI-powered content generation tool that allows users to generate engaging and detailed content on any topic using the Cohere API. The application supports generating new content as well as continuing existing content seamlessly.

> **Note:** This project is currently in development stage. The primary focus is on backend development, FastAPI implementation, RESTful API architecture, and AI agent development. The frontend is a simple interface to demonstrate the backend capabilities.

## Features

- **AI-Powered Content Generation**: Generate detailed and engaging content on any topic
- **Continuation Support**: Continue expanding on previously generated content with context
- **Responsive Frontend**: A clean and user-friendly interface built with HTML, CSS, and JavaScript
- **FastAPI Backend**: A lightweight and efficient backend to handle API requests
- **Keyboard Shortcuts**: Use `Enter` to generate new content and `Shift+Enter` to continue content generation

## Prerequisites

- Python 3.10 or higher
- A modern web browser
- A Cohere API key (free tier available)

## Project Setup

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/project_18f.git
cd project_18f
```

### 2. Create project structure and virtual environment

```bash
# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows, use venv\Scripts\activate

# Create project directories
mkdir -p backend frontend
```

### 3. Get a Cohere API key

1. Sign up for a free account at [Cohere's website](https://cohere.ai)
2. After logging in, navigate to the [API keys section](https://dashboard.cohere.ai/api-keys)
3. Create a new API key and copy it
4. The free tier includes a limited number of API calls per month which is sufficient for testing

### 4. Backend setup

```bash
# Navigate to backend directory
cd backend

# Install the required dependencies
pip install fastapi uvicorn python-dotenv requests

# Create an .env file
echo "COHERE_API_KEY=your_cohere_api_key_here" > .env
echo "COHERE_API_URL=https://api.cohere.ai/v1/generate" >> .env
```

Replace `your_cohere_api_key_here` with the API key you obtained from Cohere.

### 5. Create the backend files

Create `main.py` in the backend directory with the FastAPI implementation.

### 6. Frontend setup

```bash
# Navigate to frontend directory
cd ../frontend

# Create the frontend files
touch index.html script.js style.css
```

Add the HTML, CSS, and JavaScript code to these files.

## Running the Application

### 1. Start the backend server

```bash
# Ensure you're in the backend directory and virtual environment is activated
cd backend
uvicorn main:app --reload
```

The backend will be available at `http://127.0.0.1:8000`.

### 2. Open the frontend

You have two options:

**Option 1**: Open the HTML file directly
- Navigate to the frontend directory in your file explorer
- Double-click on `index.html` to open it in your default browser

**Option 2**: Use a simple HTTP server
```bash
# In a new terminal, navigate to the frontend directory
cd frontend

# If you have Python installed
python -m http.server 8080
```
Then open `http://localhost:8080` in your browser.

## Usage

1. Enter a topic in the input field
2. Click the "Generate" button or press `Enter` to generate content
3. To continue generating content on the same topic, press `Shift+Enter`
4. Each continuation will build upon the previous content, creating a cohesive body of text

## API Endpoint

### `GET /generate/`

**Parameters:**
- `topic` (string, required): The subject to generate content about
- `count` (integer, optional, default=0): Indicates if this is the first generation (0) or a continuation (1+)

**Success Response:**
```json
{
  "description": "The generated content text..."
}
```

## Development Focus

This project is primarily focused on:

1. **Backend Development** - Building a robust FastAPI application
2. **RESTful API Design** - Creating well-structured API endpoints
3. **AI Agent Integration** - Working with AI text generation capabilities
4. **Stateful Content Generation** - Managing context for continued text generation

The frontend is intentionally kept minimal to showcase the backend capabilities.

## Troubleshooting

- **API key issues**: Ensure your Cohere API key is correctly set in the `.env` file
- **Backend not starting**: Check that all dependencies are installed and ports are not in use
- **CORS errors**: Make sure the backend server is running before accessing the frontend
- **Scrolling problems**: If content becomes too long, try refreshing the page

## License

This project is licensed under the MIT License.

## Acknowledgments

- [Cohere](https://cohere.ai) for their powerful AI content generation API
- [FastAPI](https://fastapi.tiangolo.com) for the efficient Python backend framework
- [Google Fonts](https://fonts.google.com) for the Inter font used in the UI