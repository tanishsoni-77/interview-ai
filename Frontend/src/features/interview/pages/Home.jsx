import React ,{useState, useRef}from 'react'
import "../style/home.scss"
import { useInterview } from '../hooks/useInterview.js'
import { useNavigate } from 'react-router'

const Home = () => {

    const { loading ,generateReport} = useInterview()
    const[jobDescription, setJobDescription] = useState("")
    const[selfDescription, setSelfDescription] = useState("")
    const resumeInputRef = useRef ()

    const navigate = useNavigate()

    const handleGenerateReport = async () => {
        const resumeFile = resumeInputRef.current.files[0]
        const data = await generateReport({jobDescription, selfDescription, resumeFile})
        navigate(`/interview/${data._id}`)
    }

    if(loading){
        return <div className="loading">Generating your interview strategy...</div>
    }


    return (
        <main className="home">
            <div className="container">
                <h1 className="title">Create Your Custom <span className="accent">Interview Plan</span></h1>

                <section className="card">
                    <div className="left-panel">
                        <div className="panel-header">
                            <h2>Target Job Description</h2>
                            <span className="badge">REQUIRED</span>
                        </div>
                        <textarea
                        onChange={(e)=> {setJobDescription(e.target.value)}}
                            id="jobDescription"
                            name="jobDescription"
                            className="job-description"
                            placeholder="Paste the full job description here... e.g. 'Senior Frontend Engineer at Google requires proficiency in React, TypeScript, and large-scale system design...'"
                            maxLength={5000}
                        />
                        <div className="meta-row">
                            <small className="hint">AI-Powered Strategy Generation · Approx 30s</small>
                            <small className="counter">0 / 5000 chars</small>
                        </div>
                    </div>

                    <div className="right-panel">
                        <div className="profile-card">
                            <div className="profile-header">
                                <h3>Your Profile</h3>
                                <span className="small-badge">BEST RESULTS</span>
                            </div>

                            <label className="upload-area" htmlFor="resume">
                                <div className="upload-inner">
                                    <div className="upload-icon">📎</div>
                                    <p className="upload-text">Click to upload or drag & drop</p>
                                    <p className="upload-sub">PDF (Max 3MB)</p>
                                </div>
                            </label>
                            <input ref={resumeInputRef} id="resume" name="resume" type="file" accept=".pdf" hidden />

                            <div className="or-divider">OR</div>

                            <label htmlFor="selfDescription" className="sr-only">Quick Self-Description</label>
                            <textarea
                            onChange={(e)=> {setSelfDescription(e.target.value)}}

                                id="selfDescription"
                                name="selfDescription"
                                className="self-description"
                                placeholder="Briefly describe your experience, key skills, and years of experience if you don't have a resume handy..."
                            />

                            <div className="note">
                                Either a <strong>Resume</strong> or a <strong>Self Description</strong> is required to generate a personalized plan.
                            </div>

                            <div className="actions">
                                <button
                                onClick={handleGenerateReport}
                                 className="generate-btn">Generate My Interview Strategy</button>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    )
}

export default Home