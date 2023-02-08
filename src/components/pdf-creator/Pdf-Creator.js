import React, { useState, useEffect } from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { PDFViewer } from '@react-pdf/renderer';
import {PDFDownloadLink} from '@react-pdf/renderer';
import { useParams } from "react-router-dom";
import { getProfessorById } from "../../api/handler";
import Table from './Table';

// Create styles
const styles = StyleSheet.create({
  page: {
    backgroundColor: 'white',
    fontFamily: 'Times-Roman',
    margin:10,
    padding:10,
    fontSize: 12,
  },
  bold:{
    fontFamily: 'Times-Bold',
  },
  table: { 
    display: "table", 
    width: "auto",
    marginTop:10,
    marginRight:10,
  }, 
  tableRow: { 
    margin: "auto", 
    flexDirection: "row" 
  }, 
  tableCol1: { 
    width: "10%", 
  }, 
  tableCol2: { 
    width: "90%", 
  }, 
});

// Create Document Component
const MyDocument = ({professor}) => {
    const faculty = professor;
    return(
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.bold}>
                    <Text style={styles.bold}>{faculty.name}</Text>
                </View>
                <View>
                    <Text>{faculty.title}, {faculty.tenuredStatus? 'Tenured':'Not Tenured'}</Text>
                </View>
                <View style={{marginTop:'10', marginRight:'10'}}>
                    <Text style={styles.bold}>Degrees</Text>
                    <Table header={['year', 'degreeLevel', 'major', 'university']} rows={faculty['degrees']} widths={['10%', '25%', '25%', '40%']}></Table>
                </View>
                <View style={{marginTop:'10', marginRight:'10'}}>
                    <Text style={styles.bold}>Academic Experience</Text>
                    <Table header={['yearRange', 'position', 'department', 'university']} rows={faculty['academicExperiences']} widths={['15%', '25%', '25%', '35%']}></Table>
                </View>
                <View style={{marginTop:'10', marginRight:'10'}}>
                    <Text style={{fontFamily: 'Times-Bold'}}>Academic Experience</Text>
                    <Table header={['yearRange', 'position', 'company']} rows={faculty['nonAcademicExperiences']} widths={['20%', '30%', '50%']}></Table>
                </View>
                <View style={{marginTop:'10', marginRight:'10'}}>
                    <Text style={styles.bold}>Certifications and Registration</Text>
                    {faculty['certsAndProfessionalRegistrations']? 
                    faculty['certsAndProfessionalRegistrations'].map((cert, index)=>(
                        <Text>{index + 1}. {cert.certification}</Text>
                    )
                    )   : null }
                </View>
                <View style={{marginTop:'10', marginRight:'10'}}>
                    <Text style={styles.bold}>Current Membership in Professional Societies</Text>
                    {faculty['memberships']? 
                    faculty['memberships'].map((membership, index)=>(
                        <Text>{index + 1}. {membership.organization}</Text>
                    )
                    )   : null }
                </View>
                <View style={styles.table}>
                    <Text style={styles.bold}>Honors</Text>
                    {faculty['honors']? 
                    faculty['honors'].map((honor, index)=>(
                        <div style={styles.tableRow}>
                            <View style={styles.tableCol1}>
                                <Text>{honor.year} </Text>
                            </View>
                            <View style={styles.tableCol2}>
                                <Text>{honor.honor}</Text>
                            </View>
                        </div>
                    )
                    )   : null }
                </View>
                <View style={{marginTop:'10', marginRight:'10'}}>
                    <Text style={styles.bold}>Services Activities in past 5 years</Text>
                    {faculty['services']? 
                    faculty['services'].map((service, index)=>(
                        <Text>{index + 1}. {service.service}</Text>
                    )
                    )   : null }
                </View>

                <View style={{marginTop:'10', marginRight:'10'}}>
                    <Text style={styles.bold}>Key Publications and Presentations</Text>
                    {faculty['publications']? 
                    faculty['publications'].map((publication, index)=>(
                        <Text>{index + 1}.   {publication.publication}</Text>
                    )
                    )   : null }
                </View>

                <View style={{marginTop:'10', marginRight:'10'}}>
                    <Text style={styles.bold}>Professional Development Activities</Text>
                    {faculty['professionalDevelopments']? 
                    faculty['professionalDevelopments'].map((professionalDevelopment, index)=>(
                        <Text>{professionalDevelopment.activity}</Text>
                    )
                    )   : null }
                </View>
            </Page>
        </Document>
    )
    };



const Viewer = () => {
    let { id } = useParams();
  const [fac, setFaculty] = useState({});

    useEffect(() => {
        // GET request using axios inside useEffect React hook
        getProfessorById(id)
            .then(response => setFaculty(response.data));

    // empty dependency array means this effect will only run once (like componentDidMount in classes)
    },[id]);
    const faculty = fac;
    return(    
    <div>
        <PDFViewer>
            <MyDocument professor={faculty}/>
        </PDFViewer>
        <PDFDownloadLink document={<MyDocument professor={faculty} />} fileName= {`${faculty.name}-CV.pdf`}>
            {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download now!')}
        </PDFDownloadLink>
    </div>
    )
}

export default Viewer;