import React,{useState,useEffect} from 'react'
import '../style/interview.scss'
import {useInterview} from "../hooks/useInterview.js"
import { useParams } from 'react-router'

const Interview = ({ data }) => {
    const {report , getReportById} = useInterview();
    data = data ?? report;
    const [activeSection, setActiveSection] = useState('technical');
    const radius = 56;
    const circumference = 2 * Math.PI * radius;
    const score = Number(data?.matchScore ?? 0);
    const normalizedScore = Math.max(0, Math.min(100, score));
    const progressOffset = circumference - (normalizedScore / 100) * circumference;

    const getScoreColor = (value) => {
      if (value >= 80) return '#22C55E';
      if (value >= 60) return '#F59E0B';
      return '#EF4444';
    };

    const scoreColor = getScoreColor(normalizedScore);

    const {interviewId} = useParams();

    useEffect(() => {
        if(interviewId ){
            getReportById(interviewId)
        }
    },[interviewId])

    if (!data) {
  return <div>Loading...</div>;
}

  return (
    <main className="interview-page">
      <div className="container">
        <div className="interview-card">
          <aside className="nav-panel">
            <div className="nav-header">SECTIONS</div>
            <a href="#technical" className={`nav-link ${activeSection === 'technical' ? 'active' : ''}`} onClick={(event) => {
              event.preventDefault();
              setActiveSection('technical');
            }}>Technical Questions</a>
            <a href="#behavioral" className={`nav-link ${activeSection === 'behavioral' ? 'active' : ''}`} onClick={(event) => {
              event.preventDefault();
              setActiveSection('behavioral');
            }}>Behavioral Questions</a>
            <a href="#roadmap" className={`nav-link ${activeSection === 'roadmap' ? 'active' : ''}`} onClick={(event) => {
              event.preventDefault();
              setActiveSection('roadmap');
            }}>Road Map</a>
          </aside>

          <section className="main-panel">
            {activeSection === 'technical' && (
              <>
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
              </>
            )}

            {activeSection === 'behavioral' && (
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
            )}

            {activeSection === 'roadmap' && (
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
            )}
          </section>

          <aside className="aside-panel">
            <div className="score-card">
              <div className="score-header">MATCH SCORE</div>
              <div className="score-ring">
                <svg className="score-ring__svg" viewBox="0 0 140 140" aria-label="Match score ring">
                  <circle className="score-ring__track" cx="70" cy="70" r={radius} />
                  <circle
                    className="score-ring__progress"
                    cx="70"
                    cy="70"
                    r={radius}
                    stroke={scoreColor}
                    strokeDasharray={circumference}
                    strokeDashoffset={progressOffset}
                  />
                </svg>
                <span className="score-ring__value">{data.matchScore}%</span>
              </div>
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
