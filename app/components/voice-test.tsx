"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Mic, MicOff, Play, Square, TestTube, CheckCircle, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { Badge } from "@/components/ui/badge"

interface TestResult {
  name: string
  status: "pending" | "success" | "error"
  message: string
}

export function VoiceTest() {
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [testResults, setTestResults] = useState<TestResult[]>([])
  const [isRunningTests, setIsRunningTests] = useState(false)
  const recognitionRef = useRef<any>(null)
  const synthesisRef = useRef<SpeechSynthesis | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Initialize speech synthesis
      if ("speechSynthesis" in window) {
        synthesisRef.current = window.speechSynthesis
      }

      // Initialize speech recognition
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      if (SpeechRecognition) {
        recognitionRef.current = SpeechRecognition
      }
    }

    return () => {
      stopListening()
      stopSpeaking()
    }
  }, [])

  const updateTestResult = (name: string, status: "success" | "error", message: string) => {
    setTestResults((prev) => prev.map((test) => (test.name === name ? { ...test, status, message } : test)))
  }

  const runVoiceTests = async () => {
    setIsRunningTests(true)
    setTestResults([
      { name: "Speech Recognition Support", status: "pending", message: "Checking..." },
      { name: "Speech Synthesis Support", status: "pending", message: "Checking..." },
      { name: "Voice Loading", status: "pending", message: "Checking..." },
      { name: "UK English Female Voice", status: "pending", message: "Checking..." },
      { name: "Telugu Voice Support", status: "pending", message: "Checking..." },
      { name: "Network Connectivity", status: "pending", message: "Checking..." },
    ])

    // Test 1: Speech Recognition Support
    try {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      if (SpeechRecognition) {
        updateTestResult("Speech Recognition Support", "success", "✓ Speech recognition is supported")
      } else {
        updateTestResult("Speech Recognition Support", "error", "✗ Speech recognition not supported in this browser")
      }
    } catch (error) {
      updateTestResult("Speech Recognition Support", "error", "✗ Error checking speech recognition")
    }

    // Test 2: Speech Synthesis Support
    try {
      if ("speechSynthesis" in window && synthesisRef.current) {
        updateTestResult("Speech Synthesis Support", "success", "✓ Speech synthesis is supported")
      } else {
        updateTestResult("Speech Synthesis Support", "error", "✗ Speech synthesis not supported")
      }
    } catch (error) {
      updateTestResult("Speech Synthesis Support", "error", "✗ Error checking speech synthesis")
    }

    // Test 3: Voice Loading
    try {
      if (synthesisRef.current) {
        const voices = synthesisRef.current.getVoices()
        if (voices.length > 0) {
          updateTestResult("Voice Loading", "success", `✓ ${voices.length} voices loaded`)
        } else {
          // Wait a bit and try again (voices might load asynchronously)
          await new Promise((resolve) => setTimeout(resolve, 1000))
          const voicesRetry = synthesisRef.current.getVoices()
          if (voicesRetry.length > 0) {
            updateTestResult("Voice Loading", "success", `✓ ${voicesRetry.length} voices loaded (after retry)`)
          } else {
            updateTestResult("Voice Loading", "error", "✗ No voices loaded")
          }
        }
      }
    } catch (error) {
      updateTestResult("Voice Loading", "error", "✗ Error loading voices")
    }

    // Test 4: UK English Female Voice
    try {
      if (synthesisRef.current) {
        const voices = synthesisRef.current.getVoices()
        const ukFemaleVoice = voices.find(
          (v) =>
            v.name.includes("Google UK English Female") ||
            (v.lang === "en-GB" && v.name.toLowerCase().includes("female")),
        )

        if (ukFemaleVoice) {
          updateTestResult("UK English Female Voice", "success", `✓ Found: ${ukFemaleVoice.name}`)
        } else {
          const anyUKVoice = voices.find((v) => v.lang === "en-GB")
          if (anyUKVoice) {
            updateTestResult("UK English Female Voice", "success", `✓ Fallback UK voice: ${anyUKVoice.name}`)
          } else {
            updateTestResult("UK English Female Voice", "error", "✗ No UK English voices found")
          }
        }
      }
    } catch (error) {
      updateTestResult("UK English Female Voice", "error", "✗ Error checking UK voice")
    }

    // Test 5: Telugu Voice Support
    try {
      if (synthesisRef.current) {
        const voices = synthesisRef.current.getVoices()
        const teluguVoice = voices.find((v) => v.lang === "te-IN" || v.lang.startsWith("te"))

        if (teluguVoice) {
          updateTestResult("Telugu Voice Support", "success", `✓ Found: ${teluguVoice.name}`)
        } else {
          updateTestResult("Telugu Voice Support", "error", "✗ No Telugu voices found (will use system default)")
        }
      }
    } catch (error) {
      updateTestResult("Telugu Voice Support", "error", "✗ Error checking Telugu voice")
    }

    // Test 6: Network Connectivity
    try {
      if (navigator.onLine) {
        updateTestResult("Network Connectivity", "success", "✓ Device is online")
      } else {
        updateTestResult("Network Connectivity", "error", "✗ Device is offline")
      }
    } catch (error) {
      updateTestResult("Network Connectivity", "error", "✗ Error checking network status")
    }

    setIsRunningTests(false)
    toast({
      title: "Voice Tests Complete",
      description: "Check the results below for any issues",
    })
  }

  const testSpeechRecognition = () => {
    if (!recognitionRef.current) {
      toast({
        title: "Speech Recognition Unavailable",
        description: "Speech recognition is not supported in this browser",
        variant: "destructive",
      })
      return
    }

    if (isListening) {
      stopListening()
      return
    }

    try {
      const instance = new recognitionRef.current()
      instance.continuous = false
      instance.interimResults = true
      instance.lang = "en-US"

      instance.onresult = (event: any) => {
        const result = event.results[event.results.length - 1]
        const transcriptText = result[0].transcript
        setTranscript(transcriptText)

        if (result.isFinal) {
          toast({
            title: "Speech Recognized",
            description: `You said: "${transcriptText}"`,
          })
          stopListening()
        }
      }

      instance.onerror = (event: any) => {
        console.error("Speech recognition error:", event.error)
        toast({
          title: "Recognition Error",
          description: `Error: ${event.error}`,
          variant: "destructive",
        })
        stopListening()
      }

      instance.onend = () => {
        setIsListening(false)
      }

      instance.start()
      setIsListening(true)
      setTranscript("")

      toast({
        title: "Listening Started",
        description: "Speak now to test speech recognition",
      })
    } catch (error) {
      console.error("Error starting speech recognition:", error)
      toast({
        title: "Recognition Error",
        description: "Could not start speech recognition",
        variant: "destructive",
      })
    }
  }

  const stopListening = () => {
    setIsListening(false)
  }

  const testSpeechSynthesis = () => {
    if (!synthesisRef.current) {
      toast({
        title: "Speech Synthesis Unavailable",
        description: "Speech synthesis is not supported in this browser",
        variant: "destructive",
      })
      return
    }

    if (isSpeaking) {
      stopSpeaking()
      return
    }

    try {
      const testText =
        "Hello! This is a test of the speech synthesis system. I am speaking in English with the UK female voice."

      const utterance = new SpeechSynthesisUtterance(testText)

      // Try to use UK English Female voice
      const voices = synthesisRef.current.getVoices()
      const ukFemaleVoice = voices.find(
        (v) =>
          v.name.includes("Google UK English Female") ||
          (v.lang === "en-GB" && v.name.toLowerCase().includes("female")),
      )

      if (ukFemaleVoice) {
        utterance.voice = ukFemaleVoice
        utterance.lang = ukFemaleVoice.lang
      } else {
        utterance.lang = "en-GB"
      }

      utterance.rate = 0.9
      utterance.pitch = 1.0

      utterance.onstart = () => {
        setIsSpeaking(true)
        toast({
          title: "Speech Started",
          description: ukFemaleVoice ? `Using: ${ukFemaleVoice.name}` : "Using default voice",
        })
      }

      utterance.onend = () => {
        setIsSpeaking(false)
        toast({
          title: "Speech Complete",
          description: "Text-to-speech test finished",
        })
      }

      utterance.onerror = (event) => {
        console.error("Speech synthesis error:", event)
        setIsSpeaking(false)
        toast({
          title: "Speech Error",
          description: "There was an error with speech synthesis",
          variant: "destructive",
        })
      }

      synthesisRef.current.speak(utterance)
    } catch (error) {
      console.error("Error in speech synthesis:", error)
      toast({
        title: "Speech Error",
        description: "Could not start speech synthesis",
        variant: "destructive",
      })
    }
  }

  const testTeluguSpeech = () => {
    if (!synthesisRef.current) {
      toast({
        title: "Speech Synthesis Unavailable",
        description: "Speech synthesis is not supported in this browser",
        variant: "destructive",
      })
      return
    }

    try {
      const teluguText = "నమస్కారం! ఇది తెలుగు వాయిస్ టెస్ట్. మీరు ఈ వాక్యం వింటున్నారా?"

      const utterance = new SpeechSynthesisUtterance(teluguText)
      utterance.lang = "te-IN"
      utterance.rate = 0.8
      utterance.pitch = 1.0

      // Try to find Telugu voice
      const voices = synthesisRef.current.getVoices()
      const teluguVoice = voices.find((v) => v.lang === "te-IN" || v.lang.startsWith("te"))

      if (teluguVoice) {
        utterance.voice = teluguVoice
      }

      utterance.onstart = () => {
        setIsSpeaking(true)
        toast({
          title: "Telugu Speech Started",
          description: teluguVoice ? `Using: ${teluguVoice.name}` : "Using system default for Telugu",
        })
      }

      utterance.onend = () => {
        setIsSpeaking(false)
        toast({
          title: "Telugu Speech Complete",
          description: "Telugu text-to-speech test finished",
        })
      }

      utterance.onerror = (event) => {
        console.error("Telugu speech error:", event)
        setIsSpeaking(false)
        toast({
          title: "Telugu Speech Error",
          description: "There was an error with Telugu speech synthesis",
          variant: "destructive",
        })
      }

      synthesisRef.current.speak(utterance)
    } catch (error) {
      console.error("Error in Telugu speech synthesis:", error)
      toast({
        title: "Telugu Speech Error",
        description: "Could not start Telugu speech synthesis",
        variant: "destructive",
      })
    }
  }

  const stopSpeaking = () => {
    if (synthesisRef.current) {
      synthesisRef.current.cancel()
      setIsSpeaking(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TestTube className="h-5 w-5 mr-2" />
              Voice Feature Testing
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* System Tests */}
            <div>
              <h3 className="text-lg font-semibold mb-4">System Compatibility Tests</h3>
              <Button onClick={runVoiceTests} disabled={isRunningTests} className="mb-4">
                {isRunningTests ? "Running Tests..." : "Run All Tests"}
              </Button>

              {testResults.length > 0 && (
                <div className="space-y-2">
                  {testResults.map((test, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-secondary-50 dark:bg-secondary-900 rounded-lg"
                    >
                      <span className="font-medium">{test.name}</span>
                      <div className="flex items-center gap-2">
                        {test.status === "pending" && <Badge variant="secondary">Pending</Badge>}
                        {test.status === "success" && (
                          <Badge variant="default" className="bg-green-100 text-green-800">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Success
                          </Badge>
                        )}
                        {test.status === "error" && (
                          <Badge variant="destructive">
                            <XCircle className="h-3 w-3 mr-1" />
                            Error
                          </Badge>
                        )}
                        <span className="text-sm text-secondary-600 dark:text-secondary-400">{test.message}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Manual Tests */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Manual Feature Tests</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Speech Recognition Test */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Speech Recognition</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Button
                      onClick={testSpeechRecognition}
                      className={`w-full mb-3 ${isListening ? "bg-red-500 hover:bg-red-600" : "bg-blue-500 hover:bg-blue-600"}`}
                    >
                      {isListening ? (
                        <>
                          <MicOff className="h-4 w-4 mr-2" />
                          Stop Listening
                        </>
                      ) : (
                        <>
                          <Mic className="h-4 w-4 mr-2" />
                          Start Listening
                        </>
                      )}
                    </Button>
                    {isListening && (
                      <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded text-sm">
                        <p className="font-medium">Listening...</p>
                        <p className="text-secondary-600 dark:text-secondary-400">{transcript || "Say something..."}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* English Speech Synthesis Test */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">English TTS</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Button
                      onClick={testSpeechSynthesis}
                      className={`w-full ${isSpeaking ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"}`}
                    >
                      {isSpeaking ? (
                        <>
                          <Square className="h-4 w-4 mr-2" />
                          Stop Speaking
                        </>
                      ) : (
                        <>
                          <Play className="h-4 w-4 mr-2" />
                          Test English Voice
                        </>
                      )}
                    </Button>
                    <p className="text-xs text-secondary-600 dark:text-secondary-400 mt-2">
                      Tests UK English Female voice
                    </p>
                  </CardContent>
                </Card>

                {/* Telugu Speech Synthesis Test */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Telugu TTS</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Button
                      onClick={testTeluguSpeech}
                      className={`w-full ${isSpeaking ? "bg-red-500 hover:bg-red-600" : "bg-purple-500 hover:bg-purple-600"}`}
                    >
                      {isSpeaking ? (
                        <>
                          <Square className="h-4 w-4 mr-2" />
                          Stop Speaking
                        </>
                      ) : (
                        <>
                          <Play className="h-4 w-4 mr-2" />
                          Test Telugu Voice
                        </>
                      )}
                    </Button>
                    <p className="text-xs text-secondary-600 dark:text-secondary-400 mt-2">
                      Tests Telugu language support
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Instructions */}
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Testing Instructions:</h4>
              <ul className="text-sm space-y-1 text-secondary-700 dark:text-secondary-300">
                <li>1. Run the system compatibility tests first</li>
                <li>2. Test speech recognition by clicking "Start Listening" and speaking</li>
                <li>3. Test English TTS to verify UK Female voice</li>
                <li>4. Test Telugu TTS to verify multilingual support</li>
                <li>5. Check browser console for any error messages</li>
                <li>6. Ensure microphone permissions are granted</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
