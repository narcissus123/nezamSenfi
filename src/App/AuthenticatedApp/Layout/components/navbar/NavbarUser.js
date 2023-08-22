import { Form, Formik } from "formik";
import React, { useContext, useState } from "react";
import { Key, Lock, Power, User } from "react-feather";
import { useHistory } from "react-router";
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  UncontrolledDropdown,
} from "reactstrap";
import Avatar from "../../../../../components/common/@vuexy/avatar/AvatarComponent";
import { ShowImage } from "../../../../../components/common/DownloadRow/ShowImage/ShowImage";
import { ProfileDropZone } from "../../../../../components/common/Form/ProfileDropZone/ProfileDropZone";
import { SimpleSubmitButton } from "../../../../../components/common/Form/SubmitButtonComponent/SimpleSubmitBtn/SimpleSubmitButton";
import { NavTicketContainer } from "../../../../../components/Tickets/NavTicketContainer/NavTicketContainer";
import { UserRoles, UserRolesPersian } from "../../../../../core/enums";
import { ToastTypes } from "../../../../../core/enums/toast-types.enum";
import {
  useRemoveMyProfilePicture,
  useSetProfilePicture,
} from "../../../../../core/services/api/upload.api";
import { refetchContext } from "../../../../../core/utils/context/EventContext";
import { profileContext } from "../../../../../core/utils/context/ProfileContext";
import { showToast } from "../../../../../core/utils/show-toast";

const UserDropdown = (props) => {
  const history = useHistory();
  return (
    <DropdownMenu right className="w-100">
      <DropdownItem
        tag="a"
        onClick={props.onEditProfileLinkClicked}
        className="w-100"
      >
        <User size={14} className="mr-50" />
        <span className="align-middle">پروفایل</span>
      </DropdownItem>
      <DropdownItem
        tag="a"
        onClick={() => {
          history.push("/Settings/ChangePassword");
        }}
        className="w-100"
      >
        <Lock size={14} className="mr-50" />
        <span className="align-middle">تغییر رمز عبور</span>
      </DropdownItem>
      {/* <DropdownItem tag="a" href="#">
        <Icon.Mail size={14} className="mr-50" />
        <span className="align-middle">My Inbox</span>
      </DropdownItem>
      <DropdownItem tag="a" href="#">
        <Icon.CheckSquare size={14} className="mr-50" />
        <span className="align-middle">Tasks</span>
      </DropdownItem>
      <DropdownItem tag="a" href="#">
        <Icon.MessageSquare size={14} className="mr-50" />
        <span className="align-middle">Chats</span>
      </DropdownItem>
      <DropdownItem tag="a" href="#">
        <Icon.Heart size={14} className="mr-50" />
        <span className="align-middle">WishList</span>
      </DropdownItem>
      <DropdownItem divider /> */}
      <DropdownItem
        className="w-100"
        onClick={() => {
          showToast(["در حال خروج از سایت"], ToastTypes.info);
          history.push("/signout-oidc");
        }}
      >
        <Power size={14} className="mr-50" />
        <span className="align-middle" onClick={() => {}}>
          خروج
        </span>
      </DropdownItem>
    </DropdownMenu>
  );
};

