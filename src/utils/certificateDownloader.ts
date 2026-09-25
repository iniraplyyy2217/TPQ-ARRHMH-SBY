import { StudentCertificate } from '../data/presensiIjazahData';

/**
 * Renders the certificate onto a high-resolution HTML5 Canvas
 * and triggers an automatic PNG download to the user's device.
 */
export async function downloadCertificateAsImage(cert: StudentCertificate): Promise<void> {
  const canvas = document.createElement('canvas');
  // High resolution for crisp printing & viewing (1400 x 980)
  const width = 1400;
  const height = 980;
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Canvas 2D context is not available');
  }

  // 1. Background (warm cream / pergament parchment)
  const bgGrad = ctx.createLinearGradient(0, 0, width, height);
  bgGrad.addColorStop(0, '#FCFBF7');
  bgGrad.addColorStop(0.5, '#F9F6EE');
  bgGrad.addColorStop(1, '#F4EFE2');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // Subtle watermark background pattern
  ctx.save();
  ctx.strokeStyle = 'rgba(61, 85, 68, 0.03)';
  ctx.lineWidth = 1;
  for (let i = -width; i < width * 2; i += 40) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i + height, height);
    ctx.stroke();
  }
  ctx.restore();

  // 2. Decorative Outer Borders
  // Outer green border
  ctx.lineWidth = 14;
  ctx.strokeStyle = '#263D2E';
  ctx.strokeRect(30, 30, width - 60, height - 60);

  // Gold middle border
  ctx.lineWidth = 3;
  ctx.strokeStyle = '#D4AF37';
  ctx.strokeRect(48, 48, width - 96, height - 96);

  // Thin inner green border
  ctx.lineWidth = 1.5;
  ctx.strokeStyle = '#43684F';
  ctx.strokeRect(58, 58, width - 116, height - 116);

  // 3. Corner Ornaments (Islamic Star Flourishes)
  const drawCornerOrnament = (cx: number, cy: number) => {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.fillStyle = '#D4AF37';
    ctx.beginPath();
    ctx.arc(0, 0, 8, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = '#263D2E';
    ctx.lineWidth = 2;
    for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 4) {
      ctx.save();
      ctx.rotate(angle);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(0, 22);
      ctx.stroke();
      ctx.restore();
    }
    ctx.restore();
  };

  drawCornerOrnament(58, 58);
  drawCornerOrnament(width - 58, 58);
  drawCornerOrnament(58, height - 58);
  drawCornerOrnament(width - 58, height - 58);

  // 4. Header Section
  ctx.textAlign = 'center';

  // Basmalah Calligraphy Text
  ctx.fillStyle = '#263D2E';
  ctx.font = 'bold 30px "Amiri", "Traditional Arabic", serif';
  ctx.fillText('بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ', width / 2, 115);

  // Ornamental line under basmalah
  ctx.strokeStyle = '#D4AF37';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(width / 2 - 160, 135);
  ctx.lineTo(width / 2 + 160, 135);
  ctx.stroke();

  // Diamond accent in center of line
  ctx.fillStyle = '#263D2E';
  ctx.beginPath();
  ctx.arc(width / 2, 135, 4, 0, Math.PI * 2);
  ctx.fill();

  // Subtitle badge
  ctx.fillStyle = '#516E59';
  ctx.font = 'bold 16px "Fredoka", "Nunito", sans-serif';
  ctx.letterSpacing = '3px';
  ctx.fillText('IJAZAH RESMI TAMAN PENDIDIKAN AL-QUR\'AN', width / 2, 172);

  // Institution Name
  ctx.fillStyle = '#1B3122';
  ctx.font = 'bold 44px "Fredoka", Georgia, serif';
  ctx.letterSpacing = '1px';
  ctx.fillText('TPQ AR-ROHMAH', width / 2, 225);

  // Certificate Number
  ctx.fillStyle = '#718576';
  ctx.font = '13px monospace';
  ctx.fillText(`Nomor Ijazah: ${cert.certificateNumber}`, width / 2, 255);

  // 5. Body Text
  ctx.fillStyle = '#4A5B4F';
  ctx.font = '17px "Fredoka", "Nunito", sans-serif';
  ctx.fillText('Menyatakan dengan sesungguhnya bahwa santriwan / santriwati:', width / 2, 305);

  // Student Name
  ctx.fillStyle = '#1A3322';
  ctx.font = 'bold 40px "Fredoka", Georgia, serif';
  ctx.fillText(cert.studentName.toUpperCase(), width / 2, 365);

  // Underline for name
  ctx.strokeStyle = '#D4AF37';
  ctx.lineWidth = 2;
  const nameWidth = Math.min(ctx.measureText(cert.studentName.toUpperCase()).width + 80, 700);
  ctx.beginPath();
  ctx.moveTo(width / 2 - nameWidth / 2, 380);
  ctx.lineTo(width / 2 + nameWidth / 2, 380);
  ctx.stroke();

  // NIS & Parent details
  ctx.fillStyle = '#5A6E60';
  ctx.font = '16px "Fredoka", "Nunito", sans-serif';
  const fatherInfo = cert.fatherName ? ` · Putra/Putri dari Bapak ${cert.fatherName}` : '';
  ctx.fillText(`Nomor Induk Santri (NIS): ${cert.studentNis}${fatherInfo}`, width / 2, 415);

  // Curriculum completion text
  ctx.fillStyle = '#3E5043';
  ctx.font = '17px "Fredoka", "Nunito", sans-serif';
  ctx.fillText('Telah menyelesaikan seluruh materi pembelajaran kurikulum:', width / 2, 455);

  // Program Box
  ctx.save();
  const progBoxWidth = 520;
  const progBoxHeight = 44;
  const progBoxX = (width - progBoxWidth) / 2;
  const progBoxY = 475;
  ctx.fillStyle = '#EBF4ED';
  ctx.strokeStyle = '#8EAF96';
  ctx.lineWidth = 1.5;
  roundRect(ctx, progBoxX, progBoxY, progBoxWidth, progBoxHeight, 12);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#1E3826';
  ctx.font = 'bold 20px "Fredoka", "Nunito", sans-serif';
  ctx.fillText(cert.program, width / 2, progBoxY + 29);
  ctx.restore();

  // Predicate Banner
  ctx.fillStyle = '#3E5043';
  ctx.font = '16px "Fredoka", "Nunito", sans-serif';
  ctx.fillText('Dengan Predikat Kelulusan:', width / 2, 550);

  ctx.fillStyle = '#1D3B25';
  ctx.font = 'bold 22px "Fredoka", "Nunito", sans-serif';
  ctx.fillText(`★  ${cert.predicate}  ★`, width / 2, 580);

  // 6. Grades Grid (Tajwid, Fashahah, Akhlak)
  const drawGradeCard = (x: number, y: number, label: string, score: number) => {
    ctx.save();
    ctx.fillStyle = '#FFFFFF';
    ctx.strokeStyle = '#CADBCE';
    ctx.lineWidth = 1.5;
    roundRect(ctx, x, y, 170, 72, 10);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#7A8E7F';
    ctx.font = 'bold 12px "Fredoka", "Nunito", sans-serif';
    ctx.fillText(label.toUpperCase(), x + 85, y + 25);

    ctx.fillStyle = '#223E2A';
    ctx.font = 'bold 26px "Fredoka", "Nunito", sans-serif';
    ctx.fillText(`${score} / 100`, x + 85, y + 57);
    ctx.restore();
  };

  const gridStartX = width / 2 - (170 * 3 + 40) / 2;
  const gridY = 615;
  drawGradeCard(gridStartX, gridY, 'Tajwid', cert.tajwidGrade);
  drawGradeCard(gridStartX + 190, gridY, 'Fashahah', cert.fashahahGrade);
  drawGradeCard(gridStartX + 380, gridY, 'Akhlak', cert.akhlakGrade);

  // 7. Signatures & Digital Seal
  const footerY = 740;

  // Left: Examiner Signature Block
  ctx.textAlign = 'left';
  ctx.fillStyle = '#65796B';
  ctx.font = '14px "Fredoka", "Nunito", sans-serif';
  ctx.fillText('Dewan Penguji Munaqasyah,', 140, footerY);

  // Signature script simulation
  ctx.font = 'italic bold 24px "Amiri", cursive, serif';
  ctx.fillStyle = '#1D3926';
  ctx.fillText('Nur Rohma', 140, footerY + 50);

  ctx.strokeStyle = '#263D2E';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(140, footerY + 65);
  ctx.lineTo(380, footerY + 65);
  ctx.stroke();

  const examiner = (!cert.examinerName || cert.examinerName === 'Ustadz H. Abdul Halim, S.Pd.I')
    ? 'Ustadzah Nur Rohma, S. Pd.'
    : cert.examinerName;
  ctx.font = 'bold 15px "Fredoka", "Nunito", sans-serif';
  ctx.fillStyle = '#1C3523';
  ctx.fillText(examiner, 140, footerY + 88);
  ctx.font = '12px "Fredoka", "Nunito", sans-serif';
  ctx.fillStyle = '#718576';
  ctx.fillText('Kepala / Penguji TPQ AR-ROHMAH', 140, footerY + 105);

  // Center: Official Gold/Green Seal
  const sealCenterX = width / 2;
  const sealCenterY = footerY + 45;
  ctx.save();
  ctx.translate(sealCenterX, sealCenterY);

  // Outer scalloped/dashed circle
  ctx.strokeStyle = '#2F4F37';
  ctx.lineWidth = 3;
  ctx.setLineDash([6, 4]);
  ctx.beginPath();
  ctx.arc(0, 0, 52, 0, Math.PI * 2);
  ctx.stroke();

  // Inner solid circle
  ctx.setLineDash([]);
  ctx.strokeStyle = '#D4AF37';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(0, 0, 44, 0, Math.PI * 2);
  ctx.stroke();

  // Seal Text
  ctx.textAlign = 'center';
  ctx.fillStyle = '#1F3B27';
  ctx.font = 'bold 9px "Fredoka", sans-serif';
  ctx.fillText('STEMPEL DIGITAL RESMI', 0, -18);
  ctx.font = 'bold 10px "Fredoka", sans-serif';
  ctx.fillText('TPQ AR-ROHMAH', 0, -5);
  ctx.font = 'bold 16px "Amiri", serif';
  ctx.fillText('★ ٱلْحَمْدُ لِلَّٰهِ ★', 0, 15);
  ctx.font = '8px monospace';
  ctx.fillStyle = '#5A7061';
  ctx.fillText('TERVERIFIKASI', 0, 29);
  ctx.restore();

  // Right: Date & Verification
  ctx.textAlign = 'right';
  ctx.fillStyle = '#65796B';
  ctx.font = '14px "Fredoka", "Nunito", sans-serif';
  ctx.fillText(`Diterbitkan di Sleman,`, width - 140, footerY);
  ctx.font = 'bold 15px "Fredoka", "Nunito", sans-serif';
  ctx.fillStyle = '#1C3523';
  ctx.fillText(cert.completionDate, width - 140, footerY + 22);

  ctx.font = '12px monospace';
  ctx.fillStyle = '#718576';
  ctx.fillText(`ID Validasi: ${cert.id.toUpperCase()}`, width - 140, footerY + 70);
  ctx.fillText('Status: SAH & ASLI DIGITAL', width - 140, footerY + 90);

  // Bottom footer note
  ctx.textAlign = 'center';
  ctx.font = '11px "Fredoka", "Nunito", sans-serif';
  ctx.fillStyle = '#899E90';
  ctx.fillText(
    'Dokumen Ijazah Elektronik ini diterbitkan secara sah oleh TPQ AR-ROHMAH dan dapat diverifikasi keasliannya.',
    width / 2,
    height - 45
  );

  // Trigger download as PNG file
  const imageBlob = await new Promise<Blob | null>((resolve) => {
    canvas.toBlob((blob) => resolve(blob), 'image/png');
  });

  if (!imageBlob) {
    throw new Error('Failed to create image blob');
  }

  const cleanName = cert.studentName.replace(/[^a-zA-Z0-9]/g, '_');
  const filename = `Ijazah_TPQ_${cleanName}_${cert.certificateNumber.replace(/[^a-zA-Z0-9]/g, '_')}.png`;

  const link = document.createElement('a');
  link.href = URL.createObjectURL(imageBlob);
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(link.href), 1000);
}

