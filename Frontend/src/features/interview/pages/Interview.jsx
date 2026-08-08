import React,{useState,useEffect} from 'react'
import '../style/interview.scss'
import {useInterview} from "../hooks/useInterview.js"
import { useParams } from 'react-router'
import LogoutButton from '../components/LogoutButton.jsx'

const Interview = ({ data }) => {
    const {report , getReportById, getResumePdf} = useInterview();
    data = data ?? report;
    const [activeSection, setActiveSection] = useState('technical');
    const [isGeneratingResume, setIsGeneratingResume] = useState(false);
    const [resumeFeedback, setResumeFeedback] = useState({ message: '', type: 'info' });
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

    const iconProps = {
      width: 22,
      height: 22,
      stroke: '#7c3aed',
      strokeWidth: 2.2,
      fill: 'none',
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    };

    const codeIcon = (
      <svg viewBox="0 0 24 24" {...iconProps}>
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    );

    const userIcon = (
      <svg viewBox="0 0 24 24" {...iconProps}>
        <path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" />
        <path d="M9 7a4 4 0 1 1 8 0" />
      </svg>
    );

    const mapIcon = (
      <svg viewBox="0 0 24 24" {...iconProps}>
        <polygon points="3 6 9 4 15 6 21 4 21 18 15 20 9 18 3 20 3 6" />
        <line x1="9" y1="4" x2="9" y2="18" />
        <line x1="15" y1="6" x2="15" y2="20" />
      </svg>
    );

    const downloadIcon = (
      <svg viewBox="0 0 24 24" {...iconProps}>
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
    );

    const {interviewId} = useParams();

    useEffect(() => {
        if(interviewId ){
            getReportById(interviewId)
        }
    },[interviewId])

    useEffect(() => {
        if (!resumeFeedback.message) return;

        const timer = window.setTimeout(() => {
            setResumeFeedback({ message: '', type: 'info' });
        }, 3200);

        return () => window.clearTimeout(timer);
    }, [resumeFeedback.message]);

    const handleDownloadResume = async () => {
        if (!interviewId) {
            setResumeFeedback({ message: 'Resume is not available yet. Please try again.', type: 'error' });
            return;
        }

        setIsGeneratingResume(true);
        setResumeFeedback({ message: '', type: 'info' });

        try {
            await getResumePdf({ interviewId });
            setResumeFeedback({ message: 'Resume downloaded successfully.', type: 'success' });
        } catch (error) {
            console.error(error);
            setResumeFeedback({ message: 'We could not generate the resume right now. Please try again.', type: 'error' });
        } finally {
            setIsGeneratingResume(false);
        }
    };

    const renderResumeAction = () => (
      <div className="resume-action-wrapper">
        <button
          type="button"
          className={`resume-download-btn ${isGeneratingResume ? 'is-loading' : ''}`}
          onClick={handleDownloadResume}
          disabled={isGeneratingResume}
          aria-busy={isGeneratingResume}
        >
          {isGeneratingResume ? (
            <>
              <span className="resume-download-spinner" aria-hidden="true" />
              <span>Generating Resume...</span>
            </>
          ) : (
            <>
              <span className="resume-download-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
              </span>
              <span>Download ATS Resume</span>
            </>
          )}
        </button>

        {resumeFeedback.message && (
          <div className={`resume-feedback ${resumeFeedback.type}`} role="status">
            {resumeFeedback.message}
          </div>
        )}
      </div>
    );

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
            <div className="nav-footer">
              {renderResumeAction()}
            </div>
          </aside>

          <section className="main-panel">
            {activeSection === 'technical' && (
              <>
                <header className="main-header">
                  <div>
                    <h1 className="section-title">
                      <span className="section-title__icon">{codeIcon}</span>
                      Technical Questions
                    </h1>
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
                  <h2 className="section-title">
                    <span className="section-title__icon">{userIcon}</span>
                    Behavioral Questions
                  </h2>
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
                  <h2 className="section-title">
                    <span className="section-title__icon">{mapIcon}</span>
                    Learning Roadmap
                  </h2>
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
            <LogoutButton />
          </aside>
        </div>
      </div>
    </main>
  )
}

export default Interview
