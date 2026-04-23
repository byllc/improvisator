import { useState, useEffect } from 'react'
import {
  HeadlineGame,
  WhoTheFuckGame,
  LawyerGame,
  WhereTheFuckGame,
  RockPaperScissorsGame,
  type RockPaperScissorsChoice,
  type RockPaperScissorsRound
} from '@improvisator/core'
import { headlines } from './data/headlines'

type GameType = 'headline' | 'wtf' | 'lawyer' | 'wheretf' | 'rps'

function App() {
  const [headlineGame, setHeadlineGame] = useState<HeadlineGame | null>(null)
  const [wtfGame, setWtfGame] = useState<WhoTheFuckGame | null>(null)
  const [lawyerGame, setLawyerGame] = useState<LawyerGame | null>(null)
  const [whereTfGame, setWhereTfGame] = useState<WhereTheFuckGame | null>(null)
  const [rpsGame, setRpsGame] = useState<RockPaperScissorsGame | null>(null)
  const [activeGame, setActiveGame] = useState<GameType>('headline')
  const [headline, setHeadline] = useState<string>('')
  const [character, setCharacter] = useState<string>('')
  const [hotTake, setHotTake] = useState<string>('')
  const [scenario, setScenario] = useState<string>('')
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
  }

  const handleRpsChoiceSelect = (choice: RockPaperScissorsChoice) => {
    setRpsChoice(choice)
    setRpsRound(null)
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
        {!headlineGame || !wtfGame || !lawyerGame || !whereTfGame || !rpsGame ? (
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
              </select>
            </div>

            {activeGame === 'headline' && (
              <div className="game-container">
                <section className="rules">
                  <h2>Headline Game</h2>
                  <p>{headlineGame.getRules()}</p>
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
                  <p>Perform as your character. Other players try to guess who you are. Click "Hide Character" before you start, then "Reveal" after you perform.</p>
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
                  <p>{lawyerGame.getRules()}</p>
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
                  <p>Perform your scenario. Other players guess WHO (profession), WHAT (disposition), and WHERE (location).</p>
                  <p><strong>Scoring:</strong> Guessers get 1 point each for who/what/where, OR 5 points for all three. Improviser gets 5 points for each element everyone guesses correctly.</p>
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
                  <p>{rpsGame.getRules()}</p>
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
