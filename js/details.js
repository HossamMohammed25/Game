
import { Ui } from "./uigames.js";

export class Details {
   constructor(id) {
      this.ui = new Ui();

      document.getElementById("btnClose").addEventListener("click", () => {
         document.querySelector(".games").classList.remove("d-none");
         document.querySelector(".details").classList.add("d-none");

      });

      this.getDetails(id);
   }

   getDetails(idGames) {
      const spinner = document.querySelector(".spinner");
      spinner.classList.remove("d-none");

      const options = {
         method: 'GET',
         headers: {
            'x-rapidapi-key': '79a1cda879msh7c0917740a55f25p14e9ddjsnf7667d065101',
            'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
         }
      };

      fetch(`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${idGames}`, options)
         .then((response) => response.json())
         .then((response) => this.ui.displayDetails(response))
         .catch((err) => console.error(err))
         .finally(() => {
            spinner.classList.add("d-none");
         });
   }
}
