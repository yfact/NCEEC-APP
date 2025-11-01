import React, { useState, useEffect } from "react";
import {
  BookOpen,
  Award,
  TrendingUp,
  CheckCircle,
  Lock,
  Play,
  Trophy,
  Target,
} from "lucide-react";

export default function CapacityBuilding() {
  const [completedCourses, setCompletedCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [showQuizResult, setShowQuizResult] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  // Load progress from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("nceec_training_progress");
    if (saved) {
      setCompletedCourses(JSON.parse(saved));
    }
  }, []);

  // Training modules database
  const trainingModules = [
    {
      id: 1,
      title: "Introduction to Energy Efficiency",
      level: "Beginner",
      duration: "2 hours",
      description:
        "Learn the fundamentals of energy efficiency and conservation",
      locked: false,
      topics: [
        "What is Energy Efficiency?",
        "Energy vs Power - Understanding the Difference",
        "Common Energy Waste Sources",
        "Benefits of Energy Efficiency",
        "Nigerian Energy Landscape",
      ],
      quiz: [
        {
          question: "What is the unit of electrical energy?",
          options: [
            "Watts (W)",
            "Kilowatt-hours (kWh)",
            "Joules (J)",
            "Volts (V)",
          ],
          correct: 1,
        },
        {
          question: "Which typically consumes more energy in a building?",
          options: [
            "Lighting",
            "HVAC Systems",
            "Small Appliances",
            "Computers",
          ],
          correct: 1,
        },
        {
          question: "Energy efficiency means:",
          options: [
            "Using less energy",
            "Using energy wisely to get the same output",
            "Avoiding energy use completely",
            "Using renewable energy only",
          ],
          correct: 1,
        },
      ],
      certificate: "Energy Efficiency Fundamentals",
    },
    {
      id: 2,
      title: "Energy Auditing Techniques",
      level: "Intermediate",
      duration: "4 hours",
      description:
        "Master the techniques of conducting comprehensive energy audits",
      locked: false,
      topics: [
        "Types of Energy Audits (Walk-through, Standard, Detailed)",
        "Data Collection Methods",
        "Equipment Inventory Techniques",
        "Energy Consumption Analysis",
        "Identifying Energy Saving Opportunities",
        "Report Writing and Recommendations",
      ],
      quiz: [
        {
          question: "What is the first step in an energy audit?",
          options: [
            "Equipment measurement",
            "Preliminary data collection and facility walkthrough",
            "Writing recommendations",
            "Installing monitoring equipment",
          ],
          correct: 1,
        },
        {
          question:
            "Which tool is essential for measuring electrical parameters?",
          options: [
            "Thermometer",
            "Power Analyzer/Meter",
            "Ruler",
            "Calculator",
          ],
          correct: 1,
        },
        {
          question: "What is a baseline in energy auditing?",
          options: [
            "The minimum energy usage",
            "Current energy consumption pattern for comparison",
            "Maximum allowable energy use",
            "Energy target for next year",
          ],
          correct: 1,
        },
      ],
      certificate: "Certified Energy Auditor",
    },
    {
      id: 3,
      title: "HVAC Systems Optimization",
      level: "Advanced",
      duration: "3 hours",
      description:
        "Learn advanced techniques for optimizing HVAC system performance",
      locked: true,
      requiresCourse: 2,
      topics: [
        "HVAC System Components and Operations",
        "Cooling Load Calculations",
        "Energy Efficiency Metrics (EER, SEER, COP)",
        "Maintenance Best Practices",
        "Control Systems and Automation",
        "Retrofit Options for Old Systems",
      ],
      quiz: [
        {
          question: "What does EER stand for?",
          options: [
            "Energy Efficiency Rating",
            "Energy Efficiency Ratio",
            "Electrical Efficiency Range",
            "Environmental Efficiency Report",
          ],
          correct: 1,
        },
        {
          question:
            "Optimal thermostat setting for energy efficiency in Nigeria?",
          options: ["18-20°C", "21-23°C", "24-26°C", "27-29°C"],
          correct: 2,
        },
        {
          question: "How often should AC filters be cleaned?",
          options: ["Every 6 months", "Monthly", "Yearly", "Only when damaged"],
          correct: 1,
        },
      ],
      certificate: "HVAC Optimization Specialist",
    },
    {
      id: 4,
      title: "Lighting Systems and Controls",
      level: "Intermediate",
      duration: "2.5 hours",
      description: "Optimize lighting for energy efficiency and comfort",
      locked: true,
      requiresCourse: 1,
      topics: [
        "Lighting Technologies (LED, CFL, Incandescent)",
        "Lighting Design Principles",
        "Lux Levels and Standards",
        "Daylight Harvesting",
        "Occupancy Sensors and Controls",
        "ROI Calculations for LED Retrofits",
      ],
      quiz: [
        {
          question: "Which lighting technology is most energy-efficient?",
          options: ["Incandescent", "CFL", "LED", "Halogen"],
          correct: 2,
        },
        {
          question: "What is the typical lifespan of an LED bulb?",
          options: [
            "1,000 hours",
            "10,000 hours",
            "25,000-50,000 hours",
            "100,000 hours",
          ],
          correct: 2,
        },
        {
          question: "Occupancy sensors can save up to:",
          options: ["10%", "30%", "50%", "80%"],
          correct: 1,
        },
      ],
      certificate: "Lighting Efficiency Expert",
    },
    {
      id: 5,
      title: "Renewable Energy Integration",
      level: "Advanced",
      duration: "4 hours",
      description: "Integrate renewable energy sources into existing systems",
      locked: true,
      requiresCourse: 2,
      topics: [
        "Solar PV System Design",
        "Grid-Tied vs Off-Grid Systems",
        "Battery Storage Systems",
        "Hybrid Systems Design",
        "Financial Analysis and ROI",
        "Installation and Maintenance",
      ],
      quiz: [
        {
          question: "What is the peak sun hours average in Nigeria?",
          options: ["2-3 hours", "4-6 hours", "7-9 hours", "10-12 hours"],
          correct: 1,
        },
        {
          question: "What does PV stand for?",
          options: [
            "Power Voltage",
            "Photovoltaic",
            "Peak Value",
            "Primary Voltage",
          ],
          correct: 1,
        },
        {
          question: "Solar panel efficiency typically ranges from:",
          options: ["5-10%", "15-22%", "30-40%", "50-60%"],
          correct: 1,
        },
      ],
      certificate: "Renewable Energy Specialist",
    },
    {
      id: 6,
      title: "Energy Management Systems",
      level: "Advanced",
      duration: "3 hours",
      description:
        "Implement and manage comprehensive energy management systems",
      locked: true,
      requiresCourse: 2,
      topics: [
        "ISO 50001 Energy Management Standard",
        "Energy Policy Development",
        "Setting Energy Targets and KPIs",
        "Monitoring and Verification (M&V)",
        "Continuous Improvement Processes",
        "Staff Engagement and Training",
      ],
      quiz: [
        {
          question: "ISO 50001 is a standard for:",
          options: [
            "Quality Management",
            "Energy Management Systems",
            "Environmental Management",
            "Safety Management",
          ],
          correct: 1,
        },
        {
          question: "What is a KPI in energy management?",
          options: [
            "Kilowatt Performance Indicator",
            "Key Performance Indicator",
            "Kinetic Power Index",
            "Knowledge Performance Indicator",
          ],
          correct: 1,
        },
        {
          question: "The PDCA cycle stands for:",
          options: [
            "Plan-Do-Check-Act",
            "Prepare-Deliver-Control-Assess",
            "Predict-Deploy-Calculate-Adjust",
            "Plan-Deploy-Check-Analyze",
          ],
          correct: 0,
        },
      ],
      certificate: "Energy Management Professional",
    },
  ];

  // Achievements/Badges system
  const achievements = [
    {
      id: 1,
      title: "First Steps",
      description: "Complete your first training module",
      icon: "🎯",
      unlocked: completedCourses.length >= 1,
    },
    {
      id: 2,
      title: "Knowledge Seeker",
      description: "Complete 3 training modules",
      icon: "📚",
      unlocked: completedCourses.length >= 3,
    },
    {
      id: 3,
      title: "Energy Expert",
      description: "Complete all training modules",
      icon: "🏆",
      unlocked: completedCourses.length >= trainingModules.length,
    },
    {
      id: 4,
      title: "Perfect Score",
      description: "Get 100% on any quiz",
      icon: "⭐",
      unlocked: localStorage.getItem("nceec_perfect_score") === "true",
    },
    {
      id: 5,
      title: "Dedicated Learner",
      description: "Complete 2 advanced modules",
      icon: "💎",
      unlocked:
        completedCourses.filter((id) => {
          const course = trainingModules.find((m) => m.id === id);
          return course && course.level === "Advanced";
        }).length >= 2,
    },
  ];

  const isCourseUnlocked = (course) => {
    if (!course.locked) return true;
    if (course.requiresCourse) {
      return completedCourses.includes(course.requiresCourse);
    }
    return false;
  };

  const handleStartCourse = (course) => {
    if (!isCourseUnlocked(course)) return;
    setSelectedCourse(course);
    setQuizAnswers({});
    setShowQuizResult(false);
  };

  const handleQuizSubmit = () => {
    if (!selectedCourse) return;

    let correct = 0;
    selectedCourse.quiz.forEach((q, index) => {
      if (quizAnswers[index] === q.correct) {
        correct++;
      }
    });

    const score = Math.round((correct / selectedCourse.quiz.length) * 100);
    setQuizScore(score);
    setShowQuizResult(true);

    // If passed (70% or above), mark as completed
    if (score >= 70) {
      if (!completedCourses.includes(selectedCourse.id)) {
        const updated = [...completedCourses, selectedCourse.id];
        setCompletedCourses(updated);
        localStorage.setItem(
          "nceec_training_progress",
          JSON.stringify(updated)
        );
      }
      if (score === 100) {
        localStorage.setItem("nceec_perfect_score", "true");
      }
    }
  };

  const calculateProgress = () => {
    return Math.round((completedCourses.length / trainingModules.length) * 100);
  };

  const levelColors = {
    Beginner:
      "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    Intermediate:
      "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
    Advanced:
      "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Capacity Building & Training
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Enhance your skills in energy efficiency and conservation
        </p>
      </div>

      {/* Progress Overview */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            Your Progress
          </h2>
          <div className="text-right">
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
              {calculateProgress()}%
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500">Complete</p>
          </div>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-4">
          <div
            className="bg-blue-600 h-3 rounded-full transition-all duration-500"
            style={{ width: `${calculateProgress()}%` }}
          ></div>
        </div>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {completedCourses.length}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Completed
            </p>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {trainingModules.length - completedCourses.length}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Remaining
            </p>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {achievements.filter((a) => a.unlocked).length}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Achievements
            </p>
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div className="card p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Trophy className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
          Achievements
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`p-4 rounded-lg border-2 ${
                achievement.unlocked
                  ? "border-yellow-400 bg-yellow-50 dark:bg-yellow-900/20"
                  : "border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 opacity-60"
              }`}
            >
              <div className="text-4xl mb-2">{achievement.icon}</div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                {achievement.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {achievement.description}
              </p>
              {achievement.unlocked && (
                <div className="mt-2 flex items-center gap-1 text-yellow-600 dark:text-yellow-400">
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-xs font-medium">Unlocked!</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Training Modules */}
      <div className="card p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          Training Modules
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {trainingModules.map((module) => {
            const isUnlocked = isCourseUnlocked(module);
            const isCompleted = completedCourses.includes(module.id);

            return (
              <div
                key={module.id}
                className={`border-2 rounded-lg p-4 ${
                  isCompleted
                    ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                    : isUnlocked
                    ? "border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400"
                    : "border-gray-200 dark:border-gray-700 opacity-60"
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          levelColors[module.level]
                        }`}
                      >
                        {module.level}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-500">
                        {module.duration}
                      </span>
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                      {module.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {module.description}
                    </p>
                  </div>
                  <div>
                    {isCompleted ? (
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    ) : !isUnlocked ? (
                      <Lock className="w-6 h-6 text-gray-400" />
                    ) : null}
                  </div>
                </div>

                <div className="mb-3">
                  <p className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Topics Covered:
                  </p>
                  <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                    {module.topics.slice(0, 3).map((topic, index) => (
                      <li key={index}>• {topic}</li>
                    ))}
                    {module.topics.length > 3 && (
                      <li className="text-blue-600 dark:text-blue-400">
                        + {module.topics.length - 3} more topics
                      </li>
                    )}
                  </ul>
                </div>

                {!isUnlocked && module.requiresCourse && (
                  <p className="text-xs text-orange-600 dark:text-orange-400 mb-3">
                    🔒 Complete "
                    {
                      trainingModules.find(
                        (m) => m.id === module.requiresCourse
                      )?.title
                    }
                    " to unlock
                  </p>
                )}

                <button
                  onClick={() => handleStartCourse(module)}
                  disabled={!isUnlocked}
                  className={`w-full px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
                    isUnlocked
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  {isCompleted ? (
                    <>
                      <Award className="w-4 h-4" />
                      Review Course
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4" />
                      {isUnlocked ? "Start Course" : "Locked"}
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Course Modal */}
      {selectedCourse && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto"
          onClick={() => setSelectedCourse(null)}
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 my-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {selectedCourse.title}
                </h2>
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      levelColors[selectedCourse.level]
                    }`}
                  >
                    {selectedCourse.level}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-500">
                    {selectedCourse.duration}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedCourse(null)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-2xl"
              >
                ✕
              </button>
            </div>

            {!showQuizResult ? (
              <>
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                    Course Topics:
                  </h3>
                  <ul className="space-y-2">
                    {selectedCourse.topics.map((topic, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-2 text-gray-700 dark:text-gray-300"
                      >
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                    Assessment Quiz:
                  </h3>
                  <div className="space-y-4">
                    {selectedCourse.quiz.map((question, qIndex) => (
                      <div
                        key={qIndex}
                        className="p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50"
                      >
                        <p className="font-medium text-gray-900 dark:text-white mb-3">
                          {qIndex + 1}. {question.question}
                        </p>
                        <div className="space-y-2">
                          {question.options.map((option, oIndex) => (
                            <label
                              key={oIndex}
                              className="flex items-center gap-2 p-2 rounded cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600/50"
                            >
                              <input
                                type="radio"
                                name={`question-${qIndex}`}
                                value={oIndex}
                                checked={quizAnswers[qIndex] === oIndex}
                                onChange={() =>
                                  setQuizAnswers({
                                    ...quizAnswers,
                                    [qIndex]: oIndex,
                                  })
                                }
                                className="w-4 h-4"
                              />
                              <span className="text-gray-700 dark:text-gray-300">
                                {option}
                              </span>
                            </label>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleQuizSubmit}
                  disabled={
                    Object.keys(quizAnswers).length < selectedCourse.quiz.length
                  }
                  className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors"
                >
                  Submit Quiz
                </button>
              </>
            ) : (
              <div className="text-center py-8">
                <div
                  className={`text-6xl mb-4 ${
                    quizScore >= 70 ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {quizScore >= 70 ? "🎉" : "😔"}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Your Score: {quizScore}%
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  {quizScore >= 70
                    ? `Congratulations! You've earned the "${selectedCourse.certificate}" certificate!`
                    : "You need 70% to pass. Please review the material and try again."}
                </p>
                <div className="flex gap-3 justify-center">
                  <button
                    onClick={() => {
                      setShowQuizResult(false);
                      setQuizAnswers({});
                    }}
                    className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors"
                  >
                    Retake Quiz
                  </button>
                  <button
                    onClick={() => setSelectedCourse(null)}
                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
