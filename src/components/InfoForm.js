import { FieldArray, FormikProvider, useFormik } from "formik";
import { useParams } from "react-router-dom";
import './infoForm.css';
import {IconButton, Button, Checkbox, createTheme, FormControlLabel, TextareaAutosize, TextField, ThemeProvider, InputLabel } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import React, { useState, useEffect } from 'react';
import { getProfessorById, updateProfessor } from "../api/handler";

const SignupForm = () => {
    let { id } = useParams();
  const [fac, setFaculty] = useState({});

    useEffect(() => {
        // GET request using axios inside useEffect React hook
        getProfessorById(id)
            .then(response => setFaculty(response.data));

    // empty dependency array means this effect will only run once (like componentDidMount in classes)
    },[id]);
    const faculty = fac;
  const formik = useFormik({enableReinitialize:true, validateOnChange:false,
    initialValues: { name: faculty.name, title: faculty.title, tenuredStatus: faculty.tenuredStatus || false, degrees: faculty.degrees, 
        academicExperiences: faculty.academicExperiences, nonAcademicExperiences: faculty.nonAcademicExperiences, certsAndProfessionalRegistrations: faculty.certsAndProfessionalRegistrations,
    memberships: faculty.memberships, honors:faculty.honors, services: faculty.services, publications:faculty.publications, professionalDevelopments: faculty.professionalDevelopments},
    onSubmit: values => {
      updateProfessor(id, values).then(function (response) {
          if(response.status===200){
            alert("Updated Successfully");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  });

const theme = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          marginRight: '5px',
          marginBottom: '10px',
          
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          marginRight: '5px',
          marginBottom: '10px',
          
        }
      }
    }
  }
})

  return faculty?(
    <ThemeProvider theme={theme}>
      
    <FormikProvider value={formik}>
    <form className="form" onSubmit={formik.handleSubmit}>
        <div className="formInput">
          <InputLabel>Name </InputLabel>
      <TextField
        id="name"
        name="name"
        onChange={formik.handleChange}
        value={formik.values.name}
      />
        </div>
    <div className="formInput">
      <InputLabel>Title </InputLabel>
      <TextField
        id="title"
        name="title"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.title}
      />
    </div>
    <div className="formInput">
      <FormControlLabel control={<Checkbox
        id="tenuredStatus"
        name="tenuredStatus"
        type="checkbox"
        onChange={formik.handleChange}
        value={formik.values.tenuredStatus}
        checked={formik.values.tenuredStatus}
      />} label="Tenured" />
      
    </div>
    {/* DEGREES Form Group*/}
    <h3>Degrees</h3>
    <FieldArray
    
    name="degrees"
    render={arrayHelpers => (
        <div>
            { formik.values.degrees && formik.values.degrees.length > 0 ? (
            formik.values.degrees.map((degree, index) => (
                <div key={index} className="fieldArray">
                    <TextField value={formik.values.degrees[index].year} onChange={formik.handleChange} name = {`degrees[${index}].year`}/>
                    <TextField value={formik.values.degrees[index].degreeLevel} onChange={formik.handleChange} name = {`degrees[${index}].degreeLevel`}/>
                    <TextField value={formik.values.degrees[index].major} onChange={formik.handleChange} name = {`degrees[${index}].major`}/>
                    <TextField value={formik.values.degrees[index].university} onChange={formik.handleChange} name = {`degrees[${index}].university`}/>
                   
                  <IconButton aria-label="delete" color="error" onClick={() => arrayHelpers.remove(index)}>
                    <DeleteIcon fontSize="inherit" />
                  </IconButton>
           </div>
         ))) : null}
         <Button
           size="small" variant="contained"
           onClick={() => arrayHelpers.push({activity:''})}
         >
           Add
         </Button>
       </div>
        )}
    />

    {/* ACADEMIC EXPERIENCES Form Group*/}
