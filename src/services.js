import moment from "moment-timezone";
import jsonfile from "jsonfile";
import simpleGit from "simple-git";

import {Nodes} from "./constant.js";

const FILE_PATH = "./src/data.json";
const git = simpleGit();

moment.tz.setDefault("Asia/Ho_Chi_Minh");

export const draw = async () => {
  for (let x = 14; x < 16; x++) {
    for (let y = 0; y < 7; y++) {
      if(Nodes.filter(e => e.x === x).map(m => m.y).includes(y)) {
        for (let z = 0; z < 100; z++) {
          await makeCommit(x, y);
        }
      }
    }
  }

  await git.push();
};

export const makeCommit = async (x, y) => {
  const weekday = moment().weekday();
  const date = moment()
    .subtract(weekday, "d")
    .subtract(1, "y")
    .add(1, "d")
    .add(x, "w")
    .add(y, "d")
    .format();

  const commit = moment(date).format("DD/MM/yyyy HH:mm:ss");
  console.log("date", commit);
  await jsonfile.writeFile(FILE_PATH, {date: `${date} ${Math.random()}`});
  await git.add("*").commit(commit, {"--date": date});
};

export const resetNCommit = (key) =>
  git.fetch()
    .reset(["--hard", `${key}`])
    .add("*")
    .commit("reset")
    .push(["-f"]);
