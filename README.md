<h1 align="center" style="font-weight: bold;">Event Breeze 🌦️</h1>

<p align="center">
<a href="#tech">Technologies</a> |
<a href="#started">Getting Started</a> |
<a href="#author">Authorship</a>
</p>

<p align="center">
  Event Breeze is a final project for the T-Academy course. Made with Angular, it is an application where users can register or purchase events, with support for real-time weather forecasts, integrations with Google Cloud API's and LLM's.
</p>

<p align="center">
<a href="https://github.com/BarucBM/TCC_T-Academy_BackEnd">🤖 Discover the backend API</a>
</p>

<h3 align="center" style="font-style: italic;">Successful events start with accurate forecasts</h3>

<h2 id="technologies">💻 Technologies</h2>

- Angular 18
- PrimeNG
- Google Authentication
- Google Maps API Integration
- Google Calendar API Integration
- OpenWeatherMap API Integration

<h2 id="started">🚀 Getting started</h2>

<h3>Cloning the repository</h3>

Run the following command to clone the repository:

```bash
git clone https://github.com/BarucBM/TCC_T-Academy_FrontEnd.git
```

<h3>Configuration</h2>

The `environment.development.ts` configuration file in the `src/environments` folder must be created and configured with the
information from your credentials before you run the application.

```typescript
// 📁 src/environments/environment.development.ts

export const environment = {
  production: false,
  googleMapsApiKey: 'YOUR-API-KEY',
  googleLoginClientId: 'YOUR-API-KEY'
};
```
After that, you can run the following command to start the application:

```terminal
cd [PROJECT NAME]
ng serve
```

The application will start at http://localhost:4200/

<h3>Further help</h3> 

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.0.

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

<h2 id="author">✍🏻 Authorship</h2>

- Baruc Moreira (https://github.com/BarucBM)
- Isaque Barisch (https://github.com/isaquebarisch)
- Júlia Montibeler (https://github.com/julia-montibeler)
- Letícia Borchardt (https://github.com/leticiaborchardt)