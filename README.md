# NorthStar AI (MentorAI) 🚀

<div align="center">
  <p><strong>Your Lifelong AI Career Mentor and Operating System.</strong></p>
</div>

NorthStar AI (also known as MentorAI) is a complete Career Operating System designed to help students and professionals navigate their career growth. It utilizes a multi-agent AI architecture to provide personalized roadmaps, real-time interview prep, resume optimization, and long-term career memory.

## ✨ Features

- **Multi-Agent Architecture**: Specialized AI agents powered by `pydantic-ai` for Career Mentoring, Resume Analysis, Mock Interviews, and Opportunities.
- **AI Memory Hub**: A persistent memory system powered by ChromaDB that remembers your skills, goals, projects, and interview feedback over time.
- **Skill Gap Analyzer & Learning Roadmaps**: Dynamic learning paths that adjust as you progress.
- **Voice Interview Prep**: Real-time AI mock interviews with industry-specific questioning and actionable feedback.
- **Stunning Glassmorphic UI**: Built with Next.js 15, TailwindCSS v4, and ShadCN, featuring a dark, cinematic SaaS aesthetic.

## 🏗️ Technology Stack

**Frontend**
- Next.js 15 (App Router)
- React 19 & TypeScript
- TailwindCSS v4 (Custom UI Variables)
- Zustand (State Management)
- Framer Motion (Animations)

**Backend**
- FastAPI & Python 3.12+
- PydanticAI (Agent Orchestration)
- PostgreSQL & SQLAlchemy (Relational Data)
- ChromaDB (Vector Memory)
- Docker & Docker Compose

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Python 3.12+
- Docker & Docker Compose

### 1. Setup Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`
pip install -r requirements.txt

# Start PostgreSQL and ChromaDB
docker-compose up -d

# Run Database Migrations
alembic upgrade head

# Start API Server
uvicorn main:app --reload
```

### 2. Setup Frontend
```bash
cd mentorai-app
npm install

# Start Next.js Development Server
npm run dev
```

Visit `http://localhost:3000` to view the application.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
