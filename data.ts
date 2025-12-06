import { Phase } from './types';

export const phases: Phase[] = [
  {
    id: 1,
    title: "Architecture & Foundation",
    workflows: [
      {
        id: "1.1",
        title: "System Architecture Design",
        model: "Opus 4.5",
        description: "Designing the comprehensive system architecture including tech stack, domain modules, and data flow.",
        prompt: `You are designing the architecture for a professional-grade Football Manager web game. 

Create a comprehensive system architecture document that includes:

1. **Tech Stack Selection & Justification**
   - Frontend: React/Next.js vs Vue/Nuxt vs SvelteKit (recommend one with reasoning)
   - Backend: Node.js/Express vs Python/FastAPI vs Go (recommend one with reasoning)
   - Database: PostgreSQL vs MongoDB vs hybrid approach
   - Real-time: WebSockets vs Server-Sent Events vs Polling
   - Caching: Redis strategy for game state

2. **Core Domain Modules**
   - Player Management System
   - Club/Team Management
   - Match Engine
   - League/Competition System
   - Transfer Market
   - Youth Academy
   - Staff Management
   - Financial System
   - Tactics & Training

3. **Data Flow Architecture**
   - How match simulations process
   - How game time advances (daily/weekly ticks)
   - Event-driven architecture for game events
   - State management strategy

4. **Scalability Considerations**
   - Single-player vs multiplayer architecture
   - Save game system
   - Performance optimization for large databases (100k+ players)

5. **File/Folder Structure**
   - Propose a monorepo structure with clear separation of concerns

Output: 
- Architecture diagram (describe in Mermaid.js format)
- Detailed technical specification document
- Initial package.json with dependencies
- Docker Compose configuration for local development`
      },
      {
        id: "1.2",
        title: "Database Schema Design",
        model: "Opus 4.5",
        description: "Design a comprehensive PostgreSQL database schema for player entities, clubs, matches, and competitions.",
        prompt: `Design a comprehensive PostgreSQL database schema for a Football Manager game.

Requirements:

1. **Player Entity** (most complex)
   - Basic info: name, nationality, birth_date, height, weight, foot preference
   - Current attributes (1-20 scale): pace, shooting, passing, dribbling, defending, physical
   - Mental attributes: composure, decisions, leadership, teamwork, work_rate, aggression
   - Goalkeeping attributes (for GKs): reflexes, handling, positioning, diving, kicking
   - Hidden attributes: potential_ability, current_ability, consistency, injury_proneness
   - Contract: wage, contract_end, release_clause, bonuses
   - History: career_history JSONB, injury_history JSONB
   - Relationships: current_club_id, national_team_id

2. **Club Entity**
   - Identity: name, nickname, founded, stadium_id, colors
   - Finances: balance, wage_budget, transfer_budget, revenue_streams JSONB
   - Facilities: training_facilities (1-20), youth_facilities (1-20), stadium_capacity
   - Reputation (1-200 scale)
   - Board expectations JSONB

3. **Match Entity**
   - Teams, scores, events JSONB (goals, cards, substitutions)
   - Statistics JSONB (possession, shots, passes, etc.)
   - Attendance, weather, referee

4. **Competition Structure**
   - Leagues, cups, continental competitions
   - Promotion/relegation rules JSONB
   - Prize money structure

5. **Additional Entities**
   - Staff (managers, coaches, scouts with their own attributes)
   - Tactics (formations, instructions, set pieces)
   - Training schedules
   - Youth prospects
   - Transfer offers & negotiations
   - Player morale & relationships

6. **Indexing Strategy**
   - Identify columns needing indexes
   - Composite indexes for common queries
   - Partial indexes for active records

7. **Constraints & Triggers**
   - Data integrity rules
   - Automatic history tracking
   - Cascading updates

Output:
- Complete SQL schema with all tables
- Seed data SQL for 5 leagues with realistic data
- TypeScript/Prisma schema equivalent
- Entity relationship diagram (Mermaid.js)
- Query examples for common operations`
      },
      {
        id: "1.3",
        title: "Project Scaffolding",
        model: "Sonnet 4.5",
        description: "Initialize the project structure with Monorepo setup, Next.js, Fastify, and PostgreSQL.",
        prompt: `Initialize the Football Manager web game project structure.

Based on these decisions:
- Frontend: Next.js 14 with App Router, TypeScript, Tailwind CSS, shadcn/ui
- Backend: Node.js with Fastify, TypeScript
- Database: PostgreSQL with Prisma ORM
- Monorepo: Turborepo

Create the following:

1. **Monorepo Setup**
   /apps
     /web          # Next.js frontend
     /api          # Fastify backend
   /packages
     /database     # Prisma schema & client
     /types        # Shared TypeScript types
     /game-engine  # Match simulation logic
     /ui           # Shared UI components
     /utils        # Shared utilities
   /tools
     /data-generator  # Scripts to generate player/club data

2. **Configuration Files**
   - turbo.json with proper pipelines
   - Root package.json with workspaces
   - tsconfig.json with path aliases
   - .env.example with all required variables
   - docker-compose.yml (PostgreSQL, Redis, pgAdmin)
   - .github/workflows for CI/CD

3. **Frontend Setup (apps/web)**
   - Next.js app router structure
   - Tailwind + shadcn/ui configured
   - Auth placeholder (NextAuth.js)
   - State management setup (Zustand)
   - API client with React Query

4. **Backend Setup (apps/api)**
   - Fastify with TypeScript
   - Route structure matching domain modules
   - Swagger/OpenAPI documentation
   - JWT authentication middleware
   - Error handling middleware

5. **Package Setup**
   - Prisma schema with initial models
   - Shared types for API contracts
   - ESLint + Prettier configuration

Generate all files with proper content, not just placeholders.
Include npm scripts for development, testing, and building.`
      }
    ]
  },
  {
    id: 2,
    title: "Core Game Systems",
    workflows: [
      {
        id: "2.1",
        title: "Player Management System",
        model: "Sonnet 4.5",
        description: "Implement API endpoints, searching, filtering, and attribute calculations for players.",
        prompt: `Implement the complete Player Management system for the Football Manager game.

Requirements:

1. **Backend API Endpoints** (apps/api/src/routes/players/)
   POST   /players                    # Create player
   GET    /players                    # List with filters, pagination, sorting
   GET    /players/:id                # Get player details
   PUT    /players/:id                # Update player
   DELETE /players/:id                # Delete player
   GET    /players/:id/history        # Career history
   GET    /players/:id/statistics     # Season-by-season stats
   POST   /players/search             # Advanced search (position, age range, attributes, etc.)
   GET    /players/compare            # Compare multiple players

2. **Search & Filter System**
   - Filter by: position, nationality, age range, club, contract status
   - Filter by attributes: min/max for any attribute
   - Sort by any attribute or combination
   - Full-text search on names
   - Pagination with cursor-based approach for large datasets

3. **Player Attribute Calculations**
   - Calculate overall rating from attributes by position
   - Calculate market value from attributes, age, potential, contract
   - Calculate wage expectations

4. **Services Layer**
   - PlayerService with business logic
   - PlayerSearchService with Elasticsearch-like functionality
   - PlayerValuationService

5. **Frontend Components** (apps/web/src/components/players/)
   - PlayerCard (compact view)
   - PlayerProfile (full page)
   - PlayerAttributeRadar (radar chart)
   - PlayerComparison (side-by-side)
   - PlayerSearchFilters
   - PlayerTable (sortable, filterable)
   - PlayerHistory (career timeline)

6. **Frontend Pages**
   - /players - Browse all players
   - /players/[id] - Player profile
   - /players/search - Advanced search
   - /squad - Your team's players

Include:
- Zod validation schemas
- TypeScript types
- Unit tests for services
- API integration tests
- Storybook stories for UI components`
      },
      {
        id: "2.2",
        title: "Club & Squad Management",
        model: "Sonnet 4.5",
        description: "Implement club finances, facilities, and squad formation management.",
        prompt: `Implement the Club and Squad Management system.

Requirements:

1. **Club API Endpoints**
   GET    /clubs                      # List all clubs
   GET    /clubs/:id                  # Club details
   GET    /clubs/:id/squad            # Current squad
   GET    /clubs/:id/staff            # Club staff
   GET    /clubs/:id/finances         # Financial overview
   GET    /clubs/:id/facilities       # Training/stadium facilities
   GET    /clubs/:id/history          # Historical data
   PUT    /clubs/:id/budget           # Adjust wage/transfer budget split

2. **Squad Management Endpoints**
   PUT    /squad/formation            # Set team formation
   PUT    /squad/lineup               # Set starting 11 + bench
   PUT    /squad/roles                # Assign captain, penalty taker, etc.
   PUT    /squad/player/:id/position  # Set player's squad position
   PUT    /squad/player/:id/status    # Set status (first team, reserves, u21)

3. **Financial System**
   - Track income sources (tickets, merchandise, TV, sponsorship, prize money)
   - Track expenses (wages, transfers, facilities, operations)
   - Monthly/yearly financial reports
   - Wage budget enforcement
   - Financial projections

4. **Frontend Components**
   - ClubOverview (dashboard with key metrics)
   - SquadView (formation display, drag-and-drop lineup)
   - SquadDepthChart
   - FinancialDashboard (charts, tables)
   - FacilitiesView
   - ClubHistory

5. **Interactive Formation Builder**
   - Drag-and-drop player positioning
   - Multiple formation presets (4-3-3, 4-4-2, 3-5-2, etc.)
   - Position suitability indicators
   - Save multiple formations

6. **Squad Analysis Features**
   - Squad depth by position
   - Age profile chart
   - Contract expiry timeline
   - Wage distribution chart
   - Squad harmony/chemistry indicators

Include responsive design for all components.`
      },
      {
        id: "2.3",
        title: "Match Engine - Core Simulation",
        model: "Opus 4.5",
        description: "Design and implement the event-driven match simulation engine.",
        prompt: `Design and implement the core Match Engine for realistic football simulation.

This is the heart of the game - it must produce realistic, exciting, and varied match results.

Requirements:

1. **Match Engine Architecture** (packages/game-engine/src/match/)
   
   Create an event-driven simulation engine:
   
   MatchEngine
   ├── MatchState (current game state)
   ├── TeamState (for each team)
   ├── BallState (position, possession)
   ├── EventGenerator (creates match events)
   ├── EventProcessor (processes events, updates state)
   ├── StatisticsTracker (live stats)
   └── CommentaryGenerator (text descriptions)

2. **Simulation Approach**
   - Time-based simulation (simulate minute by minute or action by action)
   - Possession-based transitions
   - Zone-based pitch model (defensive third, middle, attacking third)
   - Action chains (pass → pass → shot → goal/save/miss)

3. **Event Types**
   - Possession events: pass, dribble, cross, through ball
   - Attacking events: shot, header, free kick, penalty
   - Defensive events: tackle, interception, clearance, block
   - Set pieces: corner, free kick, throw-in, goal kick
   - Match events: goal, save, card, injury, substitution
   - Special events: VAR check, goal celebration, time wasting

4. **Attribute Impact**
   - How each player attribute affects outcomes
   - Team tactics influence on play style
   - Fatigue and morale effects
   - Home advantage
   - Weather conditions

5. **Probability Models**
   - Pass success probability based on distance, pressure, attributes
   - Shot conversion based on position, angle, attributes, GK
   - Tackle success and foul probability
   - Injury probability based on fitness, aggression, tackles

6. **Match Flow Control**
   - Momentum shifts (team dominance periods)
   - Game state awareness (losing team pushes forward late)
   - Substitution impact
   - Red card impact

7. **Output Format**
   - Full match event log with timestamps
   - Statistics (possession, shots, passes, etc.)
   - Player ratings based on performance
   - Highlights selection for key moments

8. **Testing Strategy**
   - Unit tests for probability calculations
   - Simulation tests (run 1000 matches, verify realistic distributions)
   - Edge case handling (10v11, extreme weather, etc.)

Implement with clean, testable TypeScript.
Include extensive documentation explaining the simulation logic.`
      },
      {
        id: "2.4",
        title: "Match Engine - Tactics System",
        model: "Opus 4.5",
        description: "Implement formations, team instructions, and player roles.",
        prompt: `Implement the Tactics System that integrates with the Match Engine.

This system should allow deep tactical customization that meaningfully affects match outcomes.

Requirements:

1. **Formation System**
   - Standard formations (4-4-2, 4-3-3, 3-5-2, 4-2-3-1, etc.)
   - Custom formation creation
   - Position roles for each slot (e.g., CDM can be: Anchor, Ball-Winner, Deep-Lying Playmaker)

2. **Team Instructions**
   
   Mentality: Defensive | Cautious | Balanced | Positive | Attacking
   
   In Possession:
   - Passing style: Short | Mixed | Direct | Long Ball
   - Tempo: Slow | Normal | Fast | Very Fast
   - Width: Narrow | Normal | Wide
   - Creativity: Structured | Balanced | Expressive
   
   Out of Possession:
   - Defensive line: Deep | Normal | High
   - Defensive width: Narrow | Normal | Wide
   - Pressing intensity: Low | Medium | High | Extreme
   - Pressing trigger: Ball carrier | Always | Never
   
   Transitions:
   - Counter-attack: Yes | No
   - Counter-press: Yes | No

3. **Individual Player Instructions**
   - Positional freedom
   - Defensive duties
   - Attacking runs
   - Marking assignments
   - Special instructions (stay wide, cut inside, etc.)

4. **Set Piece Routines**
   - Corner kick setups (near post, far post, short)
   - Free kick formations
   - Penalty takers (ranked list)

5. **Tactical Presets**
   - Quick templates (Parking the Bus, All-Out Attack, etc.)
   - Save/load custom tactics

6. **Match Engine Integration**
   - How each tactic setting modifies match simulation
   - Tactic effectiveness vs opponent tactics (rock-paper-scissors elements)
   - Player suitability for tactical role
   - Tactical familiarity (training effect)

7. **AI Tactical Analysis**
   - Suggest counter-tactics vs opponent
   - Identify weaknesses in current setup
   - Recommend formation based on squad

8. **Frontend: Tactics Board**
   - Visual formation editor
   - Drag-and-drop player positioning
   - Instruction panels
   - Heatmap predictions
   - Save/compare tactics

Include complex TypeScript types for all tactical options.
Ensure the system is extensible for future tactic additions.`
      },
      {
        id: "2.5",
        title: "Match Day Experience",
        model: "Sonnet 4.5",
        description: "Implement the pre-match, live match view, and post-match screens.",
        prompt: `Implement the complete Match Day user experience.

Requirements:

1. **Pre-Match Screen**
   - Opponent overview (form, key players, predicted lineup)
   - Last meetings results
   - Team selection interface
   - Final tactic adjustments
   - Weather and attendance prediction
   - Team talk selection

2. **Live Match View**
   - Real-time score display
   - Live possession indicator
   - Action timeline (scrolling events)
   - Field visualization showing ball position
   - Live statistics panel
   - Player ratings (updating live)
   - Substitution interface
   - Tactical adjustment interface
   - Commentary box

3. **Match Visualization Options**
   - Full match (slow simulation with detailed events)
   - Key highlights only
   - Commentary only
   - Instant result

4. **In-Match Interactions**
   - Make substitutions (with recommendation AI)
   - Change formation
   - Adjust tactics
   - Give team talk (halftime, after goal conceded)
   - Argue with referee (risk of being sent off)

5. **Post-Match Screen**
   - Final score and result context
   - Player ratings
   - Detailed statistics
   - Best/worst performer
   - Match highlights replay
   - Press conference (respond to questions)
   - Player reactions

6. **Frontend Components**
   - MatchHeader (score, time, competition)
   - MatchTimeline (scrolling events)
   - MatchField2D (animated field view)
   - MatchStats (side-by-side comparison)
   - PlayerRatingsLive
   - SubstitutionModal
   - TacticsQuickEdit
   - CommentaryBox
   - MatchHighlights

7. **Real-time Updates**
   - Use WebSocket for live updates
   - Smooth animations for events
   - Sound effects for key events (optional)

8. **Mobile Responsiveness**
   - Compact view for mobile
   - Touch-friendly interactions
   - Swipe between views

Implement with React, animations using Framer Motion.`
      }
    ]
  },
  {
    id: 3,
    title: "Game Progression Systems",
    workflows: [
      {
        id: "3.1",
        title: "Transfer Market System",
        model: "Opus 4.5",
        description: "Implement transfer negotiations, player valuation AI, and market logic.",
        prompt: `Implement a realistic Transfer Market system.

Requirements:

1. **Transfer Types**
   - Permanent transfers
   - Loan deals (with/without option/obligation to buy)
   - Free transfers
   - Player exchanges
   - Release clause triggers

2. **Negotiation System**
   - Multi-round negotiations
   - Club-to-club fee negotiation
   - Player contract negotiation
   - Agent involvement and fees
   - Sell-on clauses
   - Future fee percentages
   - Performance bonuses

3. **Player Valuation AI**
   - Base value from current ability
   - Age factor (peaks at 27-29)
   - Potential factor for young players
   - Contract length impact
   - Reputation multiplier
   - Recent performance adjustment
   - Market inflation over time

4. **AI Transfer Behavior**
   - AI clubs make realistic signings
   - AI responds to your offers realistically
   - Supply and demand affects prices
   - Bidding wars can occur
   - Deadline day urgency

5. **API Endpoints**
   POST   /transfers/search           # Find available players
   POST   /transfers/enquiry          # Initial interest
   POST   /transfers/bid              # Make a bid
   POST   /transfers/negotiate        # Counter-offer
   POST   /transfers/contract-offer   # Offer to player
   GET    /transfers/incoming         # Offers for your players
   POST   /transfers/respond          # Accept/reject/counter
   GET    /transfers/history          # Past transfers

6. **Transfer Windows**
   - Summer window dates (by country)
   - Winter window dates
   - Emergency loan window (some leagues)
   - Free agent signings year-round

7. **Constraints**
   - Budget limits
   - Squad registration limits
   - Work permit requirements
   - Homegrown player rules
   - FFP-style regulations

8. **Frontend**
   - Transfer Hub (dashboard)
   - Player search with valuation filters
   - Negotiation dialog
   - Contract offer builder
   - Transfer history
   - Shortlist management
   - Comparison tool

9. **Scout Reports**
   - Players discovered through scouting
   - Attribute uncertainty before full scouting
   - Scout quality affects accuracy

Make negotiations feel realistic with AI that remembers context.`
      },
      {
        id: "3.2",
        title: "Training & Player Development",
        model: "Opus 4.5",
        description: "Implement training schedules, attribute growth, and injury mechanics.",
        prompt: `Implement the Training and Player Development system.

Requirements:

1. **Training System Architecture**
   - Weekly training schedule
   - Individual training focus
   - Team training sessions
   - Recovery and rest

2. **Training Categories**
   - Technical: Ball control, passing, crossing, finishing
   - Physical: Strength, speed, stamina, agility
   - Mental: Positioning, decisions, composure
   - Tactical: Team shape, set pieces, pressing
   - Match preparation: Next opponent focus

3. **Training Intensity**
   - Light | Medium | High | Double sessions
   - Injury risk increases with intensity
   - Fatigue accumulation
   - Rest day importance

4. **Development Factors**
   - Age (younger players develop faster)
   - Training facilities quality
   - Coach quality
   - Playing time impact
   - Player personality (professional vs lazy)
   - Current ability vs potential ability gap

5. **Attribute Change Calculation**
   - Weekly micro-changes based on training
   - Monthly visible changes
   - Seasonal progression
   - Age-related decline (30+ years)
   - Injury impact on physical attributes

6. **Individual Player Focus**
   - Assign specific attribute training
   - Position retraining
   - Weakness improvement
   - Strength maximization

7. **Youth Development**
   - Youth academy separate training
   - Youth coaches impact
   - Promotion to first team
   - Development loans

8. **API Endpoints**
   GET    /training/schedule          # Weekly schedule
   PUT    /training/schedule          # Update schedule
   PUT    /training/player/:id/focus  # Individual focus
   GET    /training/workload          # Team workload overview
   GET    /development/:id/projection # Player development projection

9. **Frontend Components**
   - WeeklyScheduleBuilder
   - TrainingSessionCard
   - PlayerDevelopmentGraph
   - WorkloadHeatmap
   - IndividualTrainingAssignment
   - YouthAcademyView

10. **Simulation**
    - Process training effects on weekly game tick
    - Update player attributes appropriately
    - Generate training reports

Include the mathematical models for development calculations.`
      },
      {
        id: "3.3",
        title: "Competition & League System",
        model: "Sonnet 4.5",
        description: "Manage leagues, cups, fixtures, and standings.",
        prompt: `Implement the Competition and League management system.

Requirements:

1. **Competition Types**
   - League (round-robin)
   - Knockout cup
   - Two-legged knockout
   - Group stage + knockout (Champions League style)
   - Playoff system

2. **League System**
   - League standings calculation
   - Tiebreaker rules (goal difference, head-to-head)
   - Promotion/relegation
   - Playoff positions
   - Continental qualification spots

3. **Cup Competitions**
   - Draw simulation
   - Seeding/pots
   - Away goals rule (configurable)
   - Extra time and penalties
   - Replays (for some cups)

4. **Fixture Generation**
   - Round-robin fixture generator
   - Knockout bracket generator
   - Avoid fixture conflicts
   - Respect venue alternation
   - TV scheduling impact

5. **Calendar System**
   - Season calendar (Aug-May for most leagues)
   - Mid-season break
   - International breaks
   - Cup round dates
   - Pre-season friendlies

6. **Database Schema**
   - Competition (id, name, type, country, reputation)
   - Season (competition_id, year, status)
   - CompetitionRound (season_id, name, type)
   - Fixture (round_id, home_team, away_team, date, status)
   - Standing (season_id, team_id, points, gd, etc.)

7. **API Endpoints**
   GET    /competitions                    # All competitions
   GET    /competitions/:id                # Competition details
   GET    /competitions/:id/standings      # Current standings
   GET    /competitions/:id/fixtures       # All fixtures
   GET    /competitions/:id/results        # Past results
   GET    /calendar                        # Your team's calendar
   GET    /calendar/week/:date             # Weekly view

8. **Frontend Components**
   - LeagueTable (sortable, highlighted)
   - FixtureList
   - CalendarView (month/week/day)
   - CupBracket (tournament tree)
   - CompetitionOverview

9. **Season Progression**
   - Process daily/weekly game ticks
   - Advance fixtures
   - Update standings
   - Handle season end (awards, promotion/relegation)

Include support for multiple simultaneous competitions per team.`
      },
      {
        id: "3.4",
        title: "AI Manager System",
        model: "Opus 4.5",
        description: "Implement intelligent AI managers with personalities and decision-making capabilities.",
        prompt: `Implement intelligent AI managers for computer-controlled teams.

This is critical for a believable game world.

Requirements:

1. **AI Manager Personality Types**
   - Pragmatic (balanced approach)
   - Attacking (offensive tactics, attacking signings)
   - Defensive (park the bus, solid defense)
   - Youth-focused (develops young players)
   - Experienced (prefers proven players)
   - Big spender (expensive signings)
   - Thrifty (bargain hunters)

2. **Tactical AI**
   - Select appropriate formation
   - Choose tactics based on opponent
   - Adjust tactics during match
   - Make sensible substitutions
   - In-match adjustments based on score

3. **Transfer AI**
   - Identify squad weaknesses
   - Find suitable targets
   - Make realistic bids
   - Negotiate appropriately
   - Know when to walk away
   - Respond to player offers realistically

4. **Squad Management AI**
   - Rotate squad appropriately
   - Rest players before big games
   - Select strongest team for important matches
   - Manage injured players
   - Promote youth appropriately

5. **Financial AI**
   - Budget allocation
   - Wage structure management
   - Sell players when needed
   - Avoid financial ruin

6. **Decision Making System**
   Create a scoring-based decision system:
   - For each possible action, calculate utility score
   - Consider short-term and long-term impact
   - Include personality bias
   - Add randomness for variety

7. **AI Manager Attributes**
   - Tactical knowledge
   - Man management
   - Youth development
   - Negotiation
   - Determination
   - Adaptability

8. **Career Progression**
   - AI managers can be hired/fired
   - Reputation changes based on results
   - Managers move between clubs
   - Player-manager relationships

9. **Implementation**
   
   class AIManager {
     makeMatchdayDecisions(match: Match): MatchdayDecisions
     evaluateTransferTargets(): TransferTarget[]
     evaluateIncomingOffers(offers: TransferOffer[]): OfferResponse[]
     selectTeamForMatch(match: Match): SelectedTeam
     processDailyDecisions(gameState: GameState): AIAction[]
   }

10. **Balance Testing**
    - AI should compete realistically
    - No perfect information exploitation
    - Mistakes should happen occasionally
    - Variety in approaches

Include extensive testing to ensure AI behaves believably.`
      }
    ]
  },
  {
    id: 4,
    title: "Advanced Features",
    workflows: [
      {
        id: "4.1",
        title: "Scouting & Player Discovery",
        model: "Sonnet 4.5",
        description: "Implement scouting networks, missions, and player knowledge fog-of-war.",
        prompt: `Implement the Scouting system for player discovery.

Requirements:

1. **Scout Staff**
   - Scout attributes: judging ability, judging potential, adaptability
   - Scout knowledge (regions they know well)
   - Scout assignments

2. **Scouting Missions**
   - Scout specific player
   - Scout for position need
   - Scout region/country
   - Scout upcoming opponents
   - Scout next transfer targets

3. **Knowledge System**
   - Unknown players have hidden attributes
   - Scouting reveals attributes over time
   - Scout quality affects accuracy
   - Multiple scouts = faster/better knowledge
   - Uncertainty ranges for partially scouted players

4. **Scout Reports**
   - Player overview
   - Attribute ranges (if not fully scouted)
   - Potential assessment (with confidence)
   - Comparison to current squad
   - Recommendation (sign/avoid/monitor)
   - Value assessment

5. **API Endpoints**
   GET    /scouts                     # List scouts
   POST   /scouts/:id/assign          # Assign mission
   GET    /scouts/:id/reports         # Get reports
   GET    /scouting/shortlist         # Scouted player shortlist
   GET    /players/:id/knowledge      # Your knowledge of a player

6. **Discovery System**
   - Scouts can "discover" unknown talents
   - Youth intake includes scouted prospects
   - Randomized discoveries based on scout quality/location

7. **Frontend Components**
   - ScoutingCenter (dashboard)
   - ScoutAssignment (region map)
   - ScoutReport (detailed player card)
   - ShortlistManager
   - UncertaintyIndicator (shows attribute ranges)

8. **World Knowledge**
   - Some players widely known (high reputation)
   - Others require discovery
   - Opposition reports before matches`
      },
      {
        id: "4.2",
        title: "Media & Press System",
        model: "Sonnet 4.5",
        description: "Implement interactive press conferences and dynamic news generation.",
        prompt: `Implement the Media and Press system for immersion.

Requirements:

1. **Press Conferences**
   - Pre-match conferences
   - Post-match conferences
   - Special events (signings, major news)
   - Questions based on context
   - Response options with consequences

2. **News System**
   - Match reports
   - Transfer news
   - Injury updates
   - Managerial changes
   - League news
   - International news

3. **News Generation**
   - Template-based generation
   - Context-aware (big match, relegation battle, etc.)
   - Multiple writing styles (tabloid vs broadsheet)
   - Headlines and body text

4. **Social Media (optional)**
   - Player/fan reactions
   - Transfer rumors
   - Fan sentiment

5. **Press Conference Questions**
   
   Categories:
   - About upcoming match
   - About recent results
   - About specific players
   - About transfers (rumors, departures)
   - About board/finances
   - Controversial topics

6. **Response System**
   - Multiple response tones: Calm, Passionate, Defensive, Aggressive, Humorous
   - Responses affect: Player morale, fan happiness, media relationships, player relationships

7. **API Endpoints**
   GET    /news                       # News feed
   GET    /news/headlines             # Latest headlines
   GET    /press-conference/:id       # Get conference questions
   POST   /press-conference/:id       # Submit responses

8. **Frontend Components**
   - NewsFeed (scrollable timeline)
   - NewsArticle (full article view)
   - PressConference (interactive Q&A)
   - Headlines (ticker/banner)

Generate realistic, contextual text that enhances immersion.`
      },
      {
        id: "4.3",
        title: "Save & Load System",
        model: "Sonnet 4.5",
        description: "Implement game state serialization, save management, and cloud support.",
        prompt: `Implement a robust Save and Load system.

Requirements:

1. **Save Game Data**
   - Complete game state snapshot
   - All database records
   - Current date/time in game
   - Player club state
   - AI manager states
   - Historical records

2. **Save Types**
   - Manual saves (named by user)
   - Auto-save (configurable frequency)
   - Cloud saves (optional)
   - Multiple save slots

3. **Save Format**
   - Compressed JSON or binary format
   - Encryption for anti-tampering (optional)
   - Version number for migration

4. **Performance**
   - Background saving (non-blocking)
   - Incremental saves where possible
   - Progress indicator
   - Estimated time remaining

5. **Load System**
   - Quick load
   - Load from list
   - Save game browser with previews
   - Corrupted save detection
   - Save migration between versions

6. **Database Strategy**
   - SQLite for local saves?
   - Export/import PostgreSQL data?
   - Consider save file portability

7. **API Endpoints**
   GET    /saves                      # List saves
   POST   /saves                      # Create save
   GET    /saves/:id                  # Get save info
   POST   /saves/:id/load             # Load save
   DELETE /saves/:id                  # Delete save

8. **Frontend Components**
   - SaveGameModal
   - LoadGameScreen
   - SaveSlotList
   - AutosaveIndicator
   - SaveProgressBar

9. **Edge Cases**
   - Save during match
   - Concurrent access (if multiplayer)
   - Disk space management
   - Cloud sync conflicts

Ensure saves are reliable and never corrupt.`
      }
    ]
  },
  {
    id: 5,
    title: "Polish & Optimization",
    workflows: [
      {
        id: "5.1",
        title: "Comprehensive Testing Suite",
        model: "Sonnet 4.5",
        description: "Create unit, integration, and E2E tests for the entire system.",
        prompt: `Create a comprehensive testing suite for the Football Manager game.

Requirements:

1. **Unit Tests** (packages/*/src/**/*.test.ts)
   - Match engine probability calculations
   - Player valuation calculations
   - Training development calculations
   - Standings calculation logic
   - Fixture generation
   - Calendar logic

2. **Integration Tests** (apps/api/src/**/*.integration.test.ts)
   - API endpoint testing
   - Database operations
   - Transaction handling
   - Authentication flows

3. **E2E Tests** (apps/web/e2e/*.spec.ts)
   - User registration/login
   - Start new game
   - Play a match
   - Make a transfer
   - Save and load game
   - Season progression

4. **Game Balance Tests** (packages/game-engine/src/tests/balance/)
   - Simulate 1000 matches, verify realistic score distributions
   - Simulate 10 seasons, verify realistic league outcomes
   - Verify attribute development rates
   - Verify transfer market stability

5. **Performance Tests**
   - Database query performance
   - Match simulation speed
   - Large dataset handling (100k+ players)
   - UI rendering performance

6. **Testing Tools**
   - Vitest for unit/integration tests
   - Playwright for E2E tests
   - Custom simulation harness for balance tests
   - k6 or similar for load testing

7. **CI/CD Integration**
   - Run on every PR
   - Required checks before merge
   - Coverage thresholds
   - Performance regression detection

8. **Test Data**
   - Factories for generating test data
   - Fixtures for common scenarios
   - Seeding scripts for E2E

Include:
- Test configuration files
- GitHub Actions workflow
- Coverage reporting setup
- Example tests for each category`
      },
      {
        id: "5.2",
        title: "Performance Optimization",
        model: "Opus 4.5",
        description: "Optimize database queries, match engine speed, and frontend rendering.",
        prompt: `Optimize the Football Manager game for performance.

Requirements:

1. **Database Optimization**
   - Query analysis and optimization
   - Index optimization
   - Query caching strategy
   - Connection pooling configuration
   - Slow query logging and monitoring
   - Materialized views for complex aggregations

2. **Match Engine Optimization**
   - Profile and identify bottlenecks
   - Optimize hot paths
   - Consider WebAssembly for intensive calculations
   - Batch processing for multiple AI matches

3. **Frontend Optimization**
   - Code splitting strategy
   - Image optimization
   - Lazy loading
   - Virtual scrolling for large lists
   - Memoization strategy
   - Bundle size analysis

4. **Caching Strategy**
   
   Redis caching for:
   - League standings
   - Player search results
   - Competition data
   - Session data
   - Recently accessed players/clubs

5. **Background Processing**
   - Queue system for heavy tasks
   - Process AI decisions asynchronously
   - Batch database updates
   - Background save operations

6. **Memory Management**
   - Efficient data structures
   - Garbage collection optimization
   - Memory leak detection
   - Worker threads for heavy computation

7. **API Optimization**
   - Response compression
   - Efficient serialization
   - Pagination best practices
   - GraphQL consideration for complex queries

8. **Monitoring Setup**
   - Application metrics
   - Database metrics
   - Error tracking (Sentry or similar)
   - Performance dashboards

Provide benchmarks before and after optimization.
Include profiling tools configuration.`
      },
      {
        id: "5.3",
        title: "UI/UX Polish",
        model: "Sonnet 4.5",
        description: "Enhance visual design, animations, accessibility, and responsiveness.",
        prompt: `Polish the UI/UX for a professional game experience.

Requirements:

1. **Design System**
   - Color palette (primary, secondary, success, warning, danger)
   - Typography scale
   - Spacing system
   - Component library completion
   - Dark mode support

2. **Animation & Transitions**
   - Page transitions
   - List animations
   - Loading states
   - Micro-interactions
   - Match event animations

3. **Accessibility**
   - ARIA labels
   - Keyboard navigation
   - Screen reader support
   - Color contrast compliance
   - Focus indicators

4. **Responsive Design**
   - Desktop layout (primary)
   - Tablet layout
   - Mobile layout (functional)
   - Touch-friendly interactions

5. **Loading & Empty States**
   - Skeleton loaders
   - Empty state illustrations
   - Error state designs
   - Progress indicators

6. **Feedback Systems**
   - Toast notifications
   - Confirmation dialogs
   - Form validation
   - Success animations

7. **Navigation**
   - Clear information hierarchy
   - Breadcrumbs where needed
   - Quick actions
   - Keyboard shortcuts

8. **Game-specific UI**
   - Match day atmosphere
   - Transfer deadline tension
   - Season culmination visuals
   - Achievement celebrations

9. **Sound Design** (optional)
   - UI feedback sounds
   - Match ambient sounds
   - Notification sounds
   - Toggle on/off

Create a cohesive, professional gaming experience.`
      },
      {
        id: "5.4",
        title: "Game Balance & Tuning",
        model: "Opus 4.5",
        description: "Fine-tune match engine probabilities, financial models, and AI behavior.",
        prompt: `Fine-tune game balance for realistic and enjoyable gameplay.

Requirements:

1. **Match Engine Balance**
   - Score distributions (verify against real football data)
   - Home advantage effect (actual: ~46% home wins)
   - Draw frequency (actual: ~25%)
   - Goals per game distribution
   - Clean sheet frequency
   - Comeback frequency

2. **Attribute Impact Analysis**
   - Verify each attribute meaningfully affects gameplay
   - No overpowered attributes
   - Balanced positions (defenders can be as valuable as attackers)

3. **Player Development Balance**
   - Realistic development curves
   - Reasonable wonderkid frequency
   - Appropriate decline rates
   - Training impact at right level

4. **Transfer Market Balance**
   - Realistic price ranges by league
   - AI spending patterns
   - Wage inflation over time
   - Bargain availability
   - Market boom/bust cycles

5. **Competition Balance**
   - Realistic league winner variety
   - Upset frequency in cups
   - Appropriate Champions League outcomes
   - Relegation battle realism

6. **Financial Balance**
   - Sustainable clubs should survive
   - Big spending has appropriate risk
   - Revenue growth rates
   - Prize money impact

7. **Difficulty Levels**
   - Easy: More player development, cheaper transfers, AI mistakes
   - Normal: Balanced simulation
   - Hard: Tougher AI, realistic development, harder transfers
   - Extreme: Maximum challenge

8. **Testing Methodology**
   - Run 100 season simulations
   - Compare to real-world data
   - Statistical analysis
   - Adjust coefficients
   - Re-test

9. **Tuning Parameters**
   - Create configuration file for all tunable values
   - Document expected effects
   - A/B testing capability

Provide a comprehensive balance report with real-world comparisons.`
      }
    ]
  },
  {
    id: 6,
    title: "Deployment & Launch",
    workflows: [
      {
        id: "6.1",
        title: "DevOps & Infrastructure",
        model: "Sonnet 4.5",
        description: "Set up CI/CD, Docker containers, Kubernetes/Cloud infrastructure.",
        prompt: `Set up production infrastructure and deployment pipeline.

Requirements:

1. **Infrastructure as Code**
   - Terraform or Pulumi configuration
   - AWS / GCP / Azure setup (pick one)
   - VPC, subnets, security groups
   - RDS PostgreSQL
   - Redis (ElastiCache or similar)
   - CDN for static assets

2. **Container Setup**
   - Dockerfile for API
   - Dockerfile for Web (or static build)
   - Docker Compose for local development
   - Container registry setup

3. **Kubernetes Configuration** (optional)
   - Deployment manifests
   - Service definitions
   - Ingress configuration
   - HPA for scaling
   - Secrets management

4. **CI/CD Pipeline**
   - GitHub Actions workflow
   - Build and test stages
   - Docker build and push
   - Deployment automation
   - Environment promotion (staging → production)
   - Rollback capability

5. **Environment Configuration**
   - Development
   - Staging
   - Production
   - Environment-specific variables

6. **Monitoring & Logging**
   - Application logs (structured)
   - Log aggregation (CloudWatch, Datadog, etc.)
   - APM setup
   - Alerting rules
   - Dashboard creation

7. **Security**
   - SSL/TLS certificates
   - Security headers
   - Rate limiting
   - DDoS protection
   - Secrets management
   - Vulnerability scanning

8. **Backup Strategy**
   - Database backups
   - Point-in-time recovery
   - Backup testing
   - Disaster recovery plan

9. **Cost Optimization**
   - Right-sizing instances
   - Reserved capacity
   - Cost monitoring
   - Auto-scaling policies

Provide complete, production-ready configurations.`
      },
      {
        id: "6.2",
        title: "Documentation & Onboarding",
        model: "Sonnet 4.5",
        description: "Write developer guides, API docs, and player manuals.",
        prompt: `Create comprehensive documentation for the Football Manager game.

Requirements:

1. **Player Documentation**
   - Game manual / user guide
   - Tutorial system (in-game)
   - FAQ
   - Tips and strategies

2. **Developer Documentation**
   - Architecture overview
   - Setup guide (local development)
   - API documentation (OpenAPI/Swagger)
   - Database schema documentation
   - Code style guide
   - Contribution guidelines

3. **In-Game Tutorial**
   - First-time user onboarding
   - Feature discovery tooltips
   - Interactive tutorials for:
     - Playing a match
     - Making a transfer
     - Setting tactics
     - Managing training

4. **README Files**
   - Root README with project overview
   - Package-specific READMEs
   - Example configurations

5. **API Documentation**
   - OpenAPI specification
   - Interactive API explorer
   - Request/response examples
   - Error code reference

6. **Changelog**
   - Version history
   - Update notes format
   - Migration guides

7. **Documentation Site**
   - Docusaurus or similar setup
   - Search functionality
   - Version selector
   - Code examples

Generate comprehensive, maintainable documentation.`
      }
    ]
  }
];