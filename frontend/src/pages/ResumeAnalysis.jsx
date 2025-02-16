import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { ToastContainer, toast } from 'react-toastify';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';

const ResumeAnalysis = () => {
    const [resumeFile, setResumeFile] = useState(null);
    const [jdText, setJdText] = useState('');
    const [jdFile, setJdFile] = useState(null);
    const [results, setResults] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [inputMode, setInputMode] = useState('text');
    const [dragActive, setDragActive] = useState(false);

    const handleFileChange = (e, type) => {
        const file = e.target.files[0];
        if (type === 'resume') setResumeFile(file);
        if (type === 'jd') setJdFile(file);
    };

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        const file = e.dataTransfer.files[0];
        if (file.type === 'application/pdf' || file.type === 'application/msword' || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
            setJdFile(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setResults(null);

        const token = localStorage.getItem('token');
        if (!token) {
            toast.error('Please login to use this feature');
            setIsLoading(false);
            return;
        }

        if (!resumeFile) {
            toast.error('Please upload your resume');
            setIsLoading(false);
            return;
        }

        if (!jdText && !jdFile) {
            toast.error('Please provide job description');
            setIsLoading(false);
            return;
        }

        const formData = new FormData();
        formData.append('resume_pdf', resumeFile);
        if (jdFile) {
            formData.append('job_description_pdf', jdFile);
        } else {
            formData.append('job_description_text', jdText);
        }

        try {
            const response = await axios.post('http://localhost:8000/job_analysis/analyze_resume/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                },
            });

            if (response.data.success) {
                setResults({
                    ...response.data,
                    recommendations: response.data.recommendations || []
                });
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error analyzing resume');
        } finally {
            setIsLoading(false);
        }
    };

    const ScoreCard = ({ title, value, color }) => (
        <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="bg-white/10 p-6 rounded-xl backdrop-blur-sm border border-white/20"
        >
            <div className="w-32 h-32 mx-auto">
                <CircularProgressbar
                    value={value}
                    text={`${Math.round(value)}%`}
                    styles={{
                        path: { stroke: color },
                        text: { fill: color, fontSize: '24px' },
                        trail: { stroke: '#ffffff20' }
                    }}
                />
            </div>
            <h3 className="text-white text-center mt-4 text-xl font-semibold">{title}</h3>
        </motion.div>
    );

    const SkillList = ({ title, skills, color }) => (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/20"
        >
            <h3 className="text-lg font-semibold text-white mb-3">{title}</h3>
            <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                    <span
                        key={index}
                        className="px-3 py-1 rounded-full text-sm"
                        style={{ backgroundColor: color + '30', color: 'white' }}
                    >
                        {skill}
                    </span>
                ))}
            </div>
        </motion.div>
    );

    const SummarySection = ({ title, content }) => (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/20"
        >
            <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
            <p className="text-white/80 text-sm leading-relaxed">{content}</p>
        </motion.div>
    );

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gradient-to-r from-[#ffcc80] to-[#00796b] py-12 px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-7xl mx-auto"
                >
                    <h1 className="text-4xl font-bold text-white text-center mb-8">
                        Resume Analysis
                    </h1>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Upload Section */}
                        <motion.div
                            initial={{ x: -50 }}
                            animate={{ x: 0 }}
                            className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-white/20"
                        >
                            <h2 className="text-2xl font-semibold text-white mb-6">Upload Documents</h2>

                            {/* Resume Upload */}
                            <div className="mb-8">
                                <label className="block text-white mb-4">Upload Resume (PDF/DOCX)</label>
                                <label className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-white/30 rounded-xl cursor-pointer hover:border-white/50 transition-colors">
                                    <input
                                        type="file"
                                        onChange={(e) => handleFileChange(e, 'resume')}
                                        className="hidden"
                                        accept=".pdf,.doc,.docx"
                                    />
                                    <div className="text-white text-center">
                                        <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                        </svg>
                                        {resumeFile ? resumeFile.name : 'Click or drag to upload'}
                                    </div>
                                </label>
                            </div>

                            {/* JD Input Toggle */}
                            <div className="flex gap-4 mb-6">
                                <button
                                    type="button"
                                    onClick={() => setInputMode('text')}
                                    className={`px-4 py-2 rounded-lg ${inputMode === 'text' ? 'bg-[#00796b] text-white' : 'bg-white/10 text-white/70'}`}
                                >
                                    Enter Text
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setInputMode('file')}
                                    className={`px-4 py-2 rounded-lg ${inputMode === 'file' ? 'bg-[#00796b] text-white' : 'bg-white/10 text-white/70'}`}
                                >
                                    Upload JD
                                </button>
                            </div>

                            {/* JD Input Area */}
                            {inputMode === 'text' ? (
                                <textarea
                                    value={jdText}
                                    onChange={(e) => setJdText(e.target.value)}
                                    placeholder="Paste job description here..."
                                    className="w-full h-48 p-4 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#00796b]"
                                />
                            ) : (
                                <div
                                    onDragEnter={handleDrag}
                                    onDragLeave={handleDrag}
                                    onDragOver={handleDrag}
                                    onDrop={handleDrop}
                                    className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${dragActive ? 'border-[#00796b] bg-white/10' : 'border-white/20'}`}
                                >
                                    <input
                                        type="file"
                                        onChange={(e) => handleFileChange(e, 'jd')}
                                        className="hidden"
                                        id="jd-upload"
                                        accept=".pdf,.doc,.docx"
                                    />
                                    <label htmlFor="jd-upload" className="cursor-pointer">
                                        <div className="text-white">
                                            <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                            </svg>
                                            {jdFile ? jdFile.name : 'Drag & Drop or Click to Upload'}
                                        </div>
                                    </label>
                                </div>
                            )}

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleSubmit}
                                disabled={isLoading}
                                className="w-full mt-6 bg-[#00796b] hover:bg-[#005f56] text-white py-3 rounded-lg font-semibold text-lg transition-all disabled:opacity-50"
                            >
                                {isLoading ? 'Analyzing...' : 'Analyze Resume'}
                            </motion.button>
                        </motion.div>

                        {/* Results Section */}
                        {results && (
                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-white/20"
                            >
                                <h2 className="text-2xl font-semibold text-white mb-8">Analysis Results</h2>
                                <div className="space-y-8">
                                    {/* Scores Grid */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <ScoreCard
                                            title="Overall Match"
                                            value={results.overall_match_percentage}
                                            color="#ffcc80"
                                        />
                                        <ScoreCard
                                            title="Experience Match"
                                            value={results.experience_match_percentage}
                                            color="#4CAF50"
                                        />
                                        <ScoreCard
                                            title="Skills Match"
                                            value={results.skills_match_percentage}
                                            color="#2196F3"
                                        />
                                        <ScoreCard
                                            title="Education Match"
                                            value={results.education_match_percentage}
                                            color="#9C27B0"
                                        />
                                    </div>

                                    {/* Skills Analysis */}
                                    <div className="grid md:grid-cols-2 gap-6">
                                        {results.matching_skills?.length > 0 && (
                                            <SkillList
                                                title="Matching Skills"
                                                skills={results.matching_skills}
                                                color="#4CAF50"
                                            />
                                        )}
                                        {results.missing_skills?.length > 0 && (
                                            <SkillList
                                                title="Missing Skills"
                                                skills={results.missing_skills}
                                                color="#f44336"
                                            />
                                        )}
                                    </div>

                                    {/* Summaries */}
                                    <div className="grid md:grid-cols-2 gap-6">
                                        {results.job_description_summary && (
                                            <SummarySection
                                                title="Job Description Summary"
                                                content={results.job_description_summary}
                                            />
                                        )}
                                        {results.resume_summary && (
                                            <SummarySection
                                                title="Resume Summary"
                                                content={results.resume_summary}
                                            />
                                        )}
                                    </div>

                                    {/* Analysis Details */}
                                    {results.analysis_details && (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/20"
                                        >
                                            <h3 className="text-lg font-semibold text-white mb-2">Detailed Analysis</h3>
                                            <p className="text-white/80 text-sm">{results.analysis_details}</p>
                                        </motion.div>
                                    )}

                                    {/* Recommendations */}
                                    {results.recommendations?.length > 0 && (
                                        <div className="space-y-4">
                                            <h3 className="text-xl font-semibold text-white">Recommendations</h3>
                                            <ul className="space-y-2">
                                                {results.recommendations.map((rec, index) => (
                                                    <motion.li
                                                        key={index}
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        transition={{ delay: index * 0.1 }}
                                                        className="flex items-start text-white"
                                                    >
                                                        <span className="mr-2">•</span>
                                                        {rec}
                                                    </motion.li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </div>
                </motion.div>
            </div>
            <Footer />
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                toastStyle={{ backgroundColor: '#00796b', color: 'white' }}
            />
        </>
    );
};

export default ResumeAnalysis;