<h3>Academic Experience</h3>
    <FieldArray
    name="academicExperiences"
    render={arrayHelpers => (
        <div>
            {formik.values.academicExperiences && formik.values.academicExperiences.length > 0 ? (
            formik.values.academicExperiences.map((academicExperience, index) => (
                <div key={index} className='fieldArray'>
                    <TextField value={formik.values.academicExperiences[index].yearRange} onChange={formik.handleChange} name = {`academicExperiences[${index}].yearRange`}/>
                    <TextField value={formik.values.academicExperiences[index].position} onChange={formik.handleChange}  name = {`academicExperiences[${index}].position`}/>
                    <TextField value={formik.values.academicExperiences[index].department} onChange={formik.handleChange} name = {`academicExperiences[${index}].department`}/>
                    <TextField value={formik.values.academicExperiences[index].university} onChange={formik.handleChange} name = {`academicExperiences[${index}].university`}/>
                    <IconButton aria-label="delete" color="error" onClick={() => arrayHelpers.remove(index)}>
                      <DeleteIcon fontSize="inherit" />
                    </IconButton>
                </div>
         ))) : null}
         <Button
           size="small" variant="contained"
           onClick={() => arrayHelpers.push({activity:''})}
         >
           Add
         </Button>
       </div>
        )}
    />

<h3>Non Academic Experience</h3>
    <FieldArray
    name="nonAcademicExperiences"
    render={arrayHelpers => (
        <div>
            {formik.values.nonAcademicExperiences && formik.values.nonAcademicExperiences.length > 0 ? (
            formik.values.nonAcademicExperiences.map((nonAcademicExperience, index) => (
                <div key={index} className='fieldArray'>
                    <TextField value={formik.values.nonAcademicExperiences[index].yearRange} onChange={formik.handleChange} name = {`nonAcademicExperiences[${index}].yearRange`}/>
                    <TextField value={formik.values.nonAcademicExperiences[index].position} onChange={formik.handleChange} name = {`nonAcademicExperiences[${index}].position`}/>
                    <TextField value={formik.values.nonAcademicExperiences[index].company} onChange={formik.handleChange} name = {`nonAcademicExperiences[${index}].company`}/>
                    <IconButton aria-label="delete" color="error" onClick={() => arrayHelpers.remove(index)}>
                      <DeleteIcon fontSize="inherit" />
                    </IconButton>
           </div>
         ))) : null}
         <Button
           size="small" variant="contained"
           onClick={() => arrayHelpers.push({activity:''})}
         >
           Add
         </Button>
       </div>
        )}
    />

<h3>Certifications and Professional Registration </h3>
    <FieldArray
    name="certsAndProfessionalRegistrations"
    render={arrayHelpers => (
        <div>
            {formik.values.certsAndProfessionalRegistrations && formik.values.certsAndProfessionalRegistrations.length > 0 ? (
            formik.values.certsAndProfessionalRegistrations.map((certsAndProfessionalRegistration, index) => (
                <div key={index} className='fieldArray'>
                    <TextField value={formik.values.certsAndProfessionalRegistrations[index].certification} onChange={formik.handleChange}   name = {`certsAndProfessionalRegistrations[${index}].certification`}/>
                    <IconButton aria-label="delete" color="error" onClick={() => arrayHelpers.remove(index)}>
                      <DeleteIcon fontSize="inherit" />
                    </IconButton>
           </div>
         ))) : null}
         <Button
           size="small" variant="contained"
           onClick={() => arrayHelpers.push({activity:''})}
         >
           Add
         </Button>
       </div>
        )}
    />


<h3>Current Membership in Professional Societies</h3>
    <FieldArray
    name="memberships"
    render={arrayHelpers => (
        <div>
            {formik.values.memberships && formik.values.memberships.length > 0 ? (
            formik.values.memberships.map((membership, index) => (
                <div key={index} className='fieldArray'>
                    <TextField value={formik.values.memberships[index].organization} onChange={formik.handleChange} name = {`memberships[${index}].organization`}/>
                    <IconButton aria-label="delete" color="error" onClick={() => arrayHelpers.remove(index)}>
                      <DeleteIcon fontSize="inherit" />
                    </IconButton>
           </div>
         ))) : null}
         <Button
           size="small" variant="contained"
           onClick={() => arrayHelpers.push({activity:''})}
         >
           Add
         </Button>
       </div>
        )}
    />

