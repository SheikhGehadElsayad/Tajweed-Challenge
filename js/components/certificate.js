/**
 * PDF Completion Certificate Generator
 * Tajweed Challenge - Student Edition
 *
 * Generates official downloadable PDF certificates using jsPDF upon completing a world.
 */

(function(window) {
    'use strict';

    const CertificateGenerator = {
        generate({ studentName, worldTitle, teacherName, dateStr }) {
            if (typeof window.jspdf === 'undefined' || !window.jspdf.jsPDF) {
                if (typeof showToast === 'function') {
                    showToast('Certificate engine is loading. Please try again in a moment...', true);
                } else {
                    alert('Certificate engine is loading. Please try again in a moment...');
                }
                return false;
            }

            const { jsPDF } = window.jspdf;
            // Create landscape A4 document: 297 x 210 mm
            const doc = new jsPDF({
                orientation: 'landscape',
                unit: 'mm',
                format: 'a4'
            });

            const W = 297;
            const H = 210;

            // 1. Background Fill
            doc.setFillColor(248, 250, 252); // #f8fafc
            doc.rect(0, 0, W, H, 'F');

            // 2. Decorative Double Outer Border
            doc.setDrawColor(37, 99, 235); // #2563eb
            doc.setLineWidth(2.5);
            doc.rect(10, 10, W - 20, H - 20);

            doc.setDrawColor(245, 158, 11); // #f59e0b (Gold)
            doc.setLineWidth(1.2);
            doc.rect(13, 13, W - 26, H - 26);

            // 3. Corner Ornaments
            doc.setFillColor(37, 99, 235);
            const corners = [
                [16, 16], [W - 16, 16], [16, H - 16], [W - 16, H - 16]
            ];
            corners.forEach(([cx, cy]) => {
                doc.circle(cx, cy, 2, 'F');
            });

            // 4. Header & Bismillah Banner
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(30, 58, 138); // #1e3a8a
            doc.setFontSize(22);
            doc.text('TAJWEED CHALLENGE PLATFORM', W / 2, 32, { align: 'center' });

            doc.setFont('helvetica', 'normal');
            doc.setFontSize(11);
            doc.setTextColor(100, 116, 139); // #64748b
            doc.text('Under the Supervision of Sheikh Gehad Elsayad', W / 2, 40, { align: 'center' });

            // Horizontal Decorative Line
            doc.setDrawColor(203, 213, 225);
            doc.setLineWidth(0.6);
            doc.line(W / 2 - 60, 44, W / 2 + 60, 44);

            // 5. Title of Certificate
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(217, 119, 6); // Gold #d97706
            doc.setFontSize(26);
            doc.text('CERTIFICATE OF ACHIEVEMENT', W / 2, 58, { align: 'center' });

            doc.setFont('helvetica', 'italic');
            doc.setFontSize(13);
            doc.setTextColor(71, 85, 105);
            doc.text('This certificate is proudly awarded to', W / 2, 70, { align: 'center' });

            // 6. Student Name (Hero Element)
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(30);
            doc.setTextColor(29, 78, 216); // #1d4ed8
            const sName = (studentName || 'Honored Student').toUpperCase();
            doc.text(sName, W / 2, 88, { align: 'center' });

            // Line under student name
            const textWidth = Math.min(doc.getTextWidth(sName) + 20, 180);
            doc.setDrawColor(37, 99, 235);
            doc.setLineWidth(1.2);
            doc.line(W / 2 - textWidth / 2, 92, W / 2 + textWidth / 2, 92);

            // 7. Achievement Statement
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(13);
            doc.setTextColor(51, 65, 85);
            doc.text('for successfully demonstrating Tajweed mastery and completing all stages in:', W / 2, 106, { align: 'center' });

            // World / Realm Title
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(20);
            doc.setTextColor(5, 150, 105); // Emerald Green #059669
            doc.text(worldTitle || 'Tajweed Realm', W / 2, 120, { align: 'center' });

            // 8. Seal & Medallion Graphic (Simulated in PDF vector)
            const sealX = W / 2;
            const sealY = 146;
            doc.setFillColor(245, 158, 11);
            doc.circle(sealX, sealY, 11, 'F');
            doc.setFillColor(254, 243, 199);
            doc.circle(sealX, sealY, 9, 'F');
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(9);
            doc.setTextColor(180, 83, 9);
            doc.text('PASSED', sealX, sealY + 2.5, { align: 'center' });

            // 9. Signatures and Date Footer
            const leftCol = 45;
            const rightCol = W - 45;
            const signY = 175;

            // Date (Left)
            doc.setDrawColor(148, 163, 184);
            doc.setLineWidth(0.8);
            doc.line(leftCol - 25, signY, leftCol + 25, signY);

            doc.setFont('helvetica', 'normal');
            doc.setFontSize(11);
            doc.setTextColor(71, 85, 105);
            doc.text(dateStr || new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }), leftCol, signY - 4, { align: 'center' });
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(10);
            doc.setTextColor(100, 116, 139);
            doc.text('Date of Completion', leftCol, signY + 6, { align: 'center' });

            // Teacher Name (Right)
            doc.setDrawColor(148, 163, 184);
            doc.setLineWidth(0.8);
            doc.line(rightCol - 35, signY, rightCol + 35, signY);

            doc.setFont('helvetica', 'bold');
            doc.setFontSize(12);
            doc.setTextColor(30, 58, 138);
            doc.text(teacherName || 'Sheikh Gehad Elsayad', rightCol, signY - 4, { align: 'center' });
            doc.setFontSize(10);
            doc.setTextColor(100, 116, 139);
            doc.text('Authorized Quran & Tajweed Teacher', rightCol, signY + 6, { align: 'center' });

            // 10. Document ID / Security Watermark
            doc.setFont('helvetica', 'italic');
            doc.setFontSize(8);
            doc.setTextColor(148, 163, 184);
            doc.text('Official Digital Certificate • Verified by Tajweed Challenge App', W / 2, H - 15, { align: 'center' });

            // Save PDF
            const cleanName = (studentName || 'Student').replace(/[^a-zA-Z0-9_؀-ۿ]/g, '_');
            const cleanWorld = (worldTitle || 'World').replace(/[^a-zA-Z0-9_؀-ۿ]/g, '_');
            doc.save(`Tajweed_Certificate_${cleanName}_${cleanWorld}.pdf`);

            if (typeof showToast === 'function') {
                showToast('📜 Certificate downloaded successfully!');
            }
            return true;
        }
    };

    window.CertificateGenerator = CertificateGenerator;

})(window);
