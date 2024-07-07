import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { Modal, Table, Tabs, message } from "antd";
import { Form, Button } from "react-bootstrap";
import { WarningOutlined } from "@ant-design/icons";

import Navbar from "../../../components/navbar/navbar.component";
import Spinner from "../../../components/spinner";
import { FetchAllRegisteredUsers } from "../../../redux/slices/nominee";
import {
  AddNewGroup,
  AddNominee,
  UpdateCombinedNominees,
} from "../../../redux/slices/cell";
import { constants } from "../../../data/constants";
import FilterNominees from "../../../components/filter-component/filter-component";
import CellItem from "../../../components/application/select-nominees/cell-item/cell-item.component";
import SelectNomineesTable from "../../../components/application/select-nominees/select-nominees-table";

import {
  CreateNewApplication,
  EditApplication,
  FetchApplicationDetails,
  UpdateFormatedApplicationDetails,
} from "../../../redux/slices/application";
import "./new-application.styles.css";
import RefreshErrorModal from "../../../components/modal/refresh-error-modal.component";
import { addSerialNumber, status } from "../../../utils/addSerialNumber";
import { FetchOrganizationAuthorizers } from "../../../redux/slices/admin";
import ViewPdf from "../../../components/modal/view-pdf";

const { TabPane } = Tabs;

const NewApplicationComponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { state } = useLocation();
  let details;
  if (state.details !== null) details = state.details;
  console.log("details", details);

  //formated application for editing
  let { formatedApplication } = useSelector((state) => state.application);
  console.log("formatedApplications, new app", formatedApplication);
  console.log("formatedApplications, STATE TYPE", state.type);

  // NOMINEES
  let { nominees } = useSelector((state) => state.nominee);
  let newGroups = useSelector((state) => state.cell.newGroups);
  // As we add and remove a nominee from a group, we combine them in one array to maintain a single source of truth
  let combinedNominees = useSelector((state) => state.cell?.combinedNominees);

  const [editWorkPlaceCertificatePdf, setEditWorkPlaceCertificatePdf] =
    useState(
      state?.type.toString() === constants.EDIT_APPLICATION ? true : false
    );
  const [editAdmissionLetterPdf, setEditAdmissionLetterPdf] = useState(
    state?.type.toString() === constants.EDIT_APPLICATION ? true : false
  );
  const [editCourseContentsPdf, setEditCourseContentsPdf] = useState(
    state?.type.toString() === constants.EDIT_APPLICATION ? true : false
  );
  const [editSupportDocumentPdf, setEditSupportDocumentPdf] = useState(
    state?.type.toString() === constants.EDIT_APPLICATION ? true : false
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues:
      state?.type.toString() === constants.EDIT_APPLICATION
        ? {
            //COURSE DETAILS
            course_title: formatedApplication[0]?.course_title,
            training_provider: formatedApplication[0]?.training_provider,
            venue: formatedApplication[0]?.venue,
            country: formatedApplication[0]?.country,
            state: formatedApplication[0]?.state,
            course_objectives: formatedApplication[0]?.course_objectives,
            start_date_1: formatedApplication[0]?.start_date_1?.split("T")[0],
            end_date_1: formatedApplication[0]?.end_date_1?.split("T")[0],
            start_date_2: formatedApplication[0]?.start_date_2?.split("T")[0],
            end_date_2: formatedApplication[0]?.end_date_2?.split("T")[0],
            start_date_3: formatedApplication[0]?.start_date_3?.split("T")[0],
            end_date_3: formatedApplication[0]?.end_date_3?.split("T")[0],
            // OVERSEAS
            local_availability: formatedApplication[0]?.local_availability,
            employment_date:
              formatedApplication[0]?.employment_date?.split("T")[0],
            trainer_employer_relationship:
              formatedApplication[0]?.trainer_employer_relationship,
            related_to_organization:
              formatedApplication[0]?.related_to_organization,
            other_organization_funds:
              formatedApplication[0]?.other_organization_funds,
            org_funding: formatedApplication[0]?.org_funding,
            //EXPENSES
            tuition_fees: formatedApplication[0]?.tuition_fees,
            examination_fees: formatedApplication[0]?.examination_fees,
            books_fees: formatedApplication[0]?.books_fees,
            accomodation_fees: formatedApplication[0]?.accomodation_fees,
            fare_fees: formatedApplication[0]?.fare_fees,
            other_fees: formatedApplication[0]?.other_fees,
            other_fees_notes: formatedApplication[0]?.other_fees_notes,
            training_expenses_support_doc:
              formatedApplication[0]?.training_expenses_support_doc,
            total_cost: formatedApplication[0]?.total_cost,
            // DECLARATION
            signature: formatedApplication[0]?.signature,
            authorizer_id: formatedApplication[0]?.national_id_number,
            authorizer_first_name: formatedApplication[0]?.first_name,
            authorizer_last_name: formatedApplication[0]?.last_name,
            authorizer_designation: formatedApplication[0]?.designation,
          }
        : {},
  });

  // get number of groupsArray for mapping
  const getNumberOfGroupsArray = () => {
    let numberOfGroups = [];

    for (let i = 1; i <= details?.number_of_groups; i++) {
      numberOfGroups.push(i);
    }

    return numberOfGroups;
  };

  console.log("first number of gruops ", getNumberOfGroupsArray());

  // store refers to redux for lack of a better variable name. its my code after all
  const storeGroups = () => {
    let groups = {};
    let new_group = {};

    for (let i = 1; i <= details?.number_of_groups; i++) {
      new_group = {
        group_id: i,
        label: "Group " + i,
        start_date: "",
        end_date: "",
        nominees: [],
      };

      groups[i] = new_group;
    }

    return groups;
  };

  const [loading, setLoading] = useState(false);
  const [showRefreshErrorModal, setShowRefreshErrorModal] = useState(false);
  const { capacity } = useSelector((state) => state.cell.capacity);
  const [searchQuery, setSearchQuery] = useState("");
  const [level, setLevel] = useState(constants.SELECT);
  const [statutory_course, setStatutoryCourse] = useState(constants.SELECT);
  // OVERSEAS
  const [related, setRelated] = useState(false);
  const [otherFunds, setOtherFunds] = useState(false);

  const [pdf, setPdf] = useState();
  const [showViewPDFModal, setShowViewPDFModal] = useState(false);

  // NOMINEE
  const handleAddNew = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      navigate("/app/register-nominee", { state: { prevPage: "select" } });
    }, 700);
  };

  const handleEdit = (nominee) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);

      navigate("/app/register-nominee", {
        state: { nominee, type: constants.EDIT_NOMINEE, prevPage: "select" },
      });
    }, 700);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  // Searching from firstName, lastName, both lastName and lastName and national id number.
  if (searchQuery) {
    nominees = nominees.filter(
      (n) =>
        n.first_name.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
        n.last_name.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
        // combinines firstName and lastName
        (n.first_name + " " + n.last_name)
          .toLowerCase()
          .startsWith(searchQuery.toLowerCase()) ||
        // converts idNumber to a string first
        n.idNumber
          .toString()
          .toLowerCase()
          .startsWith(searchQuery.toLowerCase())
    );
  }

  const handleSort = (e) => {
    e.preventDefault();
    setLevel(e.target.value);
  };

  const handleSelectCourse = (e) => {
    e.preventDefault();
    setStatutoryCourse(e.target.value);
  };

  if (level !== constants.SELECT) {
    nominees = nominees.filter(
      (n) => n.job_level.toLowerCase() === level.toLowerCase()
    );
  }

  const handleAddNominee = (group_id, nominee_id, first_name) => {
    if (capacity.maxCapacity > 1) {
      newGroups = {
        ...newGroups,
        [group_id]: {
          group_id: group_id,
          label: "Group " + group_id,
          start_date: "",
          end_date: "",
          nominees: [
            { nominee_id, first_name, group_id },
            ...newGroups[group_id].nominees,
          ],
        },
      };

      combinedNominees = [
        { nominee_id, first_name, group_id },
        ...combinedNominees,
      ];
    } else {
      newGroups = {
        [group_id]: {
          group_id: group_id,
          label: "Group " + group_id,
          start_date: "",
          end_date: "",
          nominees: [{ nominee_id, first_name, group_id }],
        },
      };

      combinedNominees = [{ nominee_id, first_name, group_id }];
    }

    dispatch(AddNominee(newGroups));
    dispatch(UpdateCombinedNominees(combinedNominees));
  };

  const handleRemoveNominee = (nominee_id, group_id) => {
    newGroups = {
      ...newGroups,
      [group_id]: {
        group_id: group_id,
        label: "Group " + group_id,
        start_date: "",
        end_date: "",
        nominees: newGroups[group_id].nominees.filter(
          (n) => n.nominee_id !== nominee_id
        ),
      },
    };
    dispatch(AddNominee(newGroups));
    dispatch(
      UpdateCombinedNominees(
        combinedNominees.filter((n) => n.nominee_id !== nominee_id)
      )
    );
  };

  console.log("cn", combinedNominees);
  console.log("ng", newGroups);

  let nominee_levels = [
    constants.SELECT,
    constants.TOP,
    constants.MIDDLE,
    constants.SUPERVISORY,
    constants.OPERATIVE,
    constants.OTHER,
  ];

  let statutory_options = [
    constants.SELECT_COURSE,
    constants.FIRST_AID,
    constants.OSHA,
    constants.FIRE_SAFETY,
  ];

  // OVERSEAS
  const handleRelated = () => {
    setRelated(true);
  };

  const handleNotRelated = () => {
    setRelated(false);
  };

  const handleOtherFunds = () => {
    setOtherFunds(true);
  };

  const handleNoOtherFunds = () => {
    setOtherFunds(false);
  };

  // EXPENSES
  const [otherFees, setOtherFees] = useState(null);
  const [tuitionFees, setTuitionFees] = useState(null);
  const [examinationFees, setExaminationFees] = useState(null);
  const [booksFees, setBooksFees] = useState(null);
  const [accomodationFees, setAccomodationFees] = useState(null);
  const [fareFees, setFareFees] = useState(null);
  const [sum, setSum] = useState(null);

  const onChangeTuitionFee = (e) => {
    setTuitionFees(e.target.value);
  };

  const onChangeExaminationFee = (e) => {
    setExaminationFees(e.target.value);
  };

  const onChangeBooksFees = (e) => {
    setBooksFees(e.target.value);
  };

  const onChangeFareFees = (e) => {
    setFareFees(e.target.value);
  };

  const onChangeAccomodationFees = (e) => {
    setAccomodationFees(e.target.value);
  };

  const handleChange = (e) => {
    setOtherFees(e.target.value);
  };

  const handleBackpressed = () => {
    setLoading(true);
    // clear groups and group_nominees
    dispatch(AddNewGroup([{}]));
    dispatch(AddNominee([]));
    dispatch(UpdateCombinedNominees([]));
    dispatch(UpdateFormatedApplicationDetails([]));
    window.localStorage.removeItem(constants.RECORD_TO_EDIT_ID);
    if (details?.previous === constants.VIEW_APPLICATION) {
      dispatch(UpdateFormatedApplicationDetails(formatedApplication));
    }

    setTimeout(() => {
      setLoading(false);

      navigate(-1);
    }, 300);
  };

  const [modal, contextHolder] = Modal.useModal();
  const confirm = () => {
    modal.confirm({
      title: "GO BACK?",
      icon: <WarningOutlined />,
      content:
        "Going back will cancel this whole application. You will have to restart again!",
      okText: "OK",
      cancelText: "CANCEL",
      onOk: handleBackpressed,
    });
  };

  const checkGroupIsAboveMinimumCapacity = () => {
    if (details?.number_of_participants === constants.GROUP) {
      for (let i = 1; i <= details?.number_of_groups; i++) {
        let g_nominees = newGroups[i]?.nominees?.length;
        if (g_nominees >= capacity?.minCapacity) {
          return true;
        } else {
          return false;
        }
      }
    } else {
      let g_nominees = newGroups[1]?.nominees?.length;
      if (g_nominees >= capacity?.minCapacity) {
        return true;
      } else {
        return false;
      }
    }
  };

  let startDateWarning = `👉 Start date should be at least 7 days from today(date of application)
                        failure to which your application will be rejected!`;

  const onSubmit = (data) => {
    if (otherFees !== "") {
      data = { ...data, total_cost: sum, other_fees: otherFees };
    } else {
      data = {
        ...data,
        other_fees: otherFees,
        total_cost: sum,
        other_fees_notes: "",
      };
    }

    if (data.course_title === constants.SELECT_COURSE) {
      message.error("Select course in Course Details!");
      return;
    }

    if (!checkGroupIsAboveMinimumCapacity()) {
      if (details?.number_of_participants === constants.GROUP) {
        return message.error("Select enough nominees for all groups!!");
      } else {
        return message.error("Select nominee!");
      }
    }

    // Add dates in groups
    if (
      details?.number_of_participants === constants.GROUP &&
      details?.number_of_groups > 1
    ) {
      console.log("want to know numberofgroups", details.number_of_groups);
      for (let i = 1; i <= details?.number_of_groups; i++) {
        let key1 = "start_date_" + i;
        let key2 = "end_date_" + i;

        newGroups = {
          ...newGroups,
          [i]: {
            ...newGroups[i],
            start_date: data[key1],
            end_date: data[key2],
          },
        };
      }
    } else {
      newGroups = {
        [1]: {
          ...newGroups[1],
          start_date: data["start_date_1"],
          end_date: data["end_date_1"],
        },
      };
    }

    data = {
      ...data,
      nominees: newGroups,
      nominees_array: combinedNominees,
      ...details,
    };
    console.log("form_d", data);

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      if (state?.type.toString() === constants.EDIT_APPLICATION) {
        if (
          Number(formatedApplication[0].id) !==
          Number(localStorage.getItem(constants.RECORD_TO_EDIT_ID))
        ) {
          setShowRefreshErrorModal(true);
          return;
        }
        data = {
          ...data,
          application_id: formatedApplication[0]?.id,
          approved: formatedApplication[0]?.approved,
          work_place_certificate: editWorkPlaceCertificatePdf
            ? ""
            : data.work_place_certificate[0],
          admission_letter: editAdmissionLetterPdf
            ? ""
            : data.admission_letter[0],
          timetable: editCourseContentsPdf ? "" : data.timetable[0],
          training_expenses_support_doc: editSupportDocumentPdf
            ? ""
            : data.training_expenses_support_doc[0],
          work_place_certificate_file:
            formatedApplication[0]?.work_place_certificate_file,
          admission_letter_file: formatedApplication[0]?.admission_letter_file,
          course_contents_file: formatedApplication[0]?.course_contents_file,
          support_document_file: formatedApplication[0]?.support_document_file,
        };
        console.log("edit_d", data);
        dispatch(EditApplication({ ...data }));
      } else {
        dispatch(
          CreateNewApplication({
            ...data,
            work_place_certificate: data.work_place_certificate[0],
            admission_letter: data.admission_letter[0],
            timetable: data.timetable[0],
            training_expenses_support_doc:
              data.training_expenses_support_doc[0],
          })
        );
      }
    }, 2500);
  };

  const getTitle = (key) => {
    if (details?.number_of_participants === constants.GROUP) {
      for (let i = 1; i <= Number(details?.number_of_groups); i++) {
        if (key === i) {
          let g_nominees = newGroups[i]?.nominees?.length;
          if (g_nominees < capacity?.minCapacity) {
            return `Group ${i} (Errors)`;
          } else {
            return `Group ${i}`;
          }
        }
      }
    }
    if (details?.number_of_participants === constants.ONE) {
      if (key === 1) {
        let g_nominees = newGroups[key]?.nominees?.length;
        if (g_nominees < capacity?.minCapacity) {
          return `Nominee (Errors)`;
        } else {
          return `Nominee`;
        }
      }
    }

    if (key === 5) {
      return errors.country ||
        errors.training_provider ||
        errors.venue ||
        errors.course_objectives ||
        errors.start_date_1 ||
        errors.end_date_1 ||
        errors.start_date_2 ||
        errors.end_date_2 ||
        errors.start_date_3 ||
        errors.end_date_3 ||
        errors.work_place_certificate ||
        errors.admission_letter ||
        errors.timetable
        ? "Course Details (Errors)"
        : "Course Details";
    }
    if (key === 6) {
      return errors.local_availability ||
        errors.trainer_employer_relationship ||
        errors.employment_date ||
        errors.related_to_organization ||
        errors.other_organization_funds ||
        errors.org_funding
        ? "Regional/Overseas Requirements (Errors)"
        : "Regional/Overseas Requirements";
    }
    if (key === 7) {
      return errors.tuition_fees ||
        errors.examination_fees ||
        errors.books_fees ||
        errors.accomodation_fees ||
        errors.fare_fees ||
        errors.other_fees ||
        errors.other_fees_notes ||
        errors.training_expenses_support_doc
        ? "Training Expenses (Errors)"
        : "Training Expenses";
    }
  };

  const getGroups = () => {
    if (details?.number_of_participants === constants.GROUP) {
      return `, ${details?.number_of_groups} Groups )`;
    } else return ` )`;
  };

  const handleViewPdf = (field) => {
    setPdf(
      `${process.env.REACT_APP_PDF_PATH?.toString()}/application/${
        formatedApplication[0][field]
      }`
    );
    setShowViewPDFModal(true);
  };

  const handleChangePdf = (pdf) => {
    if (pdf === "work_place_certificate_file")
      setEditWorkPlaceCertificatePdf(false);
    else if (pdf === "admission_letter_file") setEditAdmissionLetterPdf(false);
    else if (pdf === "course_contents_file") setEditCourseContentsPdf(false);
    else if (pdf === "support_document_file") setEditSupportDocumentPdf(false);
  };

  const handleCancel = () => {
    setShowRefreshErrorModal(false);
    setShowViewPDFModal(false);
  };

  useEffect(() => {
    if (state?.type.toString() === constants.EDIT_APPLICATION) {
      if (formatedApplication !== null) {
        dispatch(AddNewGroup({ ...formatedApplication[0]?.nominees }));
        dispatch(
          UpdateCombinedNominees(formatedApplication[0]?.nominees_array)
        );

        setTuitionFees(formatedApplication[0]?.tuition_fees);
        setExaminationFees(formatedApplication[0]?.examination_fees);
        setBooksFees(formatedApplication[0]?.books_fees);
        setFareFees(formatedApplication[0]?.fare_fees);
        setAccomodationFees(formatedApplication[0]?.accomodation_fees);
        setOtherFees(formatedApplication[0]?.other_fees);

        let initial_total =
          formatedApplication[0]?.tuition_fees +
          formatedApplication[0]?.examination_fees +
          formatedApplication[0]?.books_fees +
          formatedApplication[0]?.accomodation_fees +
          formatedApplication[0]?.fare_fees +
          formatedApplication[0]?.other_fees;
        setSum(initial_total);
      } else {
        dispatch(
          FetchApplicationDetails(
            localStorage.getItem(constants.RECORD_TO_EDIT_ID)
          )
        );
      }
    } else {
      dispatch(
        FetchOrganizationAuthorizers(window.localStorage.getItem("user_id"))
      );
      if (details?.number_of_participants === constants.ONE)
        dispatch(
          AddNewGroup({
            1: {
              group_id: 1,
              label: "Group 1",
              start_date: "",
              end_date: "",
              nominees: [],
            },
          })
        );
      else dispatch(AddNewGroup(storeGroups()));

      dispatch(UpdateCombinedNominees([]));
    }
  }, []);

  useEffect(() => {
    let org = window.localStorage.getItem("user_id");
    dispatch(FetchAllRegisteredUsers(org));

    let total =
      Number(tuitionFees) +
      Number(examinationFees) +
      Number(booksFees) +
      Number(accomodationFees) +
      Number(fareFees) +
      Number(otherFees);
    setSum(total);
  }, [
    tuitionFees,
    examinationFees,
    booksFees,
    accomodationFees,
    fareFees,
    otherFees,
  ]);

  return (
    <div>
      <Navbar
        title={`${
          state?.type.toString() === constants.EDIT_APPLICATION ? "Edit" : "New"
        } Application ( ${details?.type_of_training},  ${
          details?.number_of_participants
        } ${getGroups()}`}
        handleBackpressed={confirm}
      />
      {contextHolder}
      <div className="main-container">
        <Spinner loading={loading} />
        {showViewPDFModal && (
          <Modal
            open={showViewPDFModal}
            title={`Document`}
            onCancel={handleCancel}
            footer={false}
            width={660}
          >
            {<ViewPdf pdf={pdf} />}
          </Modal>
        )}
        {showRefreshErrorModal && (
          <Modal
            open={showRefreshErrorModal}
            title={`Errors occured!!!`}
            onCancel={handleCancel}
            footer={false}
          >
            {
              <RefreshErrorModal
                handleClose={handleCancel}
                onClick={handleBackpressed}
              />
            }
          </Modal>
        )}
        <Tabs defaultActiveKey="1" size="large">
          {details?.number_of_participants === constants.GROUP ? (
            getNumberOfGroupsArray().map((i) => (
              <TabPane tab={`${getTitle(i)}`} key={i}>
                <div className="row select-container">
                  <Form className=" col-md-3 cells">
                    <CellItem
                      group_id={i}
                      label={`Group ${i}`}
                      user={formatedApplication}
                      onClick={handleSearch}
                      onRemove={handleRemoveNominee}
                    />
                  </Form>
                  <div className="col-md-9 nominees">
                    <FilterNominees
                      onAddNew={handleAddNew}
                      options={nominee_levels}
                      placeholder={"Search nominee by name or id..."}
                      searchQuery={searchQuery}
                      onSearch={handleSearch}
                      level={level}
                      onSort={handleSort}
                    />
                    <div className="row">
                      {nominees.length > 0 ? (
                        <div className="col-md-12">
                          <SelectNomineesTable
                            nominees={nominees}
                            handleEdit={handleEdit}
                            group_id={i}
                            details={details}
                            label={`Add Group ${i}`}
                            onAdd={handleAddNominee}
                            onRemove={handleRemoveNominee}
                          />
                        </div>
                      ) : (
                        <div className="col-md-12">
                          <p className="text-center">
                            No Registered nominess.{" "}
                            <span
                              className="text-primary cursor-pointer"
                              onClick={handleAddNew}
                            >
                              Register Now
                            </span>
                            .
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </TabPane>
            ))
          ) : (
            <TabPane tab={`${getTitle(1)}`} key={1}>
              <div className="row select-container">
                <Form className=" col-md-3 cells">
                  <CellItem
                    group_id={1}
                    label={"Nominee"}
                    user={formatedApplication}
                    onClick={handleSearch}
                    onRemove={handleRemoveNominee}
                  />
                </Form>
                <div className="col-md-9 nominees">
                  <FilterNominees
                    onAddNew={handleAddNew}
                    options={nominee_levels}
                    placeholder={"Search nominee by name or id..."}
                    searchQuery={searchQuery}
                    onSearch={handleSearch}
                    onSort={handleSort}
                  />
                  <div className="row">
                    {nominees.length > 0 ? (
                      <div className="col-md-12">
                        <SelectNomineesTable
                          nominees={nominees}
                          handleEdit={handleEdit}
                          group_id={1}
                          details={details}
                          label={"Add Nominee"}
                          onAdd={handleAddNominee}
                          onRemove={handleRemoveNominee}
                        />
                      </div>
                    ) : (
                      <div className="col-md-12">
                        <p className="text-center">
                          No Registered nominess.{" "}
                          <span
                            className="text-primary cursor-pointer"
                            onClick={handleAddNew}
                          >
                            Register Now
                          </span>
                          .
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </TabPane>
          )}
          <TabPane key={5} tab={getTitle(5)}>
            <Form
              className="row form-content"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="col-md-12">
                <div className="row form_div">
                  <div className="col-md-12">
                    <legend className="text-info">
                      Details of the course applied for.{" "}
                      <span className="font-italic">
                        all fields and attachments required
                      </span>
                    </legend>
                    <div class="form-row">
                      {details?.type_of_training === constants.STATUTORY ? (
                        <div class="col-md-6">
                          <Form.Group controlId="course_title">
                            <label for="course_title">
                              Course title (Select Course):
                            </label>
                            <select
                              class="form-control text-primary"
                              {...register("course_title", {
                                required: "Course title is required.",
                              })}
                              className={`${
                                errors.course_title
                                  ? "input-error form-control text-primary"
                                  : "form-control text-primary"
                              }`}
                              onChange={handleSelectCourse}
                            >
                              {statutory_options.map((o) => (
                                <option className="text-primary">{o}</option>
                              ))}
                            </select>
                            {errors.course_title && (
                              <p className="errorMsg">
                                {errors.course_title.message}
                              </p>
                            )}
                          </Form.Group>
                        </div>
                      ) : (
                        <div class="col-md-6">
                          <Form.Group controlId="course_title">
                            <label for="course_title">Course title:</label>
                            <input
                              type="text"
                              name="course_title"
                              id="title"
                              placeholder="Certified Ethical Hacking"
                              autoComplete="off"
                              {...register("course_title", {
                                required: "Course title is required.",
                              })}
                              className={`${
                                errors.course_title
                                  ? "input-error form-control text-primary"
                                  : "form-control text-primary"
                              }`}
                            />
                            {errors.course_title && (
                              <p className="errorMsg">
                                {errors.course_title.message}
                              </p>
                            )}
                          </Form.Group>
                        </div>
                      )}
                      <div class="col-md-6">
                        <Form.Group controlId="course_provider">
                          <label for="provider">Training provider:</label>
                          <input
                            type="text"
                            name="training_provider"
                            id="provider"
                            placeholder="Keytech technologies"
                            autoComplete="off"
                            {...register("training_provider", {
                              required: "Training provider is required.",
                            })}
                            className={`${
                              errors.training_provider
                                ? "input-error form-control text-primary"
                                : "form-control text-primary"
                            }`}
                          />
                          {errors.training_provider && (
                            <p className="errorMsg">
                              {errors.training_provider.message}
                            </p>
                          )}
                        </Form.Group>
                      </div>
                    </div>
                    <div class="form-row">
                      <div class="col-md-6">
                        <Form.Group controlId="course_venue">
                          <label for="venue">Specific course venue:</label>
                          <input
                            type="text"
                            name="venue"
                            id="venue"
                            placeholder="Venue"
                            autoComplete="off"
                            {...register("venue", {
                              required: "Venue is required.",
                            })}
                            className={`${
                              errors.venue
                                ? "input-error form-control text-primary"
                                : "form-control text-primary"
                            }`}
                          />
                          {errors.venue && (
                            <p className="errorMsg">{errors.venue.message}</p>
                          )}
                        </Form.Group>
                      </div>
                      <div class="col-md-6">
                        <Form.Group controlId="country">
                          <label for="venue">Country:</label>
                          <input
                            type="text"
                            name="country"
                            id="country"
                            placeholder="Country"
                            autoComplete="off"
                            {...register("country", {
                              required: "Country is required.",
                            })}
                            className={`${
                              errors.country
                                ? "input-error form-control text-primary"
                                : "form-control text-primary"
                            }`}
                          />
                          {errors.country && (
                            <p className="errorMsg">{errors.country.message}</p>
                          )}
                        </Form.Group>
                      </div>
                    </div>
                    <div class="form-row">
                      <div class="col-md-12">
                        <fieldset>
                          <label>Course objectives</label>
                          <Form.Group controlId="course_objectives">
                            <label for="course-objectives" class="sr-only">
                              course objectives:
                            </label>
                            <textarea
                              id="course-objectives"
                              rows="6"
                              autoComplete="off"
                              {...register("course_objectives", {
                                required: "Course objectives are required.",
                              })}
                              className={`${
                                errors.course_objectives
                                  ? "input-error form-control text-primary"
                                  : "form-control text-primary"
                              }`}
                            />
                            {errors.course_objectives && (
                              <p className="errorMsg">
                                {errors.course_objectives.message}
                              </p>
                            )}
                          </Form.Group>
                        </fieldset>
                      </div>
                    </div>

                    <>
                      <span className="text-success">{startDateWarning}</span>
                      <div class="form-row">
                        <div class="col-md-6">
                          <Form.Group controlId="start_date_1">
                            <label for="from">
                              {details?.number_of_participants === constants.ONE
                                ? `Start date.`
                                : `Group 1 Start date:`}
                            </label>
                            <input
                              type="date"
                              name={`start_date_1`}
                              id={`start_date_1`}
                              placeholder="mm/dd/yyyy"
                              autoComplete="off"
                              required
                              {...register(`start_date_1`, {
                                required: `Start_date_1 is required.`,
                              })}
                              className={`${
                                errors.start_date_1
                                  ? "input-error form-control text-primary"
                                  : "form-control text-primary"
                              }`}
                            />
                            {errors.start_date_1 && (
                              <p className="errorMsg">
                                {details?.number_of_participants ===
                                constants.ONE
                                  ? `Start date is required.`
                                  : `Start date for group 1 is required.`}
                              </p>
                            )}
                          </Form.Group>
                        </div>
                        <div class="col-md-6 form-group">
                          <Form.Group controlId="end_date">
                            <label for="to">
                              {details?.number_of_participants === constants.ONE
                                ? `End date`
                                : `Group 1 End date:`}
                            </label>
                            <input
                              type="date"
                              name={`end_date_1`}
                              id={`end_date_1`}
                              class="form-control"
                              placeholder="mm/dd/yyyy"
                              autoComplete="off"
                              required
                              {...register(`end_date_1`, {
                                required: `End_date_1 is required.`,
                              })}
                              className={`${
                                errors.end_date_1
                                  ? "input-error form-control text-primary"
                                  : "form-control text-primary"
                              }`}
                            />
                            {errors.end_date_1 && (
                              <p className="errorMsg">
                                {details?.number_of_participants ===
                                constants.ONE
                                  ? `End date is required.`
                                  : `End date for group 1 is required.`}
                              </p>
                            )}
                          </Form.Group>
                        </div>
                      </div>
                    </>

                    {details?.number_of_groups > 1 && (
                      <>
                        <span className="text-success">{startDateWarning}</span>
                        <div class="form-row">
                          <div class="col-md-6">
                            <Form.Group controlId="start_date_2">
                              <label for="from">Group 2 Start date:</label>
                              <input
                                type="date"
                                name={`start_date_2`}
                                id={`start_date_2`}
                                placeholder="mm/dd/yyyy"
                                autoComplete="off"
                                required
                                {...register(`start_date_2`, {
                                  required: `Start_date_2 is required.`,
                                })}
                                className={`${
                                  errors.start_date_2
                                    ? "input-error form-control text-primary"
                                    : "form-control text-primary"
                                }`}
                              />
                              {errors.start_date_2 && (
                                <p className="errorMsg">
                                  Start date for group 2 is required.
                                </p>
                              )}
                            </Form.Group>
                          </div>
                          <div class="col-md-6 form-group">
                            <Form.Group controlId="end_date_2">
                              <label for="to">Group 2 End date:</label>
                              <input
                                type="date"
                                name={`end_date_2`}
                                id={`end_date_2`}
                                class="form-control"
                                placeholder="mm/dd/yyyy"
                                autoComplete="off"
                                required
                                {...register(`end_date_2`, {
                                  required: `End_date_2 is required.`,
                                })}
                                className={`${
                                  errors.end_date_2
                                    ? "input-error form-control text-primary"
                                    : "form-control text-primary"
                                }`}
                              />
                              {errors.end_date_2 && (
                                <p className="errorMsg">
                                  End date for group 2 is required.
                                </p>
                              )}
                            </Form.Group>
                          </div>
                        </div>
                      </>
                    )}

                    {details?.number_of_groups > 2 && (
                      <>
                        <span className="text-success">{startDateWarning}</span>
                        <div class="form-row">
                          <div class="col-md-6">
                            <Form.Group controlId="start_date_3">
                              <label for="from">Group 3 Start date:</label>
                              <input
                                type="date"
                                name={`start_date_3`}
                                id={`start_date_3`}
                                placeholder="mm/dd/yyyy"
                                autoComplete="off"
                                required
                                {...register(`start_date_3`, {
                                  required: `Start_date_3 is required.`,
                                })}
                                className={`${
                                  errors.start_date_3
                                    ? "input-error form-control text-primary"
                                    : "form-control text-primary"
                                }`}
                              />
                              {errors.start_date_3 && (
                                <p className="errorMsg">
                                  Start date for group 3 is required.
                                </p>
                              )}
                            </Form.Group>
                          </div>
                          <div class="col-md-6 form-group">
                            <Form.Group controlId="end_date">
                              <label for="to">Group 3 End date:</label>
                              <input
                                type="date"
                                name={`end_date_3`}
                                id={`end_date_3`}
                                class="form-control"
                                placeholder="mm/dd/yyyy"
                                autoComplete="off"
                                required
                                {...register(`end_date_3`, {
                                  required: `End_date_3 is required.`,
                                })}
                                className={`${
                                  errors.end_date_3
                                    ? "input-error form-control text-primary"
                                    : "form-control text-primary"
                                }`}
                              />
                              {errors.end_date_3 && (
                                <p className="errorMsg">
                                  End date for group 3 is required.
                                </p>
                              )}
                            </Form.Group>
                          </div>
                        </div>
                      </>
                    )}
                    {details?.type_of_training === constants.STATUTORY && (
                      <div class="form-row">
                        <div class="col-md-12 d-flex">
                          {editWorkPlaceCertificatePdf ? (
                            <Form.Group controlId="certificate">
                              <label for="certificate">
                                Work place certificate pdf.
                              </label>
                              <div>
                                <p
                                  className="btn btn-success"
                                  onClick={() =>
                                    handleViewPdf("work_place_certificate_file")
                                  }
                                >
                                  {"Click to View Pdf"}
                                </p>
                              </div>
                            </Form.Group>
                          ) : (
                            <Form.Group controlId="certificate">
                              <label for="certificate">
                                Attach work place certificate.{" "}
                                <span className="text-success">
                                  If you have MORE than ONE group, scan all the
                                  certificates and attach them as ONE FILE
                                </span>
                                ! :
                              </label>
                              <div>
                                <input
                                  type="file"
                                  id="customFile"
                                  name="work_place_certificate"
                                  autoComplete="off"
                                  {...register("work_place_certificate", {
                                    required:
                                      "Work place certificate(s) required.",
                                  })}
                                  className={`${
                                    errors.work_place_certificate
                                      ? "input-error"
                                      : ""
                                  }`}
                                />
                              </div>
                              {errors.work_place_certificate && (
                                <p className="errorMsg">
                                  {errors.work_place_certificate.message}
                                </p>
                              )}
                            </Form.Group>
                          )}
                          {editWorkPlaceCertificatePdf && (
                            <div class="col-md-3">
                              <Form.Group controlId="edit_pdf">
                                <label for="id">
                                  Edit Work Place Certificate PDF:
                                </label>
                                <div>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      handleChangePdf(
                                        "work_place_certificate_file"
                                      )
                                    }
                                    className="btn btn btn-danger"
                                  >
                                    CHANGE PDF
                                  </button>
                                </div>
                              </Form.Group>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                    <div class="form-row">
                      {editAdmissionLetterPdf ? (
                        <div class="col-md-6">
                          <label for="id">
                            View/Edit Course Proposal/Admission Letter:
                          </label>
                          <div className="row">
                            <div class="col-md-3">
                              <Form.Group controlId="admission_letter">
                                <div>
                                  <p
                                    className="btn btn-success"
                                    onClick={() =>
                                      handleViewPdf("admission_letter_file")
                                    }
                                  >
                                    {"Click View Pdf"}
                                  </p>
                                </div>
                              </Form.Group>
                            </div>
                            {editAdmissionLetterPdf && (
                              <div class="col-md-3">
                                <Form.Group controlId="edit_pdf">
                                  <div>
                                    <button
                                      type="button"
                                      onClick={() =>
                                        handleChangePdf("admission_letter_file")
                                      }
                                      className="btn btn btn-danger"
                                    >
                                      CHANGE PDF
                                    </button>
                                  </div>
                                </Form.Group>
                              </div>
                            )}
                          </div>
                        </div>
                      ) : (
                        <div class="col-md-6">
                          <Form.Group controlId="admission_letter">
                            <label for="admission">
                              Course proposal or admission letter from the
                              training provider:
                            </label>
                            <div>
                              <input
                                type="file"
                                id="customFile"
                                name="admission_letter"
                                autoComplete="off"
                                {...register("admission_letter", {
                                  required:
                                    "Course proposal/admission letter required.",
                                })}
                                className={`${
                                  errors.admission_letter ? "input-error" : ""
                                }`}
                              />
                            </div>
                            {errors.admission_letter && (
                              <p className="errorMsg">
                                {errors.admission_letter.message}
                              </p>
                            )}
                          </Form.Group>
                        </div>
                      )}
                      {editCourseContentsPdf ? (
                        <div class="col-md-6">
                          <label for="contents">
                            View/Edit Course contents and timetable:
                          </label>
                          <div className="row">
                            <div className="col-md-3">
                              <Form.Group controlId="timetable">
                                <div>
                                  <p
                                    className="btn btn-success"
                                    onClick={() =>
                                      handleViewPdf("course_contents_file")
                                    }
                                  >
                                    {"Click View Pdf"}
                                  </p>
                                </div>
                              </Form.Group>
                            </div>
                            {editCourseContentsPdf && (
                              <div class="col-md-3">
                                <Form.Group controlId="edit_pdf">
                                  <div>
                                    <button
                                      type="button"
                                      onClick={() =>
                                        handleChangePdf("course_contents_file")
                                      }
                                      className="btn btn btn-danger"
                                    >
                                      CHANGE PDF
                                    </button>
                                  </div>
                                </Form.Group>
                              </div>
                            )}
                          </div>
                        </div>
                      ) : (
                        <div class="col-md-6">
                          <Form.Group controlId="timetable">
                            <label for="contents">
                              Course contents and timetable:
                            </label>
                            <div>
                              <input
                                type="file"
                                id="customFile"
                                name="timetable"
                                autoComplete="off"
                                {...register("timetable", {
                                  required:
                                    "Course content/timetable is required.",
                                })}
                                className={`${
                                  errors.timetable ? "input-error" : ""
                                }`}
                              />
                            </div>
                            {errors.timetable && (
                              <p className="errorMsg">
                                {errors.timetable.message}
                              </p>
                            )}
                          </Form.Group>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Form>
          </TabPane>
          {details?.type_of_training === constants.OVER_SEAS && (
            <TabPane key={6} tab={getTitle(6)}>
              <Form
                className="row form-content"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="col-md-12">
                  <div className="row form_div">
                    <div className="col-md-12">
                      <legend className="text-info">
                        Regional/Overseas training additional requirements.
                      </legend>
                      <div className="form-row">
                        <div className="col-md-6">
                          <Form.Group controlId="local_availability">
                            <label for="local_availability">
                              Is the course available locally?
                            </label>
                            <div>
                              <div className="form-check form-check-inline">
                                <input
                                  type="radio"
                                  class="form-check-input text-primary"
                                  name="local_availability"
                                  id="available-yes"
                                  value="yes"
                                  autoComplete="off"
                                  {...register("local_availability", {
                                    required: "Availability is required.",
                                  })}
                                  className={`${
                                    errors.local_availability
                                      ? "input-error text-primary"
                                      : "text-primary"
                                  }`}
                                />
                                <label
                                  for="available-yes"
                                  class="form-check-label"
                                >
                                  Yes
                                </label>
                              </div>
                              <div class="form-check form-check-inline">
                                <input
                                  type="radio"
                                  class="form-check-input"
                                  name="local_availability"
                                  id="available-no"
                                  value="no"
                                  autoComplete="off"
                                  {...register("local_availability", {
                                    required: "Availability is required.",
                                  })}
                                  className={`${
                                    errors.local_availability
                                      ? "input-error"
                                      : ""
                                  }`}
                                />
                                <label
                                  for="available-no"
                                  class="form-check-label"
                                >
                                  No
                                </label>
                              </div>
                            </div>
                            {errors.local_availability && (
                              <p className="errorMsg">
                                {errors.local_availability.message}
                              </p>
                            )}
                          </Form.Group>
                        </div>
                        <div class="col-md-6">
                          <Form.Group controlId="employment_date">
                            <label for="employment_date">
                              Date of employment:
                            </label>
                            <input
                              type="date"
                              name="employment_date"
                              id="employment_date"
                              class="form-control text-primary"
                              placeholder="mm/dd/yyyy"
                              autoComplete="off"
                              {...register("employment_date", {
                                required: "Employment date is required.",
                              })}
                              className={`${
                                errors.employment_date
                                  ? "input-error form-control text-primary"
                                  : "form-control text-primary"
                              }`}
                            />
                            {errors.employment_date && (
                              <p className="errorMsg">
                                {errors.employment_date.message}
                              </p>
                            )}
                          </Form.Group>
                        </div>
                      </div>
                      <div class="form-row">
                        <div class="col-md-12">
                          <Form.Group controlId="trainer_employer_relationship">
                            <label for="trainer_employer_relationship">
                              Does the trainer have any business connection with
                              the Employer/Applicant?
                            </label>
                            <div>
                              <div class="form-check form-check-inline">
                                <input
                                  type="radio"
                                  class="form-check-input"
                                  name="trainer_employer_relationship"
                                  id="relationship-yes"
                                  value="yes"
                                  onClick={handleRelated}
                                  autoComplete="off"
                                  {...register(
                                    "trainer_employer_relationship",
                                    {
                                      required:
                                        "Trainer employer relationship is required.",
                                    }
                                  )}
                                  className={`${
                                    errors.trainer_employer_relationship
                                      ? "input-error"
                                      : ""
                                  }`}
                                />
                                <label
                                  for="relationship-yes"
                                  class="form-check-label"
                                >
                                  Yes
                                </label>
                              </div>
                              <div class="form-check form-check-inline">
                                <input
                                  type="radio"
                                  class="form-check-input"
                                  name="trainer_employer_relationship"
                                  id="relationship-no"
                                  value="no"
                                  onClick={handleNotRelated}
                                  autoComplete="off"
                                  {...register(
                                    "trainer_employer_relationship",
                                    {
                                      required:
                                        "Trainer employer relationship is required.",
                                    }
                                  )}
                                  className={`${
                                    errors.trainer_employer_relationship
                                      ? "input-error"
                                      : ""
                                  }`}
                                />
                                <label
                                  for="relationship-no"
                                  class="form-check-label"
                                >
                                  No
                                </label>
                              </div>
                            </div>
                            {errors.trainer_employer_relationship && (
                              <p className="errorMsg">
                                {errors.trainer_employer_relationship.message}
                              </p>
                            )}
                            <div class="col-md-12">
                              {related && (
                                <input
                                  type="text"
                                  name="related_to_organization"
                                  id="related_to_organization"
                                  placeholder="If yes, which organization"
                                  autoComplete="off"
                                  {...register("related_to_organization", {
                                    required: "Please specify.",
                                  })}
                                  className={`${
                                    errors.related_to_organization
                                      ? "input-error form-control mt-1 text-primary"
                                      : "form-control mt-1 text-primary"
                                  }`}
                                />
                              )}
                              {related && errors.related_to_organization && (
                                <p className="errorMsg">
                                  {errors.related_to_organization.message}
                                </p>
                              )}
                            </div>
                          </Form.Group>
                        </div>
                      </div>
                      <div class="form-row">
                        <div class="col-md-12">
                          <Form.Group controlId="other_organization_funds">
                            <label for="other_organization_funds">
                              Is any other organization funding the training?
                            </label>
                            <div>
                              <div class="form-check form-check-inline">
                                <input
                                  type="radio"
                                  class="form-check-input"
                                  name="other_organization_funds"
                                  id="funds-yes"
                                  value="yes"
                                  onClick={handleOtherFunds}
                                  autoComplete="off"
                                  {...register("other_organization_funds", {
                                    required: "Funding information required.",
                                  })}
                                  className={`${
                                    errors.other_organization_funds
                                      ? "input-error"
                                      : ""
                                  }`}
                                />
                                <label for="funds-yes" class="form-check-label">
                                  Yes
                                </label>
                              </div>
                              <div class="form-check form-check-inline">
                                <input
                                  type="radio"
                                  class="form-check-input"
                                  name="other_organization_funds"
                                  id="funds-no"
                                  value="no"
                                  onClick={handleNoOtherFunds}
                                  autoComplete="off"
                                  {...register("other_organization_funds", {
                                    required: "Funding information required.",
                                  })}
                                  className={`${
                                    errors.other_organization_funds
                                      ? "input-error"
                                      : ""
                                  }`}
                                />
                                <label for="funds-no" class="form-check-label">
                                  No
                                </label>
                              </div>
                            </div>
                            {errors.other_organization_funds && (
                              <p className="errorMsg">
                                {errors.other_organization_funds.message}
                              </p>
                            )}
                            <div class="col-md-12">
                              {otherFunds && (
                                <input
                                  type="text"
                                  name="org_funding"
                                  id="org_funding"
                                  placeholder="If yes, which organization"
                                  autoComplete="off"
                                  {...register("org_funding", {
                                    required: "Please specify.",
                                  })}
                                  className={`${
                                    errors.org_funding
                                      ? "input-error form-control mt-1 text-primary"
                                      : "form-control mt-1 text-primary"
                                  }`}
                                />
                              )}
                              {otherFunds && errors.related_to_organization && (
                                <p className="errorMsg">
                                  {errors.related_to_organization.message}
                                </p>
                              )}
                            </div>
                          </Form.Group>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Form>
            </TabPane>
          )}
          <TabPane key={7} tab={getTitle(7)}>
            <Form
              className="row form-content"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="col-md-12">
                <div className="row form_div">
                  <div className="col-md-12">
                    <legend className="text-info">
                      Training expenses.{" "}
                      <span className="font-italic">
                        please indicate costs with suporting document(s)
                      </span>
                    </legend>
                    <div class="form-row">
                      <div class="col-md-4">
                        <label for="tuition_fees">Tuition fees:</label>
                      </div>
                      <div class="col-md-8">
                        <Form.Group controlId="tuition-fees">
                          <input
                            type="number"
                            name="tuition_fees"
                            id="tuition_fees"
                            placeholder="0.00"
                            autoComplete="off"
                            value={tuitionFees}
                            step="0.01"
                            {...register("tuition_fees", {
                              required: "Tuition fees required.",
                            })}
                            className={`${
                              errors.tuition_fees
                                ? "input-error form-control text-primary"
                                : "form-control text-primary"
                            }`}
                            onChange={onChangeTuitionFee}
                          />
                          {errors.tuition_fees && (
                            <p className="errorMsg">
                              {errors.tuition_fees.message}
                            </p>
                          )}
                        </Form.Group>
                      </div>
                    </div>
                    <div class="form-row">
                      <div class="col-md-4 ">
                        <label for="examination">Examination fees:</label>
                      </div>
                      <div class="col-md-8 ">
                        <Form.Group controlId="examination_fees">
                          <input
                            type="number"
                            name="examination_fees"
                            class="form-control"
                            id="examination_fees"
                            placeholder="0.00"
                            autoComplete="off"
                            step="0.01"
                            value={examinationFees}
                            {...register("examination_fees", {
                              required: "Examination fees required.",
                            })}
                            className={`${
                              errors.examination_fees
                                ? "input-error form-control text-primary"
                                : "form-control text-primary"
                            }`}
                            onChange={onChangeExaminationFee}
                          />
                          {errors.examination_fees && (
                            <p className="errorMsg">
                              {errors.examination_fees.message}
                            </p>
                          )}
                        </Form.Group>
                      </div>
                    </div>
                    <div class="form-row">
                      <div class="col-md-4">
                        <label for="books">
                          Cost of recommended books and study material:
                        </label>
                      </div>
                      <div class="col-md-8">
                        <Form.Group controlId="books_fees">
                          <input
                            type="number"
                            name="books"
                            class="form-control"
                            id="books_fees"
                            placeholder="0.00"
                            autoComplete="off"
                            value={booksFees}
                            step="0.01"
                            {...register("books_fees", {
                              required: "Study material fees required.",
                            })}
                            className={`${
                              errors.books_fees
                                ? "input-error form-control text-primary"
                                : "form-control text-primary"
                            }`}
                            onChange={onChangeBooksFees}
                          />
                          {errors.books_fees && (
                            <p className="errorMsg">
                              {errors.books_fees.message}
                            </p>
                          )}
                        </Form.Group>
                      </div>
                    </div>
                    <div class="form-row">
                      <div class="col-md-4">
                        <label for="examination">Accomodation and meals:</label>
                      </div>
                      <div class="col-md-8">
                        <Form.Group controlId="accomodation_fees">
                          <input
                            type="number"
                            name="accomodation"
                            class="form-control"
                            id="accomodation_fees"
                            placeholder="0.00"
                            autoComplete="off"
                            value={accomodationFees}
                            step="0.01"
                            {...register("accomodation_fees", {
                              required: "Accomodation fees required.",
                            })}
                            className={`${
                              errors.accomodation_fees
                                ? "input-error form-control text-primary"
                                : "form-control text-primary"
                            }`}
                            onChange={onChangeAccomodationFees}
                          />
                          {errors.accomodation_fees && (
                            <p className="errorMsg">
                              {errors.accomodation_fees.message}
                            </p>
                          )}
                        </Form.Group>
                      </div>
                    </div>
                    <div class="form-row">
                      <div class="col-md-4">
                        <label for="fare">
                          Return economy airfare/bus fare/mileage:
                        </label>
                      </div>
                      <div class="col-md-8">
                        <Form.Group controlId="fare_fees">
                          <input
                            type="number"
                            name="fare"
                            class="form-control"
                            id="fare_fees"
                            placeholder="0.00"
                            autoComplete="off"
                            value={fareFees}
                            step="0.01"
                            {...register("fare_fees", {
                              required: "Fare fees required.",
                            })}
                            className={`${
                              errors.fare_fees
                                ? "input-error form-control text-primary"
                                : "form-control text-primary"
                            }`}
                            onChange={onChangeFareFees}
                          />
                          {errors.fare_fees && (
                            <p className="errorMsg">
                              {errors.fare_fees.message}
                            </p>
                          )}
                        </Form.Group>
                      </div>
                    </div>
                    <div class="form-row">
                      <div class="col-md-4 form-group">
                        <label for="others">Others (Optional) :</label>
                      </div>
                      <div class="col-md-8">
                        <Form.Group controlId="other_fees">
                          <input
                            type="number"
                            id="other_fees"
                            name="other_fees"
                            value={otherFees}
                            placeholder="0.00"
                            autoComplete="off"
                            step="0.01"
                            {...register("other_fees")}
                            className={"form-control text-primary"}
                            onChange={handleChange}
                          />
                        </Form.Group>
                      </div>
                      {otherFees > 0 && (
                        <div class="col-md-12 form-group">
                          <input
                            type="text"
                            name="others"
                            class="form-control"
                            id="other_fees_notes"
                            placeholder="If others, specify"
                            autoComplete="off"
                            {...register("other_fees_notes", {
                              required: "Specify!",
                            })}
                            className={`${
                              errors.other_fees_notes
                                ? "input-error form-control text-primary"
                                : "form-control text-primary"
                            }`}
                          />
                          {errors.other_fees_notes && (
                            <p className="errorMsg">
                              {errors.other_fees_notes.message}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                    <div class="form-row">
                      <div class="col-md-4 form-group">
                        <label for="others">Attach support document:</label>
                      </div>
                      {editSupportDocumentPdf ? (
                        <div class="col-md-8 form-group">
                          <div className="row">
                            <div className="col-md-4">
                              <Form.Group controlId="admission_letter">
                                <div>
                                  <p
                                    className="btn btn-success"
                                    onClick={() =>
                                      handleViewPdf("support_document_file")
                                    }
                                  >
                                    {"Click View Pdf"}
                                  </p>
                                </div>
                              </Form.Group>
                            </div>
                            {editSupportDocumentPdf && (
                              <div className="col-md-4">
                                <Form.Group controlId="edit_pdf">
                                  <div>
                                    <button
                                      type="button"
                                      onClick={() =>
                                        handleChangePdf("support_document_file")
                                      }
                                      className="btn btn btn-danger"
                                    >
                                      CHANGE PDF
                                    </button>
                                  </div>
                                </Form.Group>
                              </div>
                            )}
                          </div>
                        </div>
                      ) : (
                        <div class="col-md-8 form-group">
                          <div>
                            <input
                              type="file"
                              id="customFile"
                              autoComplete="off"
                              name="training_expenses_support_doc"
                              {...register("training_expenses_support_doc", {
                                required: "Support document required.",
                              })}
                              className={`${
                                errors.training_expenses_support_doc
                                  ? "input-error"
                                  : ""
                              }`}
                            />
                            {errors.training_expenses_support_doc && (
                              <p className="errorMsg">
                                {errors.training_expenses_support_doc.message}
                              </p>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                    <div class="form-row">
                      <div class="col-md-3 form-group">
                        <legend for="total">TOTAL COST:</legend>
                      </div>
                      <div class="col-md-9 form-group">
                        <input
                          type="number"
                          name="total_cost"
                          class="form-control text-primary"
                          id="total_cost"
                          value={sum}
                          placeholder="0.00"
                          disabled
                          step="0.01"
                          {...register("total_cost")}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Form>
          </TabPane>
          <TabPane key={8} tab={"Declare and Submit"}>
            <Form
              className="row form-content"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="col-md-12">
                <div className="row form_div">
                  <div className="col-md-12">
                    <legend className="text-danger">Certify and submit</legend>
                    <div class="form-row">
                      <div class="col-md-12 form-group">
                        <div class="form-group form-check">
                          <input
                            type="checkbox"
                            id="declaration"
                            {...register("signature", {
                              required: "Check the box above please.",
                            })}
                            className={`${
                              errors.signature
                                ? "input-error form-check-input"
                                : "form-check-input"
                            }`}
                          />
                          <label class="form-check-label" for="declaration">
                            I hereby declare that the information here given is
                            true to the best of my knowledge.{" "}
                            <span className="text-success">
                              I understand that checking the box will apply as
                              my signature to this form!
                            </span>
                          </label>
                          {errors.signature && (
                            <p className="errorMsg">
                              {errors.signature.message}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div class="form-row">
                      <div class="col-md-3">
                        <Form.Group controlId="authorizer_id">
                          <label for="national_id">National ID Number:</label>
                          <input
                            type="text"
                            name="authorizer_id"
                            id="authorizer_id"
                            placeholder="National ID Number"
                            autoComplete="off"
                            readOnly={
                              state?.type.toString() ===
                              constants.EDIT_APPLICATION
                            }
                            {...register("authorizer_id", {
                              required: "National ID is required.",
                            })}
                            className={`${
                              errors.authorizer_id
                                ? "input-error form-control text-primary"
                                : "form-control text-primary"
                            }`}
                          />
                          {errors.authorizer_id && (
                            <p className="errorMsg">
                              {errors.authorizer_id.message}
                            </p>
                          )}
                        </Form.Group>
                      </div>
                      <div class="col-md-3">
                        <Form.Group controlId="authorizer_first_name">
                          <label for="first_name">FirstName:</label>
                          <input
                            type="text"
                            name="authorizer_first_name"
                            id="authorizer_first_name"
                            placeholder="FirstName"
                            autoComplete="off"
                            {...register("authorizer_first_name", {
                              required: "First name is required.",
                            })}
                            className={`${
                              errors.authorizer_first_name
                                ? "input-error form-control text-primary"
                                : "form-control text-primary"
                            }`}
                          />
                          {errors.authorizer_first_name && (
                            <p className="errorMsg">
                              {errors.authorizer_first_name.message}
                            </p>
                          )}
                        </Form.Group>
                      </div>
                      <div class="col-md-3">
                        <Form.Group controlId="authorizer_last_name">
                          <label for="last_name">LastName:</label>
                          <input
                            type="text"
                            name="authorizer_last_name"
                            id="authorizer_last_name"
                            placeholder="LastName"
                            autoComplete="off"
                            {...register("authorizer_last_name", {
                              required: "Last name is required.",
                            })}
                            className={`${
                              errors.authorizer_last_name
                                ? "input-error form-control text-primary"
                                : "form-control text-primary"
                            }`}
                          />
                          {errors.authorizer_last_name && (
                            <p className="errorMsg">
                              {errors.authorizer_last_name.message}
                            </p>
                          )}
                        </Form.Group>
                      </div>
                      <div class="col-md-3">
                        <Form.Group controlId="authorizer_designation">
                          <label for="authorizer_designation">
                            Authorizer Designation:
                          </label>
                          <input
                            type="text"
                            name="authorizer_designation"
                            id="authorizer_designation"
                            placeholder="Authorizer designation"
                            autoComplete="off"
                            {...register("authorizer_designation", {
                              required: "Designation is required.",
                            })}
                            className={`${
                              errors.authorizer_designation
                                ? "input-error form-control text-primary"
                                : "form-control text-primary"
                            }`}
                          />
                          {errors.authorizer_designation && (
                            <p className="errorMsg">
                              {errors.authorizer_designation.message}
                            </p>
                          )}
                        </Form.Group>
                      </div>
                    </div>
                  </div>
                  <div className={"col-md-12 text-right pb-2 px-4"}>
                    <Button variant="primary" type="submit">
                      Submit
                    </Button>
                  </div>
                </div>
              </div>
            </Form>
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default NewApplicationComponent;
