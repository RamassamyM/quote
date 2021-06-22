import React from "react";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import pdfDocuments from './../pdfTemplates/index';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { storeQuoteToDb } from '../../core/services/firestore-requests';

const useStyles = makeStyles((theme) => ({
  downloadButton: {
    textDecoration: "none",
    padding: theme.spacing(2),
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.secondary.variant,
    borderRadius: "5px",
    '&:hover': {
      backgroundColor: theme.palette.secondary.main,
    },
  },
}));

const GeneratePdf = (props) =>  {
  const classes = useStyles();
  const data = props.data;
  const template = props.template;
  const pdfAccess = props.pdfAccess;
  const today = new Date(Date.now());
  if (data) {
    storeQuoteToDb(data)
  }
  const Document = (props) => {
    const template = props.template;
    if (template) {
      const Component = pdfDocuments[template];
      return (
        <Component data={data}/>
      );
    }
    return null;
  }
  switch (pdfAccess) {
    case "download":
      return (
        <PDFDownloadLink
          document={<Document data={data} template={template}/>}
          filename="Curakit_Quote"
          className={classes.downloadButton}
        >
          {({ blob, url, loading, error }) => {
            if (loading) {
              return (
                <Typography>
                  PROCESSING...
                </Typography>
              );
            } else {
              return (
                <Typography>
                   DOWNLOAD YOUR QUOTE
                </Typography>
              );
            }
          }}
        </PDFDownloadLink>
      );
  
    case "view":
      return (
        <PDFViewer
          style={{
            width: "100vw",
            height: "100vh"
          }}
        >
          <Document data={data} template={template}/>
        </PDFViewer>
      );
    default:
      return (
        <PDFDownloadLink
          document={<Document data={data} template={template}/>}
          filename="Curakit_Quote"
          className={classes.downloadButton}
        >
          {({ blob, url, loading, error }) => {
            if (loading) {
              return (
                <Typography>
                  PROCESSING...
                </Typography>
              );
            } else {
              return (
                <Typography>
                  DOWNLOAD YOUR QUOTE
                </Typography>
              );
            }
          }}
        </PDFDownloadLink>
      );
  }
};

export default GeneratePdf;
