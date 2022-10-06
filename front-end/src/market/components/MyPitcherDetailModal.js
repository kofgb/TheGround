import { Row } from "react-bootstrap";
import Radar from "./Radar";

import style from "../css/MyPitcherDetailModal.module.css";

const PitcherDetailModal = (props) => {
  const data = [
    {
      taste: "fruity",
      chardonay: 30,
    },
    {
      taste: "bitter",
      chardonay: 41,
    },
    {
      taste: "heavy",
      chardonay: 20,
    },
    {
      taste: "strong",
      chardonay: 114,
    },
    {
      taste: "sunny",
      chardonay: 82,
    },
  ];
  return (
    <>
      <Row className={style["modal"]}>
        <Row className={style["head"]}>
          <div>{props.pitcher.pitcherName}</div>
        </Row>
        <Row className={style["body"]}>
          <Row>
            <Radar data={data} />
          </Row>
          <Row className={style["stat"]}></Row>
        </Row>
      </Row>
    </>
  );
};

export default PitcherDetailModal;