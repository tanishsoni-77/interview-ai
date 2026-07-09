import React from 'react'
import '../style/interview.scss'
import {useInterview} from "../hooks/useInterview.js"


//sampleData



const Interview = ({ data }) => {
    const {report} = useInterview();
    data = data ?? report;

    if (!data) {
  return <div>Loading...</div>;
}

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
                <h2>Preparation Road Map</h2>
                <span className="small-badge">7-day plan</span>
              </div>

              <div className="timeline">
  {data.preparationPlan.map((item) => (
    <div key={item.day} className="timeline-row">

      <div className="timeline-marker" aria-hidden>
        <span className="dot" />
      </div>

      <div className="timeline-card">
        <div className="timeline-day">
          Day {item.day}
        </div>

        <h3 className="timeline-title">
          {item.focus}
        </h3>

        <ul className="timeline-tasks">
          {item.tasks.map((t, i) => (
            <li key={i}>{t}</li>
          ))}
        </ul>
      </div>

    </div>
  ))}
</div>
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
