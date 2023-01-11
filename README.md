<h1 align=center>LcsAnimeList</h1>
<br>

<p align="center">
  Original <a href="https://www.behance.net/gallery/159069253/LcsAnimeList">design</a> which was created by <a href="https://www.linkedin.com/in/raqueluiux2004/" >RaquelGomes</a> by my request.
</p>

<p><img align="center" src="https://github.com/LcsGomes94/lcsanimelist/blob/main/LcsAnimeList.gif" alt="gif"/></p>
<br>

<strong>Main technologies used:</strong> <i>NextJS, Typescript, TailwindCSS.</i>

<strong>A few of the React/Next Hooks used:</strong> <i>useEffect, useState, useRef, useContext, useRouter, custom Hooks...</i>
<br>
<strong>A few of the implemented libraries:</strong> <i>ReactQuery, NextAuth, Zod...</i>

<strong>Development Details:</strong><ul>
  <li>90% of the site was developed using a figma prototype as parameter, the other 10% was improvised due to missing pieces.</li>
  <li>Data is being fetched from MyAnimeList API.</li>
  <li>Implemented infinity scrolling using ReactQuery hook useInfinityQuery and IntersectionObserver API.</li>
  <li>Implemented a search function using useQuery and useInfinityQuery hooks from ReactQuery.</li>
  <li>Implemented a search history / search hint youtube alike using useQuery and LocalStorage.</li>
  <li>Implemented dark/light theme toggle using TailwindCSS and saving user preference to Local Storage.</li>
  <li>Implemented menu toggle to make sidebar smaller on desktop size by removing labels.</li>
  <li>Implemented GitHub auth using NextAuth.</li>
  <li>Search history and favorited animes are saved on Local Storage and linked to the logged user.</li>
  <li>Used Zod to create schemas for the datas fetched from the API.</li>
  <li>Added a fade at the beggining and at the end of Genre Filter Group when scrolls gets activated.</li>
  <li>Created skeletons and added transitions to avoid layout shift as much as possible.</li>
  <li>100% responsive. Developed to work and look good in every aspect ratio and device.</li>
</ul>

<strong>What you will see:</strong><ul>
  <li>Searchbar for finding animes by name.</li>
  <li>Dark/Light Theme toggle.</li>
  <li>Infinity scrolling.</li>
  <li>Search History / Search Hint.</li>
  <li>Genre Filter Dropdown, Order By Dropdown, Season Picker Dropdown, Genre Filter Group.</li>
  <li>Quantity of animes being showed on the page on the top right side.</li>
  <li>Add/Remove Favorite button on Home, Seasonal and Watch List pages cards.</li>
  <li>Button to open Move Modal on Watch List page cards.</li>
  <li>Button to open Edit Modal on Finished and Dropped pages cards.</li>
  <li>Move Modal and Edit Modal with Tier Dropdown, Custom Radio Buttons, Textarea...</li>
  <li>Login/Logout button.</li>
  <li>Login Modal and Search Modal on mobile screen size.</li>
  <li>Menu Size Toggle on desktop screen size.</li>
  <li>Different Sidebar style and position depending on screen size.</li>
  <li>Different Header style depending on screen size.</li>
  <li>Favorites and Search History saved on Local Storage filtered by user.</li>
</ul>
<br>
<br>

<strong>Try it yourself: [LcsAnimeList](https://lcsanimelist.vercel.app/)</strong>

<hr>

<strong>Made by [LcsGomes](https://www.linkedin.com/in/lcsdev94/)</strong>
