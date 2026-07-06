import React from 'react'
import '../style/interview.scss'

const sampleData = {
  title: 'Full Stack Developer (MERN Stack)',
  matchScore: 88,
  technicalQuestions: [
    {
      question: 'Explain the Virtual DOM in React and how it improves application performance.',
      intention: 'To assess the candidate\'s deep understanding of React internals beyond just syntax.',
      answer:
        "The answer should cover: 1. Definition of Virtual DOM as a lightweight copy of the real DOM. 2. The reconciliation process (diffing algorithm). 3. Batching updates to minimize expensive real DOM manipulation. 4. Mentioning that the candidate used this to 'improve application performance' during their internship.",
    },
    {
      question: 'How does JWT authentication work in a MERN stack application, and where do you store the token?',
      intention: 'To verify the candidate\'s practical knowledge of security and session management.',
      answer:
        "The candidate should explain: 1. Creating a payload and signing it with a secret on the server. 2. Sending the token to the client. 3. Sending the token back in the 'Authorization' header (Bearer scheme). 4. Storage options (localStorage vs. HttpOnly cookies) and their security implications regarding XSS and CSRF.",
    },
    {
      question: 'Compare MongoDB with MySQL. When would you choose one over the other for a project like your AI Workflow Automation Platform?',
      intention: 'To test the candidate\'s understanding of different database paradigms (NoSQL vs SQL).',
      answer:
        "The candidate should discuss: 1. Schema flexibility (JSON-like documents in Mongo vs. rigid tables in MySQL). 2. Scaling (Horizontal vs Vertical). 3. ACID compliance. 4. Relational data handling. For the AI project, they might justify MongoDB due to the unstructured nature of workflow metadata and AI responses.",
    },
    {
      question: "What is the difference between 'Node.js' being single-threaded and its ability to handle multiple concurrent requests?",
      intention: 'To evaluate the candidate\'s understanding of the Node.js Event Loop and non-blocking I/O.',
      answer:
        "Explain that while the JavaScript execution thread is single-threaded, Node.js uses an Event Loop and Worker Pool (libuv) to offload I/O operations (file system, network calls) to the operating system, allowing it to handle thousands of concurrent connections efficiently.",
    },
  ],
  behavioralQuestions: [
    {
      question: 'Tell me about a difficult technical bug you faced during your internship. How did you identify and solve it?',
      intention: 'To evaluate problem-solving skills, persistence, and use of debugging tools.',
      answer:
        "Use the STAR method (Situation, Task, Action, Result). Focus on the 'Action'—mention using Postman for API testing, VS Code debugger, or console logging to isolate the root cause, and the positive 'Result' on the production environment.",
    },
    {
      question: 'How do you stay updated with the rapidly changing landscape of Full Stack development?',
      intention: 'To check for a growth mindset and genuine interest in the field.',
      answer:
        "Mention specific resources like tech blogs (Dev.to, Medium), following key developers on GitHub, contributing to open source, or working on personal projects like the 'AI Workflow Automation Platform'.",
    },
  ],
  skillGaps: [
    { skill: 'Message Queues (Kafka/RabbitMQ)', severity: 'high' },
    { skill: 'Advanced Docker & CI/CD Pipelines', severity: 'medium' },
    { skill: 'Distributed Systems Design', severity: 'medium' },
  ],
}

const Interview = ({ data = sampleData }) => {
  return (
    <main className="interview-page">
      <div className="container">
        <div className="interview-card">
          <aside className="nav-panel">
            <div className="nav-header">SECTIONS</div>
            <a href="#technical" className="nav-link active">Technical Questions</a>
            <a href="#behavioral" className="nav-link">Behavioral Questions</a>
            <a href="#roadmap" className="nav-link">Road Map</a>
          </aside>

          <section className="main-panel">
            <header className="main-header">
              <div>
                <h1>Technical Questions</h1>
                <p className="subtext">{data.technicalQuestions.length} questions</p>
              </div>
            </header>

            <div className="question-list">
              {data.technicalQuestions.map((item, index) => (
                <details key={index} className="question-item" open={index === 0}>
                  <summary>
                    <span className="question-badge">Q{index + 1}</span>
                    <span>{item.question}</span>
                  </summary>
                  <div className="question-body">
                    <div className="question-section">
                      <div className="label">INTENTION</div>
                      <p>{item.intention}</p>
                    </div>
                    <div className="question-section">
                      <div className="label">MODEL ANSWER</div>
                      <p>{item.answer}</p>
                    </div>
                  </div>
                </details>
              ))}
            </div>

            <section id="behavioral" className="section-block">
              <div className="section-header">
                <h2>Behavioral Questions</h2>
              </div>
              {data.behavioralQuestions.map((item, index) => (
                <article key={index} className="behavioral-card">
                  <h3>{item.question}</h3>
                  <p className="intent">Intent: {item.intention}</p>
                  <p className="answer">{item.answer}</p>
                </article>
              ))}
            </section>

            <section id="roadmap" className="section-block roadmap-block">
              <div className="section-header">
                <h2>Road Map</h2>
              </div>
              <p className="roadmap-note">Review the model answers and focus on the intention behind each question for your prep.</p>
            </section>
          </section>

          <aside className="aside-panel">
            <div className="score-card">
              <div className="score-header">MATCH SCORE</div>
              <div className="score-ring">
                <span>{data.matchScore}%</span>
              </div>
              <p className="score-subtext">Strong match for this role</p>
            </div>

            <div className="skills-card">
              <div className="skills-header">SKILL GAPS</div>
              <div className="skill-list">
                {data.skillGaps.map((item, index) => (
                  <div key={index} className={`skill-pill ${item.severity}`}>
                    {item.skill}
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  )
}

export default Interview
