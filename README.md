# Full-Stack Developer Bootcamp Module 06 - Challenge: Weather Dashboard

## Table of Contents

- [Description](#description)
- [Install](#install)
- [Usage](#usage)
- [Generator](#generator)
- [Badge](#badge)
- [Credit and Source Code](#credits-and-code-source)
- [Related Efforts](#related-efforts)
- [Maintainers](#maintainers)
- [Contributing](#contributing)
- [License](#license)
- [Tests](#tests)
- [GitHub Pages Location](#github-pages-location)
- [Application Screenshots](#application-screenshots) 


## Description

The Weather Dashboard is a browser-based application that enables Users to view current Weather and multi-day Weather Forecasts for User-selected Cities in the United States, and maintain a search history of frequently-searched City locations for quick refresh of Weather information.

The Dashboard places accurate, timely Weather information at Users' fingertips, utilizing the industry-leading Weater information of OpenWeather through responsive through flexible OpenWeather APIs.

As developed, the Weather Dashboard is only accessible through a local instance, specific to each accessing computer.

Weather Dashboard data is "live," through active refreshes using OpenWeather APIs, but historical location Searches, are held in the Local Storage and, consequently, not currently accessible through the Web.

The Weather Dashboard source code is published on GitHub, and may be cloned to individual User computers to instantiate local versions.

Weather Dashboard historical location Searches are recorded through a City search entry form availabe in the Dashboard itself and aggregated and displayed in the Dashboard sidebar UI.

The app utlizes an HTML-based Form to ingest User search input, JavaScript to push location Searches to Local Storage, and dynamically update the Dashboard with new Search locations, and CSS to style the site. JavaScript is also used to drive OpenWeather API calls, and responsive behavior, such as Search history display updates.

Because the Weather Dashboard is held in Local Storage, location Search entries will persist across User sessions on individual, hosting computers.


## Installation

The Weather Dashboard source code may be downloaded from its GitHub repository, and run directly by a hosting computer.

No Installation of the Weather Dashboard is required; the app is fully browser-based, accessed through any modern browser that supports JavaScript.


## Usage

The Weather Dashboard is intended for use by one or more Users to view personalized Weather information specific to User-selected locations (Cities) and maintain a quick-access history of location Searches that will be held locally, persisting across multiple sessions. 

All Users of the Weather Dashboard on a local computer will have full visibility to all Dashboard location Searches.


## Credits and Code Source

Code, where referenced from a third-party Source, is noted in Comments accompanying the relevant Code lines.


## License

Copyright <YEAR> <COPYRIGHT Chris Milazzo>


MIT License

Copyright (c) 2024 MeanderingBrook

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.


## Badges

N / A


## Features

N / A


## How to Contribute

N / A


## Tests

JavaScript-created Dashboard presentation of Weather serach entries as &lt;ul&gt; to confirm searchHistory (Array) update.

`console.log` output of OpenWeather API data specific to called locations and Search history data on Search requests; see script.js.


## GitHub Pages Location




## Application Screenshots

![Weather Dashboard: Empty Dashboard Screenshot](./assets/images/Weather-Dashboard_Empty-Dashboard_Screenshot.png?raw=true "Weather Dashboard: Empty Dashboard")

![Weather Dashboard: Populated Dashboard Screenshot 01 - San Francisco](./assets/images/Weather-Dashboard_Populated-Dashboard_Screenshot-01.png?raw=true "Weather Dashboard: Populated Dashboard  - San Francisco")

![Weather Dashboard: Populated Dashboard Screenshot 02 - Des Moines](./assets/images/Weather-Dashboard_Populated-Dashboard_Screenshot-02.png?raw=true "Weather Dashboard: Populated Dashboard  - Des Moines")

![Weather Dashboard: Populated Dashboard Screenshot 03 - Miami](./assets/images/Weather-Dashboard_Populated-Dashboard_Screenshot-03.png "Weather Dashboard: Populated Dashboard  - Miami")