"use client"

import { VoiceTest } from "../components/voice-test"

export default function VoiceTestPage() {
  return (
    <div className="min-h-screen bg-secondary-50 dark:bg-secondary-950 py-8">
      <div className="container mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-secondary-900 dark:text-white mb-2">Voice Feature Testing</h1>
          <p className="text-secondary-600 dark:text-secondary-400">
            Comprehensive testing suite for voice input and output functionality
          </p>
        </div>
        <VoiceTest />
      </div>
    </div>
  )
}
