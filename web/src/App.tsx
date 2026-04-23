import { useState, useEffect } from 'react'
import {
  HeadlineGame,
  WhoTheFuckGame,
  LawyerGame,
  WhereTheFuckGame,
  RockPaperScissorsGame,
  type RockPaperScissorsChoice,
  type RockPaperScissorsRound,
  PressConferenceGame,
  EmotionRouletteGame,
  BadAdviceGame
} from '@improvisator/core'
import { headlines } from './data/headlines'

type GameType = 'headline' | 'wtf' | 'lawyer' | 'wheretf' | 'rps' | 'pressconference' | 'emotionroulette' | 'badadvice'

type RuleItem = { text: string; subItems?: string[] }

function parseRules(rules: string): RuleItem[] {
  const items: RuleItem[] = []
  for (const line of rules.split('\n').slice(1)) {
    if (!line.trim()) continue
    if (/^\s+-/.test(line)) {
      if (items.length > 0) {
        if (!items[items.length - 1].subItems) items[items.length - 1].subItems = []
        items[items.length - 1].subItems!.push(line.replace(/^\s*-\s*/, '').trim())
      }
    } else {
      items.push({ text: line.replace(/^\d+\.\s*/, '').trim() })
    }
  }
  return items
}

function RulesList({ rules }: { rules: string }) {
  return (
    <ol className="rules-list">
      {parseRules(rules).map((item, i) => (
        <li key={i}>
          {item.text}
          {item.subItems && (
            <ul className="rules-sublist">
              {item.subItems.map((sub, j) => <li key={j}>{sub}</li>)}
            </ul>
          )}
        </li>
      ))}
    </ol>
  )
}

