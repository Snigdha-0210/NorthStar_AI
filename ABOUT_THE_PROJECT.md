## Inspiration
The inspiration for **NorthStar AI** came from a common crisis we observed among our peers: the overwhelming confusion students face when starting their career journeys. Today's job market demands are shifting at an unprecedented pace, yet college students often lack accessible, personalized mentorship to guide their skill-building. They waste countless hours searching for fragmented resources and repeatedly feeding the same background information into generic AI chat tools just to draft a simple Statement of Purpose (SOP) or resume. We wanted to build a "Career OS"—a deeply personalized, continuous digital mentor that actually *remembers* the user and guides them step-by-step from discovery to placement.

## What it does
NorthStar AI is a comprehensive, end-to-end career mentor and interview coach. Our platform offers:
* **Intelligent Career Discovery:** Students input their interests and skills, and the AI maps out specific career trajectories, complete with dynamic skill-building roadmaps.
* **Context Engine:** Using a vector database, the AI remembers a student's entire academic and project history. Need a cover letter or an SOP? NorthStar drafts it instantly without requiring you to re-type your background.
* **Resume & ATS Coach:** Users can upload their resumes to receive an instant ATS score and line-by-line actionable feedback tailored to specific job descriptions.
* **Multimodal Mock Interviews:** A personalized AI coach conducts interactive mock interviews (objective, subjective, and voice-based) to dramatically improve a student's confidence and employability.
* **BYOK (Bring Your Own Key):** To keep the platform highly scalable and developer-friendly, users have the flexibility to plug in their own API keys once free tiers are exhausted.

## How we built it
We architected NorthStar AI with a modern, highly scalable tech stack:
* **Frontend:** We built a highly polished, responsive user interface using **React**, **Next.js**, and **Tailwind CSS**. We implemented a unique Terracotta and Sage Green color theme to ensure a premium, professional SaaS aesthetic.
* **Backend:** We utilized **Python** and **FastAPI** to handle fast, asynchronous routing and data processing.
* **AI & Orchestration:** We leveraged the **OpenAI API** and **Google Gemini** alongside **LangChain** to orchestrate our specialized AI agents (Career Agent, Opportunity Agent, Resume Agent).
* **Memory & Storage:** To solve the "amnesia" problem of standard LLMs, we integrated **ChromaDB** as our vector database. This powers our RAG (Retrieval-Augmented Generation) pipeline, storing user history as high-dimensional vectors $v \in \mathbb{R}^n$, allowing the AI to calculate cosine similarity $\cos(\theta) = \frac{A \cdot B}{\|A\| \|B\|}$ to retrieve relevant experiences when generating customized SOPs and roadmaps. We used **PostgreSQL** for standard relational data storage.
* **Deployment:** The application is deployed at the edge using **Vercel** for lightning-fast frontend delivery.

## Challenges we ran into
* **Managing AI Memory:** Standard LLMs have limited context windows. Designing a robust RAG architecture with ChromaDB to seamlessly retrieve a user's past projects and skills without hallucinating was a complex hurdle.
* **Frontend State Management & Build Strictness:** Integrating dynamic AI streams into the Next.js frontend required careful state management. We also had to rigorously debug Next.js build issues (such as strict TypeScript and ESLint typing enforcement) before our Vercel deployment would successfully compile.
* **Multimodal Integration:** Ensuring low latency during the AI voice mock interviews was challenging, as we had to balance speech-to-text processing time with the LLM's response generation to make the conversation feel natural.

## What we learned
Building NorthStar AI was an incredible learning experience. We deepened our understanding of **Vector Databases (ChromaDB)** and how to implement effective RAG architectures for long-term memory. We also learned how to orchestrate multiple LLM agents via **LangChain** so they could pass context to one another seamlessly. On the frontend, we mastered **Next.js** deployment pipelines and strict TypeScript typing.

## What's next for NorthStar AI
We are just getting started! Our immediate next steps include:
* **University Partnerships:** Piloting the platform with college career centers to gather real-world student feedback.
* **Enhanced Voice Capabilities:** Integrating more advanced, lower-latency WebRTC audio streaming for the mock interviews.
* **Enterprise Job Feeds:** Connecting directly to APIs from LinkedIn or Indeed to dynamically match students with live job postings the moment they complete a skill on their roadmap.
