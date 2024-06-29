import { Details } from "./details.js";
import { Ui } from "./uigames.js";

export class Games {
   constructor() {
      this.getGames("mmorpg");

      document.querySelectorAll(".nav-link").forEach((link) => {
         link.addEventListener("click", (e) => {
            document.querySelector(".menu .active").classList.remove("active");
            e.target.classList.add("active");
            this.getGames(e.target.dataset.category);
         });
      });

      this.ui = new Ui();
   }

   async getGames(category) {
      const spinner = document.querySelector(".spinner");
      spinner.classList.remove("d-none");
      const options = {
         method: 'GET',
         headers: {
            'x-rapidapi-key': '79a1cda879msh7c0917740a55f25p14e9ddjsnf7667d065101',
            'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
         }
      };

      const api = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`, options);
      const response = await api.json();

      this.ui.displayGame(response);
      this.startEvent();
      spinner.classList.add("d-none");
   }

   startEvent() {
      document.querySelectorAll(".card").forEach((item) => {
         item.addEventListener("click", () => {
            const id = item.dataset.id;
            this.showDetails(id);
         });
      });
   }

   showDetails(gameID) {
      const details = new Details(gameID);
      document.querySelector(".games").classList.add("d-none");
      document.querySelector(".details").classList.remove("d-none");
   }
}
