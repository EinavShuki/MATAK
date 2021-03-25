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
  purple,
} from "@material-ui/core/colors/";

export const STATUSES = {
  beingCreated: {
    name: "Being-Created",
    color: purple[500],
  },
  submitted: {
    name: "Submitted",
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