<h3>Honors and Awards</h3>
    <FieldArray
    name="honors"
    render={arrayHelpers => (
        <div>
            {formik.values.honors && formik.values.honors.length > 0 ? (
            formik.values.honors.map((honor, index) => (
                <div key={index} className='fieldArray'>
                    <TextField label="Year" value={formik.values.honors[index].year} onChange={formik.handleChange} name = {`honors[${index}].year`}/>
                    <TextField label = "Honor" value={formik.values.honors[index].honor} onChange={formik.handleChange} name = {`honors[${index}].honor`}/>
                    <IconButton aria-label="delete" color="error" onClick={() => arrayHelpers.remove(index)}>
                      <DeleteIcon fontSize="inherit" />
                    </IconButton>
           </div>
         ))) : null}
         <Button
           size="small" variant="contained"
           onClick={() => arrayHelpers.push({activity:''})}
         >
           Add
         </Button>
       </div>
        )}
    />


<h3>Services and Activities</h3>
    <FieldArray
    name="services"
    render={arrayHelpers => (
        <div>
            {formik.values.services && formik.values.services.length > 0 ? (
            formik.values.services.map((services, index) => (
                <div key={index} className='fieldArray'>
                    <TextField value={formik.values.services[index].service} onChange={formik.handleChange} name = {`services[${index}].service`}/>
                    <IconButton aria-label="delete" color="error" onClick={() => arrayHelpers.remove(index)}>
                      <DeleteIcon fontSize="inherit" />
                    </IconButton>
           </div>
         ))) : null}
         <Button
           size="small" variant="contained"
           onClick={() => arrayHelpers.push({service:''})}
         >
           Add
         </Button>
       </div>
        )}
    />


<h3>Key Publications and Presentations</h3>
    <FieldArray
    name="publications"
    render={arrayHelpers => (
        <div>
            {formik.values.publications && formik.values.publications.length > 0 ? (
            formik.values.publications.map((publication, index) => (
                <div key={index} className='fieldArray'>
                    <TextareaAutosize style={{width:600}} value={formik.values.publications[index].publication} onChange={formik.handleChange}  name = {`publications[${index}].publication`}/>
                    <IconButton aria-label="delete" color="error" onClick={() => arrayHelpers.remove(index)}>
                      <DeleteIcon fontSize="inherit" />
                    </IconButton>
           </div>
         ))) : null}
         <Button
           size="small" variant="contained"
           onClick={() => arrayHelpers.push({activity:''})}
         >
           Add
         </Button>
       </div>
        )}
    />


<h3>Professional Development Activities in Last 5 Years  </h3>
    <FieldArray className = "form-group"
    
    name="professionalDevelopments"
    render={arrayHelpers => (
        <div>
            {formik.values.professionalDevelopments && formik.values.professionalDevelopments.length > 0 ? (
            formik.values.professionalDevelopments
            .map((x, index) => (
                <div key={index} className='fieldArray'>
                  <div style={{width:"80%"}}>
                    <TextField fullWidth value={formik.values.professionalDevelopments[index].activity} onChange={formik.handleChange}  name = {`professionalDevelopments[${index}].activity`}/>
                  </div>
                  <IconButton aria-label="delete" color="error" onClick={() => arrayHelpers.remove(index)}>
                      <DeleteIcon fontSize="inherit" />
                    </IconButton>
           </div>
         ))) : null}
         <Button
           size="small" variant="contained"
           onClick={() => arrayHelpers.push({activity:''})}
         >
           Add
         </Button>
       </div>
        )}
    />


      <Button variant="contained" type="submit">Submit</Button>
    </form>
    </FormikProvider>
    </ThemeProvider>
  ):<></>;
};

export default SignupForm;