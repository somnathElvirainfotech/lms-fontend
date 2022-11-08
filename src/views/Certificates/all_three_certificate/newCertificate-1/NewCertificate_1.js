import React from "react";
import { Document, Page, Text, View, StyleSheet,PDFViewer,Image,PDFDownloadLink } from "@react-pdf/renderer";
import pic from './images/bg2.jpg';

function NewCertificate_1() {


  // Create styles
  const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        width: '100%',
        height:"100%",
        orientation: 'landscape',

    },
    view: {
        width: '100%',
        height: '100%',
        padding: 0,
        backgroundColor: 'white',
    },
    image: {
        objectFit: 'cover',
    },
});

const MyDocument = () => (
    <Document >
      <Page object-fit="fill" style={styles.page}  size="A2">
          <View style={styles.view}>
              <Image style={styles.image}  src={pic} alt="images" />
          </View>
  </Page>
</Document>
)

   
  return (
    <>
      <PDFViewer>
      <MyDocument />
      </PDFViewer>

      <PDFDownloadLink document={<MyDocument />} fileName="fee_acceptance.pdf">
  {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download now!')}
</PDFDownloadLink>



    </>

  );
}

export default NewCertificate_1;
