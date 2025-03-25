import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { ToastContainer, toast } from 'react-toastify';
import { UploadCloud, FileText, Clipboard, ChevronRight, X, Rocket, BookOpen, Briefcase, Star, Zap } from 'lucide-react';
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
            className="bg-white/5 p-6 rounded-2xl backdrop-blur-lg border border-white/10 hover:border-white/20 transition-all"
        >
            <div className="w-32 h-32 mx-auto">
                <CircularProgressbar
                    value={value}
                    text={`${Math.round(value)}%`}
                    styles={{
                        path: { stroke: color },
                        text: { fill: color, fontSize: '24px' },
                        trail: { stroke: '#ffffff10' }
                    }}
                />
            </div>
            <h3 className="text-white text-center mt-4 text-xl font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {title}
            </h3>
        </motion.div>
    );

    const SkillList = ({ title, skills, color }) => (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white/5 p-6 rounded-2xl backdrop-blur-lg border border-white/10"
        >
            <div className="flex items-center mb-4 space-x-2">
                <Zap className="w-5 h-5 text-purple-400" />
                <h3 className="text-lg font-semibold text-white">{title}</h3>
            </div>
            <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                    <motion.span
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        className="px-3 py-1.5 rounded-full text-sm bg-white/5 backdrop-blur-sm border border-white/10"
                        style={{ color }}
                    >
                        {skill}
                    </motion.span>
                ))}
            </div>
        </motion.div>
    );

    const SummarySection = ({ title, content }) => (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white/5 p-6 rounded-2xl backdrop-blur-lg border border-white/10"
        >
            <div className="flex items-center mb-3 space-x-2">
                <BookOpen className="w-5 h-5 text-blue-400" />
                <h3 className="text-lg font-semibold text-white">{title}</h3>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">{content}</p>
        </motion.div>
    );

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-950 py-12 px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-7xl mx-auto"
                >
                    <div className="text-center mb-12">
                        <motion.h1
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-4xl md:text-5xl font-bold mb-4"
                        >
                            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                                AI-Powered
                            </span>{' '}
                            Resume Analysis
                        </motion.h1>
                        <p className="text-gray-400 max-w-xl mx-auto">
                            Get instant feedback on your resume's compatibility with any job description using advanced AI analysis
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8">
                        {/* Upload Section */}
                        <motion.div
                            initial={{ x: -50 }}
                            animate={{ x: 0 }}
                            className="bg-white/5 backdrop-blur-lg p-8 rounded-3xl border border-white/10"
                        >
                            <h2 className="text-2xl font-semibold text-white mb-8 flex items-center space-x-2">
                                <Briefcase className="w-6 h-6 text-purple-400" />
                                <span>Upload Documents</span>
                            </h2>

                            {/* Resume Upload */}
                            <div className="mb-8">
                                <label className="block text-gray-300 mb-4">Upload Resume</label>
                                <label className="flex flex-col items-center justify-center h-40 border-2 border-dashed border-white/20 rounded-2xl cursor-pointer hover:border-purple-400/50 transition-all group">
                                    <input
                                        type="file"
                                        onChange={(e) => handleFileChange(e, 'resume')}
                                        className="hidden"
                                        accept=".pdf,.doc,.docx"
                                    />
                                    <div className="text-center space-y-2">
                                        <UploadCloud className="w-12 h-12 mx-auto text-gray-400 group-hover:text-purple-400 transition-colors" />
                                        <p className="text-gray-400 group-hover:text-white transition-colors">
                                            {resumeFile ? resumeFile.name : 'Drag & Drop or Browse Files'}
                                        </p>
                                        <p className="text-sm text-gray-500">PDF, DOC, DOCX (Max 5MB)</p>
                                    </div>
                                </label>
                            </div>

                            {/* JD Input Toggle */}
                            <div className="flex gap-4 mb-8">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    onClick={() => setInputMode('text')}
                                    className={`flex-1 py-3 rounded-xl transition-all ${inputMode === 'text'
                                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                                            : 'bg-white/5 text-gray-400 hover:bg-white/10'
                                        }`}
                                >
                                    <Clipboard className="w-5 h-5 inline-block mr-2" />
                                    Paste Text
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    onClick={() => setInputMode('file')}
                                    className={`flex-1 py-3 rounded-xl transition-all ${inputMode === 'file'
                                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                                            : 'bg-white/5 text-gray-400 hover:bg-white/10'
                                        }`}
                                >
                                    <FileText className="w-5 h-5 inline-block mr-2" />
                                    Upload JD
                                </motion.button>
                            </div>

                            {/* JD Input Area */}
                            {inputMode === 'text' ? (
                                <textarea
                                    value={jdText}
                                    onChange={(e) => setJdText(e.target.value)}
                                    placeholder="Paste job description here..."
                                    className="w-full h-48 p-4 bg-white/5 border border-white/10 rounded-xl text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/30"
                                />
                            ) : (
                                <div
                                    onDragEnter={handleDrag}
                                    onDragLeave={handleDrag}
                                    onDragOver={handleDrag}
                                    onDrop={handleDrop}
                                    className={`border-2 border-dashed rounded-xl p-6 text-center transition-all ${dragActive ? 'border-purple-400/50 bg-white/5' : 'border-white/10'
                                        }`}
                                >
                                    <input
                                        type="file"
                                        onChange={(e) => handleFileChange(e, 'jd')}
                                        className="hidden"
                                        id="jd-upload"
                                        accept=".pdf,.doc,.docx"
                                    />
                                    <label htmlFor="jd-upload" className="cursor-pointer space-y-4">
                                        <UploadCloud className="w-12 h-12 mx-auto text-gray-400" />
                                        <p className="text-gray-400">
                                            {jdFile ? jdFile.name : 'Drag & Drop JD File'}
                                        </p>
                                    </label>
                                </div>
                            )}

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleSubmit}
                                disabled={isLoading}
                                className="w-full mt-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white py-4 rounded-xl font-semibold text-lg transition-all disabled:opacity-50"
                            >
                                {isLoading ? (
                                    <span className="flex items-center justify-center space-x-2">
                                        <span className="w-4 h-4 border-2 border-white/50 border-t-transparent rounded-full animate-spin" />
                                        Analyzing...
                                    </span>
                                ) : (
                                    <span className="flex items-center justify-center space-x-2">
                                        <Rocket className="w-5 h-5" />
                                        Start Analysis
                                    </span>
                                )}
                            </motion.button>
                        </motion.div>

                        {/* Results Section */}
                        {results && (
                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="bg-white/5 backdrop-blur-lg p-8 rounded-3xl border border-white/10 space-y-10"
                            >
                                <div className="flex justify-between items-center mb-8">
                                    <h2 className="text-2xl font-semibold text-white flex items-center space-x-2">
                                        <Star className="w-6 h-6 text-yellow-400" />
                                        <span>Analysis Results</span>
                                    </h2>
                                    <button
                                        onClick={() => setResults(null)}
                                        className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                                    >
                                        <X className="w-5 h-5 text-gray-400" />
                                    </button>
                                </div>

                                {/* Scores Grid */}
                                <div className="grid grid-cols-2 gap-6">
                                    <ScoreCard
                                        title="Overall Match"
                                        value={results.overall_match_percentage}
                                        color="#818cf8"
                                    />
                                    <ScoreCard
                                        title="Skills Match"
                                        value={results.skills_match_percentage}
                                        color="#a855f7"
                                    />
                                </div>

                                {/* Skills Analysis */}
                                <div className="space-y-6">
                                    {results.matching_skills?.length > 0 && (
                                        <SkillList
                                            title="Matched Skills"
                                            skills={results.matching_skills}
                                            color="#4ade80"
                                        />
                                    )}
                                    {results.missing_skills?.length > 0 && (
                                        <SkillList
                                            title="Recommended Skills"
                                            skills={results.missing_skills}
                                            color="#f87171"
                                        />
                                    )}
                                </div>

                                {/* Summaries */}
                                <div className="grid md:grid-cols-2 gap-6">
                                    {results.job_description_summary && (
                                        <SummarySection
                                            title="JD Breakdown"
                                            content={results.job_description_summary}
                                        />
                                    )}
                                    {results.resume_summary && (
                                        <SummarySection
                                            title="Resume Insights"
                                            content={results.resume_summary}
                                        />
                                    )}
                                </div>

                                {/* Recommendations */}
                                {results.recommendations?.length > 0 && (
                                    <div className="space-y-4">
                                        <h3 className="text-xl font-semibold text-white flex items-center space-x-2">
                                            <ChevronRight className="w-5 h-5 text-purple-400" />
                                            <span>Optimization Tips</span>
                                        </h3>
                                        <ul className="space-y-3">
                                            {results.recommendations.map((rec, index) => (
                                                <motion.li
                                                    key={index}
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{ delay: index * 0.1 }}
                                                    className="flex items-start p-4 bg-white/5 rounded-xl border border-white/10"
                                                >
                                                    <span className="text-purple-400 mr-2">▹</span>
                                                    <span className="text-gray-300">{rec}</span>
                                                </motion.li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
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
                toastStyle={{
                    background: 'rgba(30, 41, 59, 0.95)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: '#fff',
                    backdropFilter: 'blur(10px)'
                }}
                progressStyle={{ background: 'linear-gradient(to right, #6366f1, #8b5cf6)' }}
            />
        </>
    );
};

export default ResumeAnalysis;