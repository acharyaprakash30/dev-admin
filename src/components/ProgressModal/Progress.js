import { Modal, Progress } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Label } from 'reactstrap';
import progressAction from './Redux/actions';

const ProgressModal = () => {
    const progressModal = useSelector((state) => state.Progress);
    const dispatch = useDispatch();
    return (
        <>
            <Modal
                visible={progressModal.showModal}
                title={'Product Information Update'}
                footer={false}
                onCancel={() => dispatch(progressAction.setShowModal(false))}
            >
                <div className="progress-container mt-3">
                    <Label>{progressModal.name}</Label>
                    <Progress
                        percent={progressModal.percentage}
                        status={progressModal.status}
                    />
                </div>
            </Modal>
        </>
    );
};

export default ProgressModal;
