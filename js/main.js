// list of months in short format
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

/**
 * Get a formatted date from the repo updatedAt value
 * @param {string} date
 * @param {boolean} full
 * @returns {string}
 */
const getDate = (date, full = false) => {
  const d = new Date(date);

  const m = d.getUTCMinutes();
  const h = d.getUTCHours();

  const mn = months[d.getMonth()];
  const dt = d.getDate();

  const toDoubleFigure = (n) => (n.toString().length > 1 ? n : `0${n}`);
  const pm = +h > 12;

  if (full)
    return `${mn} ${dt}, ${d.getFullYear()}, ${
      pm ? toDoubleFigure(h % 12) : toDoubleFigure(h)
    }:${toDoubleFigure(m)} ${pm ? "PM" : "AM"} GMT 11`;
  return `${mn} ${dt}`;
};

/**
 * Template for individual repo list item
 * @param {object} repoObject
 */

const template = ({
  name,
  isPrivate,
  isFork,
  parent,
  nameWithOwner,
  description,
  primaryLanguage,
  licenseInfo,
  updatedAt,
}) => `
    <li>
        <div class="left">
            <div class="first">
                <h3>
                    <a href="https://github.com/${nameWithOwner}">${name}</a>
                    ${isPrivate ? "<span>Private</span>" : ""}
                </h3>
                ${
                  isFork
                    ? `<span> 
                            Forked from 
                            <a href="https://github.com/${
                              parent ? parent.nameWithOwner : nameWithOwner
                            }">${parent ? parent.nameWithOwner : ""}</a>
                        </span>`
                    : ""
                }
            </div>
            ${
              description
                ? `<div class="desc">
                <p>${
                  description.includes(":rocket:")
                    ? description.replace(":rocket:", "🚀")
                    : description
                }</p>
            </div>`
                : ""
            }
            <div class="last">
                <span class="lang">
                    <span class="lang-color" style="background:${
                      primaryLanguage ? primaryLanguage.color : ""
                    }"></span>
                    <span class="lang-text">${
                      primaryLanguage ? primaryLanguage.name : ""
                    }</span>
                </span>
                ${
                  isFork
                    ? `<a href="https://github.com/${nameWithOwner}/network/members" class="forks">
                    <svg aria-label="fork" viewBox="0 0 16 16" version="1.1" width="16" height="16" role="img"><path fill-rule="evenodd" d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"></path></svg>
                    ${parent.forkCount}
                </a>`
                    : ""
                }
                ${
                  licenseInfo
                    ? `<span class="license">
                    <svg viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M8.75.75a.75.75 0 00-1.5 0V2h-.984c-.305 0-.604.08-.869.23l-1.288.737A.25.25 0 013.984 3H1.75a.75.75 0 000 1.5h.428L.066 9.192a.75.75 0 00.154.838l.53-.53-.53.53v.001l.002.002.002.002.006.006.016.015.045.04a3.514 3.514 0 00.686.45A4.492 4.492 0 003 11c.88 0 1.556-.22 2.023-.454a3.515 3.515 0 00.686-.45l.045-.04.016-.015.006-.006.002-.002.001-.002L5.25 9.5l.53.53a.75.75 0 00.154-.838L3.822 4.5h.162c.305 0 .604-.08.869-.23l1.289-.737a.25.25 0 01.124-.033h.984V13h-2.5a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-2.5V3.5h.984a.25.25 0 01.124.033l1.29.736c.264.152.563.231.868.231h.162l-2.112 4.692a.75.75 0 00.154.838l.53-.53-.53.53v.001l.002.002.002.002.006.006.016.015.045.04a3.517 3.517 0 00.686.45A4.492 4.492 0 0013 11c.88 0 1.556-.22 2.023-.454a3.512 3.512 0 00.686-.45l.045-.04.01-.01.006-.005.006-.006.002-.002.001-.002-.529-.531.53.53a.75.75 0 00.154-.838L13.823 4.5h.427a.75.75 0 000-1.5h-2.234a.25.25 0 01-.124-.033l-1.29-.736A1.75 1.75 0 009.735 2H8.75V.75zM1.695 9.227c.285.135.718.273 1.305.273s1.02-.138 1.305-.273L3 6.327l-1.305 2.9zm10 0c.285.135.718.273 1.305.273s1.02-.138 1.305-.273L13 6.327l-1.305 2.9z"></path></svg>
                    ${licenseInfo.name}
                </span>`
                    : ""
                }
                <span class="updated" title="${getDate(
                  updatedAt,
                  true
                )}">Updated on ${getDate(updatedAt)}</span>
            </div>
        </div>
        <div class="right">
            <button>
                <svg height="16" viewBox="0 0 16 16" version="1.1" width="16" aria-hidden="true"><path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path></svg>
                <span>Star</span>
            </button>
        </div>
    </li>
    `;

const fetchRepoData = async () => {
  try {
    const url = "https://api.github.com/graphql";
    const token =
      document.querySelector("#token-half-1").value +
      document.querySelector("#token-half-2").value;
    const query = `
      query {
          viewer {
              repositories(first: 20, orderBy: { field:UPDATED_AT, direction:DESC}) {
                nodes {
                    name
                    description
                    isPrivate
                    isFork
                    nameWithOwner
                    parent {
                      nameWithOwner
                      forkCount
                    }
                    primaryLanguage {
                      name
                      color
                    }
                    licenseInfo {
                       name
                    }
                    updatedAt
                  }
              }
          }
      }
      `;

    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify({ query }),
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const { data } = await res.json();

    if (!data) {
      throw new Error("Something went horribly wrong!");
    }

    return data.viewer.repositories.nodes;
  } catch (e) {
    throw e;
  }
};

/**
 * Displays the repos data using a repo template on the UI
 * @param {array} repos
 * @returns {void}
 */

const populateUIWithRepos = (repos) => {
  document.querySelector("#repos-container").innerHTML = repos
    .map((repo) => template(repo))
    .join("");
};

/**
 * Displays error message on the UI if there's an error
 * @param {string} errMessage
 */
const populateUIWithError = (errMessage) => {
  document.querySelector(
    "#repos-container"
  ).innerHTML = `<div class="error-box">Oops! ${errMessage}</div>`;
};

/**
 * Asynchronously fetch repos and load the data to UI
 */
const initRepoUI = async () => {
  try {
    const repos = await fetchRepoData();
    populateUIWithRepos(repos);
  } catch (e) {
    populateUIWithError(e.message);
  }
};

// mini header (second nav - sticky) visibility handler
const showMiniHeader = () => {
  const miniHeader = document.querySelector("#mini-nav-logo");
  if (window.scrollY > 380 && window.innerWidth > 800) {
    miniHeader.classList.add("show");
  } else {
    miniHeader.classList.remove("show");
  }
};

// small screen menu toggle handler
const showMiniNav = () => {
  document.querySelector("#nav-sm").classList.toggle("show-sm-flex");
};

// Event listeners
window.addEventListener("scroll", showMiniHeader);
window.addEventListener("load", initRepoUI);
document.querySelector("#nav-opener-sm").addEventListener("click", showMiniNav);
