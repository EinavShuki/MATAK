import {
  red,
  yellow,
  orange,
  teal,
  pink,
  grey,
  blue,
  green,
  blueGrey,
} from "@material-ui/core/colors/";

export const STATUSES = {
  submmited: {
    name: "Submmited",
    color: blue[500],
  },
  recived: {
    name: "Recived",
    color: yellow[500],
  },
  changes: {
    name: "Changes Required",
    color: orange[500],
  },
  approved: {
    name: "Approved",
    color: green[500],
  },
  denied: {
    name: "Denied",
    color: red[500],
  },
  completed: {
    name: "Completed",
    color: teal[500],
  },
  canceled: {
    name: "Canceled",
    color: grey[500],
  },
  suspended: {
    name: "Suspended",
    color: pink[500],
  },
  permanent: {
    name: "Permanent",
    color: blueGrey[500],
  },
};
