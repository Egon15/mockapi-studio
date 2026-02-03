# MockAPI Studio 🚀

A minimalist, serverless tool for generating and hosting instant API endpoints. Built for developers who need to simulate backend behavior without writing a single line of server code.

**Live Demo:** [Mockapi.studio](https://mockapi-studio-three.vercel.app/)

---

## ✨ Features

- **Instant Deployment:** Generate unique, shareable API URLs in seconds.
- **Dynamic Behavior:** Configure custom HTTP status codes (200, 404, 500, etc.).
- **Latency Simulation:** Test frontend loading states with artificial delays (0–10s).
- **Multi-Format Support:** Host JSON, XML, or raw Text payloads.
- **Automated Cleanup:** Stateless endpoints with a 72-hour automated retention policy.

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Database:** MongoDB (TTL Indexing for data lifecycle)
- **Styling:** Tailwind CSS + shadcn/ui
- **Deployment:** Vercel (Edge Functions)

## 🚀 Local Development

1. **Clone the repo:**
   ```bash
   git clone https://github.com/Egon15/mockapi-studio.git

2. **Install dependencies**
   ```bash
   npm install

3. **Environment setup**
   ```bash
   MONGODB_URI=<your_own_connection_string>

4. **Run the development server**
   ```bash
   npm run dev

5. **The app will be available at:** 
    ```bash
    http://localhost:3000

## 📡 API Usage
Once an endpoint is created, you can fetch data using any standard HTTP client:
```bash
curl -X GET http://localhost:3000/api/mock/{id}
