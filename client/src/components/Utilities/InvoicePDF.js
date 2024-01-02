import React from 'react';
import { Document, Page, Text, View, StyleSheet, PDFViewer } from '@react-pdf/renderer';

const styles = StyleSheet.create({
	page: {
		flexDirection: 'row',
	},
	section: {
		flexGrow: 1,
	},
});

const MyDocument = (
	<Document>
		<Page size="A4" style={styles.page}>
			<View style={styles.section}>
				<Text>Hello World!</Text>
			</View>
			<View style={styles.section}>
				<Text>We're inside a PDF!</Text>
			</View>
		</Page>
	</Document>
);

export function InvoicePDF() {
    return (
        <PDFViewer>
            {MyDocument}
        </PDFViewer>
    )
} 