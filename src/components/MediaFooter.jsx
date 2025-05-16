import { Button } from 'antd';
import { CaretRightOutlined, PauseOutlined, ShrinkOutlined, ArrowsAltOutlined } from '@ant-design/icons';

const MediaFooter = ({ isPlaying, isFullSize, onToggleSize, onTogglePlay }) => (
    <>
        <Button
            type="button"
            className="ant-btn ant-btn-circle"
            onClick={onToggleSize}
            icon={isFullSize ? <ShrinkOutlined /> : <ArrowsAltOutlined />} />

        <Button
            type="button"
            className="ant-btn ant-btn-circle"
            onClick={onTogglePlay}
            icon={isPlaying ? <PauseOutlined /> : <CaretRightOutlined />} />
    </>
);

export default MediaFooter;
