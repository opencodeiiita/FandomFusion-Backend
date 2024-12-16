# FandomFusion-Backend

Welcome to **FandomFusion** – your gateway to exploring, curating, and sharing the worlds you love most! Whether you're an anime aficionado, a gaming guru, or a movie maniac, this project is all about celebrating your fandoms and connecting with others who share your passion.

## 📚 Table of Contents

-   [Features](#-features)
-   [Tech Stack](#-tech-stack)
-   [Dependencies](#-dependencies)
-   [How To Setup](#️-how-to-setup)
-   [Reference Links](#-reference-links)
-   [Directory Structure](#-directory-structure)
-   [Claim an Issue](#-claim-an-issue)
-   [Communication](#-communication)
-   [Contribution Guidelines](#-contribution-guidelines)
-   [Mentors](#-mentors)

## 🌐 Features

-   **Search Across Public APIs**: Dive into your favorite universes! Search for anime, games, and movies using integrated public APIs. Powered by RAWG, Jikan, and TMDB, FandomFusion ensures you’re always up-to-date with the latest trends.

-   **Custom List Creation**: Craft your ultimate fan lists. Whether it’s top anime battles, iconic game soundtracks, or unforgettable movie twists, create personalized collections and rate each item like the true connoisseur you are. Share your lists with fellow fans and spread the love!

-   **Social Interaction**: Connect and collaborate with fellow superfans. Follow others to keep up with their curated lists, chat directly on the platform, and build a community around your shared fandoms. Let’s unite the fandom universe!

-   **Dynamic and Responsive User Interface**: FandomFusion’s sleek, modern design looks stunning across all your devices, so you can enjoy exploring your fandoms wherever you are.

-   **Home Page Highlights**:
    -   Discover what’s trending now in anime, games, and movies with real-time updates.
    -   Explore curated recommendations designed to help you uncover hidden gems.

-   **Top Picks of All Time**:
    -   Browse all-time greats from every corner of fandom culture. From top-rated anime to groundbreaking games and legendary movies, find what truly defines each medium.
    -   Filter by genre, year, or ratings for a tailored experience.

-   **Comprehensive Search Filters**: Zero in on exactly what you’re looking for with filters like genre, release date, rating, and popularity. 

-   **User Profiles**: Show off your fandom cred! Display your activity, curated lists, and follower stats. Explore other users’ profiles to find inspiration or your next binge-worthy series.

## ⚡ Tech Stack

-   **Backend:** Node.js, Express.js
-   **Database:** MongoDB (via Mongoose)
-   **APIs:**
    -   [RAWG API](https://api.rawg.io/docs/) for games
    -   [Jikan API](https://docs.api.jikan.moe/) for anime
    -   [TMDB API](https://developer.themoviedb.org/reference/intro/getting-started) for movies

## 📦 Dependencies

To bring this fandom experience to life, you’ll need **npm** or **yarn** installed.

## 🛠️ How To Setup

1. Make sure you have an active internet connection – we’re diving deep into fandoms, after all!
2. Fork this repository to your GitHub account.
3. Clone your forked repository:

   ```bash
   git clone <forked-repo-link>
   ```

4. Navigate into the project directory:

   ```bash
   cd FandomFusion-backend
   ```

5. Install all necessary dependencies:

   ```bash
   npm install
   ```

6. Set up your environment variables by creating a `.env` file in the root directory. Use `.env.example` as your guide.

7. Start the development server:

   ```bash
   npm start
   ```

8. You’re ready to explore! Access the backend application on `localhost:4000`.

## 🔗 Reference Links

### APIs

-   [RAWG API Documentation](https://api.rawg.io/docs/)
-   [Jikan API Documentation](https://docs.api.jikan.moe/)
-   [TMDB API Documentation](https://developer.themoviedb.org/reference/intro/getting-started)

### Tools

-   [Download Git](https://git-scm.com/downloads)
-   [Set up Node.js](https://nodejs.org/en/blog/release/)

## 📁 Directory Structure

```bash
.
├── API_ENDPOINTS.md
├──.github
│   └── PULL_REQUEST_TEMPLATE.md
├── app.js
├── CONTRIBUTORS.md
├── package.json
├── package-lock.json
├──.env.example
├── README.md
└── src
    ├── config
    │   └── db.config.js
    ├── controllers
    ├── middlewares
    ├── routes
    └── utils
    └── models
        ├── anime.model.js
        ├── game.model.js
        └── list.model.js
        └── movie.model.js
        └── user.model.js

```
> [!NOTE]
> Adding new files? Make sure to add them here too – let’s keep it tidy and helpful for new contributors.

## 👆 Claim an Issue

Comment on the issue to claim it. If there’s no activity on your claim after two days, it may be reassigned to another contributor. Stuck? Ask for help on our Discord channel – no fan gets left behind!

-   Don’t forget to make your entry in the [CONTRIBUTORS](CONTRIBUTORS.md) file before submitting your PR.

## 💻 Communication

Building fandom magic together means staying connected. Whether you’re brainstorming new features or have a question, reach out on our [Discord](https://discord.gg/YcUxtezg) channel. We’re here to help, and we can’t wait to hear your ideas!

## 📋 Contribution Guidelines

We’re passionate about fostering a friendly and welcoming environment for all contributors. Let’s focus on what matters most – our shared love for fandoms and great code quality.

-   **People first**: Be respectful and patient. We’re all here because of our shared passion.
-   **Commit with purpose**: Name your commits meaningfully and reference relevant issue numbers. Follow the [PR template](.github/PULL_REQUEST_TEMPLATE.md).
-   **Show, don’t just tell**: Screenshots or short videos can make reviews smoother.
-   **Avoid duplicate PRs**: If necessary, comment on the older PR with the follow-up PR number and close the obsolete one.
-   **Three-day rule**: PRs inactive for more than three days may be closed.
-   Make sure you have [Prettier](https://prettier.io/) installed, can be installed as an extension in most IDEs and Code Editors.

Let’s create something amazing together. 🌟

## 🤝 Mentors

1.  **Arpit Anand**  
    _Opencode Bot Wizard and Anime Enthusiast_  
    `GitHub:` [Buddha-11](https://github.com/Buddha-11)  
    `Discord:` buddha__  

## 💪 Thanks To All Contributors

Every contributor is a part of our fandom family. Show off your profile picture here and let the world know you’re part of the magic:

<div align="left">
    <!-- FORMAT TO ADD YOUR ENTRY
    <a href="https://github.com/<GITHUB_USERNAME>" title="<GITHUB_USERNAME>">
        <img src="https://github.com/<GITHUB_USERNAME>.png" width="70px" style="border-radius: 50%" alt="<FULL_NAME>">
    </a>
    replace <GITHUB_USERNAME> with your GitHub username
    replace <FULL_NAME> with your full name
    -->
    <a href="https://github.com/Buddha-11" title="Arpit Anand">
        <img src="https://github.com/Buddha-11.png" width="70px" alt="Arpit Anand">
    </a>
</div>

Join us and let’s celebrate fandoms together!