/**
 * Downloads a standalone printable HTML certificate file that can be saved
 * on mobile/laptop or opened in any browser for printing / saving to PDF.
 */
export function downloadCertificateAsHtml(cert: StudentCertificate): void {
  const cleanName = cert.studentName.replace(/[^a-zA-Z0-9]/g, '_');
  const filename = `Ijazah_TPQ_${cleanName}_${cert.certificateNumber.replace(/[^a-zA-Z0-9]/g, '_')}.html`;

  const examiner = (!cert.examinerName || cert.examinerName === 'Ustadz H. Abdul Halim, S.Pd.I')
    ? 'Ustadzah Nur Rohma, S. Pd.'
    : cert.examinerName;

  const htmlContent = `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Ijazah Resmi - ${cert.studentName} (${cert.certificateNumber})</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Amiri:wght@700&family=Fredoka:wght@500;700&family=Nunito:wght@400;700;900&display=swap" rel="stylesheet">
  <style>
    @page {
      size: A4 landscape;
      margin: 10mm;
    }
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    body {
      font-family: 'Fredoka', 'Nunito', sans-serif;
      background: #EAE6DB;
      padding: 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      color: #1A3121;
    }
    .no-print {
      margin-bottom: 20px;
      display: flex;
      gap: 12px;
    }
    .btn {
      background: #254F31;
      color: #FFFFFF;
      padding: 10px 20px;
      border: none;
      border-radius: 12px;
      font-weight: bold;
      font-size: 14px;
      cursor: pointer;
      box-shadow: 0 4px 10px rgba(0,0,0,0.15);
      transition: all 0.2s;
    }
    .btn:hover {
      background: #1B3B24;
      transform: translateY(-2px);
    }
    .cert-container {
      width: 1000px;
      height: 700px;
      background: #FAF8F2;
      border: 14px solid #243D2C;
      outline: 3px solid #D4AF37;
      outline-offset: -10px;
      padding: 30px 50px;
      position: relative;
      box-shadow: 0 10px 30px rgba(0,0,0,0.2);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      text-align: center;
    }
    .basmalah {
      font-family: 'Amiri', serif;
      font-size: 26px;
      color: #243D2C;
      margin-bottom: 4px;
    }
    .badge {
      font-size: 13px;
      letter-spacing: 2px;
      color: #516E59;
      font-weight: bold;
      text-transform: uppercase;
    }
    .tpq-title {
      font-size: 34px;
      font-weight: 900;
      color: #1A3222;
      margin: 4px 0;
    }
    .cert-no {
      font-family: monospace;
      font-size: 12px;
      color: #6C8171;
    }
    .statement {
      font-size: 14px;
      color: #4C5E51;
      margin-top: 15px;
    }
    .student-name {
      font-size: 32px;
      font-weight: 900;
      color: #162E1D;
      border-bottom: 2px solid #D4AF37;
      display: inline-block;
      padding: 4px 25px;
      margin: 8px 0;
    }
    .student-nis {
      font-size: 13px;
      color: #5A6D5F;
    }
    .curriculum {
      font-size: 14px;
      margin-top: 10px;
    }
    .program-box {
      display: inline-block;
      background: #EBF4ED;
      border: 1px solid #9BBCA3;
      padding: 6px 20px;
      border-radius: 20px;
      font-weight: bold;
      color: #1E3B26;
      font-size: 15px;
      margin: 6px 0;
    }
    .predicate {
      font-weight: 900;
      color: #22432B;
      font-size: 15px;
      margin-top: 4px;
    }
    .grades-grid {
      display: flex;
      justify-content: center;
      gap: 20px;
      margin: 15px 0;
    }
    .grade-card {
      background: #FFFFFF;
      border: 1px solid #D2E0D5;
      padding: 8px 24px;
      border-radius: 12px;
    }
    .grade-label {
      font-size: 11px;
      color: #798D7E;
      font-weight: bold;
      text-transform: uppercase;
    }
    .grade-val {
      font-size: 20px;
      font-weight: 900;
      color: #213D28;
    }
    .footer-section {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      text-align: left;
      padding-top: 10px;
    }
    .seal {
      width: 90px;
      height: 90px;
      border: 2px dashed #2A4833;
      border-radius: 50%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-size: 8px;
      font-weight: bold;
      color: #2A4833;
      text-transform: uppercase;
      margin: 0 auto;
      background: rgba(234, 245, 236, 0.4);
    }
    @media print {
      body {
        background: transparent;
        padding: 0;
      }
      .no-print {
        display: none;
      }
      .cert-container {
        box-shadow: none;
        width: 100%;
        height: 100vh;
        border-width: 10px;
      }
    }
  </style>
</head>
<body>
  <div class="no-print">
    <button class="btn" onclick="window.print()">🖨️ Cetak / Simpan ke PDF</button>
  </div>

  <div class="cert-container">
    <div>
      <div class="basmalah">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</div>
      <div class="badge">IJAZAH RESMI TAMAN PENDIDIKAN AL-QUR'AN</div>
      <div class="tpq-title">TPQ AR-ROHMAH</div>
      <div class="cert-no">Nomor: ${cert.certificateNumber}</div>
    </div>

    <div>
      <p class="statement">Menyatakan dengan sesungguhnya bahwa santriwan/santriwati:</p>
      <div class="student-name">${cert.studentName.toUpperCase()}</div>
      <div class="student-nis">
        Nomor Induk Santri: ${cert.studentNis} ${cert.fatherName ? `· Putra/Putri dari Bapak ${cert.fatherName}` : ''}
      </div>
      <p class="curriculum">Telah menyelesaikan seluruh materi kurikulum pembelajaran:</p>
      <div class="program-box">${cert.program}</div>
      <div class="predicate">Predikat Kelulusan: ${cert.predicate}</div>

      <div class="grades-grid">
        <div class="grade-card">
          <div class="grade-label">Tajwid</div>
          <div class="grade-val">${cert.tajwidGrade}</div>
        </div>
        <div class="grade-card">
          <div class="grade-label">Fashahah</div>
          <div class="grade-val">${cert.fashahahGrade}</div>
        </div>
        <div class="grade-card">
          <div class="grade-label">Akhlak</div>
          <div class="grade-val">${cert.akhlakGrade}</div>
        </div>
      </div>
    </div>

    <div class="footer-section">
      <div>
        <div style="font-size: 11px; color: #6D8273;">Dewan Penguji Munaqasyah:</div>
        <div style="margin-top: 40px; font-weight: bold; font-size: 14px; color: #1E3725; border-top: 1px solid #1E3725; display: inline-block; padding-top: 3px;">
          ${examiner}
        </div>
        <div style="font-size: 10px; color: #7A9080;">Kepala / Penguji TPQ AR-ROHMAH</div>
      </div>

      <div>
        <div class="seal">
          <span>Stempel Digital</span>
          <span style="font-size: 9px; margin: 2px 0;">TPQ AR-ROHMAH</span>
          <span style="color: #D4AF37;">★ TERVERIFIKASI ★</span>
        </div>
        <div style="font-size: 10px; color: #7A9080; margin-top: 4px; text-align: center;">
          ${cert.completionDate}
        </div>
      </div>

      <div style="text-align: right;">
        <div style="font-size: 11px; color: #6D8273;">Diterbitkan di Sleman</div>
        <div style="font-weight: bold; font-size: 13px; color: #1E3725;">${cert.completionDate}</div>
        <div style="font-size: 10px; color: #8A9D90; margin-top: 25px;">ID: ${cert.id}</div>
        <div style="font-size: 10px; color: #2E5338; font-weight: bold;">Status: SAH & RESMI</div>
      </div>
    </div>
  </div>
</body>
</html>`;

  const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(link.href), 1000);
}

