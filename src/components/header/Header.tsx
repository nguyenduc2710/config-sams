import React, { useState } from 'react';
import {
  Button,
  Typography,
  Avatar,
  Badge,
  Layout,
  Dropdown,
  MenuProps,
  notification as AntNotification,
} from 'antd';
import './Header.css';
import styles from '../header/contentHeader/index.module.less';
import {
  IoIosArrowDown,
  IoIosArrowRoundBack,
} from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/Store';
import { logout } from '../../redux/slice/Auth';
import { PiBellBold } from 'react-icons/pi';

const { Header: AntHeader } = Layout;

const { Title, Text } = Typography;


interface PreparationProgress {
  SessionId: number;
  Progress: number;
}

interface HeadersProps {
  handleNavigateScript: () => void;
  handleNavigateHome: () => void;
  closeWebsocket: () => void;
  // notificationss: number;
  preparationProgress?: PreparationProgress | null;
  NotificationId: number;
  setNotificationId: (NotificationId: number) => void;
}

interface NotificationListt {
  notificationID: number;
  title: string;
  description: string;
  timeStamp: string;
  read: boolean;
  moduleId: number;
  moduleActivityId: number;
  scheduleID: number;
  notificationType: NotificationTypee;
  user: null;
}

interface NotificationTypee {
  notificationTypeID: number;
  typeName: string;
  typeDescription: string;
  notifications: [];
}

