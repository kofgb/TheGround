import { useDrag } from "react-dnd";
import { ItemTypes } from "./ItemTypes";

import style from "../css/PitcherList.module.css";

const Pitcher = (props) => {
  const [, drag] = useDrag(() => ({
    type: ItemTypes.Pitcher,
    item: { pitcher: props.pitcher },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (item, monitor) => {
      const didDrop = monitor.getDropResult();
      // 선발투수를 구원투수 영역에 넣을 경우
      if (didDrop) {
        // 구원투수목록에 추가
        props.addBullpens(item.pitcher);
        props.onMouseLeave();
      }
    },
  }));

  return (
    <>
      <tr
        ref={drag}
        data-testid={`pitcher`}
        onMouseOver={props.onMouseOver}
        onMouseLeave={props.onMouseLeave}
      >
        <td>
          <div
            className={
              style[
                props.pitcher.pitArm === "좌완" ? "leftPitcher" : "rightPitcher"
              ]
            }
          >
            {props.pitcher.pitArm}
          </div>
        </td>
        <td>{props.pitcher.name}</td>
        <td>{props.pitcher.era}</td>
        <td>{props.pitcher.game}</td>
        <td>{props.pitcher.inning}</td>
        <td>{props.pitcher.win}</td>
        <td>{props.pitcher.lose}</td>
      </tr>
    </>
  );
};

export default Pitcher;