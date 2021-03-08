import React, { useState } from 'react';
import { Modal } from 'antd';

function LogoutModal({ onLogout }) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleOk = () => {
    onLogout();
    setIsModalVisible(false);    
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <span onClick={() => setIsModalVisible(true)}>
        Logout
      </span>

      <Modal title="Confirm Logout" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <p>Do you really want to logout?</p>
      </Modal>
    </>
  );
}

export default LogoutModal;