const Headers: React.FC<HeadersProps> = ({
  handleNavigateScript,
  handleNavigateHome,
  // notificationss,
}) => {
  const userID = useSelector(
    (state: RootState) => state.auth.userDetail?.result?.id,
  );
  const [newNotificaton, setNewNotificaton] = useState<NotificationListt>();
  const [readNotificationsCount, setReadNotificationsCount] = useState(0);
  const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);

  const [selectedNotification, setSelectedNotification] =
    useState<NotificationListt | null>(null);


  const user = useSelector((state: RootState) => state.auth.data);
  const userRole = useSelector((state: RootState) => state.auth.data?.result?.role.name);
  const name = user?.result?.displayName;
  const avatar = user?.result?.avatar;
  const dispatch = useDispatch();

  const handleLogout = async () => {
    dispatch(logout());
  };

  const handleBackToList = () => {
    setSelectedNotification(null);
  };

  const items: MenuProps['items'] = [
    {
      key: '1',
      style: { padding: 0 },
      label: (
        <>
          {(user?.result?.role.name as any === 'Admin') ||
            (user?.result?.role.name as any === 'Lecturer') ? (
            <>
              <Button
                style={{ width: '100%' }}
                type="text"
                onClick={handleNavigateHome}>
                Home
              </Button>
              <br />
            </>
          ) : null}

          {
            userRole && userRole === 'Lecturer' && (
              <>
                <Button
                  href='https://storage.googleapis.com/sams-bucket-1/sams_production_14-9_0.2.apk' type="text">
                  Download mobile app
                </Button>
                <br />
              </>
            )
          }

          {(user?.result?.role.name as any) === 'SupAdmin' ? (
            <div>
              <Button type="text" onClick={handleNavigateScript}>
                Script
              </Button>
              <br />
            </div>
          ) : null}

          <Button style={{ width: '100%' }} type="text" onClick={handleLogout}>
            Log out
          </Button>
        </>
      ),
    },
  ];

  // useEffect(() => {
  //   // console.log("Changed ", onFilterNoti);
  // }, [onFilterNoti]);

  const CustomDropdownMenu = () => {
    return (
      <>
        {selectedNotification ? (
          <div
            style={{
              backgroundColor: '#f9f9f9',
              padding: 20,
              maxWidth: '40vw',
              height: 'auto',
              overflowY: 'auto',
              overflowX: 'hidden',
              scrollbarWidth: 'auto',
              msOverflowStyle: 'auto',
              marginRight: 'auto',
              borderRadius: 10,
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button
                style={{
                  border: 'none',
                  boxShadow: 'none',
                  background: 'transparent',
                  marginLeft: -20,
                }}
                onClick={handleBackToList}
              >
                <IoIosArrowRoundBack size={25} />
              </Button>
              <Button
                style={{
                  border: 'none',
                  boxShadow: 'none',
                  background: 'transparent',
                }}
                type="link"
              >
                <p>More Detail</p>
              </Button>
            </div>
            <div className={styles.notiDetailCtn}>
              <Text style={{ fontWeight: 'bold', fontSize: '1rem' }}>
                {selectedNotification.title}
              </Text>
              <Text
                style={{
                  color:
                    selectedNotification.notificationType.typeName ===
                      'Information'
                      ? 'green'
                      : selectedNotification.notificationType.typeName ===
                        'Error'
                        ? 'red'
                        : selectedNotification.notificationType.typeName ===
                          'Warning'
                          ? 'orange'
                          : 'inherit',
                  display: 'block',
                  whiteSpace: 'pre-wrap',
                }}
              >
                {selectedNotification.description}
              </Text>
              <Text className={styles.time}>
                {' ' +
                  new Date(selectedNotification.timeStamp).toLocaleString(
                    'en-GB',
                    {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                      second: '2-digit',
                      hour12: false,
                    },
                  )}
              </Text>
            </div>
            <div>
              {/* {NotificationModuleDetail.map((item, index) => ( */}
              <>
                {/* <Text style={{ fontSize: '1rem', fontWeight: 500 }}>
                    {item.label}: {item.value}
                  </Text> */}
                <div>

                </div>
              </>
              {/* ))} */}
            </div>
          </div>
        ) : (
          <div
            style={{
              maxWidth: '30vw',
              height: '60vh',
              overflowY: 'auto',
              overflowX: 'hidden',
              scrollbarWidth: 'auto',
              msOverflowStyle: 'auto',
            }}
          >
          </div>
        )}
      </>
    );
  };

  return (
    <AntHeader
      style={{ padding: '0 20px', borderBottom: '1px solid #d9d9d9' }}
      color="white"
      className="header"
    >
      <p className="headerTitle">Student Attendance Management System</p>
      <div className="leftHeaderUserInfo">
        <Dropdown
          // arrow
          // open={onOpen}
          // onOpenChange={(e) => setOnOpen(e)}
          // dropdownRender={CustomDropdownMenu}
          // placement="bottomRight"
          // trigger={['click']}
          // arrow
          overlay={CustomDropdownMenu}
          trigger={['click']}
          open={dropdownVisible}
          onOpenChange={(flag) => setDropdownVisible(flag)}
          placement="bottom"
        >
          <Badge count={readNotificationsCount}>
            <Button shape="circle" icon={<PiBellBold />} size="large" />
          </Badge>
        </Dropdown>
        <Avatar
          size={{
            xs: 40,
            sm: 40,
            md: 40,
            lg: 40,
            xl: 40,
            xxl: 40,
          }}
          src={
            <img
              src={
                avatar
                  ? avatar
                  : 'https://img.freepik.com/free-vector/illustration-businessman_53876-5856.jpg?t=st=1718108394~exp=1718111994~hmac=133f803dd1192a01c2db5decc8c445321e7376559b5c19f03028cc2ef0c73d4a&w=740'
              }
              alt="avatar"
            />
          }
        />

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Title
            style={{ marginBottom: '2px' }}
            level={5}
            className="narrowTypography"
          >
            {name ? user?.result?.displayName : 'Name'}
          </Title>
          <Text className="narrowTypography">{user?.result?.role.name}</Text>
        </div>
        <Dropdown
          menu={{ items }}
          placement="bottomRight"
          arrow
          trigger={['click']}
        >
          <Button shape="default" className="btnDrop">
            <IoIosArrowDown size={25} className="down-arrow" />
          </Button>
        </Dropdown>
      </div>
    </AntHeader>
  );
};

export default Headers;
