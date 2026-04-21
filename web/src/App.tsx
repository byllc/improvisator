import { useState, useEffect } from 'react'
import { HeadlineGame, WhoTheFuckGame, LawyerGame, WhereTheFuckGame } from '@improvisator/core'

type GameType = 'headline' | 'wtf' | 'lawyer' | 'wheretf'

function App() {
  const [headlineGame, setHeadlineGame] = useState<HeadlineGame | null>(null)
  const [wtfGame, setWtfGame] = useState<WhoTheFuckGame | null>(null)
  const [lawyerGame, setLawyerGame] = useState<LawyerGame | null>(null)
  const [whereTfGame, setWhereTfGame] = useState<WhereTheFuckGame | null>(null)
  const [activeGame, setActiveGame] = useState<GameType>('headline')
  const [headline, setHeadline] = useState<string>('')
  const [character, setCharacter] = useState<string>('')
  const [hotTake, setHotTake] = useState<string>('')
  const [scenario, setScenario] = useState<string>('')
  const [score, setScore] = useState<number>(0)
  const [isOnline, setIsOnline] = useState(navigator.onLine)
  const [isWtfHidden, setIsWtfHidden] = useState<boolean>(false)
  const [isWhereTfHidden, setIsWhereTfHidden] = useState<boolean>(false)

  useEffect(() => {
    // Initialize games
    const newHeadlineGame = new HeadlineGame({
      headlines: [
        'Local Man Discovers Sentient Toaster',
        'Mayor Declares All Tuesdays Optional',
        'Cat Runs for City Council',
        'Coffee Voted Most Important Food Group',
        'Time Travel Banned by DMV',
      ]
    })
    setHeadlineGame(newHeadlineGame)

    const newWtfGame = new WhoTheFuckGame()
    setWtfGame(newWtfGame)

    const newLawyerGame = new LawyerGame()
    setLawyerGame(newLawyerGame)

    const newWhereTfGame = new WhereTheFuckGame()
    setWhereTfGame(newWhereTfGame)
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
  }

  return (
    <div className="App">
      <header>
        <h1>🎭 Improvisator</h1>
        <p>Improv party games</p>
        {!isOnline && <div className="offline-banner">Offline Mode</div>}
      </header>

      <main>
        {!headlineGame || !wtfGame || !lawyerGame || !whereTfGame ? (
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