function App() {
  const [headlineGame, setHeadlineGame] = useState<HeadlineGame | null>(null)
  const [wtfGame, setWtfGame] = useState<WhoTheFuckGame | null>(null)
  const [lawyerGame, setLawyerGame] = useState<LawyerGame | null>(null)
  const [whereTfGame, setWhereTfGame] = useState<WhereTheFuckGame | null>(null)
  const [rpsGame, setRpsGame] = useState<RockPaperScissorsGame | null>(null)
  const [pressConferenceGame, setPressConferenceGame] = useState<PressConferenceGame | null>(null)
  const [emotionRouletteGame, setEmotionRouletteGame] = useState<EmotionRouletteGame | null>(null)
  const [badAdviceGame, setBadAdviceGame] = useState<BadAdviceGame | null>(null)
  const [activeGame, setActiveGame] = useState<GameType>('headline')
  const [headline, setHeadline] = useState<string>('')
  const [character, setCharacter] = useState<string>('')
  const [hotTake, setHotTake] = useState<string>('')
  const [scenario, setScenario] = useState<string>('')
  const [pressConferenceScenario, setPressConferenceScenario] = useState<string>('')
  const [emotionRoulettePrompt, setEmotionRoulettePrompt] = useState<string>('')
  const [badAdviceProblem, setBadAdviceProblem] = useState<string>('')
  const [score, setScore] = useState<number>(0)
  const [isOnline, setIsOnline] = useState(navigator.onLine)
  const [isWtfHidden, setIsWtfHidden] = useState<boolean>(false)
  const [isWhereTfHidden, setIsWhereTfHidden] = useState<boolean>(false)
  const [rpsChoice, setRpsChoice] = useState<RockPaperScissorsChoice | ''>('')
  const [rpsRound, setRpsRound] = useState<RockPaperScissorsRound | null>(null)

  useEffect(() => {
    // Initialize games
    const newHeadlineGame = new HeadlineGame({ headlines })
    setHeadlineGame(newHeadlineGame)

    const newWtfGame = new WhoTheFuckGame()
    setWtfGame(newWtfGame)

    const newLawyerGame = new LawyerGame()
    setLawyerGame(newLawyerGame)

    const newWhereTfGame = new WhereTheFuckGame()
    setWhereTfGame(newWhereTfGame)

    const newRpsGame = new RockPaperScissorsGame()
    setRpsGame(newRpsGame)

    const newPressConferenceGame = new PressConferenceGame()
    setPressConferenceGame(newPressConferenceGame)

    const newEmotionRouletteGame = new EmotionRouletteGame()
    setEmotionRouletteGame(newEmotionRouletteGame)

    const newBadAdviceGame = new BadAdviceGame()
    setBadAdviceGame(newBadAdviceGame)
  }, [])

  useEffect(() => {
    // Monitor online status for PWA offline awareness
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)
    
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)
    
    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  const handleNewHeadline = () => {
    if (!headlineGame) return
    const newHeadline = headlineGame.getRandomHeadline()
    setHeadline(newHeadline)
    setScore(0)
  }

  const handleNewCharacter = () => {
    if (!wtfGame) return
    const newCharacter = wtfGame.getRandomCharacter()
    setCharacter(newCharacter)
    setScore(0)
    setIsWtfHidden(false)
  }

  const handleNewHotTake = () => {
    if (!lawyerGame) return
    const newHotTake = lawyerGame.getRandomHotTake()
    setHotTake(newHotTake)
    setScore(0)
  }

  const handleNewScenario = () => {
    if (!whereTfGame) return
    const newScenario = whereTfGame.getRandomScenario()
    setScenario(newScenario)
    setScore(0)
    setIsWhereTfHidden(false)
  }

  const handleScoreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10)
    let currentGame = null
    if (activeGame === 'headline') currentGame = headlineGame
    else if (activeGame === 'wtf') currentGame = wtfGame
    else if (activeGame === 'lawyer') currentGame = lawyerGame
    else if (activeGame === 'wheretf') currentGame = whereTfGame
    else if (activeGame === 'rps') currentGame = rpsGame
    else if (activeGame === 'pressconference') currentGame = pressConferenceGame
    else if (activeGame === 'emotionroulette') currentGame = emotionRouletteGame
    else if (activeGame === 'badadvice') currentGame = badAdviceGame
    
    if (!currentGame || !currentGame.validateScore(val)) return
    setScore(val)
  }

  const switchGame = (gameType: GameType) => {
    setActiveGame(gameType)
    setHeadline('')
    setCharacter('')
    setHotTake('')
    setScenario('')
    setScore(0)
    setIsWtfHidden(false)
    setIsWhereTfHidden(false)
    setRpsChoice('')
    setRpsRound(null)
    setPressConferenceScenario('')
    setEmotionRoulettePrompt('')
    setBadAdviceProblem('')
  }

  const handleRpsChoiceSelect = (choice: RockPaperScissorsChoice) => {
    setRpsChoice(choice)
    setRpsRound(null)
    setScore(0)
  }

  const handleNewBadAdviceProblem = () => {
    if (!badAdviceGame) return
    const newProblem = badAdviceGame.getRandomProblem()
    setBadAdviceProblem(newProblem)
    setScore(0)
  }

  const handleNewEmotionRoulettePrompt = () => {
    if (!emotionRouletteGame) return
    const newPrompt = emotionRouletteGame.getRandomPrompt()
    setEmotionRoulettePrompt(newPrompt)
    setScore(0)
  }

  const handleNewPressConferenceScenario = () => {
    if (!pressConferenceGame) return
    const newScenario = pressConferenceGame.getRandomScenario()
    setPressConferenceScenario(newScenario)
    setScore(0)
  }

  const handleGenerateRpsRound = () => {
    if (!rpsGame || !rpsChoice) return
    const round = rpsGame.generateRound(rpsChoice)
    setRpsRound(round)
    setScore(0)
  }

  return (
    <div className="App">
      <header>
        <h1>🎭 Improvisator</h1>
        <p>Improv party games</p>
        {!isOnline && <div className="offline-banner">Offline Mode</div>}
      </header>

      <main>
        {!headlineGame || !wtfGame || !lawyerGame || !whereTfGame || !rpsGame || !pressConferenceGame || !emotionRouletteGame || !badAdviceGame ? (
          <div className="loading">Initializing games...</div>
        ) : (
          <>
            <div className="game-selector">
              <label htmlFor="game-select">Choose a Game:</label>
              <select 
                id="game-select"
                value={activeGame} 
                onChange={(e) => switchGame(e.target.value as GameType)}
                className="game-select"
              >
                <option value="headline">Headline Game</option>
                <option value="wtf">Who The Fuck?</option>
                <option value="lawyer">Lawyer</option>
                <option value="wheretf">Where The Fuck?</option>
                <option value="rps">Rock Paper Scissors</option>
                <option value="pressconference">Press Conference</option>
                <option value="emotionroulette">Emotion Roulette</option>
                <option value="badadvice">Bad Advice</option>
              </select>
            </div>

            {activeGame === 'headline' && (
              <div className="game-container">
                <section className="rules">
                  <h2>Headline Game</h2>
                  <RulesList rules={headlineGame.getRules()} />
                </section>

                <section className="game-play">
                  {headline ? (
                    <>
                      <div className="headline-box">
                        <h3>Your Headline:</h3>
                        <p className="headline">{headline}</p>
                      </div>

                      <button onClick={handleNewHeadline} className="btn btn-primary">
                        Get Another Headline
                      </button>
                    </>
                  ) : (
                    <button onClick={handleNewHeadline} className="btn btn-primary btn-large">
                      Let's Play 🚀
                    </button>
                  )}
                </section>

                <footer className="game-footer">
                  <small>{headlineGame.getTimeout()}s time limit per headline</small>
                </footer>
              </div>
            )}

            {activeGame === 'wtf' && (
              <div className="game-container">
                <section className="rules">
                  <h2>Who The Fuck?</h2>
                  <RulesList rules={wtfGame.getRules()} />
                </section>

                <section className="game-play">
                  {character ? (
                    <>
                      <div className="headline-box">
                        <h3>
                          {isWtfHidden ? '🤐 Character is Hidden' : 'Your Character:'}
                        </h3>
                        {!isWtfHidden && (
                          <>
                            <p className="headline">{character}</p>
                            <p className="character-details">
                              {wtfGame.getCurrentDescriptive()} + {wtfGame.getCurrentProfession()}
                            </p>
                          </>
                        )}
                      </div>

                      <div className="button-group">
                        {isWtfHidden ? (
                          <button onClick={() => { setIsWtfHidden(false) }} className="btn btn-secondary">
                            Reveal Character
                          </button>
                        ) : (
                          <button onClick={() => { setIsWtfHidden(true) }} className="btn btn-secondary">
                            Hide Character
                          </button>
                        )}
                        <button onClick={handleNewCharacter} className="btn btn-primary">
                          Get Another Character
                        </button>
                      </div>
                    </>
                  ) : (
                    <button onClick={handleNewCharacter} className="btn btn-primary btn-large">
                      Let's Play 🚀
                    </button>
                  )}
                </section>

                <footer className="game-footer">
                  <small>
                    {wtfGame.getCombinationCount().toLocaleString()} unique character combinations
                  </small>
                </footer>
              </div>
            )}

            {activeGame === 'lawyer' && (
              <div className="game-container">
                <section className="rules">
                  <h2>Lawyer</h2>
                  <RulesList rules={lawyerGame.getRules()} />
                </section>

                <section className="game-play">
                  {hotTake ? (
                    <>
                      <div className="headline-box">
                        <h3>Defend This Position:</h3>
                        <p className="headline">{hotTake}</p>
                      </div>

                      <button onClick={handleNewHotTake} className="btn btn-primary">
                        Get Another Hot Take
                      </button>
                    </>
                  ) : (
                    <button onClick={handleNewHotTake} className="btn btn-primary btn-large">
                      Let's Play 🚀
                    </button>
                  )}
                </section>

                <footer className="game-footer">
                  <small>
                    {lawyerGame.getHotTakeCount()} controversial positions to defend
                  </small>
                </footer>
              </div>
            )}

            {activeGame === 'wheretf' && (
              <div className="game-container">
                <section className="rules">
                  <h2>Where The Fuck?</h2>
                  <RulesList rules={whereTfGame.getRules()} />
                </section>

                <section className="game-play">
                  {scenario ? (
                    <>
                      <div className="headline-box">
                        <h3>
                          {isWhereTfHidden ? '🤐 Scenario is Hidden' : 'Your Scenario:'}
                        </h3>
                        {!isWhereTfHidden && (
                          <>
                            <p className="headline">{scenario}</p>
                            <p className="character-details">
                              Who: {whereTfGame.getCurrentProfession()} | 
                              Where: {whereTfGame.getCurrentLocation()} | 
                              Disposition: {whereTfGame.getCurrentDisposition()}
                            </p>
                          </>
                        )}
                      </div>

                      <div className="button-group">
                        {isWhereTfHidden ? (
                          <button onClick={() => { setIsWhereTfHidden(false) }} className="btn btn-secondary">
                            Reveal Scenario
                          </button>
                        ) : (
                          <button onClick={() => { setIsWhereTfHidden(true) }} className="btn btn-secondary">
                            Hide Scenario
                          </button>
                        )}
                        <button onClick={handleNewScenario} className="btn btn-primary">
                          Get Another Scenario
                        </button>
                      </div>
                    </>
                  ) : (
                    <button onClick={handleNewScenario} className="btn btn-primary btn-large">
                      Let's Play 🚀
                    </button>
                  )}
                </section>

                <footer className="game-footer">
                  <small>
                    {whereTfGame.getScenarioCount().toLocaleString()} unique scenario combinations
                  </small>
                </footer>
              </div>
            )}

            {activeGame === 'rps' && (
              <div className="game-container">
                <section className="rules">
                  <h2>Rock Paper Scissors (Justify Edition)</h2>
                  <RulesList rules={rpsGame.getRules()} />
                </section>

                <section className="game-play">
                  <div className="headline-box">
                    <h3>Step 1: Pick Your Thing</h3>
                    <div className="button-group">
                      <button
                        onClick={() => handleRpsChoiceSelect('rock')}
                        className={`btn ${rpsChoice === 'rock' ? 'btn-rps-selected' : 'btn-primary'}`}
                        aria-pressed={rpsChoice === 'rock'}
                      >
                        Rock
                      </button>
                      <button
                        onClick={() => handleRpsChoiceSelect('paper')}
                        className={`btn ${rpsChoice === 'paper' ? 'btn-rps-selected' : 'btn-primary'}`}
                        aria-pressed={rpsChoice === 'paper'}
                      >
                        Paper
                      </button>
                      <button
                        onClick={() => handleRpsChoiceSelect('scissors')}
                        className={`btn ${rpsChoice === 'scissors' ? 'btn-rps-selected' : 'btn-primary'}`}
                        aria-pressed={rpsChoice === 'scissors'}
                      >
                        Scissors
                      </button>
                    </div>

                    <p className="rps-choice-indicator">
                      {rpsChoice ? `Your choice: ${rpsChoice.toUpperCase()}` : 'No choice selected yet'}
                    </p>
                  </div>

                  <button
                    onClick={handleGenerateRpsRound}
                    className="btn btn-primary btn-large"
                    disabled={!rpsChoice}
                  >
                    Generate Challenge
                  </button>

                  {rpsRound && (
                    <div className="headline-box">
                      <h3>Your Prompt</h3>
                      <p className="headline">{rpsRound.statement}</p>
                      <p className="character-details">Now justify why that is true.</p>
                    </div>
                  )}
                </section>

                <footer className="game-footer">
                  <small>
                    {rpsGame.getThingCount().toLocaleString()} random things available
                  </small>
                </footer>
              </div>
            )}

            {activeGame === 'badadvice' && (
              <div className="game-container">
                <section className="rules">
                  <h2>Bad Advice</h2>
                  <RulesList rules={badAdviceGame.getRules()} />
                </section>

                <section className="game-play">
                  {badAdviceProblem ? (
                    <>
                      <div className="headline-box">
                        <h3>The Problem:</h3>
                        <p className="headline">{badAdviceProblem}</p>
                      </div>

                      <button onClick={handleNewBadAdviceProblem} className="btn btn-primary">
                        Next Problem
                      </button>
                    </>
                  ) : (
                    <button onClick={handleNewBadAdviceProblem} className="btn btn-primary btn-large">
                      Let's Play 🚀
                    </button>
                  )}
                </section>

                <footer className="game-footer">
                  <small>
                    {badAdviceGame.getProblemCount()} problems to solve terribly
                  </small>
                </footer>
              </div>
            )}

            {activeGame === 'emotionroulette' && (
              <div className="game-container">
                <section className="rules">
                  <h2>Emotion Roulette</h2>
                  <RulesList rules={emotionRouletteGame.getRules()} />
                </section>

                <section className="game-play">
                  {emotionRoulettePrompt ? (
                    <>
                      <div className="headline-box">
                        <p className="headline">{emotionRoulettePrompt}</p>
                        <p className="character-details">
                          Action: {emotionRouletteGame.getCurrentAction()}<br />
                          Emotion: {emotionRouletteGame.getCurrentEmotion()}
                        </p>
                      </div>

                      <button onClick={handleNewEmotionRoulettePrompt} className="btn btn-primary">
                        Spin Again
                      </button>
                    </>
                  ) : (
                    <button onClick={handleNewEmotionRoulettePrompt} className="btn btn-primary btn-large">
                      Let's Play 🚀
                    </button>
                  )}
                </section>

                <footer className="game-footer">
                  <small>
                    {emotionRouletteGame.getCombinationCount().toLocaleString()} unique combinations
                  </small>
                </footer>
              </div>
            )}

            {activeGame === 'pressconference' && (
              <div className="game-container">
                <section className="rules">
                  <h2>Press Conference</h2>
                  <RulesList rules={pressConferenceGame.getRules()} />
                </section>

                <section className="game-play">
                  {pressConferenceScenario ? (
                    <>
                      <div className="headline-box">
                        <h3>Breaking News:</h3>
                        <p className="headline">{pressConferenceScenario}</p>
                        <p className="character-details">
                          Celebrity: {pressConferenceGame.getCurrentCelebrity()}<br />
                          The Incident: {pressConferenceGame.getCurrentEvent()}
                        </p>
                      </div>

                      <button onClick={handleNewPressConferenceScenario} className="btn btn-primary">
                        New Scandal
                      </button>
                    </>
                  ) : (
                    <button onClick={handleNewPressConferenceScenario} className="btn btn-primary btn-large">
                      Let's Play 🚀
                    </button>
                  )}
                </section>

                <footer className="game-footer">
                  <small>
                    {pressConferenceGame.getScenarioCount().toLocaleString()} unique scandal combinations
                  </small>
                </footer>
              </div>
            )}
          </>
        )}
      </main>

      <footer className="app-footer">
        <p>Built with ❤️ for improvisers</p>
      </footer>
    </div>
  )
}

export default App
