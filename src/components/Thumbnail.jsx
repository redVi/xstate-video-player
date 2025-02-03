import {PlayCircleOutlined} from "@ant-design/icons";

const Thumbnail = ({ onClick }) => (
    <div className="closed-modal" onClick={onClick}>
        <span
            role="img"
            aria-label="play-circle"
            tabIndex="-1"
            className="anticon anticon-play-circle playing-icon">
            <PlayCircleOutlined />
        </span>
    </div>
);

export default Thumbnail;
