import moment from "moment-timezone";
import {draw} from "./services.js";

moment.tz.setDefault("Asia/Ho_Chi_Minh");

draw();
