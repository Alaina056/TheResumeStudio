import React, { useEffect, useState } from "react";
import { X,Save } from "react-feather";
import InputControl1 from "../InputControl1/InputControl1";
import styles from "./Editor.module.css";
function Editor(props) {
    const sections = props.sections;
  const information = props.information;

  const [activeSectionKey, setActiveSectionKey] = useState(
    Object.keys(sections)[0]
  );
  const [activeInformation, setActiveInformation] = useState(
    information[sections[Object.keys(sections)[0]]]
  );
  const [activeDetailIndex, setActiveDetailIndex] = useState(0);
  const [sectionTitle, setSectionTitle] = useState(
    sections[Object.keys(sections)[0]]
  );

  const [values, setValues] = useState({
    name: activeInformation?.detail?.name || "",
    title: activeInformation?.detail?.title || "",
    linkedin: activeInformation?.detail?.linkedin || "",
    github: activeInformation?.detail?.github || "",
    phone: activeInformation?.detail?.phone || "",
    email: activeInformation?.detail?.email || "",
    points:activeInformation?.detail?.points || "",
    companyName:activeInformation?.detail?.companyName || "",
    certificationLink:activeInformation?.detail?.certificationLink || "",
    location:activeInformation?.detail?.location || "",
    overview:activeInformation?.detail?.overview || "",
    link:activeInformation?.detail?.link || "",
    college:activeInformation?.detail?.college || "",
    summary:activeInformation?.detail?.summary || "",
    other:activeInformation?.detail?.other || "",
  });
  const [formErrors,setErrors]=useState({});
  const [isSubmit,setisSubmit]=useState(false);
  const handleSubmit = (e) =>{
    e.preventDefault();
    setErrors(validate(values));
    setisSubmit(true)
  }

useEffect(()=>{
  const errorval = Object.keys.length===0;
    if (errorval) return;
},[formErrors]);

  const validate=(values)=>{
    const errors={};
    const regex= /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    const url=/\//ig;
    const urlgit=/\//ig;
    const urllinkedin=/\//ig;
    const urlcertificate=/\//ig;
    if (!values.name){
      errors.name="⚠ Name field is empty"
    }else if (!values.name.match(/^[A-Za-z\s]*$/)){
      errors.name="⚠ Contains elements other than letters"
    }else if(values.name.length<3){
      errors.name="⚠ Name is too short"
    }
    if (values.title){
      if(values.title.length<5){
          errors.title="⚠ Title is too short"}
      else if (!values.title.match(/^[A-Za-z\s]*$/)){
          errors.title="⚠ Contains elements other than letters"
        }
    }
    if (values.github){
      if (!urlgit.test(values.github)){
        errors.github="⚠ Link format is not correct"}
    }
    if (values.linkedin){
      if (!urllinkedin.test(values.linkedin)){
        errors.linkedin="⚠ Link format is not correct"}
    }    
    if (!values.phone){
      errors.phone="⚠ Phone number field is empty"
    }else if (values.phone.length!==11){
      errors.phone="⚠ Phone number is less than 11 digits"
    }else if (!values.phone.match(/^[0-9\b]+$/)){
      errors.phone="⚠ Contains elements other than integers"
    }
    if(!values.email){
      errors.email="⚠ Email field is empty"
    }else if (!regex.test(values.email)){
      errors.email="⚠ Email format is not correct"
    }
    if (values.link){
      if (!url.test(values.link)){
        errors.link="⚠ Link format is not correct"}
    } 
    if (!values.companyName){
      errors.companyName="⚠ Name field is empty"
    }else if(values.companyName.length<3){
      errors.companyName="⚠ Name is too short"
    }
    if (values.certificationLink){
      if (!urlcertificate.test(values.certificationLink)){
        errors.certificationLink="⚠ Link format is not correct"}
    } 
    if (!values.location){
      errors.location="⚠ Address field is empty"
    }else if(values.location.length<5){
      errors.location="⚠ Address is too short"
    }
    if (!values.overview){
      errors.overview="⚠ Overview field is empty"
    }else if(values.overview.length<5){
      errors.overview="⚠ Overview is too short"
    }
    if (!values.college){
      errors.college="⚠ School name field is empty"
    }else if(values.college.length<3){
      errors.college="⚠ Name is too short"
    }
    if (values.summary){
      if (!values.summary){
        errors.summary="⚠ Detail field is empty"
      }else if(values.summary.length<5){
        errors.summary="⚠ Detail is too short"
      }
    }
    if (values.other){
      if (!values.other){
        errors.other="⚠ Detail field is empty"
      }else if(values.other.length<5){
        errors.other="⚠ Detail is too short"
      }
    }
    if (values.points){
      if(values.points.length<5){
          errors.points="⚠ Detail is too short"}
    }  
    return errors
  }

  const handlePointUpdate = (value, index) => {
    const tempValues = { ...values };
    if (!Array.isArray(tempValues.points)) tempValues.points = [];
    tempValues.points[index] = value;
    setValues(tempValues);
  };

const workExpBody = (
    <div className={styles.detail}>
      <div className={styles.row}>
        <InputControl1
          maxlength="30"
          name="title"
          label="Title"
          placeholder="Enter experience title"
          value={values.title}
          onChange={(event) =>
            setValues((prev) => ({ ...prev, title: event.target.value }))
          }
        />
        <InputControl1
          maxlength="30"
          name='companyName'
          label="Company Name"
          placeholder="Enter company name"
          value={values.companyName}
          onChange={(event) =>
            setValues((prev) => ({ ...prev, companyName: event.target.value }))
          }
        />
      </div>
      <div className={styles.errors}>
      <label>{formErrors.title}</label><label>{formErrors.companyName}</label></div>
      <div className={styles.row}>
        <InputControl1
          name='certificationLink'
          maxlength="50"
          label="Certificate Link"
          placeholder="Enter certificate link"
          value={values.certificationLink}
          onChange={(event) =>
            setValues((prev) => ({
              ...prev,
              certificationLink: event.target.value,
            }))
          }
        />
        <InputControl1
          name='location'
          maxlength="30"
          label="Location"
          placeholder="Enter location"
          value={values.location}
          onChange={(event) =>
            setValues((prev) => ({ ...prev, location: event.target.value }))
          }
        />
      </div>
      <div className={styles.errors}>
      <label>{formErrors.certificationLink}</label><label>{formErrors.location}</label></div>
      <div className={styles.row}>
        <InputControl1
          label="Start Date"
          type="date"
          placeholder="Enter start date"
          value={values.startDate}
          onChange={(event) =>
            setValues((prev) => ({ ...prev, startDate: event.target.value }))
          }
        />
        <InputControl1
          label="End Date"
          type="date"
          placeholder="Enter end date"
          value={values.endDate}
          onChange={(event) =>
            setValues((prev) => ({ ...prev, endDate: event.target.value }))
          }
        />
      </div>

      <div className={styles.column}>
        <label>Enter work description</label>
        <InputControl1
          name='points'
          
          placeholder="Line 1"
          value={values.points ? values.points[0] : ""}
          onChange={(event) => handlePointUpdate(event.target.value, 0)}
        />
        <InputControl1
          name='points'
          
          placeholder="Line 2"
          value={values.points ? values.points[1] : ""}
          onChange={(event) => handlePointUpdate(event.target.value, 1)}
        />
        <InputControl1
          name='points'
          
          placeholder="Line 3"
          value={values.points ? values.points[2] : ""}
          onChange={(event) => handlePointUpdate(event.target.value, 2)}
        />
      </div>
      
    </div>
  );
  const projectBody = (
    <div className={styles.detail}>
      <div className={styles.row}>
        <InputControl1
          name='title'
          maxlength="30"
          label="Title"
          value={values.title}
          placeholder="Enter project title"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, title: event.target.value }))
          }
        />
      </div>
      <label className={styles.errors}>{formErrors.title}</label>
      <InputControl1
        name='overview'
        
        label="Overview"
        value={values.overview}
        placeholder="Enter overview of project"
        onChange={(event) =>
          setValues((prev) => ({ ...prev, overview: event.target.value }))
        }
      /><label className={styles.errors}>{formErrors.overview}</label>
      <div className={styles.row}>
        <InputControl1
          name='link'
          maxlength="50"
          label="Deployed Link"
          value={values.link}
          placeholder="Enter ink of project"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, link: event.target.value }))
          }
        />
        <InputControl1
          name='github'
          maxlength="50"
          label="Github Link"
          value={values.github}
          placeholder="Enter github link"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, github: event.target.value }))
          }
        />
      </div>
      <div className={styles.errors}>
      <label>{formErrors.link}</label><label>{formErrors.github}</label></div>
      <div className={styles.column}>
        <label>Enter project description</label>
        <InputControl1
          nmae='points'
          
          placeholder="Line 1"
          value={values.points ? values.points[0] : ""}
          onChange={(event) => handlePointUpdate(event.target.value, 0)}
        />
        <InputControl1
          name='points'
          
          placeholder="Line 2"
          value={values.points ? values.points[1] : ""}
          onChange={(event) => handlePointUpdate(event.target.value, 1)}
        />
        <InputControl1
          name='points'
          
          placeholder="Line 3"
          value={values.points ? values.points[2] : ""}
          onChange={(event) => handlePointUpdate(event.target.value, 2)}
        />
        <InputControl1
          name='points'
          
          placeholder="Line 4"
          value={values.points ? values.points[3] : ""}
          onChange={(event) => handlePointUpdate(event.target.value, 3)}
        />
      </div>
    </div>
  );
  const educationBody = (
    <div className={styles.detail}>
      <div className={styles.row}>
        <InputControl1
          name="title"
          maxlength="30"
          label="Title"
          value={values.title}
          placeholder="Enter education title "
          onChange={(event) =>
            setValues((prev) => ({ ...prev, title: event.target.value }))
          }
        />
      </div>
      <label className={styles.errors}>{formErrors.title}</label>
      <InputControl1
        name="college"
        maxlength="30"
        label="College/School Name"
        value={values.college}
        placeholder="Enter name of college/school"
        onChange={(event) =>
          setValues((prev) => ({ ...prev, college: event.target.value }))
        }
      /><label className={styles.errors}>{formErrors.college}</label>
      <div className={styles.row}>
        <InputControl1
          label="Start Date"
          type="date"
          placeholder="Enter start date "
          value={values.startDate}
          onChange={(event) =>
            setValues((prev) => ({ ...prev, startDate: event.target.value }))
          }
        />
        <InputControl1
          label="End Date"
          type="date"
          placeholder="Enter end date "
          value={values.endDate}
          onChange={(event) =>
            setValues((prev) => ({ ...prev, endDate: event.target.value }))
          }
        />
      </div>
    </div>
  );
  const basicInfoBody = (
    <div className={styles.detail}>
      <div className={styles.row}>
        <InputControl1
          name='name'
          maxlength="20"
          label="Name"
          placeholder="Enter your name"
          value={values.name}
          onChange={(event) =>
            setValues((prev) => ({ ...prev, name: event.target.value }))
          }
        />
        <InputControl1
          name='title'
          maxlength="30"
          label="Title"
          value={values.title}
          placeholder="Enter your title"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, title: event.target.value }))
          }
        />
      </div>
      <div className={styles.errors}>
      <label>{formErrors.name}</label><label>{formErrors.title}</label></div>
      <div className={styles.row}>
        <InputControl1
          name="linkedin"
          maxlength="50"
          label="Linkedin Link"
          value={values.linkedin}
          placeholder="Enter linkedin profile link"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, linkedin: event.target.value }))
          }
        />
        <InputControl1
          name='email'
          type='email'
          maxlength="50"
          label="Email"
          value={values.email}
          placeholder="Enter email"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, email: event.target.value }))
          }
        />
      </div>
      <div className={styles.errors}>
      <label>{formErrors.linkedin}</label><label>{formErrors.email}</label></div>
      <div className={styles.row}>
        <InputControl1
          name='phone'
          maxlength="11"
          label="Enter phone"
          value={values.phone}
          placeholder="eg: 0300*******"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, phone: event.target.value }))
          }
        />
        <InputControl1
          name="github"
          maxlength="50"
          label="Github Link"
          value={values.github}
          placeholder="Enter github profile link"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, github: event.target.value }))
          }
        />
      </div>
      <div className={styles.errors}>
      <label>{formErrors.phone}</label><label>{formErrors.github}</label></div>
    </div>
  );
  const achievementsBody = (
    <div className={styles.detail}>
      <div className={styles.column}>
        <label>List your achievements</label>
        <InputControl1
          name="points"
          
          placeholder="Line 1"
          value={values.points ? values.points[0] : ""}
          onChange={(event) => handlePointUpdate(event.target.value, 0)}
        />
        <InputControl1
          name="points"
          
          placeholder="Line 2"
          value={values.points ? values.points[1] : ""}
          onChange={(event) => handlePointUpdate(event.target.value, 1)}
        />
        <InputControl1
          name="points"
          
          placeholder="Line 3"
          value={values.points ? values.points[2] : ""}
          onChange={(event) => handlePointUpdate(event.target.value, 2)}
        />
        <InputControl1
          name="points"
          
          placeholder="Line 4"
          value={values.points ? values.points[3] : ""}
          onChange={(event) => handlePointUpdate(event.target.value, 3)}
        />
        <InputControl1
          name="points"
          
          placeholder="Line 5"
          value={values.points ? values.points[4] : ""}
          onChange={(event) => handlePointUpdate(event.target.value, 4)}
        />
      </div>
    </div>
  );
  const summaryBody = (
    <div className={styles.detail}>
      <InputControl1
        name="summary"
        label="Summary"
        value={values.summary}
        placeholder="Enter your objective/summary"
        onChange={(event) =>
          setValues((prev) => ({ ...prev, summary: event.target.value }))
        }
      /><label className={styles.errors}>{formErrors.summary}</label>
    </div>
  );
  const otherBody = (
    <div className={styles.detail}>
      <InputControl1
        name="other"
        label="Other"
        value={values.other}
        placeholder="Enter something"
        onChange={(event) =>
          setValues((prev) => ({ ...prev, other: event.target.value }))
        }
      /><label className={styles.errors}>{formErrors.other}</label>
    </div>
  );

  const generateBody = () => {
    switch (sections[activeSectionKey]) {
      case sections.basicInfo:
        return basicInfoBody;
      case sections.workExp:
        return workExpBody;
      case sections.project:
        return projectBody;
      case sections.education:
        return educationBody;
      case sections.achievement:
        return achievementsBody;
      case sections.summary:
        return summaryBody;
      case sections.other:
        return otherBody;
      default:
        return null;
    }
  };

  const handleSubmission = () => {
    switch (sections[activeSectionKey]) {
      case sections.basicInfo: {
        const tempDetail = {
          name: values.name,
          title: values.title,
          linkedin: values.linkedin,
          github: values.github,
          email: values.email,
          phone: values.phone,
        };

        props.setInformation((prev) => ({
          ...prev,
          [sections.basicInfo]: {
            ...prev[sections.basicInfo],
            detail: tempDetail,
            sectionTitle,
          },
        }));
        break;
      }
      case sections.workExp: {
        const tempDetail = {
          certificationLink: values.certificationLink,
          title: values.title,
          startDate: values.startDate,
          endDate: values.endDate,
          companyName: values.companyName,
          location: values.location,
          points: values.points,
        };
        const tempDetails = [...information[sections.workExp]?.details];
        tempDetails[activeDetailIndex] = tempDetail;

        props.setInformation((prev) => ({
          ...prev,
          [sections.workExp]: {
            ...prev[sections.workExp],
            details: tempDetails,
            sectionTitle,
          },
        }));
        break;
      }
      case sections.project: {
        const tempDetail = {
          link: values.link,
          title: values.title,
          overview: values.overview,
          github: values.github,
          points: values.points,
        };
        const tempDetails = [...information[sections.project]?.details];
        tempDetails[activeDetailIndex] = tempDetail;

        props.setInformation((prev) => ({
          ...prev,
          [sections.project]: {
            ...prev[sections.project],
            details: tempDetails,
            sectionTitle,
          },
        }));
        break;
      }
      case sections.education: {
        const tempDetail = {
          title: values.title,
          college: values.college,
          startDate: values.startDate,
          endDate: values.endDate,
        };
        const tempDetails = [...information[sections.education]?.details];
        tempDetails[activeDetailIndex] = tempDetail;

        props.setInformation((prev) => ({
          ...prev,
          [sections.education]: {
            ...prev[sections.education],
            details: tempDetails,
            sectionTitle,
          },
        }));
        break;
      }
      case sections.achievement: {
        const tempPoints = values.points;

        props.setInformation((prev) => ({
          ...prev,
          [sections.achievement]: {
            ...prev[sections.achievement],
            points: tempPoints,
            sectionTitle,
          },
        }));
        break;
      }
      case sections.summary: {
        const tempDetail = values.summary;

        props.setInformation((prev) => ({
          ...prev,
          [sections.summary]: {
            ...prev[sections.summary],
            detail: tempDetail,
            sectionTitle,
          },
        }));
        break;
      }
      case sections.other: {
        const tempDetail = values.other;

        props.setInformation((prev) => ({
          ...prev,
          [sections.other]: {
            ...prev[sections.other],
            detail: tempDetail,
            sectionTitle,
          },
        }));
        break;
      }
    }
  };



  const handleAddNew = () => {
    const details = activeInformation?.details;
    if (!details) return;
    const lastDetail = details.slice(-1)[0];
    if (!Object.keys(lastDetail).length) return;
    details?.push({});

    props.setInformation((prev) => ({
      ...prev,
      [sections[activeSectionKey]]: {
        ...information[sections[activeSectionKey]],
        details: details,
      },
    }));
    setActiveDetailIndex(details?.length - 1);
  };

  const handleDeleteDetail = (index) => {
    const details = activeInformation?.details
      ? [...activeInformation?.details]
      : "";
    if (!details) return;
    details.splice(index, 1);
    props.setInformation((prev) => ({
      ...prev,
      [sections[activeSectionKey]]: {
        ...information[sections[activeSectionKey]],
        details: details,
      },
    }));

    setActiveDetailIndex((prev) => (prev === index ? 0 : prev - 1));
  };

  useEffect(() => {
    const activeInfo = information[sections[activeSectionKey]];
    setActiveInformation(activeInfo);
    setSectionTitle(sections[activeSectionKey]);
    setActiveDetailIndex(0);
    setValues({
      name: activeInfo?.detail?.name || "",
      overview: activeInfo?.details
        ? activeInfo.details[0]?.overview || ""
        : "",
      link: activeInfo?.details ? activeInfo.details[0]?.link || "" : "",
      certificationLink: activeInfo?.details
        ? activeInfo.details[0]?.certificationLink || ""
        : "",
      companyName: activeInfo?.details
        ? activeInfo.details[0]?.companyName || ""
        : "",
      college: activeInfo?.details
        ? activeInfo.details[0]?.college || ""
        : "",
      location: activeInfo?.details
        ? activeInfo.details[0]?.location || ""
        : "",
      startDate: activeInfo?.details
        ? activeInfo.details[0]?.startDate || ""
        : "",
      endDate: activeInfo?.details ? activeInfo.details[0]?.endDate || "" : "",
      points: activeInfo?.details
        ? activeInfo.details[0]?.points
          ? [...activeInfo.details[0]?.points]
          : ""
        : activeInfo?.points
        ? [...activeInfo.points]
        : "",
      title: activeInfo?.details
        ? activeInfo.details[0]?.title || ""
        : activeInfo?.detail?.title || "",
      linkedin: activeInfo?.detail?.linkedin || "",
      github: activeInfo?.details
        ? activeInfo.details[0]?.github || ""
        : activeInfo?.detail?.github || "",
      phone: activeInfo?.detail?.phone || "",
      email: activeInfo?.detail?.email || "",
      summary: typeof activeInfo?.detail !== "object" ? activeInfo.detail : "",
      other: typeof activeInfo?.detail !== "object" ? activeInfo.detail : "",
    });
  }, [activeSectionKey]);

  useEffect(() => {
    setActiveInformation(information[sections[activeSectionKey]]);
  }, [information]);

  useEffect(() => {
    const details = activeInformation?.details;
    if (!details) return;

    const activeInfo = information[sections[activeSectionKey]];
    setValues({
      overview: activeInfo.details[activeDetailIndex]?.overview || "",
      link: activeInfo.details[activeDetailIndex]?.link || "",
      certificationLink:
        activeInfo.details[activeDetailIndex]?.certificationLink || "",
      companyName: activeInfo.details[activeDetailIndex]?.companyName || "",
      location: activeInfo.details[activeDetailIndex]?.location || "",
      startDate: activeInfo.details[activeDetailIndex]?.startDate || "",
      endDate: activeInfo.details[activeDetailIndex]?.endDate || "",
      points: activeInfo.details[activeDetailIndex]?.points || "",
      title: activeInfo.details[activeDetailIndex]?.title || "",
      linkedin: activeInfo.details[activeDetailIndex]?.linkedin || "",
      github: activeInfo.details[activeDetailIndex]?.github || "",
      college: activeInfo.details[activeDetailIndex]?.college || "",
    });
  }, [activeDetailIndex]);
  return (
    // resume editing section
    <div className={styles.main}>
      <div className={styles.container2}>
      <div className={styles.header}>
        {Object.keys(sections)?.map((key) => (
          <div
            className={`${styles.section} ${
              activeSectionKey === key ? styles.active : ""
            }`}
            key={key}
            onClick={() => setActiveSectionKey(key)}
          >
            {sections[key]}
          </div>
        ))}
      </div>
        <div className={styles.body}>
        <InputControl1
          label="Title"
          placeholder="Enter section title"
          value={sectionTitle}
          onChange={(event) => setSectionTitle(event.target.value)}/>
          <div className={styles.chips}>
          {activeInformation?.details
            ? activeInformation?.details?.map((item, index) => (
                <div
                  className={`${styles.chip} ${
                    activeDetailIndex === index ? styles.active : ""
                  }`}
                  key={item.title + index}
                  onClick={() => setActiveDetailIndex(index)}
                >
                  <p>
                    {sections[activeSectionKey]} {index + 1}
                  </p>
                  <X
                    onClick={(event) => {
                      event.stopPropagation();
                      handleDeleteDetail(index);
                    }}
                  />
                </div>
              ))
            : ""}
          {activeInformation?.details &&
          activeInformation?.details?.length > 0 ? (
            <div className={styles.new} onClick={handleAddNew}>
              + Add
            </div>
          ) : (
            ""
          )}
        </div>
          {generateBody()}
          <button className={styles.save} onClick={handleSubmit} onDoubleClick={handleSubmission} >Save<Save/></button>
          </div>
      </div>
    </div>
  )
}

export default Editor