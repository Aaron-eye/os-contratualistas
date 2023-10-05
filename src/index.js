import getImagesInFolder from "./utils/getImagesInFolder.js";

const leaderLinks = document.querySelector(".leader-links");

const leaderSection = document.querySelector(".leader-section");

const leaderImage = document.querySelector(".leader-image");
const leaderNameContainer = document.querySelector(".leader-name");
const activesContainer = document.querySelector(".actives-container");
const positivePassiveContainer = document.querySelector(".positive-passive");
const negativePassiveContainer = document.querySelector(".negative-passive");

const argumentsContainer = document.querySelector(".arguments-container");
const thinkersContainer = document.querySelector(
  ".thinkers-with-effect-container"
);
const thinkersWithoutEffectContainer = document.querySelector(
  ".thinkers-without-effect-container"
);

const goToLeaderSection = () => {
  leaderSection.scrollIntoView({
    behavior: "smooth",
  });
};

const loadLeader = async function () {
  let currentLeader = window.location.hash.slice(1);
  if (currentLeader == "") currentLeader = "john-locke";

  fetch(`data/leaders/${currentLeader}/${currentLeader}.json`)
    .then((response) => response.json())
    .then(async (data) => {
      leaderImage.src = `img/leaders/${currentLeader}/${currentLeader}.gif`;

      leaderNameContainer.innerHTML = data.name;

      const actives = data.activeAbilities;
      Array.from(activesContainer.children).forEach((child, i) => {
        const activeTitle = document.createElement("p");
        activeTitle.innerHTML = actives[i].name;
        activeTitle.classList.add("ability-name");

        const activeDescription = document.createElement("p");
        activeDescription.innerHTML = actives[i].description;
        activeDescription.classList.add("ability-description");

        child.innerHTML = "";
        child.insertAdjacentElement("beforeend", activeTitle);
        child.insertAdjacentElement("beforeend", activeDescription);
      });

      const positivePassive = data.passiveAbilities.positivePassive;

      const passiveTitle = document.createElement("p");
      passiveTitle.innerHTML = positivePassive.name;
      passiveTitle.classList.add("ability-name");

      const passiveDescription = document.createElement("p");
      passiveDescription.innerHTML = positivePassive.description;
      passiveDescription.classList.add("ability-description");

      positivePassiveContainer.innerHTML = "";
      positivePassiveContainer.insertAdjacentElement("beforeend", passiveTitle);
      positivePassiveContainer.insertAdjacentElement(
        "beforeend",
        passiveDescription
      );

      negativePassiveContainer.innerHTML =
        data.passiveAbilities.negativePassive.description;

      const addDeckImages = async function (folder, container) {
        container.innerHTML = "";
        const imagesPaths = await getImagesInFolder(
          `/img/leaders/${currentLeader}/${folder}`
        );

        console.log(imagesPaths);
        for (const cardImagePath of imagesPaths) {
          const cardImg = document.createElement("img");
          cardImg.src = cardImagePath;
          cardImg.alt = cardImagePath.split("/").at(-1).slice(0, -4);
          /*const cardImgContainer = document.createElement("div");
          cardImgContainer.appendChild(cardImg);*/

          container.insertAdjacentElement("beforeend", cardImg);
        }
      };

      addDeckImages("arguments", argumentsContainer);
      addDeckImages("thinkers/with-effect", thinkersContainer);
      addDeckImages("thinkers/without-effect", thinkersWithoutEffectContainer);
    })
    .catch((error) => console.error("Erro ao carregar o JSON: ", error));
};

document.addEventListener("DOMContentLoaded", loadLeader);
window.addEventListener("hashchange", loadLeader);

leaderSection.addEventListener("click", goToLeaderSection);
Array.from(leaderLinks.getElementsByTagName("a")).forEach((link) => {
  link.addEventListener("click", goToLeaderSection);
});