/**
 * Safely prints the certificate without navigating away from the current page
 */
export function printCertificateSafely(cert: StudentCertificate): void {
  const iframe = document.createElement('iframe');
  iframe.style.position = 'fixed';
  iframe.style.right = '0';
  iframe.style.bottom = '0';
  iframe.style.width = '0';
  iframe.style.height = '0';
  iframe.style.border = '0';
  document.body.appendChild(iframe);

  const examiner = (!cert.examinerName || cert.examinerName === 'Ustadz H. Abdul Halim, S.Pd.I')
    ? 'Ustadzah Nur Rohma, S. Pd.'
    : cert.examinerName;

  const content = `<!DOCTYPE html>
<html>
<head>
  <title>Ijazah - ${cert.studentName}</title>
  <style>
    @page { size: A4 landscape; margin: 8mm; }
    body { font-family: serif; margin: 0; padding: 20px; text-align: center; background: #FFF; color: #1A3121; }
    .box { border: 8px solid #233D2A; outline: 2px solid #D4AF37; padding: 25px; }
    h1 { margin: 5px 0; font-size: 28px; }
    h2 { font-size: 24px; margin: 15px 0; text-decoration: underline; }
    .table { display: flex; justify-content: center; gap: 20px; margin: 15px 0; }
    .card { border: 1px solid #CCC; padding: 8px 16px; border-radius: 6px; }
    .footer { display: flex; justify-content: space-between; margin-top: 30px; text-align: left; }
  </style>
</head>
<body>
  <div class="box">
    <div style="font-size: 18px; margin-bottom: 5px;">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</div>
    <div style="font-size: 12px; letter-spacing: 2px; color: #4F6C56; font-weight: bold;">IJAZAH RESMI TAMAN PENDIDIKAN AL-QUR'AN</div>
    <h1>TPQ AR-ROHMAH</h1>
    <div style="font-size: 11px; color: #666;">Nomor: ${cert.certificateNumber}</div>
    <p style="margin-top: 15px; font-size: 13px;">Menyatakan bahwa santriwan/santriwati:</p>
    <h2>${cert.studentName.toUpperCase()}</h2>
    <div style="font-size: 12px;">NIS: ${cert.studentNis} · Putra/Putri dari: Bapak ${cert.fatherName || '-'}</div>
    <p style="margin-top: 10px; font-size: 13px;">Telah menyelesaikan kurikulum: <strong>${cert.program}</strong></p>
    <div style="font-size: 14px; font-weight: bold;">Predikat: ${cert.predicate}</div>
    <div class="table">
      <div class="card"><div>Tajwid</div><strong>${cert.tajwidGrade}</strong></div>
      <div class="card"><div>Fashahah</div><strong>${cert.fashahahGrade}</strong></div>
      <div class="card"><div>Akhlak</div><strong>${cert.akhlakGrade}</strong></div>
    </div>
    <div class="footer">
      <div>
        <div>Penguji Munaqasyah:</div>
        <div style="margin-top: 40px; font-weight: bold; border-top: 1px solid #000; padding-top: 4px;">${examiner}</div>
      </div>
      <div style="text-align: center;">
        <div style="border: 2px dashed #333; border-radius: 50%; width: 70px; height: 70px; display: flex; align-items: center; justify-content: center; font-size: 8px; font-weight: bold; margin: 0 auto;">STEMPEL TPQ</div>
        <div style="font-size: 10px; margin-top: 4px;">${cert.completionDate}</div>
      </div>
      <div style="text-align: right;">
        <div>Diterbitkan: ${cert.completionDate}</div>
        <div style="margin-top: 40px; font-weight: bold;">TPQ AR-ROHMAH</div>
      </div>
    </div>
  </div>
</body>
</html>`;

  const doc = iframe.contentWindow?.document;
  if (doc) {
    doc.open();
    doc.write(content);
    doc.close();
    setTimeout(() => {
      iframe.contentWindow?.focus();
      iframe.contentWindow?.print();
      setTimeout(() => document.body.removeChild(iframe), 2000);
    }, 500);
  }
}

// Helper to draw rounded rectangle
function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}
