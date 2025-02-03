import { Button } from 'antd';
import { CaretRightOutlined, PauseOutlined, ShrinkOutlined } from '@ant-design/icons';

const MediaFooter = ({ value, onToggleModal, onPlay, onPause }) => (
    <>
        <Button
            type="button"
            className="ant-btn ant-btn-circle"
            onClick={onToggleModal}>
            <ShrinkOutlined />
        </Button>
        {value === 'playing' ? (
            <Button
                type="button"
                className="ant-btn ant-btn-circle"
                onClick={onPause}>
                <PauseOutlined />
            </Button>
        ) : (
            <Button
                type="button"
                className="ant-btn ant-btn-circle"
                onClick={onPlay}>
                <CaretRightOutlined />
            </Button>
        )}
    </>
);

export default MediaFooter;