const EditProfileModal = ({
  roles,
  userName,
  isOpen,
  modalToggled,
  nationalCode,
}) => {
  const uploadMutation = useSetProfilePicture();
  const [isUploading, setIsUploading] = useState(false);
  const [isShow, setIsShow] = useState(false);

  const { refetchEvent, setRefetchEvent } = useContext(refetchContext);
  const {
    userProfilePicture,
    setUserProfilePicture,
    allowToRefetch,
    setAllowToRefetch,
  } = useContext(profileContext);

  const removeProfile = useRemoveMyProfilePicture();

  const handleSubmit = (value) => {
    if (!value.file || !(value.file.length > 0)) {
      showToast(["لطفا فایل را انتخاب کنید!"], "error");
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    for (let file of value.file) {
      formData.append(`File`, file);
    }

    uploadMutation.mutate(formData, {
      onSuccess: (data) => {
        if (data && data.data.result) {
          showToast(["با موفقیت انجام شد"], "success");
          setAllowToRefetch(1);
          const newEvent = { ...refetchEvent };
          newEvent.profileRefetch = !newEvent.profileRefetch;
          setRefetchEvent(newEvent);

          modalToggled();
        }
        setIsUploading(false);
      },
      onError: (error) => {
        showToast(["مشکلی پیش آمد!"], "error");
        setIsUploading(false);
      },
    });
  };

  const onProfileSelectChange = (file) => {
    console.log(file);
  };

  return (
    <Modal
      isOpen={isOpen}
      toggle={modalToggled}
      className="modal-dialog-centered"
    >
      {userProfilePicture && (
        <ShowImage
          isOpen={isShow}
          modalSize="md"
          toggle={() => setIsShow(false)}
          image={userProfilePicture}
        />
      )}
      <Formik
        enableReinitialize
        initialValues={{ file: null }}
        onSubmit={handleSubmit}
      >
        {(params) => {
          return (
            <Form>
              <ModalHeader toggle={modalToggled} className="bg-info">
                ویرایش پروفایل
              </ModalHeader>
              <ModalBody className="modal-dialog-centered">
                <Card className="w-100 shadow-none m-0">
                  <CardHeader className="mx-auto">
                    <div className="avatar mr-1 avatar-xl">
                      {userProfilePicture ? (
                        <>
                          <img
                            src={userProfilePicture}
                            alt="profile"
                            width="200"
                            height="200"
                            onClick={() => setIsShow(true)}
                          />
                        </>
                      ) : (
                        <Avatar icon={<User />} />
                      )}
                    </div>
                  </CardHeader>
                  <div className="d-flex justify-content-center">
                    {userProfilePicture && (
                      <SimpleSubmitButton
                        outLine
                        color="danger"
                        onCLick={() => {
                          removeProfile.mutate("", {
                            onSuccess: () => {
                              setUserProfilePicture(null);
                              showToast(
                                ["با موفقیت حذف گردید"],
                                ToastTypes.success
                              );
                            },
                          });
                        }}
                        isLoading={removeProfile.isLoading}
                        type="button"
                        btnText="حذف پروفایل"
                      />
                    )}
                  </div>
                  <CardBody className="text-center mb-0 pb-0">
                    <h4>{userName}</h4>
                    <h4>کد ملی: {nationalCode}</h4>
                    <p>
                      {roles && Array.isArray(roles) ? (
                        <>
                          {roles.map((role) => {
                            return (
                              <>
                                <Badge color="light-success" pill>
                                  {UserRolesPersian[role]}
                                </Badge>
                              </>
                            );
                          })}
                        </>
                      ) : (
                        <>
                          <Badge color="light-success" pill>
                            {UserRolesPersian[roles]}
                          </Badge>
                        </>
                      )}
                    </p>
                    <hr className="my-2" />
                    <Row>
                      <Col className="text-left" md="12" sm="12">
                        <ProfileDropZone
                          lableText="انتخاب تصویر پروفایل"
                          name="file"
                          accept={
                            "image/jpeg, image/png, image/jpg, image/tif,image/tiff"
                          }
                          significant={false}
                          isSingle={true}
                        />
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </ModalBody>
              <ModalFooter className="justify-content-start">
                <SimpleSubmitButton
                  isLoading={isUploading}
                  color="info"
                  btnText="ذخیره"
                />
                <Button outline color="danger" onClick={modalToggled}>
                  انصراف
                </Button>
              </ModalFooter>
            </Form>
          );
        }}
      </Formik>
    </Modal>
  );
};

class NavbarUser extends React.PureComponent {
  state = {
    navbarSearch: false,
    suggestions: [],
    role: this.props.role,
    roleName: "نامشخص",
    isEditProfileModalOpen: false,
  };

  componentDidMount() {
    switch (true) {
      case this.state.role.includes(UserRoles.Admin):
        this.setState({ roleName: "ادمین" });
        break;
      case this.state.role.includes(UserRoles.UserReal):
        this.setState({ roleName: "کاربر حقیقی" });
        break;
      case this.state.role.includes(UserRoles.UserLegal):
        this.setState({ roleName: "کاربر حقوقی" });
        break;
      default:
        break;
    }
  }

  handleNavbarSearch = () => {
    this.setState({
      navbarSearch: !this.state.navbarSearch,
    });
  };

  toggleEditProfileModal = () => {
    this.setState((prevState) => ({
      isEditProfileModalOpen: !prevState.isEditProfileModalOpen,
    }));
  };

  editProfileLinkClicked = () => {
    this.toggleEditProfileModal();
  };

  render() {
    return (
      <>
        <EditProfileModal
          isOpen={this.state.isEditProfileModalOpen}
          modalToggled={this.toggleEditProfileModal}
          roles={this.state.role}
          nationalCode={this.props.nationalCode}
          userName={this.props.userName}
        />

        <ul className="nav navbar-nav navbar-nav-user float-right">
          <NavTicketContainer />

          <UncontrolledDropdown tag="li" className="dropdown-user nav-item">
            <DropdownToggle tag="a" className="nav-link dropdown-user-link">
              <div className="user-nav d-sm-flex d-none">
                <span className="user-name text-bold-600">
                  {this.props.userName}
                </span>
                {/* <span className="user-status">Available</span> */}
                <Badge color="danger">{this.state.roleName}</Badge>
              </div>
              <span data-tour="user">
                {this.props.userImg ? (
                  <img
                    src={this.props.userImg}
                    className="round"
                    height="40"
                    width="40"
                    alt="avatar"
                  />
                ) : (
                  <Avatar className="mr-1" icon={<User />} />
                )}
              </span>
            </DropdownToggle>
            <UserDropdown
              onEditProfileLinkClicked={this.editProfileLinkClicked}
              {...this.props}
            />
          </UncontrolledDropdown>
        </ul>
      </>
    );
  }
}
export default NavbarUser;
